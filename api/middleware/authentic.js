import jwt from 'jsonwebtoken';
import Config from '../../config/api.config';

//Authentic
export const Authentic = (req, res, next) => {
    if(!req.cookies.token) return next(new ErrorHandler(403, 'Deny Access'));

    jwt.verify(req.cookies.token, Config.jwt, (err, decoded) => {
        if(err) return next(new ErrorHandler(403, 'Account Authentic Error'));

        req.authentic = {
            id: decoded.id,
            role: decoded.role,
            verification: decoded.verification
        };
        
        next();
    });
};

//Only View
export const View = (req, res, next) => {
    if(
        req.authentic.role == 'ADMIN' || 
        req.authentic.role == 'SMOD' ||
        req.authentic.role == 'VIEW'
    ) return next();

    next(new ErrorHandler(403, 'Deny Access'));
};

//Only SMod
export const Smod = (req, res, next) => {
    if(
        req.authentic.role == 'ADMIN' || 
        req.authentic.role == 'SMOD'
    ) return next();

    next(new ErrorHandler(403, 'Deny Access'));
};

//Only Admin
export const Admin = (req, res, next) => {
    if(req.authentic.role == 'ADMIN') return next();

    next(new ErrorHandler(403, 'Deny Access'));
};