//FOR LAPTOP - GUEST

import ProductDB from '../../model/product';
import CommentDB from '../../model/comment';
import ReplyDB from '../../model/commentReply';

//Get Comment and Reply by ProductID
export const GetListByProductID = async (req, res, next) => {
    let { product } = req.body;

    if(!product) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Comments = await CommentDB
        .find({'product': product})
        .select('user content create showInputReply')
        .populate({ path: 'user', select: 'profile.name profile.avatar role' })
        .populate({ 
            path: 'reply', 
            select: 'user content create', 
            populate: [ 
                { path: 'user', select: 'profile.name profile.avatar role' }
            ]
        })
        .sort({ 'create': -1 })
        .skip(0)
        .limit(5);

        let countComment = await CommentDB
        .countDocuments({'product': product});

        res.json({
            comments: Comments,
            countComment: countComment
        });
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Add Comment
export const Add = async (req, res, next) => {
    let { company, trademark, product, content } = req.body;

    if(!company || !trademark || !product || !content) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Product = await ProductDB
        .findById(product)
        .select('_id');

        if(!Product) throw 'Sản phẩm gốc không tồn tại';

        let NewComment = new CommentDB({
            company: company,
            trademark: trademark,
            product: product,
            content: content,
            user: req.authentic.id,
        });

        await NewComment.save();

        res.json(NewComment);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//More Comment
export const More = async (req, res, next) => {
    let { skip, product } = req.body;

    if(!skip || !product) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let MoreComment = await CommentDB
        .find({ 'product' : product })
        .select('user content create showInputReply')
        .populate({ path: 'user', select: 'profile role' })
        .populate({ 
            path: 'reply',
            select: 'user content create',
            populate: [ 
                { path: 'user', select: 'profile role' } 
            ]
        })
        .sort({ 'create': -1 })
        .skip(skip)
        .limit(5);
        
        res.json(MoreComment);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Add Reply for Comment
export const AddReply = async (req, res, next) => {
    let { company, trademark, product, comment, content } = req.body;

    if(!company || !trademark || !product || !comment || !content) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        let Comment = await CommentDB
        .findById(comment)
        .select('_id');

        if(!Comment) throw 'Bình luận không tồn tại';

        let NewReply = new ReplyDB({
            company: company,
            trademark: trademark,
            product: product,
            comment: comment,
            content: content,
            user: req.authentic.id,
        })
        
        await NewReply.save();

        res.json(NewReply);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};