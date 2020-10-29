//FOR LAPTOP - ADMIN

import CompanyDB from '../../model/company';
import TrademarkDB from '../../model/trademark';
import ProductDB from '../../model/product';
import ConfigurationDB from '../../model/configuration';
import VariantDB from '../../model/variant';
import ColorDB from '../../model/color';

import { ErrorHandler } from '../../../../plugins/error';

//Add a New Variant
export const Create = async (req, res, next) => {
    try {
        let NewVariant = new VariantDB(req.body);
        await NewVariant.save();

        res.json(NewVariant);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Add a Delete Variant
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    try {
        if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

        await VariantDB.deleteOne({ '_id': req.body._id });
        await ColorDB.deleteMany({ 'variant': req.body._id });

        res.json(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit a Variant
export const Edit = async (req, res, next) => {
    let { _id, code, screen, cpu, ram, gpu, harddrive, price, status } = req.body;

    try {
        if(!_id || !code || !screen || !cpu || !ram || !gpu || !harddrive || !price || !status) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

        await VariantDB.updateOne({ '_id': _id }, { 
            code: code,
            screen: screen,
            cpu: cpu,
            ram: ram,
            gpu: gpu,
            harddrive: harddrive,
            price: price,
            status: status
        });
        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Variant Discount
export const EditDiscount = async (req, res, next) => {
    let { _id, discount } = req.body;

    try {
        if(!_id || !discount) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

        await VariantDB.updateOne({ '_id': _id }, { 
            discount: discount
        });
        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};