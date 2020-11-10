export class CART {
    constructor(){
        this.Content = [];

        this.init();
    }

    init () {
        let _content = localStorage.getItem('CART');

        if(_content) return this.Content = JSON.parse(_content);

        this.sync();
    }

    sync () {
        localStorage.setItem('CART', JSON.stringify(this.Content));
    }

    add (item) {
        let indexItem = this.Content.findIndex(e => e.variant == item.variant);

        if(indexItem < 0) {
            item.amount = 1;

            this.Content.push(item);
        }
        else {
            this.Content[indexItem].amount ++;
        }

        this.sync();
    }

    remove (item) {
        let indexItem = this.Content.findIndex(e => e.variant == item.variant);

        if(indexItem < 0) return false;

        this.Content.splice(indexItem, 1);
        this.sync();
    }
}