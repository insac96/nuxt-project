//FOR LAPTOP - ADMIN

import CompanyDB from '../../model/company';
import TrademarkDB from '../../model/trademark';
import ProductDB from '../../model/product';
import ConfigurationDB from '../../model/configuration';
import VariantDB from '../../model/variant';
import ColorDB from '../../model/color';
import ArticleDB from '../../model/article';

import { ErrorHandler } from '../../../../plugins/error';

//Create Color
export const Create = async (req, res, next) => {
    try {
        let NewVariantColor = new ColorDB(req.body);

        await NewVariantColor.save();

        res.send(NewVariantColor);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Information Color
export const Edit = async (req, res, next) => {
    let { _id, name, code, image, upprice } = req.body;

    try {
        if(!_id || !name || !code) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

        await ColorDB.updateOne({'_id': _id}, {
            name: name,
            code: code,
            image: image,
            upprice: upprice ? upprice : 0
        });

        res.json(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete Color
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    try {
        if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

        await ColorDB.deleteOne({'_id': _id});

        res.json(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};