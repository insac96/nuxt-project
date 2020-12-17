<template>
    <div class="BoxShadow">
        <LazyHydrate when-visible>
            <GLaptopHomeNews></GLaptopHomeNews>
        </LazyHydrate>

        <!--<GLaptopCompanyesMini class="mb-6 mb-sm-8"></GLaptopCompanyesMini>-->
        
        <LazyHydrate when-visible>
            <GLaptopHomeProductDiscount></GLaptopHomeProductDiscount>
        </LazyHydrate>
        
        <LazyHydrate when-visible>
            <GLaptopHomeProductNew></GLaptopHomeProductNew>
        </LazyHydrate>
    </div>
</template>

<script>
export default {
    head () {
        return {
            title: `${this.$Config.appName} - Hề Thống Bán Lẻ Máy Tính Xách Tay Laptop`,
            meta: [
                //Google
                {
                    hid: 'description',
                    name: 'description',
                    content: `${this.$Config.appName} - Máy tính xách tay, laptop giá cả hợp lý, uy tín số 1 Việt Nam`
                },
                //FaceBook
                {
                    hid: 'og:url',
                    name: 'og:url',
                    property: 'og:url',
                    content: `${this.$Config.baseUrl}${this.$route.path}`
                },
                {
                    hid: 'og:type',
                    name: 'og:type',
                    property: 'og:type',
                    content: 'article'
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    property: 'og:title',
                    content: `${this.$Config.appName} - Hề Thống Bán Lẻ Máy Tính Xách Tay Laptop`
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property: 'og:description',
                    content: 'Máy tính xách tay, laptop giá cả hợp lý, uy tín số 1 Việt Nam'
                },
                {
                    hid: 'og:image',
                    name: 'og:image',
                    property: 'og:image',
                    content: `${this.$Config.baseUrl}/cover.jpg`
                },
            ]
        }
    }
}
</script>