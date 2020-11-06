<template>
    <!--a_laptop_product_variant_create-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 create--text">Create Variant</v-card-title>
        <v-card-subtitle>Tạo biến thể mới cho sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-form class="px-4" ref="form" v-model="Validate">
            <v-row>
                <!--Left-->
                <v-col :cols="6">
                    <!-- Code -->
                    <v-text-field
                        v-model="NewVariant.code"
                        :rules="[ $Rules.required ]"
                        label="Code"                    
                        placeholder="Mã cấu hình"
                        color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.create"
                        :error-messages="ErrorHint.code"
                        @click="ErrorHint.code = null"
                    >
                        <template v-slot:message="{ message }">
                            {{ ErrorHint.code ? ErrorHint.code : message }}
                        </template>
                    </v-text-field>   

                    <!-- Screen -->
                    <v-combobox
                        v-model="NewVariant.screen"
                        :rules="[ $Rules.required ]"
                        label="Screen"                    
                        placeholder="ex: 14 FHD"
                        :items="VariantSelectConfiguration.screen"
                        color="create"
                        item-color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.create"
                    ></v-combobox>

                    <!-- CPU -->
                    <v-combobox
                        v-model="NewVariant.cpu"
                        :rules="[ $Rules.required ]"
                        label="CPU"                    
                        placeholder="ex: i7 9900H"
                        :items="VariantSelectConfiguration.cpu"
                        color="create"
                        item-color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.create"
                    ></v-combobox>
                </v-col>

                <!--Right-->
                <v-col :cols="6">
                    <!-- Ram -->
                    <v-combobox
                        v-model="NewVariant.ram"
                        :rules="[ $Rules.required ]"
                        label="RAM"               
                        placeholder="ex: 8GB"
                        :items="VariantSelectConfiguration.ram"
                        color="create"
                        item-color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.create"
                    ></v-combobox>

                    <!-- HardDrive -->
                    <v-combobox
                        v-model="NewVariant.harddrive"
                        :rules="[ $Rules.required ]"
                        label="HardDrive"               
                        placeholder="ex: 512GB"
                        :items="VariantSelectConfiguration.harddrive"
                        color="create"
                        item-color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.create"
                    ></v-combobox>

                    <!-- GPU -->
                    <v-combobox
                        v-model="NewVariant.gpu"
                        :rules="[ $Rules.required ]"
                        label="GPU"               
                        placeholder="ex: RTX 2060"
                        :items="VariantSelectConfiguration.gpu"
                        color="create"
                        item-color="create"
                        autocomplete="off"
                        filled rounded
                        :disabled="Loading.create"
                    ></v-combobox>
                </v-col>
            </v-row>
        </v-form>

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
                rounded elevation="0" 
                large class="mx-0" 
                :loading="Loading.create" 
                @click="CreateVariant"
            >
                Thêm Mới
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';
import * as VariantSelectSetting from '@/setting/laptop/variant';

export default {
    props: ['product'],

    data () {
        return {
            VariantSelectConfiguration: VariantSelectSetting.configuration,
            Tab: 0,
            Loading: {
                create: false
            },
            NewVariant: {
                company: this.product.company._id,
                trademark: this.product.trademark._id,
                product: this.product._id,
                code: null,
                screen: null,
                cpu: null,
                ram: null,
                gpu: null,
                harddrive: null,
            },
            Validate: true,
            ErrorHint: {
                code: null
            }
        }
    },

    methods : {
        async CreateVariant () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.create = true;

            try {
                let NewVariant = await this.$axios.$post(LaptopAPI.admin.CreateNewVariant, this.NewVariant);

                if(NewVariant.error) throw NewVariant;

                this.Loading.create = false;
                this.Update(NewVariant);    
            }
            catch(e){
                this.Loading.create = false;

                if(e.error) return this.ErrorHint[e.status] = e.message;
            }    
        },

        Update (NewVariant) {
            NewVariant.colors = [];
            this.product.variants.push(NewVariant);

            this.Cancel();
        },

        Cancel () {
            this.ErrorHint = {};
            this.$refs.form.reset();
            this.$refs.form.resetValidation();

            this.$emit('cancel');
        },
    }
}
</script>