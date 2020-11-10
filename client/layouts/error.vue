<template>
    <v-container :class="`Error fill-height`">
        <v-row align="center" justify="center">
            <v-col cols="12" class="text-center px-6 px-sm-0">
                <h1 :class="`primary--text`">{{error.statusCode}}</h1>
                <p class="text-h5 text-sm-h4 grey--text">{{error.message}}</p>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    scrollToTop: true,

    layout({route}) {
        let Get = route.path.substring(1, 6);
        if(Get == 'admin') return 'admin';
        return 'guest';
    },

    props: {
        error: {
            type: Object,
            default: null
        }
    },

    data () {
        return {
            Color: 'secondary',
            Class: 'Error--guest'
        }
    },

    created () {
        //let Get = this.$route.path.substring(1, 6);

        //if(Get == 'admin') {
        //}
    }
}
</script>

<style lang="scss" scoped>
    .Error {
        height: calc(100vh - 60px);

        h1 {
            font-size: 6em;
            line-height: 1em;
        }
    }
</style>