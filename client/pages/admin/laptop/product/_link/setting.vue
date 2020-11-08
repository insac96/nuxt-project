<template>
    <v-card tile flat>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary--text">Setting</v-card-title>
        <v-card-subtitle>Cài đặt sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-card-text>
            <!--Visibility-->
            <v-sheet class="d-flex justify-space-between mb-4">
                <span class="text-subtitle-1 font-weight-bold">Ẩn/Hiện sản phẩm</span>
                <v-switch 
                    v-model="product.visibility" 
                    hide-details color="primary" 
                    class="ma-0 pa-0" 
                    @change="EditVisibilityProduct"
                    :disabled="Loading.editVisibility"
                ></v-switch>
            </v-sheet>

            <!--Delete-->
            <v-sheet class="d-flex justify-center">
                <v-btn
                    rounded color="delete"
                    dark elevation="0"
                    @click="Dialog.delete = true"
                >
                    Xóa Sản Phẩm
                </v-btn>
            </v-sheet>
        </v-card-text>


        <!--Dialog Delete-->
        <v-dialog v-model="Dialog.delete" persistent max-width="450">
            <ALaptopProductDelete 
                @delete="$route.push('/admin/laptop/product')"
                @cancel="Dialog.delete = false" 
                :product="product"
            ></ALaptopProductDelete>
        </v-dialog>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    props: ['product'],

    data () {
        return {
            Dialog: {
                delete: false
            },
            Loading: {
                editVisibility: false
            }
        }
    },

    methods: {
        async EditVisibilityProduct () {
            this.Loading.editVisibility = true;

            try {
                let Change = await this.$axios.$post(LaptopAPI.admin.EditVisibilityProduct, {
                    _id: this.product._id,
                    visibility: this.product.visibility
                });

                this.Loading.editVisibility = false;
            }
            catch(e){
                this.product.visibility = !this.product.visibility;
                this.Loading.editVisibility = false;
            }
        }
    }
}
</script>