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

//Get All Company For Product Create
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

//Add a New Company
export const Create = async (req, res, next) => {
    try {
        let NewCompany = new CompanyDB(req.body);
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

    try {
        if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

        await CompanyDB.deleteOne({ '_id': _id });
        await TrademarkDB.deleteMany({ 'company': _id });
        await ProductDB.deleteMany({ 'company': _id });
        await ConfigurationDB.deleteMany({ 'company': _id });
        await VariantDB.deleteMany({ 'company': _id });
        await ColorDB.deleteMany({ 'company': _id });
        await ArticleDB.deleteMany({ 'company': _id });
        await CommentDB.deleteMany({ 'company': _id });

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit a Company
export const Edit = async (req, res, next) => {
    let { _id, name, logo } = req.body;
    
    try {
        if(!_id || !name || !logo) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

        await CompanyDB.updateOne({ '_id': _id }, { 
            name: name,
            logo: logo
        });
        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};



