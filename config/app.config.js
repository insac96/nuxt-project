let Production = {
    baseUrl: 'https://anio.herokuapp.com'
};

let Development = {
    baseUrl: 'http://localhost:3000'
};

export default {
    //MongoDB Link Path
    database: 'mongodb://admin:cf1996@ds363088.mlab.com:63088/thinkpro',

    //API Base URL
    baseUrl: !(process.env.NODE_ENV === 'production') ? Development.baseUrl : Production.baseUrl,

    //Json Web Token Key
    jwt: '961108',

    //Imgur API ID
    imgur: 'Client-ID 1c3db41bb73b992'
}