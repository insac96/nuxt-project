<template>
    <v-container class="pa-0">
        <LazyHydrate when-idle>
            <GLaptopNews class="mb-4"></GLaptopNews>
        </LazyHydrate>

        <!--<GLaptopCompanyesMini class="mb-6 mb-sm-8"></GLaptopCompanyesMini>-->
        
        <LazyHydrate when-visible>
            <GLaptopProductVariantDiscountMini class="mb-6 mb-sm-8"></GLaptopProductVariantDiscountMini>
        </LazyHydrate>
        
        <LazyHydrate when-visible>
            <GLaptopProductVariantNewMini class="mb-6 mb-sm-8"></GLaptopProductVariantNewMini>
        </LazyHydrate>
    </v-container>
</template>