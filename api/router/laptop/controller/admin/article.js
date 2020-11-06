//FOR LAPTOP - ADMIN

import ArticleDB from '../../model/article';

//Create New Article
export const Create = async (req, res, next) => {
    let { company, trademark, product, content } = req.body;

    if(!company || !trademark || !product || !content) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let NewArticle = new ArticleDB({
            company: company,
            trademark: trademark,
            product: product,
            content: content
        });

        await NewArticle.save();

        res.json(NewArticle);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Article
export const Edit = async (req, res, next) => {
    let { _id, content } = req.body;

    if(!_id || !content) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await ArticleDB.updateOne({'_id': _id}, {
            content: content
        });

        res.json(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};