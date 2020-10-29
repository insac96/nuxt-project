<template>
    <v-menu 
        attach left offset-y
        transition="slide-y-transition" 
        min-width="250"
        nudge-bottom="3"
    >
        <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
                <v-icon>settings</v-icon>
            </v-btn>
        </template>

        <v-list subheader>
            <!--Theme-->
            <v-subheader>Theme</v-subheader>
            <v-list-item class="justify-center">
                <v-btn large tile elevation="0" :color="$vuetify.theme.dark == false ? Color : ''" @click="ChangeTheme(false)" dark>
                    Light
                    <v-icon class="ml-2">wb_sunny</v-icon>
                </v-btn>

                <v-btn large tile elevation="0" :color="$vuetify.theme.dark == true ? Color : ''" @click="ChangeTheme(true)">
                    Dark
                    <v-icon class="ml-2">brightness_2</v-icon>
                </v-btn>
            </v-list-item>

            <v-subheader>Color</v-subheader>
            <v-list-item>
                <v-btn 
                    v-for="color in ListColor" :key="color"
                    fab small 
                    elevation="0" 
                    :color="color"
                    @click="ChangeColor(color)"
                ></v-btn>
            </v-list-item>
        </v-list>
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
            Color: this.admin ? 'primary_admin' : 'primary',
            ListColor: [
                '#00BCD4', '#009688', '#3F51B5',
                '#EF6C00', '#C62828', '#B388FF'
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
            this.$vuetify.theme.themes.dark.primary_admin = Theme.color;

            this.$vuetify.theme.themes.light.primary = Theme.color;
            this.$vuetify.theme.themes.light.primary_admin = Theme.color;
        },

        ChangeTheme (type) {
            this.$vuetify.theme.dark = type;

            this.SaveLocalStorage();
        },

        ChangeColor (color) {
            this.$vuetify.theme.themes.dark.primary = color;
            this.$vuetify.theme.themes.dark.primary_admin = color;

            this.$vuetify.theme.themes.light.primary = color;
            this.$vuetify.theme.themes.light.primary_admin = color;       

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