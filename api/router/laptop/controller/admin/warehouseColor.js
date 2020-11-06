//FOR LAPTOP - ADMIN

import VariantDB from '../../model/variant';
import WarehouseColorDB from '../../model/warehouseColor';

export const Create = async (req, res, next) => {
    let { company, trademark, product, variant, warehouse, variantColor} = req.body;

    if(!company || !trademark || !product || !variant || !warehouse || !variantColor || !req.body.import || !req.body.export) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));
    if(!req.body.import.amount || !req.body.export.upprice) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Get = await VariantDB
        .findById(variant)
        .select('_id');

        if(!Get) throw 'Variant Data Not Found';

        let NewWarehouseColor = new WarehouseColorDB({
            company: company,
            trademark: trademark,
            product: product,
            variant: variant,
            warehouse: warehouse,
            variantColor: variantColor,

            import: req.body.import,
            export: req.body.export
        });

        await NewWarehouseColor.save();

        res.json(NewWarehouseColor);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await WarehouseColorDB.deleteOne({'_id': _id});

        res.json(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};