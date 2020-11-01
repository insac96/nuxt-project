//FOR LAPTOP - ADMIN
import CommentDB from '../../model/comment';
import ReplyDB from '../../model/commentReply';

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
            content: content,
            user: req.authentic.id,
        });

        await NewComment.save();

        res.json(NewComment);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete Comment
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await CommentDB.deleteOne({'_id': _id});
        await ReplyDB.deleteMany({'comment': _id})

        res.json(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Add Reply for Comment
export const AddReply = async (req, res, next) => {
    let { company, trademark, product, comment, content } = req.body;

    if(!company || !trademark || !product || !comment || !content) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
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
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete Reply for Comment
export const DeleteReply = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await ReplyDB.deleteOne({'_id': _id})

        res.json(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};
