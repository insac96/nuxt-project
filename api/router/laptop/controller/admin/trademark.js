//FOR LAPTOP - ADMIN

import CompanyDB from '../../model/company';
import TrademarkDB from '../../model/trademark';
import ProductDB from '../../model/product';
import ConfigurationDB from '../../model/configuration';
import VariantDB from '../../model/variant';
import ColorDB from '../../model/color';
import ArticleDB from '../../model/article';
import CommentDB from '../../model/comment';


import { ErrorHandler } from '../../../../plugins/error';

//Add a New Trademarkk
export const Create = async (req, res, next) => {
    try {
        let NewTrademark = new TrademarkDB(req.body);
        await NewTrademark.save();

        res.json(NewTrademark);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete a Trademark
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    try {
        if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

        await TrademarkDB.deleteOne({ '_id': _id });
        await ProductDB.deleteMany({ 'trademark': _id });
        await ConfigurationDB.deleteMany({ 'trademark': _id });
        await VariantDB.deleteMany({ 'trademark': _id });
        await ColorDB.deleteMany({ 'trademark': _id });
        await ArticleDB.deleteMany({ 'trademark': _id });
        await CommentDB.deleteMany({ 'trademark': _id });

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit a Trademark
export const Edit = async (req, res, next) => {
    let { _id, name } = req.body;

    try {
        if(!_id || !name) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

        await TrademarkDB.updateOne({ '_id': _id }, { 
            name: name,
        });

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};