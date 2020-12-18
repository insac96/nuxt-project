//FOR USER - ADMIN

import UserDB from '../../model/user';

//Get List User
export const Get = async (req, res, next) => {
    let { skip, role, keySearch } = req.body;
    let Query = {};

    if(role)
        Query['role'] = role;
    if(keySearch){
        Query['auth.username'] = {
            $regex: keySearch
        };
    }

    try {
        let Users = await UserDB
        .find(Query)
        .skip((skip == 0 || !skip) ? null : Number(skip))
        .limit(10);

        let Count = await UserDB.countDocuments(Query);

        res.json({
            users: Users,
            count: Count
        });
        res.end();
    }
    catch (e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Ban User 
export const Ban = async (req, res, next) => {
    let { _id } = req.body;
    
    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let User = await UserDB
        .findById(_id)
        .select('ban');

        if(!User) throw 'Tài Khoàn Không Tồn Tại'

        User.ban.type = true;
        User.ban.dateBan = new Date();

        await User.save();

        res.json(User.ban);
        res.end();
    }
    catch (e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//UnBan User 
export const Unban = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let User = await UserDB
        .findById(_id)
        .select('ban');

        if(!User) throw 'Tài Khoàn Không Tồn Tại'

        User.ban.type = false;
        User.ban.dateBan = null;

        await User.save();

        res.json(User.ban);
        res.end();
    }
    catch (e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Change Role User 
export const ChangeRole = async (req, res, next) => {
    let { _id, role } = req.body;

    if(!_id || !role) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));
    
    try {
        let User = await UserDB
        .findById(_id)
        .select('role');

        if(!User) throw 'Tài Khoàn Không Tồn Tại'

        User.role = role;

        await User.save();

        res.json(User.role);
        res.end();
    }
    catch (e) {
        next(new ErrorHandler(500, e.toString()));
    }
};