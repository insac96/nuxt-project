let Production = {
    database: 'mongodb://admin:cf1996@ds363088.mlab.com:63088/thinkpro',
    baseUrl: 'https://anio.herokuapp.com'
};

let Development = {
    database: 'mongodb://admin:cf1996@ds363088.mlab.com:63088/thinkpro',
    baseUrl: 'http://localhost:3000'
};

export default {
    //MongoDB Link Path
    database: !(process.env.NODE_ENV === 'production') ? Development.database : Production.database,

    //API Base URL
    baseUrl: !(process.env.NODE_ENV === 'production') ? Development.baseUrl : Production.baseUrl,

    //Json Web Token Key
    jwt: '961108',

    //Imgur API ID
    imgur: 'Client-ID 1c3db41bb73b992'
}