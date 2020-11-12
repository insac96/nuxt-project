<template>
    <!--a_laptop_company_delete-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 delete--text">Delete Company</v-card-title>
        <v-card-subtitle>Xóa dữ liệu hãng sản xuất</v-card-subtitle>

        <!--Body-->
        <v-card-text>
            <v-alert outlined tile border="right" type="info" color="delete" prominent class="ma-0 text-subtitle-1">
                Chức năng này sẽ xóa hãng sản xuất <strong>{{company.name}}</strong> và tất cả thương hiệu nhánh, sản phẩm liên quan. Bạn có chắc chắn muốn xóa.
            </v-alert>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-spacer></v-spacer>
            <v-btn 
                rounded elevation="0" large 
                :disabled="Loading.delete"
                @click="$emit('cancel')"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="delete" dark
                rounded elevation="0" 
                large class="mx-0" 
                :loading="Loading.delete" 
                @click="DeleteCompany"
            >
                Xóa
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';

export default {
    props : ['company'],

    data () {
        return {
            Loading: {
                delete: false
            }
        }
    },

    methods : {
        async DeleteCompany () {
            this.Loading.delete = true;
            
            try {
                let Delete = await this.$axios.$post(LaptopAPI.admin.DeleteCompany, {
                    _id: this.company._id
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