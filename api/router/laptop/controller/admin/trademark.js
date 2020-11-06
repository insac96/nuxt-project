//FOR LAPTOP - ADMIN

import CompanyDB from '../../model/company';
import TrademarkDB from '../../model/trademark';
import ProductDB from '../../model/product';
import ConfigurationDB from '../../model/configuration';
import VariantDB from '../../model/variant';
import VariantColorDB from '../../model/variantColor';
import WarehouseDB from '../../model/warehouse';
import WarehouseColorDB from '../../model/warehouseColor';
import ArticleDB from '../../model/article';
import CommentDB from '../../model/comment';
import ReplyDB from '../../model/commentReply';

//Add a New Trademarkk
export const Create = async (req, res, next) => {
    let { company, name } = req.body;

    if(!company || !name) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let GetCompany = await CompanyDB
        .findById(company)
        .select('_id');

        if(!GetCompany) throw 'Company Data Not Found';

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
        await VariantColorDB.deleteMany({ 'trademark': _id });
        await WarehouseDB.deleteMany({ 'trademark': _id });
        await WarehouseColorDB.deleteMany({ 'trademark': _id });
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
        let Trademark = await TrademarkDB
        .findById(_id)
        .select('_id');

        if(!Trademark) throw 'Trademark Data Not Found';

        Trademark.name = name;

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};