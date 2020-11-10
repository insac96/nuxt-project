<template>
    <v-app>
        <v-navigation-drawer
            app width="300" color="nav"
            v-model="Drawer.left" clipped fixed
        >
            <ALayoutNavLeft :drawer="Drawer.left"></ALayoutNavLeft>
        </v-navigation-drawer>

        <ALayoutHeader @toggle-nav-left="ToggleNavLeft"></ALayoutHeader>

        <v-main>
            <v-row no-gutters justify="center">
                <div class="Screen--lg">
                    <nuxt></nuxt>
                </div>
            </v-row>
        </v-main>
    </v-app>
</template>

<script>
export default {
    middleware: 'admin',

    name: 'admin_layout',
    
    head () {
        return {
            titleTemplate: 'Anio - Admin Control',
            title: 'Anio - Admin Control',
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