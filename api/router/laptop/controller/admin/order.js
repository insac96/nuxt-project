//FOR LAPTOP - ADMIN

import OrderDB from '../../model/order';
import ProductOrderDB from '../../model/productOrder';
import ProductDB from '../../model/product';
import WarehouseColorDB from '../../model/warehouseColor';
import ContactDB from '../../../user/model/contact';

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
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete a Order
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await OrderDB.deleteOne({'_id': _id});
        await ProductOrderDB.deleteMany({'order': _id});

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

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Order = await OrderDB.findById(_id);

        if(!Order) throw 'Order Data Not Found';

        if(Order.verification.type){
            Order.verification.status = status;
        }
        else {
            Order.verification.type = true;
            Order.verification.date = new Date();
            Order.verification.user = req.authentic.id;

            if(status){
                Order.verification.status = status;
            }
        }

        await Order.save();

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

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Order = await OrderDB.findById(_id)
        .select('done pay');

        if(!Order) throw 'Order Data Not Found';
        if(Order.done.type) throw 'Unsuitable Upload Data';

        Order.done.type = true;
        Order.done.date = new Date();
        Order.pay = 2;  //2 = true, 1 = false

        await Order.save();

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

    if(!order || !vendor || !newVendor) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Order = await OrderDB.findById(order)
        .select('note');
        let Contact = await ContactDB.findById(vendor)
        .select('name phone address');

        if(!Order || !Contact) throw 'Order Or Contact Data Not Found';

        Order.note = note;
        Contact.name = newVendor.name;
        Contact.phone = newVendor.phone;
        Contact.address = newVendor.address;

        await Order.save();
        await Contact.save();

        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get List Product Order
export const GetListProductOrder = async (req, res, next) => {
    let { order } = req.body;

    if(!order) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));
    
    try {
        let Products = await ProductOrderDB
        .find({'order': order})
        .populate({ 
            path: 'warehouseColor',
            select: 'product variant warehouse information import export',
            populate: [
                { path: 'product', select: 'name' },
                { path: 'variant' },
                { path: 'warehouse', select: 'import export' },
                { path: 'information', select: 'name code' }
            ]
        });

        res.json(Products);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete a Product in Order
export const DeleteProductOrder = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Get = await ProductOrderDB.findById(_id)
        .select('_id');

        if(!Get) throw 'Product Order Data Not Found';

        await ProductOrderDB.deleteOne({'_id': _id});

        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Add a Product in Order
export const AddProductOrder = async (req, res, next) => {
    let { order, warehouseColor, whenOrder } = req.body;

    if(!order || !whenOrder || !warehouseColor) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let GetOrder = await OrderDB.findById(order)
        .select('_id');
        let GetWarehouseColor = await WarehouseColorDB.findById(warehouseColor)
        .select('_id');

        if(!GetOrder || !GetWarehouseColor) throw 'Order or WarehouseColor Data Not Found';

        let NewProductOrder = new ProductOrderDB({
            warehouseColor: warehouseColor,
            order: order,
            whenOrder: whenOrder
        });

        await NewProductOrder.save();

        res.send(NewProductOrder);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit a Product in Order
export const EditProductOrder = async (req, res, next) => {
    let { _id, whenOrder } = req.body;

    if(!_id || !whenOrder) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let ProductOrder = await ProductOrderDB.findById(_id)
        .select('whenOrder');

        if(!ProductOrder) throw 'Product Order Data Not Found';

        ProductOrder.whenOrder = whenOrder;

        await ProductOrder.save();

        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Search Product For Order
export const SearchProductForOrder = async (req, res, next) => {
    let { key } = req.body;

    if(!key) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let keyCase = StringPlugin.toConvert(key, '-');

        let Product = await ProductDB
        .find({
            '$text': {
                $search: `\"${keyCase}\"`
            }
        })
        .select('name link')
        .populate({
            path: 'variants',
            select: 'code cpu ram gpu screen harddrive discount',
            populate: [
                { 
                    path: 'warehouse',
                    select: 'import export',
                    options: {
                        sort: { 'import.date': 1 }
                    },
                    
                    populate: { 
                        path: 'colors',
                        select: 'import export',

                        populate: { 
                            path: 'information',
                            select: 'name code'
                        }
                    }
                }
            ],
        });
        
        res.json(Product);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};