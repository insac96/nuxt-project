<template>
    <!--Layout Admin-->

    <v-app>
        <!--Navigation-->
        <v-navigation-drawer
            app width="300" color="nav"
            v-model="Drawer.left" clipped fixed
        >
            <ALayoutNavLeft :drawer="Drawer.left"></ALayoutNavLeft>
        </v-navigation-drawer>

        <!--Header-->
        <ALayoutHeader @toggle-nav-left="ToggleNavLeft"></ALayoutHeader>

        <!--Main-->
        <v-main>
            <v-row no-gutters justify="center">
                <div class="Screen--lg">
                    <nuxt></nuxt>
                </div>
            </v-row>
        </v-main>

        <!--Dialog Status-->
        <PDialogStatus></PDialogStatus>
    </v-app>
</template>

<script>
export default {
    middleware: 'admin',

    head () {
        return {
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