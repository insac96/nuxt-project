//FOR LAPTOP - ADMIN

import CompanyDB from '../../model/company';
import TrademarkDB from '../../model/trademark';
import ProductDB from '../../model/product';

//Get List Company
export const Get = async (req, res, next) => {
    try {
        let Companyes = await CompanyDB
        .find({})
        .populate({path: 'trademarks', select: 'name'})
        .populate({path: 'trademarkCount'})
        .populate({path: 'productCount'})

        res.json(Companyes);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get List Company only Info
export const GetListOnlyInfo = async (req, res, next) => {
    try {
        let Companyes = await CompanyDB
        .find({})
        .select('name')
        .populate({path: 'trademarks', select: 'name'})

        res.json(Companyes);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Create a New Company
export const Create = async (req, res, next) => {
    let { name, logo, trademarks } = req.body;
    let NewCompanyID;
    
    if(!name) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Get = await CompanyDB
        .findOne({ 'name': name })
        .select('_id');

        if(Get) return res.json({
            error: true,
            status: 'name',
            message: 'Tên hãng sản xuất đã tồn tại'
        });

        let NewCompany = new CompanyDB({
            name: name,
            logo: logo
        });

        await NewCompany.save();
        NewCompanyID = NewCompany._id;

        let ListNewTrademark = [];
        for (let i = 0; i < trademarks.length; i++) {
            let name = trademarks[i];
            let New = {
                name: name,
                company: NewCompanyID
            };
            
            let NewTrademark = new TrademarkDB(New);
            await NewTrademark.save();

            ListNewTrademark.push(NewTrademark);
        };

        NewCompany.trademarks = ListNewTrademark;

        res.json(NewCompany);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));

        await CompanyDB.deleteOne({'_id': NewCompanyID})
        await TrademarkDB.deleteMany({'company': NewCompanyID})
    }
};

//Delete a Company
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let CountProductInCompany = await ProductDB.countDocuments({'company': _id});

        if(CountProductInCompany > 0) throw 'Không thể xóa do hãng sản xuất đã tồn tại sản phẩm';

        await CompanyDB.deleteOne({ '_id': _id });
        await TrademarkDB.deleteMany({ 'company': _id });

        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit a Company
export const Edit = async (req, res, next) => {
    let { _id, name, logo } = req.body;

    if(!_id || !name) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));
    
    try {
        let Company = await CompanyDB
        .findById(_id)
        .select('_id');

        if(!Company) throw 'Hãng sản xuất không tồn tại';

        Company.name = name;
        Company.logo = logo;

        await Company.save();

        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};



