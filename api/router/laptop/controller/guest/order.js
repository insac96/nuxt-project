//FOR LAPTOP - GUEST
//Order

import OrderDB from '../../model/order';
import ProductOrderDB from '../../model/productOrder';
import WarehouseColorDB from '../../model/warehouseColor';

//Create Order
export const Create = async (req, res, next) => {
    let { vendor, pay, type, note, listProductOrder } = req.body;
    let NewOrder_ID;

    if(!vendor || !pay || !type || !listProductOrder) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));
    if(listProductOrder.length < 1) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Create New Order
        let NewOrder = new OrderDB({
            user: req.authentic.id,
            vendor: vendor,
            type: type,
            pay: pay,
            note: note
        });
        NewOrder_ID = NewOrder._id;

        //Save
        await NewOrder.save();

        //Create New Product Order
        let newDate = new Date();
        let dateOrder = {
            full: newDate,
            yy: newDate.getFullYear(),
            mm: newDate.getMonth() + 1,
            dd: newDate.getDate()
        };

        for (let i = 0; i < listProductOrder.length; i++) {
            let item = listProductOrder[i]
            
            //Get Product (WarehouseColor)
            let Product = await WarehouseColorDB
            .findOne({'_id': item.warehouseColor})
            .select('_id product import')
            .populate({path: 'product', select: 'name'});

            if(!Product) throw {
                type: true,
                status: `Có 1 sản phẩm không tồn tại`
            };

            if(item.whenOrder.amount > Product.import.amount) throw {
                type: true,
                status: `Sản phẩm ${Product.product.name} không đủ số lượng trong kho`
            };

            //Save Product Order
            let NewProductOrder = new ProductOrderDB({
                warehouse: item.warehouse,
                warehouseColor: item.warehouseColor,
                order: NewOrder_ID,
                whenOrder: item.whenOrder,
                dateOrder: dateOrder
            });

            await NewProductOrder.save();
        };

        //End
        res.send(true);
        res.end();
    }
    catch (e) {
        //Delete All
        await OrderDB.deleteOne({'_id': NewOrder_ID});
        await ProductOrderDB.deleteMany({'order': NewOrder_ID});

        //Send Error
        if(!e.type) return next(new ErrorHandler(500, e.toString()));
        next(new ErrorHandler(500, e.status));
    }
};