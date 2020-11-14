<template>
    <div>
        <GLaptopNewsTop class="mb-4"></GLaptopNewsTop>

        <!--<GLaptopCompanyesMini class="mb-6 mb-sm-8"></GLaptopCompanyesMini>-->
        
        <LazyHydrate when-visible>
            <GLaptopProductVariantDiscountMini class="mb-6 mb-sm-8"></GLaptopProductVariantDiscountMini>
        </LazyHydrate>
        
        <LazyHydrate when-visible>
            <GLaptopProductVariantNewMini class="mb-6 mb-sm-8"></GLaptopProductVariantNewMini>
        </LazyHydrate>
    </div>
</template>