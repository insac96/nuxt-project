<template>
    <!--News Link-->

    <v-container v-if="$fetchState.pending">
        <v-card flat tile>
            <v-skeleton-loader type="image, article"></v-skeleton-loader>
        </v-card>
    </v-container>

    <v-container v-else-if="$fetchState.error">
        <v-card flat tile>
            <v-alert type="error" class="BoxShadow"> {{$fetchState.error.message}} </v-alert>
        </v-card>
    </v-container>

    <v-container class="pa-0" v-else>
        <v-card tile flat class="BoxShadow">
            <!--Image-->
            <v-img v-if="News.image" :src="News.image"></v-img>

            <!--Information-->
            <v-card-title class="heading" style="word-break: break-word;">
                <span class="text-uppercase text-h5 text-sm-h4 font-weight-bold grey--text text-darken-2">{{News.title}}</span>
            </v-card-title>
            <v-card-subtitle class="text-subtitle-1 heading pb-2">{{$dayjs(News.create).format('DD/MM/YYYY')}} - by Admin</v-card-subtitle>

            <!--Content-->
            <v-card-text class="pt-4">
                <PBoxContent :content="News.content"></PBoxContent>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    scrollToTop: true,

    data () {
        return {
            News: null,
        }
    },
    
    async fetch(){
        try {
            let News = await this.$axios.$post(LaptopAPI.guest.GetNewsByLink, {
                link: this.$route.params.link
            });

            this.News = News;
        }
        catch(e){
            throw new Error(e.toString());
        }
    },

    fetchOnServer: false,

    head () {
        return {
            title: !this.News ? 'Loading' : this.News.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: !this.News ? 'Loading' : this.News.title
                },
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
                    content: !this.News ? 'Loading' : this.News.title
                },
                {
                    property: 'og:description',
                    content: !this.News ? 'Loading' : this.News.title
                },
                {
                    property: 'og:image',
                    content: !this.News ? 'Loading' : this.News.image
                },
            ]
        }
    },
}
</script>