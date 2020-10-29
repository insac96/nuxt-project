import jwt from 'jsonwebtoken';
import { ErrorHandler } from '../plugins/error';
import Config from '../../config/app.config';

export const Authentic_Guest = (req, res, next) => {
    if(!req.cookies.token) return next(new ErrorHandler(403, 'Deny Access'));

    jwt.verify(req.cookies.token, Config.jwt, (err, decoded) => {
        if(err) return next(new ErrorHandler(403, 'Account Verify Error'));

        req.authentic = {
            id: decoded.id,
            role: decoded.role,
            verification: decoded.verification
        };
        
        next();
    });
}

export const Authentic_Admin = (req, res, next) => {
    if(!req.cookies.token) return next(new ErrorHandler(403, 'Deny Access'));

    jwt.verify(req.cookies.token, Config.jwt, (err, decoded) => {
        if(err) return next(new ErrorHandler(403, 'Account Verify Error'));
        if(decoded.role != 'ADMIN') return next(new ErrorHandler(403, 'Deny Access'));

        req.authentic = {
            id: decoded.id,
            role: decoded.role,
            verification: decoded.verification
        };

        next();
    });
}