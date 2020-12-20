//FOR LAPTOP - ADMIN
//Statistical

import WarehouseDB from '../../model/warehouse';
import ProductOrderDB from '../../model/productOrder';

export const GetGeneral = async (req, res, next) => {
    try {
        //Get WareHouse
        let Warehouses = await WarehouseDB
        .find({})
        .select('import export orderWait');

        //Get Product Order
        let ProductsOrder = await ProductOrderDB
        .find({ 'sold.type': true })
        .populate({ 
            path: 'warehouse', 
            select: 'import.price'
        })
        .populate({ path: 'warehouseColor', select: 'export.upprice'})
        .select('whenOrder');

        //End
        res.json({
            warehouses: Warehouses,
            productsOrder: ProductsOrder
        });
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

export const GetRevenueAnalysis = async (req, res, next) => {
    let { date } = req.body;

    if(!date.yy && !date.mm) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Product Order
        let ProductsOrder = await ProductOrderDB
        .find({ 
            'sold.type': true,
            'sold.date.yy': date.yy,
            'sold.date.mm': date.mm,
        })
        .populate({ 
            path: 'warehouse', 
            select: 'import.price'
        })
        .populate({ path: 'warehouseColor', select: 'export.upprice'})
        .select('whenOrder sold.date');

        //End
        res.json(ProductsOrder);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};