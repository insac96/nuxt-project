<template>
    <!--Laptop Product Link Configuration-->

    <v-tabs background-color="heading" color="primary" v-model="Tab">
        <v-tab>Mặc Định</v-tab>
        <v-tab>Nâng Cấp</v-tab>

        <!--Tabs Items-->
        <v-tabs-items v-model="Tab">
            <!--Default-->
            <v-tab-item>
                <ALaptopProductLinkConfigurationDefault :product="product"></ALaptopProductLinkConfigurationDefault>
            </v-tab-item>

            <!--Upgrade-->
            <v-tab-item>
                <ALaptopProductLinkConfigurationUpgrade :product="product"></ALaptopProductLinkConfigurationUpgrade>
            </v-tab-item>
        </v-tabs-items>
    </v-tabs>
</template>

<script>
export default {
    props: ['product'],

    data () {
        return {
            Tab: 0
        }
    }
}
</script>