<template>
    <div id="HOME">
        <GLaptopHomeNews class="mb-4"></GLaptopHomeNews>

        <!--<GLaptopCompanyesMini class="mb-6 mb-sm-8"></GLaptopCompanyesMini>-->
        
        <LazyHydrate when-visible>
            <GLaptopHomeProductDiscount class="mb-6 mb-sm-8"></GLaptopHomeProductDiscount>
        </LazyHydrate>
        
        <LazyHydrate when-visible>
            <GLaptopHomeProductNew class="mb-6 mb-sm-8"></GLaptopHomeProductNew>
        </LazyHydrate>
    </div>
</template>

<script>
export default {
    head () {
        return {
            title: 'Hề Thống Bán Lẻ Máy Tính Xách Tay Laptop',
            meta: [
                //Google
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Máy tính xách tay, laptop giá cả hợp lý, uy tín số 1 Việt Nam'
                },
                //FaceBook
                {
                    hid: 'og:url',
                    name: 'og:url',
                    property: 'og:url',
                    content: 'https://anio.herokuapp.com'+ this.$route.path
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
                    content: 'Anio - Máy Tính Xách Tay, Laptop'
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
                    content: 'https://anio.herokuapp.com/cover.jpg'
                },
            ]
        }
    }
}
</script>