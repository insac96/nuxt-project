//FOR LAPTOP - ADMIN

import CompanyDB from '../../model/company';
import TrademarkDB from '../../model/trademark';
import ProductDB from '../../model/product';

//Add a New Trademarkk
export const Create = async (req, res, next) => {
    let { company, name } = req.body;

    if(!company || !name) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let GetCompany = await CompanyDB
        .findById(company)
        .select('_id');

        if(!GetCompany) throw 'Hãng sản xuất không tồn tại';

        let NewTrademark = new TrademarkDB({
            company: company,
            name: name
        });

        await NewTrademark.save();

        res.json(NewTrademark);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete a Trademark
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let CountProductInTrademark = await ProductDB.countDocuments({'trademark': _id});

        if(CountProductInTrademark > 0) throw 'Không thể xóa vì thương hiệu nhánh đã tồn tại sản phẩm';

        await TrademarkDB.deleteOne({ '_id': _id });

        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit a Trademark
export const Edit = async (req, res, next) => {
    let { _id, name } = req.body;

    if(!_id || !name) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Trademark = await TrademarkDB
        .findById(_id)
        .select('_id');

        if(!Trademark) throw 'Thương hiệu nhánh không tồn tại';

        Trademark.name = name;

        await Trademark.save();

        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};