//FOR USER - GUEST

import ContactDB from '../../model/contact';

//Get List Contact
export const Get = async (req, res, next) => {
    try {
        let Contacts = await ContactDB
        .find({'user': req.authentic.id})
        .select('name phone address');

        res.json(Contacts);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

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
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Delete Contact
export const Delete = async (req, res, next) => {
    let { _id } = req.body;

    if(!_id) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Contact = await ContactDB
        .findById(_id)
        .select('user');

        if(!Contact) return next(new ErrorHandler(404, 'Contact Data Not Found'));
        if(Contact.user != req.authentic.id) return next(new ErrorHandler(403, 'Deny Access'));

        await ContactDB.deleteOne({'_id': _id});

        res.json(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

//Edit Contact
export const Edit = async (req, res, next) => {
    let { _id, name, phone, address } = req.body;

    if(!_id || !name || !phone || !address) return next(new ErrorHandler(400, 'Unsuitable Upload Data'));

    try {
        let Contact = await ContactDB
        .findById(_id);

        if(!Contact) return next(new ErrorHandler(404, 'Contact Data Not Found'));

        Contact.name = name;
        Contact.phone = phone;
        Contact.address = address;

        await Contact.save();

        res.json(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};