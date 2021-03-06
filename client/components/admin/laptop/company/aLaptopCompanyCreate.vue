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
                    :error-messages="ErrorHint.name"
                    @click="ErrorHint.name = null"
                >
                    <template v-slot:message="{ message }">
                        {{ ErrorHint.name ? ErrorHint.name : message }}
                    </template>
                </v-combobox>

                <!--Company Trademark-->
                <v-combobox
                    v-model="NewTrademarks"
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
                        <v-chip v-bind="attrs" :input-value="selected" color="create" small dark class="mt-1 mb-0">
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
                    :error-messages="ErrorHint.logo"
                    @click="ErrorHint.logo = null"
                >
                    <template v-slot:message="{ message }">
                        {{ ErrorHint.logo ? ErrorHint.logo : message }}
                    </template>
                </v-text-field>
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
            NewTrademarks: null,
            Validate: true,
            Loading: {
                upload: false,
                create: false
            },
            ErrorHint: {
                name: null,
                logo: null
            }
        }
    },

    methods: {
        async CreateNewCompany () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.create = true;
            
            try {
                let NewCompany = await this.$axios.$post(this.$api.laptop.admin.CreateNewCompany, {
                    name: this.NewCompany.name,
                    logo: this.NewCompany.logo,
                    trademarks: this.NewTrademarks
                });

                if(NewCompany.error) throw NewCompany;

                NewCompany.productCount = 0;
                this.Update(NewCompany);

                this.Loading.create = false;
            }
            catch(e){
                this.Loading.create = false;

                if(e.error && e.status == 'name') return this.ErrorHint.name = e.message;
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
                this.ErrorHint.logo = e.toString();
            }
        },

        Update (NewCompany) {
            this.companyes.push(NewCompany);

            this.Cancel();
        },

        Cancel () {
            this.ErrorHint = {
                name: null,
                logo: null
            };

            this.$refs.form.reset();
            this.$refs.form.resetValidation();

            this.$emit('cancel');
        }
    }
}
</script>