//FOR LAPTOP - ADMIN

import VariantDB from '../../model/variant';
import WarehouseDB from '../../model/warehouse';
import WarehouseColorDB from '../../model/warehouseColor';
import ProductOrderDB from '../../model/productOrder';

export const Import = async (req, res, next) => {
    let { company, trademark, product, variant, colors } = req.body;
    let NewWarehouseID;

    if(!company || !trademark || !product || !variant || !req.body.import || !req.body.export || colors.length < 1) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));
    if(!req.body.import.price || !req.body.export.price) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Variant = await VariantDB
        .findById(variant)
        .select('_id');

        if(!Variant) throw 'Biến thể không tồn tại';

        let NewWarehouse = new WarehouseDB({
            company: company,
            trademark: trademark,
            product: product,
            variant: variant,
            import: req.body.import,
            export: req.body.export
        });

        await NewWarehouse.save();
        NewWarehouseID = NewWarehouse._id;

        let ListNewColor = [];
        for (let i = 0; i < colors.length; i++) {
            let color = colors[i];
            color.warehouse = NewWarehouseID;
            
            let NewWarehouseColor = new WarehouseColorDB(color);
            await NewWarehouseColor.save();

            ListNewColor.push(NewWarehouseColor);
        };

        NewWarehouse.colors = ListNewColor;

        res.json(NewWarehouse);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));

        await WarehouseDB.deleteOne({'_id': NewWarehouseID})
        await WarehouseColorDB.deleteMany({'warehouse': NewWarehouseID})
    }
};

export const EditExportPrice = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id || !req.body.export || !req.body.export.price) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Warehouse = await WarehouseDB
        .findById(_id)
        .select('_id');

        if(!Warehouse) throw 'Dữ liệu kho không tồn tại';

        Warehouse.export = {
            price: req.body.export.price
        };

        await Warehouse.save();

        res.json(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id ) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let CountProductOrderInWarehouse = await ProductOrderDB.countDocuments({'warehouse': _id});
        if(CountProductOrderInWarehouse > 0) throw 'Không thể xóa vì đã có order liên quan đến kho';

        await WarehouseDB.deleteOne({'_id': _id});
        await WarehouseColorDB.deleteMany({'warehouse': _id});

        res.json(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};