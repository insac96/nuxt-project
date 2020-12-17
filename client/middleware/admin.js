export default function ({ store, redirect }) {
    if (store.state.user.authentic && store.state.user.role == 'ADMIN') return false;

    redirect('/')
}