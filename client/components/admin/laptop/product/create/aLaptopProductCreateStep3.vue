<template>
    <!--a_laptop_product_create_step_3-->

    <v-row justify="center">
        <v-col cols="12" lg="8" xl="7">
            <!--Card-->
            <v-card tile flat outlined class="mb-4">
                <!--Card Header-->
                <v-card-title class="pb-3 font-weight-bold primary_admin--text">Nâng Cấp</v-card-title>
                <v-card-subtitle>Chọn mục có khả năng nâng cấp</v-card-subtitle>

                <!--Card Body-->
                <v-card-text class="pb-0 pt-3">
                    <!--CPU-->
                    <v-sheet class="d-flex justify-space-between">
                        <span class="font-weight-bold">CPU</span>
                        <v-switch v-model="Upgrade.cpu" color="primary_admin" class="ma-0 pa-0"></v-switch>
                    </v-sheet>

                    <!--GPU-->
                    <v-sheet class="d-flex justify-space-between">
                        <span class="font-weight-bold">GPU</span>
                        <v-switch v-model="Upgrade.gpu" color="primary_admin" class="ma-0 pa-0"></v-switch>
                    </v-sheet>

                    <!--Wifi-->
                    <v-sheet class="d-flex justify-space-between">
                        <span class="font-weight-bold">Wifi</span>
                        <v-switch v-model="Upgrade.wifi" color="primary_admin" class="ma-0 pa-0"></v-switch>
                    </v-sheet>

                    <!--Ram-->
                    <v-sheet>
                        <div class="d-flex justify-space-between">
                            <span class="font-weight-bold">RAM</span>
                            <v-switch v-model="Upgrade.ram.type" color="primary_admin" class="ma-0 pa-0"></v-switch>
                        </div>
                        
                        <div class="d-flex justify-end align-center" v-if="Upgrade.ram.type">
                            <v-text-field
                                v-model="Upgrade.ram.max"
                                label="Max"
                                outlined dense
                                placeholder="Dung lượng tối đa"
                                color="primary_admin"
                                class="mr-1"
                                type="number"
                                autocomplete="off"
                            ></v-text-field>

                            <v-text-field
                                v-model="Upgrade.ram.slot"
                                label="Slot"
                                outlined dense
                                placeholder="Số khe cắm ngoài"
                                color="primary_admin"
                                class="ml-1" type="number"
                                autocomplete="off"
                            ></v-text-field>
                        </div>
                    </v-sheet>

                    <!--Hard Drive-->
                    <v-sheet>
                        <div class="d-flex justify-space-between">
                            <span class="font-weight-bold">Hard Drive</span>
                            <v-switch v-model="Upgrade.harddrive.type" color="primary_admin" class="ma-0 pa-0"></v-switch>
                        </div>
                        
                        <div class="d-flex justify-end align-center" v-if="Upgrade.harddrive.type">
                            <v-text-field
                                v-model="Upgrade.harddrive.max"
                                label="Max"
                                outlined dense
                                placeholder="Dung lượng tối đa"
                                color="primary_admin"
                                class="mr-1"
                                autocomplete="off"
                            ></v-text-field>

                            <v-text-field
                                v-model="Upgrade.harddrive.slot"
                                label="Slot"
                                outlined dense
                                placeholder="Các khe hỗ trợ"
                                color="primary_admin"
                                class="ml-1"
                                autocomplete="off"
                            ></v-text-field>
                        </div>   
                    </v-sheet>
                </v-card-text>
            </v-card>

            <!--Button-->
            <v-sheet class="d-flex justify-end">
                <v-btn tile elevation="0" large @click="$emit('back')">
                    Back
                </v-btn>

                <v-btn color="primary_admin" tile elevation="0" large dark @click="NextStep()">
                    Next
                </v-btn>
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data () {
        return {
            Upgrade: {
                cpu: false,
                ram: { 
                    type: false,
                    max: null,
                    slot: null
                },
                gpu: false,
                harddrive: { 
                    type: false,
                    max: null,
                    slot: null
                },
                wifi: false,
            },
        }
    },
    methods: {
        async NextStep () {
            this.$emit('next', this.Upgrade);
        }
    }
}
</script>