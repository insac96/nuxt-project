//FOR LAPTOP - ADMIN
//Trademark

import CompanyDB from '../../model/company';
import TrademarkDB from '../../model/trademark';
import ProductDB from '../../model/product';

//Add a New Trademarkk
export const Create = async (req, res, next) => {
    let { company, name } = req.body;

    if(!company || !name) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Company
        let Company = await CompanyDB
        .findById(company)
        .select('_id');

        if(!Company) throw 'Hãng sản xuất không tồn tại';

        //Create New Trademark
        let NewTrademark = new TrademarkDB({
            company: company,
            name: name
        });

        //Save
        await NewTrademark.save();

        //End
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
        //Get Count Product In Trademark
        let CountProductInTrademark = await ProductDB.countDocuments({'trademark': _id});
        if(CountProductInTrademark > 0) throw 'Không thể xóa vì thương hiệu nhánh đã tồn tại sản phẩm';

        //Delete
        await TrademarkDB.deleteOne({ '_id': _id });

        //End
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
        //Get Trademark
        let Trademark = await TrademarkDB
        .findById(_id)
        .select('_id');

        if(!Trademark) throw 'Thương hiệu nhánh không tồn tại';

        //Save
        Trademark.name = name;
        await Trademark.save();

        //End
        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};