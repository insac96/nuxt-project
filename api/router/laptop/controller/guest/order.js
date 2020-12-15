//FOR LAPTOP - GUEST (ORDER)

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
        let NewOrder = new OrderDB({
            user: req.authentic.id,
            vendor: vendor,
            type: type,
            pay: pay,
            note: note
        });
        NewOrder_ID = NewOrder._id;

        await NewOrder.save();

        for (let i = 0; i < listProductOrder.length; i++) {
            let item = listProductOrder[i]
            
            let Product = await WarehouseColorDB
            .findOne({'_id': item.warehouseColor})
            .select('_id product import')
            .populate({path: 'product', select: 'name'});

            if(!Product) throw {
                type: true,
                status: `Sản phẩm ${Product.product.name} không tồn tại`
            };

            if(item.whenOrder.amount > Product.import.amount) throw {
                type: true,
                status: `Sản phẩm ${Product.product.name} không đủ số lượng trong kho`
            };

            let NewProductOrder = new ProductOrderDB({
                warehouse: item.warehouse,
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
        next(new ErrorHandler(500, e.status));
    }
};