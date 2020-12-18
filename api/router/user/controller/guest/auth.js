//FOR USER - GUEST

import jwt from 'jsonwebtoken';
import md5 from 'md5';

import UserDB from '../../model/user';

//Sign In
export const SignIn = async (req, res, next) => {
    let { username, password } = req.body;

    if(!username || !password) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));
    if(req.authentic) return next(new ErrorHandler(403, 'Deny Access'));

    try {
        username = StringPlugin.toConvert(username, '');
        password = md5(password);

        let User = await UserDB
        .findOne({ 'auth.username': username });

        if(!User) return res.json({
            error: true,
            status: 'username',
            message: 'Tên tài khoản không tồn tại'
        });

        if(password != User.auth.password) return res.json({
            error: true,
            status: 'password',
            message: 'Mật khẩu không chính xác'
        });

        let NewToken = jwt.sign({
            id: User._id,
            role: User.role,
            verification: User.verification
        }, Config.jwt, { expiresIn: 30 * 24 * 60 * 60 });

        res.json({
            token: NewToken,
            user: User
        });
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Sign Up
export const SignUp = async (req, res) => {
    let { username, password, email } = req.body;

    try {
        if(!username || !password || !email) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));
        if(req.authentic) return next(new ErrorHandler(403, 'Deny Access'));

        username = StringPlugin.toConvert(username, '');
        password = md5(password);

        let User = await UserDB
        .findOne({$or : [ {'auth.username': username}, {'profile.email': email} ]});

        if(User) return res.json({
            error: true,
            status: 'username',
            message: 'Tên tài khoản hoặc email đã tồn tại'
        });

        let NewUser = new UserDB({
            auth: {
                username: username,
                password: password
            },
            profile: {
                email: email,       
            }
        });

        if(username == 'admin') {
            NewUser.role = 'ADMIN';
        };

        await NewUser.save();

        let NewToken = jwt.sign({
            id: NewUser._id,
            role: NewUser.role,
            verification: NewUser.verification
        }, Config.jwt, { expiresIn: 30 * 24 * 60 * 60 });

        res.json({
            token: NewToken,
            user: NewUser
        });
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get Authentic
export const Get = async (req, res, next) => {
    if(!req.authentic) return next(new ErrorHandler(403, 'Deny Access'));

    try {
        let User = await UserDB
        .findOne({ '_id': req.authentic.id });
        
        res.json({
            token: req.cookies.token,
            user: User
        });
    }
    catch(e){
        next(new ErrorHandler(500, e.toString())); 
    }
};
