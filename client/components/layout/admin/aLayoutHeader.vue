<template>
    <!--a-layout-header-->

    <v-app-bar app tile clipped-left height="60" color="header" fixed>
        <v-app-bar-nav-icon class="white--text" @click="$emit('toggle-nav-left')"></v-app-bar-nav-icon>

        <!--Breadcrumbs-->
        <div class="ml-4 text-h5">
            <div class="d-inline-block mr-2 text-capitalize white--text" v-for="(item, index) in path" :key="index">
                <span v-if="item != path[0] && (index + 1) != path.length">
                    <nuxt-link class="white--text" :to="PathRoute(index)">
                        {{item}}
                    </nuxt-link>
                </span>

                <span v-else>{{item}}</span>

                <span v-if="(index + 1) < path.length">/</span>
            </div>
        </div>

        <v-spacer></v-spacer>

        <!--Setting-->
        <PHeaderSetting admin></PHeaderSetting>
        
        <!--Power Off-->
        <v-btn fab elevation="0" small color="header_button" class="ml-1" to="/">
            <v-icon>power_settings_new</v-icon>
        </v-btn>
    </v-app-bar>
</template>

<script>

export default {
    data () {
        return {
            path: []
        }
    },

    created () {
        this.path = this.$route.path
        .replace(/[/]$/g, '')
        .replace(/^[/]/g, '')
        .replace(/(admin[/])/g, '')
        .split('/');
    },

    watch: {
        $route(to, from) {
            this.path = to.path
            .replace(/[/]$/g, '')
            .replace(/^[/]/g, '')
            .replace(/(admin[/])/g, '')
            .split('/');
        }
    },

    methods: {
        PathRoute(index){
            let a = "/admin/"

            for (let i = 0; i < this.path.length; i++) {
                let item = this.path[i];
                
                if(i < (index + 1)){
                    a = a + item + '/'
                }
            }

            return a;
        },

        WindowsClose(){
            window.close();
        }
    }
}
</script>