//FOR LAPTOP - ADMIN
//Article

import ProductDB from '../../model/product';
import ArticleDB from '../../model/article';

//Create New Article
export const Create = async (req, res, next) => {
    let { company, trademark, product, content } = req.body;

    if(!company || !trademark || !product || !content) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Product
        let Product = await ProductDB
        .findById(product)
        .select('_id');

        if(!Product) throw 'Sản phẩm gốc không tồn tại';

        //Create New Article
        let NewArticle = new ArticleDB({
            company: company,
            trademark: trademark,
            product: product,
            content: content
        });

        //Save
        await NewArticle.save();
        
        //End
        res.json(NewArticle);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Article
export const Edit = async (req, res, next) => {
    let { _id, content } = req.body;

    if(!_id || !content) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Update
        await ArticleDB.updateOne({'_id': _id}, {
            content: content
        });

        //End
        res.json(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};