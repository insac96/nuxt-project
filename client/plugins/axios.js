export default function ({ $axios, error, store }) {
    $axios.onError(err => {
        const code = parseInt(err.response && err.response.status);
        const data = err.response.data;
        
        store.commit('dialogStatus/show', {
            icon: 'error',
            code: code,
            text: data.message || data.error.message
        });
        
        //error({ 
        //    statusCode: code,
        //    message: data.message || data.error.message
        //});
    });
}