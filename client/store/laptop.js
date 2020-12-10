const SaveCartToLocalStorage = (state) => {
    localStorage.setItem('CART', JSON.stringify(state.cart));
};

export const state = () => ({
    cart: [],
    cartUpdate: true
});
  
export const mutations = {
    //Cart
    synsCart (state, cart) {
        if(!cart) return false;

        state.cart = cart;
    },
    changeUpdateCart (state, type) {
        state.cartUpdate = type;
    },
    addToCart (state, item) {
        let indexItem = state.cart.findIndex(e => e.color == item.color);

        if(indexItem < 0) {
            item.amount = 1;
            state.cart.push(item);
        }
        else {
            state.cart[indexItem].amount ++;
        }
        
        state.cartUpdate = true;
        SaveCartToLocalStorage(state);
    },
    removeInCart (state, item) {
        let indexItem = state.cart.findIndex(e => e.color == item.color);
        if(indexItem < 0) return false;

        state.cart.splice(indexItem, 1);

        SaveCartToLocalStorage(state);
    },
    resetCart (state) {
        state.cart = [];
        state.cartUpdate = true;

        SaveCartToLocalStorage(state);
    },
    updateAmountInCart (state, item) {
        let indexItem = state.cart.findIndex(e => e.color == item.color);
        if(indexItem < 0) return false;

        state.cart[indexItem].amount = item.amount;

        SaveCartToLocalStorage(state);
    }
};