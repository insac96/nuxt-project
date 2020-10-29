<template>
    <!--a_laptop_company_create-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary_admin--text">Create Company</v-card-title>
        <v-card-subtitle>Tạo hãng sản xuất mới</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0">
            <v-form ref="form" v-model="Validate.form">
                <!--Company Name-->
                <v-combobox
                    v-model="NewCompany.name"
                    :rules="Validate.name"
                    :items="CompanySelectSetting"
                    label="Company Name"
                    outlined
                    placeholder="Tên hãng sản xuất"
                    append-icon="apartment"
                    color="primary_admin"
                    item-color="primary_admin"
                ></v-combobox>

                <!--Company Trademark-->
                <v-combobox
                    v-model="NewTrademark"
                    :items="TrademarkSelectSetting[NewCompany.name]"
                    :disabled="!NewCompany.name"
                    label="Company Trademarks"
                    outlined
                    placeholder="Các thương hiệu nhánh"
                    append-icon="account_balance_wallet"
                    color="primary_admin"
                    item-color="primary_admin"
                    multiple small-chips
                >
                    <template v-slot:selection="{ attrs, item, parent, selected }">
                        <v-chip v-bind="attrs" :input-value="selected" label color="primary_admin" dark class="mt-2 mb-0">
                            <span class="pr-2">{{ item }}</span>
                            <v-icon small @click="parent.selectItem(item)">close</v-icon>
                        </v-chip>
                    </template>
                </v-combobox>

                <!--Company Logo-->
                <v-text-field
                    v-model="NewCompany.logo"
                    :rules="Validate.logo"
                    label="Company Logo"
                    outlined
                    placeholder="Nhập link hoặc chọn file"
                    append-icon="image"
                    color="primary_admin"
                    @click:append="$refs.File.click()"
                    :loading="Loading.upload"
                    :disabled="Loading.upload"
                ></v-text-field>
                <input type="file" ref="File" hidden @change="Upload">
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4">
            <v-spacer></v-spacer>
            
            <v-btn 
                tile elevation="0" large 
                :disabled="Loading.create || Loading.upload" 
                @click="Cancel"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="primary_admin" dark 
                tile elevation="0" 
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
import LaptopAPI from '~/setting/laptop/api';
import CompanySelectSetting from '@/setting/laptop/company';
import TrademarkSelectSetting from '@/setting/laptop/trademark';

export default {
    scrollToTop: true,

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
            Validate: {
                form: true,
                name: [
                    v => !!v || 'Tên không được để trống',
                ],
                logo: [
                    v => !!v || 'Logo không được để trống',
                ],
            },
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
                let NewCompany = await this.$axios.$post(LaptopAPI.admin.CreateNewCompany, this.NewCompany);

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
                this.Cancel();
            }
            catch(e){
                return false;
            }   
        },

        Update (NewCompany) {
            this.Loading.create = false;
            this.companyes.push(NewCompany);
        },

        Cancel () {
            this.$refs.form.reset();
            this.$refs.form.resetValidation();

            this.$emit('cancel');
        },

        Upload (event) {
            let File = event.target.files[0];

            this.Loading.upload = true;

            this.$Image.Upload(File)
            .then(image => {
                this.NewCompany.logo = image.link;
                this.Loading.upload = false;
            })
            .catch(error => {
                console.log(error.toString());
            });
        }
    }
}
</script>