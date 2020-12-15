//FOR LAPTOP - ADMIN

import ProductDB from '../../model/product';
import VariantDB from '../../model/variant';
import VariantColorDB from '../../model/variantColor';
import WarehouseDB from '../../model/warehouse';

//Create a New Variant
export const Create = async (req, res, next) => {
    let { company, trademark, product, code, screen, cpu, ram, gpu, harddrive } = req.body;

    if(!company || !trademark || !product || !code || !screen || !cpu || !ram || !gpu || !harddrive) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Product = await ProductDB
        .findById(product)
        .select('_id');

        if(!Product) throw 'Sản phẩm gốc không tồn tại';

        let Get = await VariantDB
        .findOne({'code': code})
        .select('_id');

        if(Get) return res.json({
            error: true,
            status: 'code',
            message: 'Mã biến thể đã tồn tại'
        });

        let NewVariant = new VariantDB({
            company: company,
            trademark: trademark,
            product: product,
            code: code,
            screen: screen,
            cpu: cpu,
            ram: ram,
            gpu: gpu,
            harddrive: harddrive
        });

        await NewVariant.save();

        res.json(NewVariant);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Add a Delete Variant
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let CountWarehouseOfVariant = await WarehouseDB.countDocuments({'variant': _id});
        if(CountWarehouseOfVariant > 0) throw 'Không thể xóa vì biến thể đã được nhập kho';

        await VariantDB.deleteOne({ '_id': _id });
        await VariantColorDB.deleteMany({ 'variant': _id });

        res.json(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit a Variant
export const Edit = async (req, res, next) => {
    let { _id, code, screen, cpu, ram, gpu, harddrive } = req.body;

    if(!_id || !code || !screen || !cpu || !ram || !gpu || !harddrive) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));
    
    try {
        let Variant = await VariantDB
        .findById(_id)
        .select('_id code');

        if(!Variant) throw 'Biến thể không tồn tại';

        if(Variant.code != code){
            let Get = await VariantDB
            .findOne({'code': code})
            .select('_id');

            if(Get) return res.json({
                error: true,
                status: 'code',
                message: 'Mã biến thể đã tồn tại'
            });
        }

        Variant.code = code;
        Variant.screen = screen;
        Variant.cpu = cpu;
        Variant.ram = ram;
        Variant.gpu = gpu;
        Variant.harddrive = harddrive;

        await Variant.save();

        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Variant Discount
export const EditDiscount = async (req, res, next) => {
    let { _id, discount } = req.body;

    if(!_id || !discount) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Variant = await VariantDB
        .findById(_id)
        .select('_id');

        if(!Variant) throw 'Biến thể không tồn tại';

        if(discount.type === false) {
            discount.amount = 0;
        }

        Variant.discount = discount;

        await Variant.save();

        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Variant Status
export const EditStatus = async (req, res, next) => {
    let { _id, status } = req.body;

    if(!_id || !status) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Variant = await VariantDB
        .findById(_id)
        .select('_id');

        if(!Variant) throw 'Biến thể không tồn tại';

        Variant.status = status;

        await Variant.save();

        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};