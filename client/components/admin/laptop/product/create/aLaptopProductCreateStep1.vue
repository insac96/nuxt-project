<template>
    <!--a_laptop_product_create_step_1-->
    
    <v-card flat tile>
        <!--Information-->
        <div>
            <v-card-title class="font-weight-bold primary--text">Thông Tin</v-card-title>
            <v-card-subtitle>Thông tin cơ bản của sản phẩm</v-card-subtitle>

            <v-card-text>
                <v-form class="mt-4" ref="form" v-model="Validate.form">
                    <v-text-field
                        v-model="NewProduct.name"
                        :rules="Validate.name"
                        label="Laptop Name"
                        filled rounded
                        placeholder="Tên sản phẩm"
                        append-icon="laptop"
                        color="primary"
                        autocomplete="off"
                    ></v-text-field>

                    <v-select
                        v-model="NewProduct.company"
                        :rules="Validate.company"
                        :items="Companyes"
                        item-text="name"
                        item-value="_id"
                        label="Laptop Company"
                        filled rounded
                        placeholder="Chọn hãng sản xuất"
                        append-icon="apartment"
                        color="primary"
                        item-color="primary"
                        @click="GetCompanyes"
                        @change="SetCompanySelect"
                    ></v-select>

                    <v-select
                        v-if="CompanySelect"
                        v-model="NewProduct.trademark"
                        :rules="Validate.trademark"
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
            </v-card-text>
        </div>

        <!--Image-->
        <div>
            <!--Header Image-->
            <v-sheet class="d-flex justify-space-between align-center pr-4">
                <div>
                    <v-card-title class="font-weight-bold primary--text">Hình Ảnh</v-card-title>
                    <v-card-subtitle>Tải Hình Ảnh Cho Sản Phẩm</v-card-subtitle>
                </div>

                <v-btn 
                    fab color="primary" 
                    dark elevation="0"
                    :loading="Loading.upload"
                    @click="$refs.File.click()"
                >
                    <v-icon>backup</v-icon>
                    <input type="file" ref="File" hidden @change="UploadImages" multiple>
                </v-btn>
            </v-sheet>
            
            <!--List Image-->
            <v-card-text class="pt-2" v-if="NewProduct.images.length > 0">
                <v-row dense>
                    <v-col cols="3" v-for="(image, indexImage) in NewProduct.images" :key="indexImage">
                        <v-hover v-slot:default="{ hover }">
                            <v-img :src="$Image.Get(image, 'm')" :aspect-ratio="320/213">
                                <v-row v-if="hover" 
                                    class="fill-height"
                                    justify="center"
                                    align="center"
                                >
                                    <v-btn fab @click="$delete(NewProduct.images, indexImage)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-row>
                            </v-img>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-card-text>
        </div>

        <!--Footer-->
        <v-sheet class="d-flex justify-end pa-4">
            <v-btn 
                color="primary" dark
                rounded elevation="0" 
                large  
                @click="NextStep()"
                :loading="Loading.upload"
            >
                Next
            </v-btn>
        </v-sheet>
    </v-card>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';

export default {
    data () {
        return {
            Companyes: [],
            CompanySelect: null,
            NewProduct: {
                name: null,
                company: null,
                trademark: null,
                images: [],
            },
            Validate: {
                form: true,
                name: [
                    v => !!v || 'Tên sản phẩm không được để trống',
                ],
                company: [
                    v => !!v || 'Tên hãng sản xuất không được để trống',
                ],
                trademark: [
                    v => !!v || 'Tên thương hiệu con không được để trống',
                ]
            },
            Loading: {
                upload: false
            }
        }
    },
    
    methods: {
        async GetCompanyes () {
            if(this.Companyes.length > 0) return false;

            try {
                this.Companyes = await this.$axios.$get(LaptopAPI.admin.GetAllMiniCompany);
            }
            catch(e){
                return false;
            }       
        },

        SetCompanySelect (id) {
            let CompanySelect = this.Companyes.find(i => i.id == id);
            this.CompanySelect = CompanySelect;
        },

        async UploadImages (event) {
            let Files = event.target.files;
            if(Files.length == 0) return false;
            
            this.Loading.upload = true;

            for (let i = 0; i < Files.length; i++) {
                let file = Files[i];
                
                try {
                    let NewImage = await this.$Image.Upload(file);
                    this.NewProduct.images.push(NewImage.link);
                }
                catch(e){
                    return false;
                }
            }

            this.Loading.upload = false;
        },

        NextStep () {
            if(!this.$refs.form.validate()) return false;
            
            this.$emit('next', this.NewProduct);
        }
    },
}
</script>