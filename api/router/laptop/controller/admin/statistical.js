//FOR LAPTOP - ADMIN
//Statistical

import WarehouseDB from '../../model/warehouse';
import WarehouseColorDB from '../../model/warehouseColor';
import ProductOrderDB from '../../model/productOrder';

export const GetGeneral = async (req, res, next) => {
    try {
        //Get WareHouse
        let Warehouses = await WarehouseDB
        .find({})
        .select('import export');

        //Get WareHouse Color
        let WarehouseColors = await WarehouseColorDB
        .find({})
        .select('orderWait');

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
            warehouseColors: WarehouseColors,
            productsOrder: ProductsOrder
        });
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};