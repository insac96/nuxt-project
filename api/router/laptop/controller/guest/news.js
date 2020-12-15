//FOR LAPTOP - GUEST

import NewsDB from '../../model/news';

export const GetListByTop = async (req, res, next) => {
    try {
        let ListNews = await NewsDB
        .find({
            'top': true,
            'visibility': true
        });

        res.json(ListNews);
        res.end();
    }
    catch (e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

export const GetByLink = async (req, res, next) => {
    let { link } = req.body;

    if(!link) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let News = await NewsDB
        .findOne({'link': link});

        if(!News) return next(new ErrorHandler(404, 'News Data Not Found'));
        
        res.json(News);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

