//FOR LAPTOP - ADMIN

import ConfigurationDB from '../../model/configuration';

//Edit Default Configuration
export const EditDefault = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id || !req.body.default) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Configuration = await ConfigurationDB
        .findById(_id)
        .select('_id');

        if(!Configuration) throw 'Dữ liệu cấu hình không tồn tại';

        Configuration.default = req.body.default;

        await Configuration.save();

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
        let Configuration = await ConfigurationDB
        .findById(_id)
        .select('_id');

        if(!Configuration) throw 'Dữ liệu cấu hình không tồn tại';

        Configuration.upgrade = upgrade;

        await Configuration.save();

        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};