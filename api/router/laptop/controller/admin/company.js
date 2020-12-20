//FOR LAPTOP - ADMIN
//Company

import CompanyDB from '../../model/company';
import TrademarkDB from '../../model/trademark';
import ProductDB from '../../model/product';

//Get List Company
export const Get = async (req, res, next) => {
    try {
        //Get Companyes
        let Companyes = await CompanyDB
        .find({})
        .populate({path: 'trademarks', select: 'name'})
        .populate({path: 'trademarkCount'})
        .populate({path: 'productCount'})

        //End
        res.json({
            companyes: Companyes
        });
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get List Company only Info
export const GetListOnlyInfo = async (req, res, next) => {
    try {
        //Get Companyes (only info)
        let Companyes = await CompanyDB
        .find({})
        .select('name')
        .populate({path: 'trademarks', select: 'name'})

        //End
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
        //Get Company
        let Company = await CompanyDB
        .findOne({ 'name': name })
        .select('_id');

        if(Company) return res.json({
            error: true,
            status: 'name',
            message: 'Tên hãng sản xuất đã tồn tại'
        });

        //Create New Company
        let NewCompany = new CompanyDB({
            name: name,
            logo: logo
        });

        //Save Company
        await NewCompany.save();
        NewCompanyID = NewCompany._id;

        //Save Trademarks
        let ListNewTrademark = [];

        for (let i = 0; i < trademarks.length; i++) {
            let name = trademarks[i];
            let New = {
                name: name,
                company: NewCompanyID
            };
            
            //Save
            let NewTrademark = new TrademarkDB(New);
            await NewTrademark.save();

            //Push New Trademark to List
            ListNewTrademark.push(NewTrademark);
        };

        //Set List New Trademark to New Comapany
        NewCompany.trademarks = ListNewTrademark;

        //End
        res.json(NewCompany);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));

        //Delete All
        await CompanyDB.deleteOne({'_id': NewCompanyID})
        await TrademarkDB.deleteMany({'company': NewCompanyID})
    }
};

//Delete a Company
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Count Product In Company
        let CountProductInCompany = await ProductDB.countDocuments({'company': _id});

        if(CountProductInCompany > 0) throw 'Không thể xóa do hãng sản xuất đã tồn tại sản phẩm';

        //Delete
        await CompanyDB.deleteOne({ '_id': _id });
        await TrademarkDB.deleteMany({ 'company': _id });

        //End
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
        //Get Company
        let Company = await CompanyDB
        .findById(_id)
        .select('_id');

        if(!Company) throw 'Hãng sản xuất không tồn tại';

        //Save
        Company.name = name;
        Company.logo = logo;

        await Company.save();

        //End
        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};



