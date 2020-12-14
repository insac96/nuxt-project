<template>
    <!--a_laptop_product_configuration_default-->

    <v-card tile flat>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary--text">Upgrade</v-card-title>
        <v-card-subtitle>Khả năng nâng cấp của sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0 pt-3">
            <!--CPU-->
            <v-sheet class="d-flex justify-space-between">
                <span class="font-weight-bold text-subtitle-1">CPU</span>
                <v-switch v-model="ConfigurationUpgrade.cpu" inset color="primary" class="ma-0 pa-0" :disabled="Loading.edit"></v-switch>
            </v-sheet>

            <!--GPU-->
            <v-sheet class="d-flex justify-space-between">
                <span class="font-weight-bold text-subtitle-1">GPU</span>
                <v-switch v-model="ConfigurationUpgrade.gpu" inset color="primary" class="ma-0 pa-0" :disabled="Loading.edit"></v-switch>
            </v-sheet>

            <!--Wifi-->
            <v-sheet class="d-flex justify-space-between">
                <span class="font-weight-bold text-subtitle-1">Wifi</span>
                <v-switch v-model="ConfigurationUpgrade.wifi" inset color="primary" class="ma-0 pa-0" :disabled="Loading.edit"></v-switch>
            </v-sheet>

            <!--Ram-->
            <v-sheet>
                <div class="d-flex justify-space-between">
                    <span class="font-weight-bold text-subtitle-1">RAM</span>
                    <v-switch v-model="ConfigurationUpgrade.ram.type" inset color="primary" class="ma-0 pa-0" :disabled="Loading.edit"></v-switch>
                </div>
                
                <!--Show, if Type of Ram is True-->
                <div class="d-flex justify-end align-center" v-if="ConfigurationUpgrade.ram.type">
                    <v-text-field
                        v-model="ConfigurationUpgrade.ram.max"
                        label="Max"
                        filled rounded
                        placeholder="Dung lượng tối đa"
                        color="primary"
                        class="mr-1"
                        type="number"
                        autocomplete="off"
                        :disabled="Loading.edit"
                    ></v-text-field>

                    <v-text-field
                        v-model="ConfigurationUpgrade.ram.slot"
                        label="Slot"
                        filled rounded
                        placeholder="Số khe cắm ngoài"
                        color="primary"
                        class="ml-1" type="number"
                        autocomplete="off"
                        :disabled="Loading.edit"
                    ></v-text-field>
                </div>
            </v-sheet>

            <!--Hard Drive-->
            <v-sheet>
                <div class="d-flex justify-space-between">
                    <span class="font-weight-bold text-subtitle-1">Hard Drive</span>
                    <v-switch v-model="ConfigurationUpgrade.harddrive.type" inset color="primary" class="ma-0 pa-0" :disabled="Loading.edit"></v-switch>
                </div>
                
                <!--Show, if Type of Hard Drive is True-->
                <div class="d-flex justify-end align-center" v-if="ConfigurationUpgrade.harddrive.type">
                    <v-text-field
                        v-model="ConfigurationUpgrade.harddrive.max"
                        label="Max"
                        filled rounded
                        placeholder="Dung lượng tối đa"
                        color="primary"
                        class="mr-1"
                        autocomplete="off"
                        :disabled="Loading.edit"
                    ></v-text-field>

                    <v-text-field
                        v-model="ConfigurationUpgrade.harddrive.slot"
                        label="Slot"
                        filled rounded
                        placeholder="Các khe hỗ trợ"
                        color="primary"
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
                color="primary" dark 
                elevation="0" rounded large
                :loading="Loading.edit"
                @click="EditUpgrade"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
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
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditUpgradeConfiguration, {
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