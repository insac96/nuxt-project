<template>
    <v-app class="Admin_Layout">
        <v-navigation-drawer
            app fixed
            width="300"
            color="nav"
            v-model="Drawer.left"
        >
            <ALayoutNavLeft :drawer="Drawer.left"></ALayoutNavLeft>
        </v-navigation-drawer>

        <ALayoutHeader @toggle-nav-left="ToggleNavLeft"></ALayoutHeader>

        <v-main>
            <v-container>
                <nuxt></nuxt>
            </v-container>
        </v-main>

    </v-app>
</template>

<script>
import '@/assets/admin.scss';

export default {
    middleware: 'isAdmin',
    
    head () {
        return {
            titleTemplate: 'Admin Control',
            title: 'Admin Control',
            meta: [
                { name: 'viewport', content: 'maximum-scale=1' },
            ],
        }
    },

    data () {
        return {
            Drawer: {
                left: null,
            }
        }
    },

    methods: {
        ToggleNavLeft () {
            if(!this.Drawer.left) return this.Drawer.left = true;

            this.Drawer.left = !this.Drawer.left
        }
    }
}
</script>