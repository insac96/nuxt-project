<template>
    <!--News Top List-->

    <v-card flat tile color="transparent">
        <!--Fetch Pendding-->
        <v-card-text v-if="$fetchState.pending || $fetchState.error">
            <v-skeleton-loader type="image"></v-skeleton-loader>
        </v-card-text>

        <!--Fetch Done-->
        <div v-else>
            <!--List News Empty-->
            <v-card-text v-if="ListNews.length < 1">
                <v-alert type="info" color="primary" class="BoxShadow mb-0" >Hiện Tại Không Có Tin Tức Để Hiển Thị</v-alert>
            </v-card-text>

            <!--Carousel-->
            <v-card-text class="pa-0">
                <v-carousel
                    v-if="ListNews.length > 0"
                    cycle height="auto"
                    hide-delimiters
                    hide-delimiter-backgroung
                >
                    <v-carousel-item v-for="(news, indexNews) in ListNews" :key="indexNews" :to="`laptop/news/${news.link}`">
                        <LazyHydrate when-visible>
                            <v-img :src="news.image" :aspect-ratio="1682/700">
                                <!--Review Titile-->
                                <v-row no-gutters class="fill-height" align="end">
                                    <v-sheet 
                                        width="100%" 
                                        class="Text-Nowap text-uppercase px-4 py-2 text-center" 
                                        color="#1e1e1e4a"
                                    >{{news.title}}</v-sheet>
                                </v-row>

                                <!--Lazy Load-->
                                <template v-slot:placeholder>
                                    <v-sheet width="100%" height="100%" color="card" class="d-flex justify-center align-center">
                                        <v-progress-circular
                                            indeterminate
                                            color="primary"
                                        ></v-progress-circular>
                                    </v-sheet>
                                </template>
                            </v-img>
                        </LazyHydrate>
                    </v-carousel-item>
                </v-carousel>
            </v-card-text>
        </div>
    </v-card>
</template>

<script>
export default {
    data () {
        return {
            ListNews: [],
            HasListNews: false
        }
    },

    async fetch(){
        try {
            let ListNews = await this.$axios.$get(this.$api.laptop.guest.GetListNewsByTop);

            this.ListNews = ListNews;
        }
        catch(e){
            throw new Error(e.toString());
        }
    },

    fetchOnServer: false,

    activated() {
        if (this.$fetchState.timestamp <= Date.now() - 30000) {
            this.$fetch()
        }
    }
}
</script>