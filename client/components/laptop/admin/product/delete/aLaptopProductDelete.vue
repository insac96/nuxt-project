<template>
    <!--a_laptop_product_delete-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 delete--text">Delete</v-card-title>
        <v-card-subtitle>Xóa Dữ Liệu Sản Phẩm</v-card-subtitle>

        <!--Body-->
        <v-card-text>
            <v-alert outlined tile border="right" type="info" color="delete" prominent class="ma-0 text-subtitle-1">
                Chức năng này sẽ xóa sản phẩm <strong>{{product.name}}</strong> và tất cả các cấu hình liên quan. Bạn có chắc chắn muốn xóa.
            </v-alert>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4">
            <v-spacer></v-spacer>
            
            <v-btn 
                large rounded 
                elevation="0" 
                :disabled="Loading.delete"
                @click="$emit('cancel')"
            >
                Hủy
            </v-btn>
            
            <v-btn
                color="delete" rounded 
                elevation="0" class="mx-0" 
                dark large 
                :loading="Loading.delete"
                @click="DeleteProduct"
            >
                Xóa
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';

export default {
    props : ['product'],

    data () {
        return {
            CloneVariant: JSON.parse(JSON.stringify(this.variant)),
            Loading: {
                delete: false
            }
        }
    },

    watch: {
        variant (newVal) {
            this.CloneVariant = JSON.parse(JSON.stringify(newVal))
        }
    },

    methods : {
        async DeleteProduct () {
            this.Loading.delete = true;

            try {
                let Delete = await this.$axios.$post(LaptopAPI.admin.DeleteProduct, {
                    _id: this.product._id
                });

                this.Loading.delete = false;
                
                this.$emit('delete');
                this.$emit('cancel');
            }
            catch(e){
                this.Loading.delete = false;
            }
        }
    },
}
</script>