<template>
    <v-sheet class="pa-0 px-md-4" color="transparent">
        <v-carousel
            cycle height="auto"
            hide-delimiters
            hide-delimiter-background
            show-arrows-on-hover
        >
            <v-carousel-item v-for="item in News" :key="item">
                <v-img :src="item"></v-img>
            </v-carousel-item>
        </v-carousel>
    </v-sheet>
</template>

<script>
export default {
    data () {
        return {
            News: [
                'https://admin.thinkpro.vn//backend/uploads/banner/2020/9/15/sale-lon-chao-tan-sinh-vien.png',
                'https://admin.thinkpro.vn//backend/uploads/banner/2020/9/15/Dell-Gaming-G7-7590.png',
                'https://admin.thinkpro.vn//backend/uploads/banner/2020/8/27/LG-banner.jpg',
                'https://admin.thinkpro.vn//backend/uploads/banner/2020/9/15/ngay-hoi-tin-do-thinkpad.png'
            ],
        }
    }
}
</script>