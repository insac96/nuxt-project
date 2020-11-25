let Production = {
    baseUrl: 'https://titalap.herokuapp.com'
};

let Development = {
    baseUrl: 'http://localhost:3000'
};

export default {
    //App Name
    appName: 'TitaLap',

    //API Base URL
    baseUrl: !(process.env.NODE_ENV === 'production') ? Development.baseUrl : Production.baseUrl,

    //Imgur API ID
    imgur: 'Client-ID 1c3db41bb73b992'
}