export const state = () => ({
    dialogAuthentic: false,
    authentic: false,
    id: null,
    profile: null,
    role: null,
    verification: null
});
  
export const mutations = {
    login(state, { token, user }) {
        state.authentic = true;
        state.id = user._id;
        state.profile = user.profile;
        state.role = user.role;
        state.verification = user.verification;
    },
    logout(state) {
        state.authentic = false;
        state.id = null;
        state.profile = null;
        state.role = null;
        state.verification = null;
    },
    changeDialogAuthentic(state, type) {
        state.dialogAuthentic = type;
    }
};