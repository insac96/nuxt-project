//FOR LAPTOP - ADMIN

import VariantDB from '../../model/variant';
import ColorDB from '../../model/color';

import { ErrorHandler } from '../../../../plugins/error';

//Create a New Variant
export const Create = async (req, res, next) => {
    let { company, trademark, product, code, screen, cpu, ram, gpu, harddrive, price, status } = req.body;

    if(!company || !trademark || !product || !code || !screen || !cpu || !ram || !gpu || !harddrive || !price || !status) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let NewVariant = new VariantDB({
            company: company,
            trademark: trademark,
            product: product,
            code: code,
            screen: screen,
            cpu: cpu,
            ram: ram,
            gpu: gpu,
            harddrive: harddrive,
            price: price,
            status: status
        });

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

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
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

    if(!_id || !code || !screen || !cpu || !ram || !gpu || !harddrive || !price || !status) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));
    
    try {
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

    if(!_id || !discount) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        if(discount.type === false) {
            discount.amount = 0;
        }

        await VariantDB.updateOne({ '_id': _id }, { 
            discount: discount
        });

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};