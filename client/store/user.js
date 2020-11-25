export const state = () => ({
    dialogAuthentic: false,
    authentic: false,
    id: null,
    profile: null,
    role: null,
    verification: null,
    contacts: null
});
  
export const mutations = {
    login(state, { token, user }) {
        state.authentic = true;
        state.id = user._id;
        state.profile = user.profile;
        state.role = user.role;
        state.verification = user.verification;
        state.contacts = user.contacts;
    },
    logout(state) {
        state.authentic = false;
        state.id = null;
        state.profile = null;
        state.role = null;
        state.verification = null;
        state.contacts = null;
    },
    changeDialogAuthentic(state, type) {
        state.dialogAuthentic = type;
    },
    addNewContact(state, newContact) {
        state.contacts.push(newContact);
    }
};