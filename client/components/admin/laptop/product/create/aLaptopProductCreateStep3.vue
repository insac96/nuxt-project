<template>
    <!--a_laptop_product_create_step_3-->

    <v-card tile flat>
        <!--Card Body-->
        <v-card-text class="pt-4">
            <!--CPU-->
            <v-sheet class="d-flex justify-space-between">
                <span class="font-weight-bold">CPU</span>
                <v-switch v-model="Upgrade.cpu" color="primary" class="ma-0 pa-0"></v-switch>
            </v-sheet>

            <!--GPU-->
            <v-sheet class="d-flex justify-space-between">
                <span class="font-weight-bold">GPU</span>
                <v-switch v-model="Upgrade.gpu" color="primary" class="ma-0 pa-0"></v-switch>
            </v-sheet>

            <!--Wifi-->
            <v-sheet class="d-flex justify-space-between">
                <span class="font-weight-bold">WIFI</span>
                <v-switch v-model="Upgrade.wifi" color="primary" class="ma-0 pa-0"></v-switch>
            </v-sheet>

            <!--Ram-->
            <v-sheet>
                <div class="d-flex justify-space-between">
                    <span class="font-weight-bold">RAM</span>
                    <v-switch v-model="Upgrade.ram.type" color="primary" class="ma-0 pa-0"></v-switch>
                </div>
                
                <div class="d-flex justify-end align-center" v-if="Upgrade.ram.type">
                    <v-text-field
                        v-model="Upgrade.ram.max"
                        label="Max"
                        filled rounded
                        placeholder="Dung lượng tối đa"
                        color="primary"
                        class="mr-1"
                        type="number"
                        autocomplete="off"
                    ></v-text-field>

                    <v-text-field
                        v-model="Upgrade.ram.slot"
                        label="Slot"
                        filled rounded
                        placeholder="Số khe cắm ngoài"
                        color="primary"
                        class="ml-1" type="number"
                        autocomplete="off"
                    ></v-text-field>
                </div>
            </v-sheet>

            <!--Hard Drive-->
            <v-sheet>
                <div class="d-flex justify-space-between">
                    <span class="font-weight-bold">HARD DRIVE</span>
                    <v-switch v-model="Upgrade.harddrive.type" color="primary" class="ma-0 pa-0"></v-switch>
                </div>
                
                <div class="d-flex justify-end align-center" v-if="Upgrade.harddrive.type">
                    <v-text-field
                        v-model="Upgrade.harddrive.max"
                        label="Max"
                        filled rounded
                        placeholder="Dung lượng tối đa"
                        color="primary"
                        class="mr-1"
                        autocomplete="off"
                    ></v-text-field>

                    <v-text-field
                        v-model="Upgrade.harddrive.slot"
                        label="Slot"
                        filled rounded
                        placeholder="Các khe hỗ trợ"
                        color="primary"
                        class="ml-1"
                        autocomplete="off"
                    ></v-text-field>
                </div>   
            </v-sheet>
        </v-card-text>

        <!--Footer-->
        <v-sheet class="d-flex justify-end pa-4">
            <v-btn large rounded elevation="0" @click="$emit('back')">
                Back
            </v-btn>
            
            <v-btn color="primary" dark large rounded elevation="0" @click="NextStep()">
                Next
            </v-btn>
        </v-sheet>
    </v-card>
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