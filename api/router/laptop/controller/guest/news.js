//FOR LAPTOP - GUEST

import NewsDB from '../../model/news';

export const GetListByTop = async (req, res, next) => {
    try {
        //Get List News
        let ListNews = await NewsDB
        .find({
            'top': true,
            'visibility': true
        });

        //End
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
        //Get News
        let News = await NewsDB
        .findOne({'link': link});

        if(!News) return next(new ErrorHandler(404, 'News Data Not Found'));
        
        //End
        res.json(News);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

