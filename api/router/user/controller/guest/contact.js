//FOR USER - GUEST

import ContactDB from '../../model/contact';

//Add a New Laptop
export const Create = async (req, res, next) => {
    let { name, phone, address } = req.body;

    if(!name || !phone || !address) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        //New Contact
        let NewContact = new ContactDB({
            user: req.authentic.id,
            name: name,
            phone: phone,
            address: address
        });

        await NewContact.save();

        res.json(NewContact);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};