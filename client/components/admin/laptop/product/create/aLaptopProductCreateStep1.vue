<template>
    <!--a_laptop_product_create_step_1-->

    <v-form class="mt-4" ref="form" v-model="Validate.form">
        <v-row justify="center">
            <v-col cols="12" lg="8" xl="7">
                <!--Information-->
                <v-card flat tile outlined class="mb-4">
                    <v-card-title class="font-weight-bold primary_admin--text">Thông Tin</v-card-title>

                    <v-card-text class="pt-4">
                        <v-text-field
                            v-model="NewProduct.name"
                            :rules="Validate.name"
                            label="Laptop Name"
                            outlined
                            placeholder="Tên sản phẩm"
                            append-icon="laptop"
                            color="primary_admin"
                            autocomplete="off"
                        ></v-text-field>

                        <v-select
                            v-model="NewProduct.company"
                            :rules="Validate.company"
                            :items="Companyes"
                            item-text="name"
                            item-value="_id"
                            label="Laptop Company"
                            outlined
                            placeholder="Chọn hãng sản xuất"
                            append-icon="apartment"
                            color="primary_admin"
                            item-color="primary_admin"
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
                            outlined
                            placeholder="Chọn thương hiệu nhánh"
                            append-icon="account_balance_wallet"
                            color="primary_admin"
                            item-color="primary_admin"
                        ></v-select>
                    </v-card-text>
                </v-card>

                <!--Images Upload-->
                <v-card flat tile outlined>
                    <!--Header-->
                    <v-sheet class="d-flex justify-space-between align-center pr-4">
                        <div>
                            <v-card-title class="font-weight-bold primary_admin--text">Hình Ảnh</v-card-title>
                            <v-card-subtitle>Tải Hình Ảnh Cho Sản Phẩm</v-card-subtitle>
                        </div>

                        <v-btn 
                            fab color="primary_admin" 
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
                            <v-col cols="4" v-for="(image, indexImage) in NewProduct.images" :key="indexImage">
                                <v-hover v-slot:default="{ hover }">
                                    <v-card :elevation="hover ? 10 : 3">
                                        <v-img :src="image">
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
                                    </v-card>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
                
                <!--Button-->
                <v-sheet class="d-flex justify-end mt-4">
                    <v-btn 
                        color="primary_admin" tile elevation="0" 
                        large dark 
                        @click="NextStep()"
                        :loading="Loading.upload"
                    >
                        Next
                    </v-btn>
                </v-sheet>
            </v-col>
        </v-row>
    </v-form>
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