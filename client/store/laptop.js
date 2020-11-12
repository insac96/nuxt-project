export const state = () => ({
    cart: []
});
  
export const mutations = {
    addToCart (state, item) {
        let indexItem = state.cart.findIndex(e => e.color == item.color);

        if(indexItem < 0) {
            item.amount = 1;
            state.cart.push(item);

            return
        }
        
        state.cart[indexItem].amount ++;
    },
    removeInCart (state, item) {
        let indexItem = state.cart.findIndex(e => e.color == item.color);

        if(indexItem < 0) return false;
        state.cart.splice(indexItem, 1);
    }
};