import UserAPI from '@/setting/user/api';

export default async ({ app, $axios, store, error }) => {
    if(!app.$cookies.get('token')) return false;

    try {
        let GetAuthentic = await $axios.$get(UserAPI.guest.GetAuthentic);
        store.commit('user/login', GetAuthentic);
    }
    catch(e){
        return false; 
    }
}