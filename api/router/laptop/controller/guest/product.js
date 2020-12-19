//FOR LAPTOP - GUEST
//Product

import ProductDB from '../../model/product';

export const GetByLink = async (req, res, next) => {
    let { link } = req.body;

    if(!link) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Product
        let Product = await ProductDB
        .findOne({'link': link})
        .populate({path: 'company', select: 'name logo'})
        .populate({path: 'trademark', select: 'name'})
        .populate({path: 'configuration', select: 'default upgrade'})
        .populate({path: 'article', select: 'content'})
        .populate({
            path: 'variants',
            populate: [
                { 
                    path: 'warehouses',
                    select: 'import export',
                    match: { 
                        'visibility': true,
                        'import.amount': { $gte: 1 } 
                    },

                    populate: { 
                        path: 'colors',
                        select: 'import export',
                        match: { 'import.amount': { $gte: 1 } },

                        populate: { 
                            path: 'information',
                            select: 'name code image'
                        }
                    }
                }
            ],
        });

        if(!Product) return next(new ErrorHandler(404, 'Sản Phẩm Không Tồn Tại'));
        
        //End
        res.json(Product);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};