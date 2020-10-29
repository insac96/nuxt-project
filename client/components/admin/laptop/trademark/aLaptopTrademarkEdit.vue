<template>
    <!--a_laptop_company_trademark_edit-->

    <v-card>
        <!--Body-->
        <v-card-title class="font-weight-bold text-h4 info--text">Edit Trademark</v-card-title>
        <v-card-subtitle>Sửa thương hiệu nhánh</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0">
            <v-form ref="form" v-model="Validate.form">
                <v-text-field
                    v-model="CloneTrademark.name"
                    :rules="Validate.name"
                    label="Trademark Name"
                    outlined
                    placeholder="Tên thương hiệu nhánh"
                    append-icon="account_balance_wallet"
                    color="info"
                ></v-text-field>
            </v-form>

            <v-alert outlined tile border="left" type="info" color="error" prominent class="mb-0">
                Nếu xóa thương hiệu <strong>{{CloneTrademark.name}}</strong> sẽ xóa tất cả các sản phẩm liên quan !
            </v-alert>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4">
            <v-btn 
                color="error" 
                tile elevation="0" large 
                class="mx-0"
                :loading="Loading.delete"
                :disabled="Loading.delete || Loading.edit"
                @click="DeleteTrademark
            ">
                Xóa
            </v-btn>

            <v-spacer></v-spacer>
            <v-btn 
                tile elevation="0" large 
                @click="$emit('cancel')"
                :disabled="Loading.delete || Loading.edit"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="info" 
                tile elevation="0" large 
                class="mx-0"
                :loading="Loading.delete || Loading.edit"
                @click="EditTrademark"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';

export default {
    props : ['trademark'],

    data () {
        return {
            CloneTrademark: JSON.parse(JSON.stringify(this.trademark)),
            Validate: {
                form: true,
                name: [
                    v => !!v || 'Tên không được để trống',
                ]
            },
            Loading: {
                delete: false,
                edit: false
            }
        }
    },

    watch: {
        trademark (newVal) {
            this.CloneTrademark = JSON.parse(JSON.stringify(newVal))
        }
    },

    methods : {
        async DeleteTrademark () {
            this.Loading.delete = true;

            try {
                let Delete = await this.$axios.$post(LaptopAPI.admin.DeleteTrademark, this.trademark);

                this.Loading.delete = false;
                this.$emit('cancel');
                this.$emit('delete');
            }
            catch(e){
                return false;
            }      
        },

        async EditTrademark () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.edit = true;

            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditTrademark, this.CloneTrademark);

                this.Update();
                this.Cancel();
            }
            catch(e){
                return false;
            }  
        },

        Update () {
            Object.assign(this.trademark, this.CloneTrademark);
            this.Loading.edit = false;
        },

        Cancel () {
            this.$refs.form.resetValidation();
            this.$emit('cancel');
        },
    },
}
</script>