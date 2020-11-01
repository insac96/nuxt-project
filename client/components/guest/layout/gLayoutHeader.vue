<template>
    <v-app-bar app fixed color="header" height="60">
        <!--Bar Menu-->
        <v-btn icon class="mr-2 d-inline-flex d-sm-none" @click="BottomMenu = true">
            <v-icon color="white">reorder</v-icon>
        </v-btn>

        <!--Logo-->
        <nuxt-link to="/" class="white--text text-h4 font-weight-bold">
            Pro<span class="primary--text">ject</span>
        </nuxt-link>

        <!--Menu-->
        <v-tabs class="mx-6 d-none d-sm-block" dark>
            <v-tab 
                v-for="item in Menu" 
                :key="item.title" 
                :to="item.path"
                :disabled="item.disabled" 
                link
            >
                {{item.title}}
            </v-tab>
        </v-tabs>

        <v-spacer></v-spacer>

        <!--Buttons Funciton-->
        <div class="d-flex">
            <!--Search-->
            <v-btn fab elevation="0" small color="header_button" class="ml-1">
                <v-icon>search</v-icon>
            </v-btn>

            <!--Setting-->
            <PHeaderSetting></PHeaderSetting>

            <!--User-->
            <PHeaderUser></PHeaderUser>
        </div>

        <!--Bottom Menu-->
        <LazyHydrate when-visible>
            <v-bottom-sheet v-model="BottomMenu">
                <v-list subheader>
                    <v-subheader>Menu</v-subheader>

                    <v-list-item
                        v-for="item in Menu"
                        :key="item.title"
                        :disabled="item.disabled"
                        @click="$router.push(item.path)"
                    >
                        <v-list-item-avatar>
                            <v-icon>{{item.icon}}</v-icon>
                        </v-list-item-avatar>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-bottom-sheet>
        </LazyHydrate>
    </v-app-bar>
</template>

<script>
export default {
    data () {
        return {
            BottomMenu: false,
            Menu: [
                {title: 'Home', icon: 'home', path: '/'},
                {title: 'Laptop', icon: 'laptop', path: '/guest/laptop'}
            ]
        }
    }
}
</script>