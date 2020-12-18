export default function ({ store, redirect }) {
    if (store.state.user.authentic && store.state.user.role != 'GUEST') return false;

    redirect('/')
}