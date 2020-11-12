//FOR LAPTOP - GUEST

import WarehouseColorDB from '../../model/warehouseColor';

//Get List Product in Cart
export const GetList = async (req, res, next) => {
    if(!Array.isArray(req.body)) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let List = await WarehouseColorDB
        .find({
            '_id': { 
                $in: req.body
            }
        })
        .populate({path: 'product', select: 'name link images'})
        .populate({path: 'information', select: 'code name'})
        .populate({path: 'variant', select: 'screen cpu ram gpu harddrive discount'})
        .populate({path: 'warehouse', select: 'import export'});

        res.json(List);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};