//FOR LAPTOP - GUEST (ORDER)

import OrderDB from '../../model/order';
import ProductOrderDB from '../../model/productOrder';
import WarehouseColorDB from '../../model/warehouseColor';

//Create Order
export const Create = (req, res, next) => {
    let { vendor, pay, type, listProductOrder } = req.body;

    if(!vendor || !pay || !type || !listProductOrder) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));
    if(listProductOrder.length < 1) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        for (let i = 0; i < listProductOrder.length; i++) {
            let item = listProductOrder[i]
            let warehouseColor_ID = item.warehouseColor;
            let whenOrder = item.whenOrder;
            
            let ProductInfo = await WarehouseColorDB
            .findOne({'_id': warehouseColor_ID})
            .select('company trademark product import export')
            .populate({ path: 'variant', select: 'discount' })
            .populate({ path: 'warehouse', select: 'export' });

            if((whenOrder.amount - ProductInfo.import.amount) > 0) return false;
            if(whenOrder.price != ProductInfo.warehouse.export.price) return false;
            if(whenOrder.upprice != ProductInfo.export.upprice) return false;
            if(whenOrder.amount != ProductInfo.variant.discount.amount) return false;

            
        }; 
    }
    catch (e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Verification Order
export const Verification = (req, res, next) => {
    try {

    }
    catch (e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete Order
export const Delete = (req, res, next) => {
    try {

    }
    catch (e) {
        next(new ErrorHandler(500, e.toString()));
    }
};