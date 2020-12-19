<template>
    <!--a_laptop_order_view_product_edit-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 edit--text">Edit Product Order</v-card-title>
        <v-card-subtitle>Chỉnh sửa thông tin sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-card-text>
            <v-form ref="form" v-model="Validate">
                <v-text-field
                    v-model.number="CloneProduct.whenOrder.amount"
                    :rules="[ $Rules.required, $Rules.number ]"
                    label="Amount"
                    filled rounded
                    placeholder="Số lượng sản phẩm"
                    append-icon="plus_one"
                    color="edit"
                    autocomplete="off"
                    type="number"
                    :disabled="Loading.edit"
                >
                </v-text-field>

                <v-text-field
                    v-model.number="CloneProduct.whenOrder.price"
                    :rules="[ $Rules.required, $Rules.price ]"
                    label="Price"
                    filled rounded
                    placeholder="Giá bán sản phẩm"
                    append-icon="monetization_on"
                    color="edit"
                    autocomplete="off"
                    type="number"
                    :disabled="Loading.edit"
                >
                </v-text-field>

                <v-text-field
                    v-model.number="CloneProduct.whenOrder.upprice"
                    :rules="[ $Rules.price ]"
                    label="Color Uprice"
                    filled rounded
                    placeholder="Tăng giá màu sắc sản phẩm"
                    append-icon="upgrade"
                    color="edit"
                    autocomplete="off"
                    type="number"
                    :disabled="Loading.edit"
                >
                </v-text-field>

                <v-text-field
                    v-model.number="CloneProduct.whenOrder.discountAmount"
                    :rules="[ $Rules.required, $Rules.price ]"
                    label="Discount Amount"
                    filled rounded
                    placeholder="Giảm giá sản phẩm"
                    append-icon="vertical_align_bottom"
                    color="edit"
                    autocomplete="off"
                    type="number"
                    :disabled="Loading.edit"
                >
                </v-text-field>
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-spacer></v-spacer>

            <v-btn 
                rounded elevation="0" large 
                :disabled="Loading.edit"
                @click="Cancel"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="edit" dark
                rounded elevation="0" 
                large class="mx-0" 
                :loading="Loading.edit" 
                @click="EditProductOrder"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props : ['product'],

    data () {
        return {
            CloneProduct: JSON.parse(JSON.stringify(this.product)),
            Validate: true,
            Loading: {
                edit: false
            }
        }
    },

    watch: {
        product (newVal) {
            this.CloneProduct = JSON.parse(JSON.stringify(newVal))
        }
    },

    methods: {
        async EditProductOrder () {
            if(!this.$refs.form.validate()) return false;

            this.Loading.edit = true;
            
            try {
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditProductOrder, {
                    _id: this.CloneProduct._id,
                    whenOrder: this.CloneProduct.whenOrder
                });

                this.Update();
                this.Loading.edit = false;
            }
            catch(e){
                this.Loading.edit = false;
            }   
        },

        Update () {
            Object.assign(this.product.whenOrder, this.CloneProduct.whenOrder);
            
            this.$emit('update');
            this.Cancel();
        },

        Cancel () {
            this.$emit('cancel');
        }
    }
}
</script>