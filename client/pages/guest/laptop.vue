<template>
    <v-container class="pa-0">
        <nuxt-child></nuxt-child>

        <GLaptopCart></GLaptopCart>
    </v-container>
</template>

<script>
export default {
    head () {
        return {
            title: 'Máy Tính Xách Tay, Laptop',
            meta: [
                //Google
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Máy tính xách tay, laptop giá cả hợp lý, uy tín số 1 Việt Nam'
                },
                //FaceBook
                {
                    property: 'og:url',
                    content: 'https://anio.herokuapp.com'+ this.$route.path
                },
                {
                    property: 'og:type',
                    content: 'article'
                },
                {
                    property: 'og:title',
                    content: 'Anio - Máy Tính Xách Tay, Laptop'
                },
                {
                    property: 'og:description',
                    content: 'Máy tính xách tay, laptop giá cả hợp lý, uy tín số 1 Việt Nam'
                },
                {
                    property: 'og:image',
                    content: 'https://anio.herokuapp.com/cover.jpg'
                }
            ]
        }
    }
}
</script>