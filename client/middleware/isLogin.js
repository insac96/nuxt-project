export default function ({ store, redirect }) {
    if (store.state.user.authentic) return false;

    redirect('/')
}