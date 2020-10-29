//FOR LAPTOP - GUEST

import CompanyDB from '../../model/company';
import TrademarkDB from '../../model/trademark';
import ProductDB from '../../model/product';
import ConfigurationDB from '../../model/configuration';
import VariantDB from '../../model/variant';
import ColorDB from '../../model/color';
import ArticleDB from '../../model/article';
import CommentDB from '../../model/comment';

import { ErrorHandler } from '../../../../plugins/error';

export const GetByLink = async (req, res, next) => {
    let { link } = req.body;

    if(!link) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Product = await ProductDB
        .findOne({'link': link})
        .populate({path: 'company', select: 'name logo'})
        .populate({path: 'trademark', select: 'name'})
        .populate({path: 'configuration', select: 'default upgrade'})
        .populate({path: 'article'})
        .populate({
            path: 'variants',
            populate: { path: 'colors' }
        })
        .populate({
            path: 'comments', 
            select: 'user content reply create',
            populate: [
                { path: 'user', select: 'profile' },
                { path: 'reply.user', select: 'profile' }
            ],
            options: {
                sort: { 'create': -1 },
            },
            skip: 0,
            limit: 6
        })
        .populate({ path: 'commentCount' });

        if(!Product) throw 'Product Data Not Found';
        
        res.json(Product);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};