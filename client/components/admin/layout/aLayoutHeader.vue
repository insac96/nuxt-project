<template>
    <v-app-bar app tile flat height="64" color="header_admin" dark fixed>
        <v-app-bar-nav-icon @click="$emit('toggle-nav-left')"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-h5">
            <div class="Breadcrumbs d-inline-block mr-2 text-capitalize" v-for="(item, index) in path" :key="index">
                <span  v-if="item != path[0] && (index + 1) != path.length">
                    <nuxt-link :to="PathRoute(index)">
                        {{item}}
                    </nuxt-link>
                </span>

                <span v-else>{{item}}</span>

                <span v-if="(index + 1) < path.length">/</span>
            </div>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <PHeaderSetting admin></PHeaderSetting>
        
        <v-btn icon to="/">
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