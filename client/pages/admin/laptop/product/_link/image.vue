<template>
    <!--Laptop Product Link Image-->

    <v-card tile flat>
        <!--Header-->
        <v-sheet class="d-flex align-center pr-4" color="heading">
            <!--Header Left-->
            <div>
                <v-card-title class="font-weight-bold text-h4 primary--text">Images</v-card-title>
                <v-card-subtitle>Các hình ảnh của sản phẩm</v-card-subtitle>
            </div>

            <v-spacer></v-spacer>

            <!--Header Right-->
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

        <!--Body-->
        <div class="pa-4">
            <!--Alert if Image List Empty-->
            <v-alert 
                v-if="product.images.length == 0"
                color="info" outlined type="info" 
                tile border="right"
                class="ma-0"
            >
                Hiện tại chưa có hình ảnh nào của sản phẩm
            </v-alert>
            
            <!--ELSE-->
            <v-row dense v-else>
                <v-col cols="3" v-for="(item, index) in product.images" :key="index">
                    <v-hover v-slot:default="{ hover }">
                        <v-img :src="$Image.Get(item, 'm')" :aspect-ratio="320/213">
                            <v-row v-if="hover && !Loading.upload" 
                                class="fill-height"
                                justify="center"
                                align="center"
                            >
                                <v-btn fab @click="DeleteImage(index)">
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-row>
                        </v-img>
                    </v-hover>
                </v-col>
            </v-row>
        </div>
    </v-card>
</template>

<script>
export default {
    props: ['product'],

    data () {
        return {
            Loading: {
                upload: false,
            }
        }
    },

    methods: {
        async UploadImages (event) {
            let Files = event.target.files;
            if(Files.length == 0) return false;
            
            this.Loading.upload = true;

            for (let i = 0; i < Files.length; i++) {
                let file = Files[i];
                
                try {
                    let NewImage = await this.$Image.Upload(file);
                    this.product.images.push(NewImage.link);
                }
                catch(e){
                    console.log(e);
                }
            }

            this.EditImages();
        },

        async EditImages () {
            this.Loading.upload = true;

            try {
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditImagesProduct, {
                    _id: this.product._id,
                    images: this.product.images
                });

                this.Loading.upload = false;
            }
            catch(e){
                this.Loading.upload = false;
            }            
        },

        DeleteImage (index) {
            this.$delete(this.product.images, index);

            this.EditImages();
        }
    }
}
</script>