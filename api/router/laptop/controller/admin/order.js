//FOR LAPTOP - ADMIN

import OrderDB from '../../model/order';
import ProductOrderDB from '../../model/productOrder';

//Get All News
export const GetListByType = async (req, res, next) => {
    let { skip, type } = req.body;
    
    try {
        let Orders = await OrderDB
        .find({'type': type})
        .populate({ path: 'vendor' })
        .populate({ path: 'products' })
        .sort({ 'verification.type': -1, 'create': -1 })
        .skip((skip == 0 || !skip) ? null : Number(skip))
        .limit(10)

        res.json(Orders);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};