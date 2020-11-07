//FOR LAPTOP - GUEST

import VariantDB from '../../model/variant';


//Get Variant Discount
export const GetListByDiscount = async (req, res, next) => {
    let { skip, limit } = req.body;

    try {
        let Variants = await VariantDB
        .aggregate([
            { 
                $lookup: {
                    from: 'laptopproducts',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            { $unwind: '$product' },
            { 
                $lookup: {
                    from: 'laptopwarehouses',
                    let: { 'variant': '$_id' },
                    pipeline: [
                        { 
                            $match: { 
                                $expr: { $eq: [ "$variant",  "$$variant" ] },
                            } 
                        },
                        { $sort: {  'import.date': 1 } },
                        { $limit: 1 },
                    ],
                    as: 'warehouse',
                },
            },
            { $unwind: '$warehouse' },
            { $match: 
                { 
                    'product.visibility': true,
                    'discount.type': true,
                    $or: [
                        { status: 'Còn Hàng' },
                        { status: 'Mới Về' },
                    ]
                } 
            },
            { $sort : { 'discount.amount' : -1 } },
            { $skip : (!skip) ? 0 : Number(skip) },
            { $limit : (limit == 0 || !limit) ? 12 : Number(limit) },
            {
                $project: {
                    '_id': 1,
                    'code': 1,
                    'discount': 1,
                    'status': 1,
                    'warehouse.export': 1,
                    'product.name': 1,
                    'product.link': 1,
                    'product.images': 1,
                }
            } 
        ]);

        res.json(Variants);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get All Variant New
export const GetListByStatus = async (req, res, next) => {
    let { skip, limit, status } = req.body;

    if(!status) next(new ErrorHandler(400, 'Unsuitable Upload Data'));
    
    try {
        let Variants = await VariantDB
        .aggregate([
            { 
                $lookup: {
                    from: 'laptopproducts',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product',
                },
            },
            { $unwind: '$product' },
            { 
                $lookup: {
                    from: 'laptopwarehouses',
                    let: { 'variant': '$_id' },
                    pipeline: [
                        { 
                            $match: { 
                                $expr: { $eq: [ "$variant",  "$$variant" ] },
                            } 
                        },
                        { $sort: {  'import.date': 1 } },
                        { $limit: 1 },
                    ],
                    as: 'warehouse',
                },
            },
            { $unwind: '$warehouse' },
            { $match: 
                { 
                    'product.visibility': true,
                    'status': status,
                } 
            },
            { $skip : (!skip) ? 0 : Number(skip) },
            { $limit : (limit == 0 || !limit) ? 12 : Number(limit) },
            {
                $project: {
                    '_id': 1,
                    'code': 1,
                    'discount': 1,
                    'status': 1,
                    'warehouse.export': 1,
                    'product.name': 1,
                    'product.link': 1,
                    'product.images': 1,
                }
            }
        ]);

        res.json(Variants);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};