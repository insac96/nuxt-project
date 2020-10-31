<template>
    <!--a_laptop_company_trademark_create-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 create--text">Create Trademark</v-card-title>
        <v-card-subtitle>Tạo thương hiệu nhánh</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0">
            <v-form ref="form" v-model="Validate">
                <!--Trademark Name-->
                <v-text-field
                    v-model="NewTrademark.name"
                    :rules="[ $Rules.required, $Rules.specialCharacters, $Rules.multiSpace ]"
                    label="Trademark Name"
                    outlined
                    placeholder="Tên thương hiệu nhánh"
                    append-icon="account_balance_wallet"
                    color="create"
                    autocomplete="off"
                ></v-text-field>
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4">
            <v-spacer></v-spacer>
            <v-btn 
                tile elevation="0" large
                :disabled="Loading.create"
                @click="Cancel"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="create" 
                dark
                tile elevation="0" large 
                class="mx-0" 
                @click="CreateNewTrademark"
                :loading="Loading.create" 
            >
                Thêm Mới
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
            NewTrademark: {
                name : null,
                company: null
            },
            Validate: true,
            Loading: {
                create: false
            }
        }
    },

    methods : {
        async CreateNewTrademark () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.create = true;

            try {
                this.NewTrademark.company = this.company.id;

                let NewTrademark = await this.$axios.$post(LaptopAPI.admin.CreateNewTrademark, this.NewTrademark);

                this.Update(NewTrademark);
                this.Cancel();
            }
            catch(e){
                return false;
            }   
        },

        Update (NewTrademark) {
            this.Loading.create = false;
            this.company.trademarks.push(NewTrademark);
        },
        
        Cancel () {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();

            this.$emit('cancel');
        }
    },
}
</script>