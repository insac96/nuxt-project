//FOR LAPTOP - ADMIN

import VariantColorDB from '../../model/variantColor';

//Create Color
export const Create = async (req, res, next) => {
    let { company, trademark, product, variant, name, code, image } = req.body;

    if(!company || !trademark || !product || !variant || !name || !code) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let NewVariantColor = new VariantColorDB({
            company: company,
            trademark: trademark,
            product: product,
            variant: variant,
            name: name,
            code: code,
            image: image
        });

        await NewVariantColor.save();

        res.send(NewVariantColor);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Color
export const Edit = async (req, res, next) => {
    let { _id, name, code, image, upprice } = req.body;

    if(!_id || !name || !code) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await VariantColorDB.updateOne({'_id': _id}, {
            name: name,
            code: code,
            image: image,
            upprice: upprice ? upprice : 0
        });

        res.json(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete Color
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        await VariantColorDB.deleteOne({'_id': _id});

        res.json(true);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};