//FOR LAPTOP - GUEST

import CompanyDB from '../../model/company';

//Get Mini Company
export const GetListOnlyInfo = async (req, res, next) => {
    try {
        //Get Companyes
        let Companyes = await CompanyDB
        .find({})
        .select('name logo');

        //End
        res.json(Companyes);
        res.end();
    }
    catch(e) {
        next(new ErrorHandler(500, e.toString()));
    }
};

