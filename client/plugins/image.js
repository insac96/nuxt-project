import Vue from 'vue';

import Config from '../../app.config';

const ImgurID = 'Client-ID 1c3db41bb73b992';

const Upload = (File) => {
    let formData = new FormData();
    formData.append('image', File);

    return new Promise((res, rej) => {
        fetch(Config.imgur, {
            redirect: 'follow',
            method: 'POST',
            headers: new Headers({
                Authorization: ImgurID
            }),
            body: formData
        })
        .then(response => response.text())
        .then(result => {
            let Result = JSON.parse(result);

            if(!Result.success) throw 'Tải hình ảnh thất bại';
            res(Result.data);
        })
        .catch(e => {
            rej(new Error(e.toString()));
        });
    });
};

Vue.prototype.$Image = {
    Upload
};