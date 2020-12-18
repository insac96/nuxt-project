//FOR LAPTOP - GUEST

import mongoose from 'mongoose';
import VariantDB from '../../model/variant';

//Get Variant Discount
export const GetListByDiscount = async (req, res, next) => {
    let { skip, limit } = req.body;

    let LookupProduct = { 
        $lookup: {
            from: 'laptopproducts',
            localField: 'product',
            foreignField: '_id',
            as: 'product',
        }
    };

    let LookupWarehouse = {
        $lookup: {
            from: 'laptopwarehouses',
            let: { 'variant': '$_id' },
            pipeline: [
                { $match: { 
                        $expr: { $eq: [ "$variant",  "$$variant" ] },
                }},
                { $sort: {  'import.date': 1 } },
                { $limit: 1 },
            ],
            as: 'warehouse',
        }
    };

    let Match = {
        $match: { 
            'product.visibility': true,
            'discount.type': true,
            $or: [
                { status: 'Còn Hàng' },
                { status: 'Mới Về' },
            ]
        }
    }

    try {
        let Variants = await VariantDB
        .aggregate([
            LookupProduct, { $unwind: '$product' },
            LookupWarehouse, { $unwind: '$warehouse' },
            Match,
            { $sort : { 'discount.amount' : -1 } },
            { $skip : (!skip) ? 0 : Number(skip) },
            { $limit : (limit == 0 || !limit) ? 12 : Number(limit) },
            { $project: {
                '_id': 1,
                'code': 1,
                'discount': 1,
                'status': 1,
                'warehouse.export': 1,
                'product.name': 1,
                'product.link': 1,
                'product.images': 1,
            }}
        ]);

        let Count = await VariantDB
        .aggregate([
            LookupProduct, { $unwind: '$product' },
            LookupWarehouse, { $unwind: '$warehouse' },
            Match,
            { $count: "number" }
        ]);

        res.json({
            variants: Variants,
            countVariant: Count.length == 0 ? 0 : Count[0].number
        });
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get All Variant New
export const GetListByStatus = async (req, res, next) => {
    let { skip, limit, status } = req.body;

    if(!status) next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    let LookupProduct = { 
        $lookup: {
            from: 'laptopproducts',
            localField: 'product',
            foreignField: '_id',
            as: 'product',
        }
    };

    let LookupWarehouse = {
        $lookup: {
            from: 'laptopwarehouses',
            let: { 'variant': '$_id' },
            pipeline: [
                { $match: { 
                        $expr: { $eq: [ "$variant",  "$$variant" ] },
                }},
                { $sort: {  'import.date': 1 } },
                { $limit: 1 },
            ],
            as: 'warehouse',
        }
    };

    let Match = {
        $match: { 
            'product.visibility': true,
            'status': status,
        }
    }
    
    try {
        let Variants = await VariantDB
        .aggregate([
            LookupProduct, { $unwind: '$product' },
            LookupWarehouse, { $unwind: '$warehouse' },
            Match,
            { $skip : (!skip) ? 0 : Number(skip) },
            { $limit : (limit == 0 || !limit) ? 12 : Number(limit) },
            { $project: {
                '_id': 1,
                'code': 1,
                'discount': 1,
                'status': 1,
                'warehouse.export': 1,
                'product.name': 1,
                'product.link': 1,
                'product.images': 1,
            }}
        ]);

        let Count = await VariantDB
        .aggregate([
            LookupProduct, { $unwind: '$product' },
            LookupWarehouse, { $unwind: '$warehouse' },
            Match,
            { $count: "number" }
        ])

        res.json({
            variants: Variants,
            countVariant: Count.length == 0 ? 0 : Count[0].number
        });
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Search Variant
export const SearchVariant = async (req, res, next) => {
    let { keySearch, filter } = req.body;
    let Filter = {};

    //KeySearch
    if(keySearch){
        Filter['product.link'] = { $regex: keySearch };
    };
    //Convent Filter
    if(filter.discount){
        Filter['discount.type'] = filter.discount;
    };
    if(filter.company.length > 0){
        let ObjectId = mongoose.Types.ObjectId;
        let Companyes = filter.company.map(item => {
            return ObjectId(item);
        });

        Filter['company'] = { $in: Companyes };
    };
    if(filter.screen.length > 0){
        let Screens = filter.screen.map(item => {
            return { screen: { $regex: item } };
        });

        Filter['$or'] = Screens;
    };
    if(filter.cpu.length > 0){
        let CPUs = filter.cpu.map(item => {
            return { cpu: { $regex: item } };
        });

        Filter['$or'] = CPUs;
    };
    if(filter.ram.length > 0){
        Filter['ram'] = { $in: filter.ram }
    };
    if(filter.harddrive.length > 0){
        Filter['harddrive'] = { $in: filter.harddrive }
    };
    if(filter.gpu.length > 0){
        let GPUs = filter.gpu.map(item => {
            return { gpu: { $regex: item } };
        });

        Filter['$or'] = GPUs;
    };

    try {
        let LookupProduct = { 
            $lookup: {
                from: 'laptopproducts',
                localField: 'product',
                foreignField: '_id',
                as: 'product',
            }
        };

        let LookupWarehouse = {
            $lookup: {
                from: 'laptopwarehouses',
                let: { 'variant': '$_id' },
                pipeline: [
                    { $match: { 
                            $expr: { $eq: [ "$variant",  "$$variant" ] },
                    }},
                    { $sort: {  'import.date': 1 } },
                    { $limit: 1 },
                ],
                as: 'warehouse',
            }
        };
        
        let Match = {
            $match: {
                'product.visibility': true,
                ...Filter
            }
        };

        let Variants = await VariantDB
        .aggregate([
            LookupProduct, { $unwind: '$product' },
            LookupWarehouse, { $unwind: '$warehouse' },
            Match
        ]);

        res.json(Variants);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};