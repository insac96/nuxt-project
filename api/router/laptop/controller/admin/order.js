//FOR LAPTOP - ADMIN

import OrderDB from '../../model/order';
import ProductOrderDB from '../../model/productOrder';
import ContactDB from '../../../user/model/contact';
import WarehouseDB from '../../model/warehouse';
import WarehouseColorDB from '../../model/warehouseColor';

//Get All News
export const GetListByType = async (req, res, next) => {
    let { skip, type } = req.body;
    
    try {
        //Get Orders
        let Orders = await OrderDB
        .find({'type': type})
        .populate({ path: 'vendor' })
        .populate({ path: 'products' })
        .sort({ 'verification.type': -1, 'create': -1 })
        .skip((skip == 0 || !skip) ? null : Number(skip))
        .limit(10);

        //End
        res.json(Orders);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete a Order
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Order
        let Order = await OrderDB
        .findById(_id)
        .select('verification.type done.type');

        if(!Order) throw 'Đơn hàng không tồn tại';
        if(Order.done.type) throw 'Đơn hàng đã hoàn thành, không thể xóa dữ liệu';

        //Update Warehouse When Order Has Verification
        if(Order.verification.type === true){
            let ListProductOrder = await ProductOrderDB
            .find({order: Order._id})
            .select('warehouse warehouseColor whenOrder')

            for (let i = 0; i < ListProductOrder.length; i++) {
                let warehouse = ListProductOrder[i].warehouse;
                let warehouseColor = ListProductOrder[i].warehouseColor;
                let whenOrder = ListProductOrder[i].whenOrder;

                await WarehouseDB.updateOne({ '_id': warehouse }, {
                    $inc: { 'import.amount': whenOrder.amount }
                });

                await WarehouseColorDB.updateOne({ '_id': warehouseColor }, {
                    $inc: { 
                        'import.amount': whenOrder.amount,
                        'orderWait.amount': -whenOrder.amount
                    }
                });
            };
        };

        //Delete
        await OrderDB.deleteOne({'_id': Order._id});
        await ProductOrderDB.deleteMany({'order': Order._id});

        //End
        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Status a Order
export const EditStatus = async (req, res, next) => {
    let { _id , status } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Order
        let Order = await OrderDB
        .findById(_id)
        .select('done verification');

        if(!Order) throw 'Đơn hàng không tồn tại';
        if(Order.done.type === true) throw 'Đơn hàng đã hoàn thành, không thể thay đổi dữ liệu';

        //When Order Has Verification
        if(Order.verification.type === true){
            Order.verification.status = status;
        };

        //When Order Has Not Verification
        if(Order.verification.type === false){
            Order.verification.type = true;
            Order.verification.date = new Date();
            Order.verification.user = req.authentic.id;

            if(status){
                Order.verification.status = status;
            }

            //Update Warehouse
            let ListProductOrder = await ProductOrderDB
            .find({order: Order._id})
            .select('warehouse warehouseColor whenOrder')

            for (let i = 0; i < ListProductOrder.length; i++) {
                let warehouse = ListProductOrder[i].warehouse;
                let warehouseColor = ListProductOrder[i].warehouseColor;
                let whenOrder = ListProductOrder[i].whenOrder;

                await WarehouseDB.updateOne({ '_id': warehouse }, {
                    $inc: { 
                        'import.amount': -whenOrder.amount,
                    },
                });

                await WarehouseColorDB.updateOne({ '_id': warehouseColor }, {
                    $inc: { 
                        'import.amount': -whenOrder.amount,
                        'orderWait.amount': whenOrder.amount
                    }
                });
            };
        };

        //Save
        await Order.save();

        //End
        res.send(Order);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Done a Order
export const EditDone = async (req, res, next) => {
    let { _id  } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Order
        let Order = await OrderDB.findById(_id)
        .select('done verification pay');

        if(!Order) throw 'Đơn hàng không tồn tại';
        if(Order.done.type === true) throw 'Đơn hàng đã hoàn thành, không thể thay đổi dữ liệu';
        if(Order.verification.type === false) throw 'Đơn hàng chưa xác minh, không thể hoàn thành';

        //Save
        Order.done.type = true;
        Order.done.date = new Date();
        Order.pay = 2;
        await Order.save();

        //End
        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Vendor a Order
export const EditInformation = async (req, res, next) => {
    let { order, vendor, newVendor, note} = req.body;

    if(!order || !vendor || !newVendor) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Order
        let Order = await OrderDB.findById(order)
        .select('note done');

        if(!Order) throw 'Đơn hàng không tồn tại';
        if(Order.done.type === true) throw 'Đơn hàng đã hoàn thành, không thể thay đổi dữ liệu';

        //Get Contact
        let Contact = await ContactDB.findById(vendor)
        .select('name phone address');

        if(!Contact) throw 'Dữ liệu thông tin không tồn tại';

        //Save
        Order.note = note;
        Contact.name = newVendor.name;
        Contact.phone = newVendor.phone;
        Contact.address = newVendor.address;

        await Order.save();
        await Contact.save();

        //End
        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};