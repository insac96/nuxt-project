<template>
    <!--a_laptop_product_variantColor_edit-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 edit--text">Setting Color</v-card-title>
        <v-card-subtitle>Cài đặt màu sắc cho biến thể</v-card-subtitle>

        <!--Body-->
        <v-tabs background-color="edit" dark v-model="Tab" class="rounded-0">
            <v-tab>Thông Tin</v-tab>
            <v-tab>Xóa</v-tab>

            <v-tabs-items v-model="Tab" class="pa-6">
                <!-- Information -->
                <v-tab-item>
                    <ALaptopProductLinkVariantColorEditInformation 
                        :color="CloneColor"
                        @done="DoneEditInformation"
                        @cancel="$emit('cancel')"
                    ></ALaptopProductLinkVariantColorEditInformation>
                </v-tab-item>

                <!-- Delete -->
                <v-tab-item>
                    <ALaptopProductLinkVariantColorEditDelete
                        :color="CloneColor"
                        @done="DoneEditDelete"
                        @cancel="$emit('cancel')"
                    ></ALaptopProductLinkVariantColorEditDelete>
                </v-tab-item>
            </v-tabs-items>
        </v-tabs>
    </v-card>
</template>

<script>
export default {
    props: ['color'],

    data () {
        return {
            Tab: 0,
            CloneColor : JSON.parse(JSON.stringify(this.color)),
        }
    },

    watch: {
        color (newVal) {
            this.CloneColor = JSON.parse(JSON.stringify(newVal))
        }
    },

    methods: {
        DoneEditInformation (newColor) {
            Object.assign(this.color, newColor);
        },

        DoneEditDelete () {
            this.$emit('delete');
            this.$emit('cancel');
        }
    }
}
</script>