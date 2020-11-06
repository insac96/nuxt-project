//FOR LAPTOP - ADMIN

import * as Company from './company';
import * as Trademark from './trademark';
import * as Product from './product';
import * as Configuration from './configuration';
import * as Variant from './variant';
import * as VariantColor from './variantColor';
import * as Warehouse from './warehouse';
import * as WarehouseColor from './warehouseColor';
import * as Article from './article';
import * as Comment from './comment';
import * as News from './news';

const ContollerAdmin = {
    News,
    Company, 
    Trademark,
    Product, 
    Configuration, 
    Variant, VariantColor, 
    Warehouse, WarehouseColor,
    Article, 
    Comment
}

export default ContollerAdmin;