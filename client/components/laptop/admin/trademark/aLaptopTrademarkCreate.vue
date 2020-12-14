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
                    filled rounded
                    placeholder="Tên thương hiệu nhánh"
                    append-icon="account_balance_wallet"
                    color="create"
                    autocomplete="off"
                ></v-text-field>
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-spacer></v-spacer>
            
            <v-btn 
                rounded elevation="0" large
                :disabled="Loading.create"
                @click="Cancel"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="create" dark
                rounded elevation="0" large 
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
export default {
    props : ['company'],

    data () {
        return {
            NewTrademark: {
                name : null,
                company: this.company.id
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
                let NewTrademark = await this.$axios.$post(this.$api.laptop.admin.CreateNewTrademark, this.NewTrademark);

                this.Update(NewTrademark); 

                this.Loading.create = false;
            }
            catch(e){
                return false;
            }   
        },

        Update (NewTrademark) {
            this.company.trademarks.push(NewTrademark);

            this.Cancel();
        },
        
        Cancel () {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();

            this.$emit('cancel');
        }
    },
}
</script>