<template>
    <!--a_laptop_company_edit-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 info--text">Edit Company</v-card-title>
        <v-card-subtitle>Sửa thông tin hãng sản xuất</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0">
            <v-form ref="form" v-model="Validate.form">
                <!--Company Name-->
                <v-text-field
                    v-model="CloneCompany.name"
                    :rules="Validate.name"
                    label="Company Name"
                    outlined
                    placeholder="Tên hãng sản xuất"
                    append-icon="apartment"
                    color="primary_admin"
                ></v-text-field>

                <!--Company Logo-->
                <v-text-field
                    v-model="CloneCompany.logo"
                    :rules="Validate.logo"
                    label="Company Logo"
                    outlined
                    placeholder="Logo hãng sản xuất"
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
                :disabled="Loading.edit || Loading.upload" 
                @click="Cancel"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="info" tile elevation="0" 
                large class="mx-0" 
                :loading="Loading.edit || Loading.upload" 
                @click="EditCompany"
            >
                Lưu
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
            CloneCompany: JSON.parse(JSON.stringify(this.company)),
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
                edit: false
            }
        }
    },

    watch: {
        company (newVal) {
            this.CloneCompany = JSON.parse(JSON.stringify(newVal))
        }
    },

    methods: {
        async EditCompany () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.edit = true;

            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditCompany, this.CloneCompany);

                this.Update();
                this.Cancel();
            }
            catch(e){
                return false;
            }   
        },

        Update () {
            this.Loading.edit = false;
            Object.assign(this.company, this.CloneCompany);
        },

        Cancel () {
            this.$refs.form.resetValidation();
            this.$emit('cancel');
        },

        async Upload (event) {
            const File = event.target.files[0];

            this.Loading.upload = true;

            let ImageData = await this.$Image.Upload(File);
            
            this.CloneCompany.logo = ImageData.link;
            this.Loading.upload = false;
        }
    }
}
</script>