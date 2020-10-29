//FOR LAPTOP - ADMIN

import CompanyDB from '../../model/company';
import TrademarkDB from '../../model/trademark';
import ProductDB from '../../model/product';
import ConfigurationDB from '../../model/configuration';
import VariantDB from '../../model/variant';
import ColorDB from '../../model/color';
import ArticleDB from '../../model/article';

import { ErrorHandler } from '../../../../plugins/error';

//Create New Article
export const Create = async (req, res, next) => {
    try {
        let NewArticle = new ArticleDB(req.body);

        await NewArticle.save();

        res.json(NewArticle);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Article
export const Edit = async (req, res, next) => {
    let { _id, content } = req.body;

    try {
        if(!_id || !content) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

        await ArticleDB.updateOne({'_id': _id}, {
            content: content
        });

        res.json(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};