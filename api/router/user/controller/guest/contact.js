//FOR USER - GUEST

import ContactDB from '../../model/contact';
import OrderDB from '../../../laptop/model/order';

//Get List Contact
export const Get = async (req, res, next) => {
    try {
        //Get List Contact
        let Contacts = await ContactDB
        .find({'user': req.authentic.id})
        .select('name phone address');

        //End
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

    if(!name || !phone || !address) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //New Contact
        let NewContact = new ContactDB({
            user: req.authentic.id,
            name: name,
            phone: phone,
            address: address
        });
        
        //Save
        await NewContact.save();

        //End
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

    if(!_id) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Contact
        let Contact = await ContactDB
        .findById(_id)
        .select('user');

        if(!Contact) return next(new ErrorHandler(404, 'Thông tin khách hàng không tồn tại'));
        if(Contact.user != req.authentic.id) return next(new ErrorHandler(403, 'Deny Access'));

        //Get Count Order With Contact
        let CountOrderWithContact = await OrderDB.countDocuments({'vendor': Contact._id});
        if(CountOrderWithContact > 0) throw 'Không thể xóa vì thông tin đã có trong đơn hàng đang thực hiện';

        //Delete
        await ContactDB.deleteOne({'_id': _id});

        //End
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

    if(!_id || !name || !phone || !address) return next(new ErrorHandler(400, 'Dữ Liệu Đầu Vào Không Đúng'));

    try {
        //Get Contact
        let Contact = await ContactDB
        .findById(_id);

        if(!Contact) return next(new ErrorHandler(404, 'Thông tin khách hàng không tồn tại'));

        //Save
        Contact.name = name;
        Contact.phone = phone;
        Contact.address = address;

        await Contact.save();

        //End
        res.json(true);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};