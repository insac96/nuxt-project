export default {
    admin: {
        'GetUsers': '/user/admin/member/get',
        'BanUser': '/user/admin/member/ban',
        'UnbanUser': '/user/admin/member/unban',
    },

    guest: {
        //Authentic
        'GetAuthentic': '/user/authentic/get',
        'SignIn': '/user/authentic/signin',
        'SignUp': '/user/authentic/signup',
        
        //User
        'GetListContact': '/user/contact/list/get',
        'CreateNewContact': '/user/contact/create',
        'EditContact': '/user/contact/edit',
        'DeleteContact': '/user/contact/delete',
    }
}