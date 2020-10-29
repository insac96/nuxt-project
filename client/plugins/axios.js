export default function ({ $axios, error }) {
    $axios.onError(err => {
        const code = parseInt(err.response && err.response.status);
        const data = err.response.data;

        error({ 
            statusCode: code,
            message: data.message || data.error.message
        });
    });
}