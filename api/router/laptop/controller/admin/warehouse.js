//FOR LAPTOP - ADMIN

import VariantDB from '../../model/variant';
import WarehouseDB from '../../model/warehouse';
import WarehouseColorDB from '../../model/warehouseColor';

export const Import = async (req, res, next) => {
    let { company, trademark, product, variant, colors } = req.body;

    if(!company || !trademark || !product || !variant || !req.body.import || !req.body.export || colors.length < 1) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));
    if(!req.body.import.price || !req.body.export.price) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Get = await VariantDB
        .findById(variant)
        .select('_id');

        if(!Get) throw 'Variant Data Not Found';

        let NewWarehouse = new WarehouseDB({
            company: company,
            trademark: trademark,
            product: product,
            variant: variant,
            import: req.body.import,
            export: req.body.export
        });

        let ListNewColor = [];
        for (let i = 0; i < colors.length; i++) {
            let color = colors[i];
            color.warehouse = NewWarehouse._id;
            
            let NewWarehouseColor = new WarehouseColorDB(color);
            await NewWarehouseColor.save();

            ListNewColor.push(NewWarehouseColor);
        };

        await NewWarehouse.save();
        NewWarehouse.colors = ListNewColor;

        res.json(NewWarehouse);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

export const EditExportPrice = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id || !req.body.export || !req.body.export.price) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Warehouse = await WarehouseDB
        .findById(_id)
        .select('_id');

        if(!Warehouse) throw 'WareHouse Data Not Found';

        Warehouse.export = {
            price: req.body.export.price
        };

        await Warehouse.save();

        res.json(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};