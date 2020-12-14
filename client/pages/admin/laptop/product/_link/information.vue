<template>
    <!--Laptop Product Link Information-->

    <v-card tile flat>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary--text">Information</v-card-title>
        <v-card-subtitle>Thông tin cơ bản của sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-form ref="form" v-model="Validate" class="pa-4">
            <!--Name-->
            <v-text-field
                v-model="product.name"
                :rules="[ $Rules.required, $Rules.multiSpace ]"
                label="Laptop Name"
                filled rounded
                placeholder="Tên sản phẩm"
                append-icon="laptop"
                color="primary"
                autocomplete="off"
                :error-messages="ErrorHint.name"
                @click="ErrorHint.name = null"
            >
                <template v-slot:message="{ message }">
                    {{ ErrorHint.name ? ErrorHint.name : message }}
                </template>
            </v-text-field>

            <!--Company-->
            <v-select
                v-model="product.company._id"
                :rules="[ $Rules.required ]"
                :items="Companyes"
                item-text="name"
                item-value="_id"
                label="Laptop Company"
                filled rounded
                placeholder="Chọn hãng sản xuất"
                append-icon="apartment"
                color="primary"
                item-color="primary"
                @change="SetCompanySelect"
            ></v-select>

            <!--Trademark-->
            <v-select
                v-if="CompanySelect"
                v-model="product.trademark._id"
                :rules="[ $Rules.required ]"
                :items="CompanySelect.trademarks"
                item-text="name"
                item-value="_id"
                label="Laptop Trademark"
                filled rounded
                placeholder="Chọn thương hiệu nhánh"
                append-icon="account_balance_wallet"
                color="primary"
                item-color="primary"
            ></v-select>
        </v-form>

        <!--Footer-->
        <v-card-actions class="pa-4 pt-0">
            <v-spacer></v-spacer>

            <v-btn 
                color="primary" dark 
                elevation="0" rounded large 
                :loading="Loading.edit"
                @click="EditInformation"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: ['product'],

    data () {
        return {
            Companyes: [],
            CompanySelect: null,
            Validate: true,
            Loading: {
                edit: false
            },
            ErrorHint: {
                name: null
            }
        }
    },

    created (){
        this.GetCompanyes();
    },

    methods: {
        async GetCompanyes () {
            if(this.Companyes.length > 0) return false;

            try {
                let Companyes = await this.$axios.$get(this.$api.laptop.admin.GetListCompanyInfo);

                this.Companyes = Companyes;
                this.CompanySelect = this.Companyes.find(i => i.id == this.product.company._id);
            }
            catch(e){
                return false;
            }
        },

        SetCompanySelect (id) {
            let CompanySelect = this.Companyes.find(i => i.id == id);
            this.CompanySelect = CompanySelect;
        },

        async EditInformation () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.edit = true;

            try {
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditInformationProduct, {
                    _id: this.product._id,
                    company: this.product.company._id,
                    trademark: this.product.trademark._id,
                    name: this.product.name
                });

                if(Edit.error) throw Edit;

                this.Loading.edit = false;
            }
            catch(e){
                this.Loading.edit = false;

                if(e.error && e.status == 'name') return this.ErrorHint.name = e.message;
            }    
        }
    }
}
</script>