<template>
    <!--a_laptop_product_configuration_default-->

    <v-card tile flat class="mt-4">
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary_admin--text">Upgrade</v-card-title>
        <v-card-subtitle>Khả năng nâng cấp của sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0 pt-3">
            <!--CPU-->
            <v-sheet class="d-flex justify-space-between">
                <span class="font-weight-bold">CPU</span>
                <v-switch v-model="ConfigurationUpgrade.cpu" color="primary_admin" class="ma-0 pa-0" :disabled="Loading.edit"></v-switch>
            </v-sheet>

            <!--GPU-->
            <v-sheet class="d-flex justify-space-between">
                <span class="font-weight-bold">GPU</span>
                <v-switch v-model="ConfigurationUpgrade.gpu" color="primary_admin" class="ma-0 pa-0" :disabled="Loading.edit"></v-switch>
            </v-sheet>

            <!--Wifi-->
            <v-sheet class="d-flex justify-space-between">
                <span class="font-weight-bold">Wifi</span>
                <v-switch v-model="ConfigurationUpgrade.wifi" color="primary_admin" class="ma-0 pa-0" :disabled="Loading.edit"></v-switch>
            </v-sheet>

            <!--Ram-->
            <v-sheet>
                <div class="d-flex justify-space-between">
                    <span class="font-weight-bold">RAM</span>
                    <v-switch v-model="ConfigurationUpgrade.ram.type" color="primary_admin" class="ma-0 pa-0" :disabled="Loading.edit"></v-switch>
                </div>
                
                <!--Show, if Type of Ram is True-->
                <div class="d-flex justify-end align-center" v-if="ConfigurationUpgrade.ram.type">
                    <v-text-field
                        v-model="ConfigurationUpgrade.ram.max"
                        label="Max"
                        outlined dense
                        placeholder="Dung lượng tối đa"
                        color="primary_admin"
                        class="mr-1"
                        type="number"
                        autocomplete="off"
                        :disabled="Loading.edit"
                    ></v-text-field>

                    <v-text-field
                        v-model="ConfigurationUpgrade.ram.slot"
                        label="Slot"
                        outlined dense
                        placeholder="Số khe cắm ngoài"
                        color="primary_admin"
                        class="ml-1" type="number"
                        autocomplete="off"
                        :disabled="Loading.edit"
                    ></v-text-field>
                </div>
            </v-sheet>

            <!--Hard Drive-->
            <v-sheet>
                <div class="d-flex justify-space-between">
                    <span class="font-weight-bold">Hard Drive</span>
                    <v-switch v-model="ConfigurationUpgrade.harddrive.type" color="primary_admin" class="ma-0 pa-0"></v-switch>
                </div>
                
                <!--Show, if Type of Hard Drive is True-->
                <div class="d-flex justify-end align-center" v-if="ConfigurationUpgrade.harddrive.type">
                    <v-text-field
                        v-model="ConfigurationUpgrade.harddrive.max"
                        label="Max"
                        outlined dense
                        placeholder="Dung lượng tối đa"
                        color="primary_admin"
                        class="mr-1"
                        autocomplete="off"
                        :disabled="Loading.edit"
                    ></v-text-field>

                    <v-text-field
                        v-model="ConfigurationUpgrade.harddrive.slot"
                        label="Slot"
                        outlined dense
                        placeholder="Các khe hỗ trợ"
                        color="primary_admin"
                        class="ml-1"
                        autocomplete="off"
                        :disabled="Loading.edit"
                    ></v-text-field>
                </div>   
            </v-sheet>   
        </v-card-text>


        <!--Footer-->
        <v-card-actions class="pa-4">
            <v-spacer></v-spacer>

            <v-btn 
                color="primary_admin" dark 
                elevation="0" tile large
                :loading="Loading.edit"
                @click="EditUpgrade"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    props: ['product'],

    data () {
        return {
            ID: this.product.configuration._id,
            ConfigurationUpgrade: this.product.configuration.upgrade,
            Loading: {
                edit: false
            }
        }
    },

    methods : {
        async EditUpgrade () {
            this.Loading.edit = true;

            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditUpgradeConfiguration, {
                    _id: this.ID,
                    upgrade: this.ConfigurationUpgrade
                });

                this.Loading.edit = false;
            }
            catch(e){
                this.Loading.edit = false;
            }   
        }
    }
}
</script>