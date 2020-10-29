//FOR LAPTOP - ADMIN

import TrademarkDB from '../../model/trademark';
import ProductDB from '../../model/product';
import ConfigurationDB from '../../model/configuration';
import VariantDB from '../../model/variant';
import ColorDB from '../../model/color';
import ArticleDB from '../../model/article';
import CommentDB from '../../model/comment';
import ReplyDB from '../../model/commentReply';

import { ErrorHandler } from '../../../../plugins/error';

//Add a New Trademarkk
export const Create = async (req, res, next) => {
    let { company, name } = req.body;

    if(!company || !name) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let NewTrademark = new TrademarkDB({
            company: company,
            name: name
        });

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

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await TrademarkDB.deleteOne({ '_id': _id });
        await ProductDB.deleteMany({ 'trademark': _id });
        await ConfigurationDB.deleteMany({ 'trademark': _id });
        await VariantDB.deleteMany({ 'trademark': _id });
        await ColorDB.deleteMany({ 'trademark': _id });
        await ArticleDB.deleteMany({ 'trademark': _id });
        await CommentDB.deleteMany({ 'trademark': _id });
        await ReplyDB.deleteMany({ 'trademark': _id });

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit a Trademark
export const Edit = async (req, res, next) => {
    let { _id, name } = req.body;

    if(!_id || !name) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await TrademarkDB.updateOne({ '_id': _id }, { 
            name: name,
        });

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};