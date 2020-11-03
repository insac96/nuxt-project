//FOR LAPTOP - ADMIN

import CompanyDB from '../../model/company';
import TrademarkDB from '../../model/trademark';
import ProductDB from '../../model/product';
import ConfigurationDB from '../../model/configuration';
import VariantDB from '../../model/variant';
import ColorDB from '../../model/color';
import ArticleDB from '../../model/article';
import CommentDB from '../../model/comment';
import ReplyDB from '../../model/commentReply';

import { ErrorHandler } from '../../../../plugins/error';

//Get All Company
export const Get = async (req, res, next) => {
    try {
        let Companyes = await CompanyDB
        .find({})
        .populate({path: 'trademarks', select: 'name'})
        .populate({path: 'trademarkCount'})
        .populate({path: 'productCount'})

        res.json(Companyes);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get Mini Company
export const GetMini = async (req, res, next) => {
    try {
        let Companyes = await CompanyDB
        .find({})
        .populate({path: 'trademarks', select: 'name'})

        res.json(Companyes);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Create a New Company
export const Create = async (req, res, next) => {
    let { name, logo } = req.body;
    
    if(!name) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Get = await CompanyDB
        .findOne({ 'name': name })
        .select('_id');

        if(Get) return res.json({
            error: true,
            status: 'name',
            message: 'Tên công ty đã tồn tại'
        });

        let NewCompany = new CompanyDB({
            name: name,
            logo: logo
        });

        await NewCompany.save();

        res.json(NewCompany);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete a Company
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await CompanyDB.deleteOne({ '_id': _id });
        await TrademarkDB.deleteMany({ 'company': _id });
        await ProductDB.deleteMany({ 'company': _id });
        await ConfigurationDB.deleteMany({ 'company': _id });
        await VariantDB.deleteMany({ 'company': _id });
        await ColorDB.deleteMany({ 'company': _id });
        await ArticleDB.deleteMany({ 'company': _id });
        await CommentDB.deleteMany({ 'company': _id });
        await ReplyDB.deleteMany({ 'company': _id });

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit a Company
export const Edit = async (req, res, next) => {
    let { _id, name, logo } = req.body;

    if(!_id || !name) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));
    
    try {
        let Company = await CompanyDB
        .findById(_id)
        .select('_id');

        if(!Company) throw 'Company Data Not Found';

        Company.name = name;
        Company.logo = logo;

        await Company.save();

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};



