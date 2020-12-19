//FOR LAPTOP - ADMIN

import * as Company from './company';
import * as Trademark from './trademark';
import * as Product from './product';
import * as Configuration from './configuration';
import * as Variant from './variant';
import * as VariantColor from './variantColor';
import * as Warehouse from './warehouse';
import * as Article from './article';
import * as Comment from './comment';
import * as News from './news';
import * as Order from './order';
import * as ProductOrder from './productOrder';

const ContollerAdmin = {
    News,
    Company, 
    Trademark,
    Product, 
    Configuration, 
    Variant, VariantColor, 
    Warehouse,
    Article, 
    Comment,
    Order, ProductOrder
}

export default ContollerAdmin;