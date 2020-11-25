import Vue from 'vue';

const Rules = {
    required: v => !!v || 'Không được để trống',
    specialCharacters: v => !(/!|@|%|\_|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|`|-|{|}|\||\\/.test(v)) || 'Phát hiện ký tự đặc biệt',
    email: v => /.+@.+\..+/.test(v) || 'Định dạng Email không đúng',
    multiSpace: v => !(/\s\s/.test(v)) || 'Phát hiện khoảng trắng liên tiếp',
    min: v => (v && v.length >= 5 ) || 'Độ dài tối thiểu 5 ký tự',
    max: v => (v && v.length <= 15 ) || 'Độ dài tối đa 15 ký tự',
    number: v => !!(v > 0) || 'Số phải lớn hơn 0',
    phone: v => (!!(v > 0) && v.length >= 10 && v.length <= 10) || 'Số điện thoại không hợp lệ',
    price: v => !!(v >= 0) || 'Số tiền không hợp lệ',
};

Vue.prototype.$Rules = Rules;