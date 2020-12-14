import Vue from 'vue';
import LaptopAPI from '../setting/laptop/api';
import UserAPI from '../setting/user/api';

const API = {
    laptop: LaptopAPI,
    user: UserAPI
};

Vue.prototype.$api = API;

export default ({ app }, inject) => {
    inject('api', API);
};
