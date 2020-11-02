//FOR LAPTOP - ADMIN

import NewsDB from '../../model/news';
import { toConvert } from '../../../../plugins/string';
import { ErrorHandler } from '../../../../plugins/error';

//Get All News
export const Get = async (req, res, next) => {
    let { skip, key } = req.body;
    let Query = {};
    
    if(key){
        let keyCase = toConvert(key, '-');

        Query['$text'] = { 
            $search: `\"${keyCase}\"`
        };
    }

    try {
        let News = await NewsDB
        .find(Query)
        .sort({ 'top': -1, 'create': -1 })
        .skip((skip == 0 || !skip) ? null : Number(skip))
        .limit(10)

        let Count = await NewsDB.countDocuments(Query);

        res.json({
            count: Count,
            news: News
        });
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Get by ID
export const GetByID = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id ) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let News =  await NewsDB.findOne({'_id': _id});

        if(!News) throw 'News Data Not Found';

        res.send(News);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Create
export const Create = async (req, res, next) => {
    let { title, image, content } = req.body;

    if(!title) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    let link = toConvert(title, '-');

    try {
        let Get = await NewsDB
        .findOne({'link': link})
        .select('_id');

        if(Get) return res.json({
            error: true,
            status: 'title',
            message: 'Tên tiêu đề đã tồn tại'
        });

        let NewNews = new NewsDB({
            title: title,
            image: image,
            content: content,
        });

        await NewNews.save();

        res.json(NewNews);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await NewsDB.deleteOne({'_id': _id});

        res.json(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Change Visibility of A News
export const EditVisibility = async (req, res, next) => {
    let { _id, visibility } = req.body;

    if(!_id || visibility == null || typeof(visibility) != 'boolean') return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let News = await NewsDB
        .findOne({'_id': _id})
        .select('_id');

        if(!News) throw 'News Data Not Found';

        News.visibility = visibility;
        await News.save();

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Change Top of A News
export const EditTop = async (req, res, next) => {
    let { _id, top } = req.body;

    if(!_id || top == null || typeof(top) != 'boolean') return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let News = await NewsDB
        .findOne({'_id': _id})
        .select('_id');

        if(!News) throw 'News Data Not Found';

        News.top = top;
        await News.save();

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Information
export const EditInformation = async (req, res, next) => {
    let { _id, title, image } = req.body;

    if(!_id || !title ) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    let link = toConvert(title, '-');

    try {
        let News = await NewsDB
        .findOne({'_id': _id})
        .select('_id link');

        if(!News) throw 'News Data Not Found';

        if(link != News.link){
            let Get = await NewsDB
            .findOne({'link': link})
            .select('_id');

            if(Get) return res.json({
                error: true,
                status: 'title',
                message: 'Tên tiêu đề đã tồn tại'
            });
        }

        News.title = title;
        News.image = image;
        News.link = link;

        await News.save();

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Content
export const EditContent = async (req, res, next) => {
    let { _id, content } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let News = await NewsDB
        .findOne({'_id': _id})
        .select('_id');

        if(!News) throw 'News Data Not Found';

        News.content = content;

        await News.save();

        res.send(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};