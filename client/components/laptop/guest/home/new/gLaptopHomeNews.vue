<template>
    <!--News Top List-->

    <!--Fetch Pendding-->
    <v-sheet v-if="$fetchState.pending" color="transparent">
        <v-skeleton-loader type="image"></v-skeleton-loader>
    </v-sheet>

    <!--Fetch Error-->
    <v-sheet v-else-if="$fetchState.error" color="transparent" class="pa-4 px-md-0">
        <v-alert type="error" class="BoxShadow">{{$fetchState.error.message}}</v-alert>
    </v-sheet>

    <!--Fetch Done-->
    <v-sheet v-else class="BoxShadow" color="transparent">
        <v-carousel
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
    </v-sheet>
</template>

<script>
export default {
    data () {
        return {
            ListNews: [],
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