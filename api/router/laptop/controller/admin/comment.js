//FOR LAPTOP - ADMIN
//Comment

import ProductDB from '../../model/product';
import CommentDB from '../../model/comment';
import ReplyDB from '../../model/commentReply';

//Add Comment
export const Add = async (req, res, next) => {
    let { company, trademark, product, content } = req.body;

    if(!company || !trademark || !product || !content) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Product
        let Product = await ProductDB
        .findById(product)
        .select('_id');

        if(!Product) throw 'Sản phẩm gốc không tồn tại';

        //Create New Comment
        let NewComment = new CommentDB({
            company: company,
            trademark: trademark,
            product: product,
            content: content,
            user: req.authentic.id,
        });

        //Save
        await NewComment.save();

        //End
        res.json(NewComment);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete Comment
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Delete
        await CommentDB.deleteOne({'_id': _id});
        await ReplyDB.deleteMany({'comment': _id})

        //End
        res.json(true);
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
        //Get Comment
        let Comment = await CommentDB
        .findById(comment)
        .select('_id');

        if(!Comment) throw 'Bình luận không tồn tại';

        //Create New Reply
        let NewReply = new ReplyDB({
            company: company,
            trademark: trademark,
            product: product,
            comment: comment,
            content: content,
            user: req.authentic.id,
        })
        
        //Save
        await NewReply.save();

        //End
        res.json(NewReply);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete Reply for Comment
export const DeleteReply = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Delete
        await ReplyDB.deleteOne({'_id': _id})

        //End
        res.json(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};
