//FOR USER - ADMIN

import UserDB from '../../model/user';

import { toConvert } from '../../../../plugins/string';
import { ErrorHandler } from '../../../../plugins/error';

//Get All User
export const Get = async (req, res, next) => {
    let { skip, role, key } = req.body;
    let Query = {};

    if(role)
        Query['role'] = role;
    if(key){
        let keyCase = toConvert(key, '');

        Query['$text'] = { 
            $search: `\"${keyCase}\"`
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
    }
    catch (e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get User By 
