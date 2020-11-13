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
                    hid: 'og:url',
                    name: 'og:url',
                    content: 'https://anio.herokuapp.com'+ this.$route.path
                },
                {
                    hid: 'og:type',
                    name: 'og:type',
                    content: 'article'
                },
                {
                    hid: 'og:title',
                    name: 'og:title',
                    content: 'Anio - Máy Tính Xách Tay, Laptop'
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    content: 'Máy tính xách tay, laptop giá cả hợp lý, uy tín số 1 Việt Nam'
                }
            ]
        }
    }
}
</script>