//FOR LAPTOP - ADMIN
//Configuration

import ConfigurationDB from '../../model/configuration';

//Edit Default Configuration
export const EditDefault = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id || !req.body.default) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Configuration
        let Configuration = await ConfigurationDB
        .findById(_id)
        .select('_id default');

        if(!Configuration) throw 'Dữ liệu cấu hình không tồn tại';

        //Save
        Configuration.default = req.body.default;

        await Configuration.save();

        //End
        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Upgrade Configuration
export const EditUpgrade = async (req, res, next) => {
    let { _id, upgrade } = req.body;

    if(!_id || !upgrade) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));
    
    try {
        //Get Configuration
        let Configuration = await ConfigurationDB
        .findById(_id)
        .select('_id upgrade');

        if(!Configuration) throw 'Dữ liệu cấu hình không tồn tại';

        //Save
        Configuration.upgrade = upgrade;

        await Configuration.save();

        //End
        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};