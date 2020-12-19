//FOR LAPTOP - ADMIN

import OrderDB from '../../model/order';
import ProductOrderDB from '../../model/productOrder';
import ProductDB from '../../model/product';
import WarehouseDB from '../../model/warehouse';
import WarehouseColorDB from '../../model/warehouseColor';

//Get List Product Order
export const GetListProductOrder = async (req, res, next) => {
    let { order } = req.body;

    if(!order) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));
    
    try {
        //Get Products
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

        //End
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

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Product Order
        let ProductOrder = await ProductOrderDB.findById(_id)
        .select('_id order warehouse warehouseColor whenOrder.amount');

        if(!ProductOrder) throw 'Sản phẩm không tồn tại';
        
        //Get Order
        let Order = await OrderDB.findById(ProductOrder.order)
        .select('verification.type done.type');

        if(!Order) throw 'Đơn hàng không tồn tại';
        if(Order.done.type === true) throw 'Đơn hàng đã hoàn thành, không thể thay đổi nội dung sản phẩm';

        //Update Warehouse When Order Has Verification
        if(Order.verification.type === true){   
            await WarehouseDB.updateOne({ '_id': ProductOrder.warehouse }, {
                $inc: { 'import.amount': ProductOrder.whenOrder.amount }
            });

            await WarehouseColorDB.updateOne({ '_id': ProductOrder.warehouseColor }, {
                $inc: { 
                    'import.amount': ProductOrder.whenOrder.amount,
                    'orderWait.amount': -ProductOrder.whenOrder.amount
                }
            });
        };

        //Delete
        await ProductOrderDB.deleteOne({'_id': _id});

        //End
        res.send(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Add a Product in Order
export const AddProductOrder = async (req, res, next) => {
    let { order, warehouseColor } = req.body;

    if(!order || !warehouseColor) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Order
        let Order = await OrderDB
        .findById(order)
        .select('verification.type done.type');

        if(!Order) throw 'Đơn hàng không tồn tại';
        if(Order.done.type === true) throw 'Đơn hàng đã hoàn thành, không thể thay đổi nội dung sản phẩm';

        //Get Warehouse Color
        let WarehouseColor = await WarehouseColorDB
        .findById(warehouseColor)
        .select('_id import export warehouse variant')
        .populate({path: 'warehouse', select: 'export'})
        .populate({path: 'variant', select: 'discount'});

        if(!WarehouseColor) throw 'Sản phẩm với màu sắc này không tồn tại';
        if(WarehouseColor.import.amount < 1) throw 'Số lượng sản phẩm trong kho không đủ';

        //Get Product Order
        let ProductOrder = await ProductOrderDB
        .findOne({
            'warehouseColor': WarehouseColor._id,
            'order': Order._id
        })
        .select('_id');

        if(ProductOrder) throw 'Sản phẩm với màu sắc này đã tồn tại trong đơn hàng';

        //New ProductOrder
        let NewProductOrder = new ProductOrderDB({
            warehouse: WarehouseColor.warehouse._id,
            warehouseColor: WarehouseColor._id,
            order: Order._id,
            whenOrder: {
                amount: 1,
                price: WarehouseColor.warehouse.export.price,
                upprice: WarehouseColor.export.upprice,
                discountAmount: WarehouseColor.variant.discount.amount
            }
        });
        await NewProductOrder.save();

        //Update Warehouse When Order Has Verification
        if(Order.verification.type === true){
            await WarehouseDB.updateOne({ '_id': NewProductOrder.warehouse }, {
                $inc: { 'import.amount': -NewProductOrder.whenOrder.amount }
            });

            await WarehouseColorDB.updateOne({ '_id': NewProductOrder.warehouseColor }, {
                $inc: { 
                    'import.amount': -NewProductOrder.whenOrder.amount,
                    'orderWait.amount': NewProductOrder.whenOrder.amount
                }
            });
        };

        //End
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

    if(!_id || !whenOrder) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Product Order
        let ProductOrder = await ProductOrderDB.findById(_id)
        .select('whenOrder warehouse warehouseColor order')
        .populate({path: 'warehouseColor', select: 'import'});

        if(!ProductOrder) throw 'Sản phẩm trong đơn hàng không tồn tại';
        
        //Get Order
        let Order = await OrderDB
        .findById(ProductOrder.order)
        .select('verification.type done.type');

        if(!Order) throw 'Đơn hàng không tồn tại';
        if(Order.done.type === true) throw 'Đơn hàng đã hoàn thành, không thể thay đổi nội dung sản phẩm';

        //When Order has not Verification
        if(Order.verification.type === false){
            if(ProductOrder.warehouseColor.import.amount < whenOrder.amount) throw 'Số lượng sản phẩm trong kho không đủ';

            //Save
            ProductOrder.whenOrder = whenOrder;
            await ProductOrder.save();
        };

        //Update Warehouse When Order Has Verification
        if(Order.verification.type === true){
            let oldAmountWhenOrder = ProductOrder.whenOrder.amount;
            let newAmountWhenOrder = whenOrder.amount;
            let changeAmountWhenOrder = newAmountWhenOrder - oldAmountWhenOrder;
            let realAmountProduct = oldAmountWhenOrder + ProductOrder.warehouseColor.import.amount;

            if(realAmountProduct < newAmountWhenOrder) throw 'Số lượng sản phẩm trong kho không đủ';

            //Update
            await WarehouseDB.updateOne({ '_id': ProductOrder.warehouse }, {
                $inc: { 'import.amount': -changeAmountWhenOrder }
            });

            await WarehouseColorDB.updateOne({ '_id': ProductOrder.warehouseColor._id }, {
                $inc: { 
                    'import.amount': -changeAmountWhenOrder,
                    'orderWait.amount': changeAmountWhenOrder
                }
            });

            //Save
            ProductOrder.whenOrder = whenOrder;
            await ProductOrder.save();
        };

        //End
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

    if(!key) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Convert Key
        let keyCase = StringPlugin.toConvert(key, '-');

        //Get Products
        let Products = await ProductDB
        .find({
            '$text': {
                $search: `\"${keyCase}\"`
            }
        })
        .select('name link')
        .populate({
            path: 'variants',
            populate: [
                { 
                    path: 'warehouses',
                    select: 'import export',
                    match: { 
                        'visibility': true,
                        'import.amount': { $gte: 1 } 
                    },

                    populate: { 
                        path: 'colors',
                        select: 'import export',
                        match: { 'import.amount': { $gte: 1 } },

                        populate: { 
                            path: 'information',
                            select: 'name code image'
                        }
                    }
                }
            ],
        });
        
        //End
        res.json(Products);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};