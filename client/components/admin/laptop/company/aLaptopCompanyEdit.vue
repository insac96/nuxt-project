<template>
    <!--a_laptop_company_edit-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 edit--text">Edit Company</v-card-title>
        <v-card-subtitle>Sửa thông tin hãng sản xuất</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0">
            <v-form ref="form" v-model="Validate">
                <!--Company Name-->
                <v-text-field
                    v-model="CloneCompany.name"
                    :rules="[ $Rules.required, $Rules.specialCharacters, $Rules.multiSpace ]"
                    label="Company Name"
                    filled rounded
                    placeholder="Tên hãng sản xuất"
                    append-icon="apartment"
                    color="edit"
                    autocomplete="off"
                ></v-text-field>

                <!--Company Logo-->
                <v-text-field
                    v-model="CloneCompany.logo"
                    :rules="[ $Rules.required ]"
                    label="Company Logo"
                    filled rounded
                    placeholder="Logo hãng sản xuất"
                    append-icon="image"
                    color="edit"
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
                :disabled="Loading.edit || Loading.upload" 
                @click="Cancel"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="edit" dark
                rounded elevation="0" 
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
export default {
    props : ['company'],
    
    data () {
        return {
            CloneCompany: JSON.parse(JSON.stringify(this.company)),
            Validate: true,
            Loading: {
                upload: false,
                edit: false
            },
            ErrorHint: {
                logo: null
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
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditCompany, {
                    _id: this.CloneCompany._id,
                    name: this.CloneCompany.name,
                    logo: this.CloneCompany.logo,
                });

                this.Update();

                this.Loading.edit = false;
            }
            catch(e){
                this.Loading.edit = false;
            }   
        },

        async Upload (event) {
            let File = event.target.files[0];
            this.Loading.upload = true;

            try {
                let ImageData = await this.$Image.Upload(File);

                this.CloneCompany.logo = ImageData.link;
                this.Loading.upload = false;
            }
            catch(e){
                this.Loading.upload = false;
                this.ErrorHint.logo = e.toString();
            }
        },

        Update () {
            Object.assign(this.company, this.CloneCompany);

            this.Cancel();
        },

        Cancel () {
            this.ErrorHint = {
                name: null,
                logo: null
            };
            
            this.$refs.form.resetValidation();
            this.$emit('cancel');
        }
    }
}
</script>