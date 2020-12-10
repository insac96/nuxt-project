//FOR LAPTOP - GUEST (ORDER)

import OrderDB from '../../model/order';
import ProductOrderDB from '../../model/productOrder';
import WarehouseColorDB from '../../model/warehouseColor';

//Create Order
export const Create = async (req, res, next) => {
    let { vendor, pay, type, listProductOrder } = req.body;
    let NewOrder_ID;

    if(!vendor || !pay || !type || !listProductOrder) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));
    if(listProductOrder.length < 1) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let NewOrder = new OrderDB({
            vendor: vendor,
            type: type,
            pay: pay
        });
        NewOrder_ID = NewOrder._id;

        await NewOrder.save();

        for (let i = 0; i < listProductOrder.length; i++) {
            let item = listProductOrder[i]
            
            let Product = await WarehouseColorDB
            .findOne({'_id': item.warehouseColor})
            .select('_id');

            if(!Product) {
                throw {
                    type: true,
                    productError: item.warehouseColor
                };
            }

            let NewProductOrder = new ProductOrderDB({
                warehouseColor: item.warehouseColor,
                order: NewOrder_ID,
                whenOrder: item.whenOrder
            });

            await NewProductOrder.save();
        };

        res.send(true);
        res.end();
    }
    catch (e) {
        await OrderDB.deleteOne({'_id': NewOrder_ID});
        await ProductOrderDB.deleteMany({'order': NewOrder_ID});

        if(!e.type) return next(new ErrorHandler(500, e.toString()));

        next(new ErrorHandler(500, `${e.productError} - Product Data Empty`));
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