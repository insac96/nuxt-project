//FOR LAPTOP - GUEST

import CompanyDB from '../../model/company';

//Get Mini Company
export const GetListOnlyInfo = async (req, res, next) => {
    try {
        let Companyes = await CompanyDB
        .find({})
        .select('name logo');

        res.json(Companyes);
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

