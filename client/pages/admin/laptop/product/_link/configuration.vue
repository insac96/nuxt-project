<template>
    <!--Laptop Product Link Configuration-->

    <v-tabs background-color="heading" color="primary" v-model="Tab" class="BoxShadow-Hover">
        <v-tab>Mặc Định</v-tab>
        <v-tab>Nâng Cấp</v-tab>

        <v-tabs-items v-model="Tab">
            <!--Default-->
            <v-tab-item>
                <ALaptopProductConfigurationDefault :product="product"></ALaptopProductConfigurationDefault>
            </v-tab-item>

            <!--Upgrade-->
            <v-tab-item>
                <ALaptopProductConfigurationUpgrade :product="product"></ALaptopProductConfigurationUpgrade>
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