//FOR LAPTOP - GUEST

import ProductDB from '../../model/product';

export const GetByLink = async (req, res, next) => {
    let { link } = req.body;

    if(!link) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
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
                    path: 'warehouse',
                    select: 'import export',
                    options: {
                        sort: { 'import.date': 1 }
                    },
                    
                    populate: { 
                        path: 'colors',
                        select: 'import export',

                        populate: { 
                            path: 'information',
                            select: 'name code image'
                        }
                    }
                }
            ],
        });

        if(!Product) return next(new ErrorHandler(404, 'Product Data Not Found'));
        
        res.json(Product);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};