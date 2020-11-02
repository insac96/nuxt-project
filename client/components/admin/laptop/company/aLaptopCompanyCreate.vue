<template>
    <!--a_laptop_company_create-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 create--text">Create Company</v-card-title>
        <v-card-subtitle>Tạo hãng sản xuất mới</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0">
            <v-form ref="form" v-model="Validate">
                <!--Company Name-->
                <v-combobox
                    v-model="NewCompany.name"
                    :rules="[ $Rules.required, $Rules.specialCharacters, $Rules.multiSpace ]"
                    :items="CompanySelectSetting"
                    label="Company Name"
                    filled rounded
                    placeholder="Tên hãng sản xuất"
                    append-icon="apartment"
                    color="create"
                    item-color="create"
                ></v-combobox>

                <!--Company Trademark-->
                <v-combobox
                    v-model="NewTrademark"
                    :items="TrademarkSelectSetting[NewCompany.name]"
                    :disabled="!NewCompany.name"
                    label="Company Trademarks"
                    filled rounded
                    placeholder="Các thương hiệu nhánh"
                    append-icon="account_balance_wallet"
                    color="create"
                    item-color="create"
                    multiple small-chips
                >
                    <template v-slot:selection="{ attrs, item, parent, selected }">
                        <v-chip v-bind="attrs" :input-value="selected" label color="create" dark class="mt-2 mb-0">
                            <span class="pr-2">{{ item }}</span>
                            <v-icon small @click="parent.selectItem(item)">close</v-icon>
                        </v-chip>
                    </template>
                </v-combobox>

                <!--Company Logo-->
                <v-text-field
                    v-model="NewCompany.logo"
                    :rules="[ $Rules.required ]"
                    label="Company Logo"
                    filled rounded
                    placeholder="Nhập link hoặc chọn file"
                    append-icon="image"
                    color="create"
                    @click:append="$refs.File.click()"
                    :loading="Loading.upload"
                    :disabled="Loading.upload"
                    autocomplete="off"
                ></v-text-field>
                <input type="file" ref="File" hidden @change="Upload">
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-spacer></v-spacer>
            
            <v-btn 
                rounded elevation="0" large 
                :disabled="Loading.create || Loading.upload" 
                @click="Cancel"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="create" dark
                rounded elevation="0" 
                large class="mx-0" 
                :loading="Loading.create || Loading.upload" 
                @click="CreateNewCompany()"
            >
                Thêm Mới
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';
import CompanySelectSetting from '@/setting/laptop/company';
import TrademarkSelectSetting from '@/setting/laptop/trademark';

export default {
    props : ['companyes'],

    data () {
        return {
            CompanySelectSetting: CompanySelectSetting,
            TrademarkSelectSetting: TrademarkSelectSetting,
            NewCompany: {
                name: null,
                logo: null,
            },
            NewTrademark: null,
            Validate: true,
            Loading: {
                upload: false,
                create: false
            }
        }
    },

    methods: {
        async CreateNewCompany () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.create = true;
            
            try {
                let NewCompany = await this.$axios.$post(LaptopAPI.admin.CreateNewCompany, {
                    name: this.NewCompany.name,
                    logo: this.NewCompany.logo
                });

                NewCompany.trademarks = [];
                NewCompany.productCount = 0;

                this.NewTrademark.forEach(async (name) => {
                    let NewTrademark = await this.$axios.$post(LaptopAPI.admin.CreateNewTrademark, {
                        company: NewCompany._id,
                        name: name
                    });

                    NewCompany.trademarks.push(NewTrademark);
                });

                this.Update(NewCompany);
            }
            catch(e){
                this.Loading.create = false;
            }   
        },

        async Upload (event) {
            let File = event.target.files[0];
            this.Loading.upload = true;

            try {
                let ImageData = await this.$Image.Upload(File);

                this.NewCompany.logo = ImageData.link;
                this.Loading.upload = false;
            }
            catch(e){
                this.Loading.upload = false;
            }
        },

        Update (NewCompany) {
            this.Loading.create = false;
            this.companyes.push(NewCompany);

            this.Cancel();
        },

        Cancel () {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();

            this.$emit('cancel');
        }
    }
}
</script>