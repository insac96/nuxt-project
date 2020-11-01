<template>
    <!--p_header_setting-->

    <v-menu 
        attach left offset-y
        transition="slide-y-transition" 
        min-width="250"
        nudge-bottom="3"
    >   
        <!--Button-->
        <template v-slot:activator="{ on }">
            <v-btn fab elevation="0" small color="header_button" class="ml-1" v-on="on">
                <v-icon>settings</v-icon>
            </v-btn>
        </template>

        <!--Menu-->
        <LazyHydrate when-visible>
            <v-list subheader>
                <!--Theme-->
                <v-subheader>Theme</v-subheader>
                <v-list-item class="justify-center">
                    <v-btn large tile elevation="0" :color="$vuetify.theme.dark == false ? 'primary' : ''" @click="ChangeTheme(false)" dark>
                        Light
                        <v-icon class="ml-2">wb_sunny</v-icon>
                    </v-btn>

                    <v-btn large tile elevation="0" :color="$vuetify.theme.dark == true ? 'primary' : ''" @click="ChangeTheme(true)">
                        Dark
                        <v-icon class="ml-2">brightness_2</v-icon>
                    </v-btn>
                </v-list-item>

                <!--Color-->
                <v-subheader>Color</v-subheader>
                <v-list-item class="justify-center">
                    <v-btn 
                        v-for="color in ListColor" :key="color"
                        fab small 
                        elevation="0" 
                        class="mx-1"
                        :color="color"
                        @click="ChangeColor(color)"
                    ></v-btn>
                </v-list-item>
            </v-list>
        </LazyHydrate>
    </v-menu>
</template>

<script>
export default {
    props: {
        admin: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            Color: 'primary',
            ListColor: [
                '#1976d2', '#a26c10', '#099487', '#b55165'
            ]
        }
    },

    mounted () {
        let vm = this;

        setTimeout(() => {
            vm.SetTheme();
        }, 100);
    },

    methods: {
        SetTheme () {
            let Theme = JSON.parse(localStorage.getItem('theme'));
            if(!Theme) return false;

            this.$vuetify.theme.dark = Theme.dark;
            this.$vuetify.theme.themes.dark.primary = Theme.color;
            this.$vuetify.theme.themes.light.primary = Theme.color;
        },

        ChangeTheme (type) {
            this.$vuetify.theme.dark = type;

            this.SaveLocalStorage();
        },

        ChangeColor (color) {
            this.$vuetify.theme.themes.dark.primary = color;
            this.$vuetify.theme.themes.light.primary = color;   

            this.SaveLocalStorage();
        },

        SaveLocalStorage () {
            localStorage.setItem('theme', JSON.stringify({
                dark: this.$vuetify.theme.dark,
                color: this.$vuetify.theme.themes.light.primary
            }));
        }
    }
}
</script>