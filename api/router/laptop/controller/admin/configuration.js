//FOR LAPTOP - ADMIN

import ConfigurationDB from '../../model/configuration';
import { ErrorHandler } from '../../../../plugins/error';

//Edit Default Configuration
export const EditDefault = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id || !req.body.default) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await ConfigurationDB.updateOne({ '_id': _id }, { 
            default: req.body.default
        });

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Upgrade Configuration
export const EditUpgrade = async (req, res, next) => {
    let { _id, upgrade } = req.body;

    if(!_id || !upgrade) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));
    
    try {
        await ConfigurationDB.updateOne({ '_id': _id }, { 
            upgrade: upgrade
        });

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};