<template>
    <!--a_laptop_company_trademark_edit-->

    <v-card>
        <!--Body-->
        <v-card-title class="font-weight-bold text-h4 edit--text">Edit Trademark</v-card-title>
        <v-card-subtitle>Sửa thương hiệu nhánh</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0">
            <v-form ref="form" v-model="Validate">
                <v-text-field
                    v-model="CloneTrademark.name"
                    :rules="[ $Rules.required, $Rules.specialCharacters, $Rules.multiSpace ]"
                    label="Trademark Name"
                    filled rounded
                    placeholder="Tên thương hiệu nhánh"
                    append-icon="account_balance_wallet"
                    color="edit"
                    autocomplete="off"
                ></v-text-field>
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-btn 
                color="delete" 
                dark
                rounded elevation="0" large 
                class="mx-0"
                :loading="Loading.delete"
                :disabled="Loading.delete || Loading.edit"
                @click="DeleteTrademark()"
            >
                Xóa
            </v-btn>

            <v-spacer></v-spacer>
            
            <v-btn 
                rounded elevation="0" large 
                @click="Cancel()"
                :disabled="Loading.delete || Loading.edit"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="edit" 
                dark
                rounded elevation="0" large 
                class="mx-0"
                :loading="Loading.delete || Loading.edit"
                @click="EditTrademark()"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props : ['trademark'],

    data () {
        return {
            CloneTrademark: JSON.parse(JSON.stringify(this.trademark)),
            Validate: true,
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
                let Delete = await this.$axios.$post(this.$api.laptop.admin.DeleteTrademark, {
                    _id: this.trademark._id
                });

                this.Delete();

                this.Loading.delete = false;
            }
            catch(e){
                this.Loading.delete = false;
                
                return false;
            }      
        },

        async EditTrademark () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.edit = true;

            try {
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditTrademark, {
                    _id: this.CloneTrademark._id,
                    name: this.CloneTrademark.name
                });

                this.Update();

                this.Loading.edit = false;
            }
            catch(e){
                this.Loading.edit = false;
                
                return false;
            }  
        },

        Delete () {
            this.$emit('delete');

            this.Cancel();
        },

        Update () {
            Object.assign(this.trademark, this.CloneTrademark);
            
            this.Cancel();
        },

        Cancel () {
            this.$refs.form.resetValidation();
            this.$emit('cancel');
        },
    },
}
</script>