//FOR LAPTOP - GUEST
import CommentDB from '../../model/comment';

import { ErrorHandler } from '../../../../plugins/error';

//Add Comment
export const Add = async (req, res, next) => {
    let { company, trademark, product, content } = req.body;

    if(!company || !trademark || !product || !content) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let NewComment = new CommentDB({
            company: company,
            trademark: trademark,
            product: product,
            user: req.authentic.id,
            content: content
        });

        await NewComment.save();

        res.json(NewComment);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//More Comment
export const More = async (req, res, next) => {
    let { skip, product } = req.body;

    if(!skip || !product) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let MoreComment = await CommentDB
        .find({ 'product' : product })
        .select('user content reply create')
        .populate({ path: 'user', select: 'profile' })
        .populate({ path: 'reply.user', select: 'profile' })
        .sort({ 'create': -1 })
        .skip(skip)
        .limit(6);
        
        res.json(MoreComment);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Add Reply for Comment
export const AddReply = async (req, res, next) => {
    let { comment, content } = req.body;

    if(!comment || !content) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Comment = await CommentDB
        .findById(comment)
        .select('reply');

        if(!Comment) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

        let NewReply = {
            user: req.authentic.id,
            content: content,
            create: new Date()
        };

        Comment.reply.push(NewReply);
        await Comment.save();

        res.json(NewReply);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};