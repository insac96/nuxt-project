export const state = () => ({
    show: false,
    icon: 'check',
    text: '',
    code: null,
    textCloseButton: 'Đóng',
    actionClose: null
});

export const mutations = {
    //Close Dialog
    close (state) {
        state.show = false;
        state.icon = 'check';
        state.text = '';
        state.code = null;
        state.textCloseButton = 'Đóng'
        state.actionClose = null
    },

    //Show Dialog 
    show (state , {icon , text, code, textCloseButton, actionClose}) {
        state.show = true;
        state.icon = icon ? icon : 'check';
        state.text = text;
        state.code = code ? code : null;
        state.textCloseButton = textCloseButton ? textCloseButton : 'Đóng',
        state.actionClose = actionClose;
    }
}