//FOR LAPTOP - ADMIN

import VariantDB from '../../model/variant';
import VariantColorDB from '../../model/variantColor';
import WarehouseColorDB from '../../model/warehouseColor';

//Create Color
export const Create = async (req, res, next) => {
    let { company, trademark, product, variant, name, code, image } = req.body;

    if(!company || !trademark || !product || !variant || !name || !code) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Variant = await VariantDB
        .findById(variant)
        .select('_id');

        if(!Variant) throw 'Biến thể không tồn tại';

        let NewVariantColor = new VariantColorDB({
            company: company,
            trademark: trademark,
            product: product,
            variant: variant,
            name: name,
            code: code,
            image: image
        });

        await NewVariantColor.save();

        res.send(NewVariantColor);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Color
export const Edit = async (req, res, next) => {
    let { _id, name, code, image, upprice } = req.body;

    if(!_id || !name || !code) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Color = await VariantColorDB
        .findById(_id)
        .select('_id');

        if(!Color) throw 'Màu sắc không tồn tại';

        await VariantColorDB.updateOne({'_id': _id}, {
            name: name,
            code: code,
            image: image,
            upprice: upprice ? upprice : 0
        });

        res.json(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete Color
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let CountColorOfWarehouse = await WarehouseColorDB.countDocuments({'information': _id});
        if(CountColorOfWarehouse > 0) throw 'Không thể xóa vì màu sắc biến thể đã được nhập kho';

        await VariantColorDB.deleteOne({'_id': _id});

        res.json(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};