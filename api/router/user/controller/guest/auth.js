//FOR USER - GUEST

import jwt from 'jsonwebtoken';
import md5 from 'md5';

import UserDB from '../../model/user';

//Sign In
export const SignIn = async (req, res, next) => {
    let { username, password } = req.body;

    if(!username || !password) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));
    if(req.authentic) return next(new ErrorHandler(403, 'Deny Access'));

    try {
        //Convent Username
        username = StringPlugin.toConvert(username, '');
        
        //MD5 Password
        password = md5(password);

        //Get User
        let User = await UserDB
        .findOne({ 'auth.username': username });

        if(!User) return res.json({
            error: true,
            status: 'username',
            message: 'Tên tài khoản không tồn tại'
        });

        //Check Password
        if(password != User.auth.password) return res.json({
            error: true,
            status: 'password',
            message: 'Mật khẩu không chính xác'
        });

        //Create Token
        let NewToken = jwt.sign({
            id: User._id,
            role: User.role,
            verification: User.verification
        }, Config.jwt, { expiresIn: 30 * 24 * 60 * 60 });

        //End
        res.json({
            token: NewToken,
            user: User
        });
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Sign Up
export const SignUp = async (req, res) => {
    let { username, password, email } = req.body;

    if(!username || !password || !email) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));
    if(req.authentic) return next(new ErrorHandler(403, 'Deny Access'));

    try {
        //Convent Username
        username = StringPlugin.toConvert(username, '');

        //MD5 Password
        password = md5(password);

        //Get User
        let User = await UserDB
        .findOne({$or : [ {'auth.username': username}, {'profile.email': email} ]});

        if(User) return res.json({
            error: true,
            status: 'username',
            message: 'Tên tài khoản hoặc email đã tồn tại'
        });

        //Create New User
        let NewUser = new UserDB({
            auth: {
                username: username,
                password: password
            },
            profile: {
                email: email,       
            }
        });

        //Create Admin
        if(username == 'admin') {
            NewUser.role = 'ADMIN';
        };

        //Save
        await NewUser.save();

        //Create Token
        let NewToken = jwt.sign({
            id: NewUser._id,
            role: NewUser.role,
            verification: NewUser.verification
        }, Config.jwt, { expiresIn: 30 * 24 * 60 * 60 });

        //End
        res.json({
            token: NewToken,
            user: NewUser
        });
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get Authentic
export const Get = async (req, res, next) => {
    if(!req.authentic) return next(new ErrorHandler(403, 'Deny Access'));

    try {
        //Get User
        let User = await UserDB
        .findOne({ '_id': req.authentic.id });
        
        //End
        res.json({
            token: req.cookies.token,
            user: User
        });
        res.end();
    }
    catch(e){
        next(new ErrorHandler(500, e.toString())); 
    };
};
