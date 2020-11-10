import UserAPI from '@/setting/user/api';

export default async ({ app, $axios, store }) => {
    if(!app.$cookies.get('token')) return false;

    try {
        let GetAuthentic = await $axios.$get(UserAPI.guest.GetAuthentic);
        
        if(GetAuthentic.user) return store.commit('user/login', GetAuthentic);
    }
    catch(e){
        return false; 
    }
}