<template>
    <!--News Link-->

    <!--Fetch Pending-->
    <div v-if="$fetchState.pending || $fetchState.error" class="pa-4 px-md-0">
        <v-skeleton-loader type="image, article"></v-skeleton-loader>

        <v-alert v-if="$fetchState.error" type="error" class="BoxShadow mt-4"> {{$fetchState.error.message}} </v-alert>
    </div>

    <!--Fetch Done-->
    <div class="BoxShadow" v-else>
        <v-card tile flat>
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
    </div>
</template>

<script>
export default {
    scrollToTop: true,

    data () {
        return {
            News: null,
        }
    },
    
    async fetch(){
        try {
            let News = await this.$axios.$post(this.$api.laptop.guest.GetNewsByLink, {
                link: this.$route.params.link
            });

            this.News = News;
        }
        catch(e){
            throw new Error(e.toString());
        }
    },

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
                    content: !this.News ? 'Loading' : this.News.title
                },
                {
                    hid: 'og:description',
                    name: 'og:description',
                    property: 'og:description',
                    content: !this.News ? 'Loading' : this.News.title
                },
                {
                    hid: 'og:image',
                    name: 'og:image',
                    property: 'og:image',
                    content: !this.News ? 'Loading' : this.News.image
                },
            ]
        }
    },
}
</script>