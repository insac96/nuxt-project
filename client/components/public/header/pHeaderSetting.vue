<template>
    <!--p_header_setting-->

    <div>
        <!--Menu-->
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
                            color="primary" large
                            block elevation="0" tile
                            @click="DialogColor = true"
                        ></v-btn>
                    </v-list-item>
                </v-list>
            </LazyHydrate>
        </v-menu>

        <!--Dialog Color-->
        <v-dialog v-model="DialogColor" persistent width="300">
            <v-card>
                <v-color-picker v-model="Color" dot-size="10" hide-mode-switch hide-inputs></v-color-picker>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn rounded elevation="0" @click="CloseDialogColor">
                        Hủy
                    </v-btn>

                    <v-btn rounded elevation="0" color="primary" dark @click="ChangeColor(Color)">
                        Thay Đổi
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
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
            Color: this.$vuetify.theme.themes.dark.primary || this.$vuetify.theme.themes.light.primary,
            DialogColor: false
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
            this.Color = Theme.color;
        },

        ChangeTheme (type) {
            this.$vuetify.theme.dark = type;

            this.SaveLocalStorage();
        },

        ChangeColor (color) {
            this.$vuetify.theme.themes.dark.primary = color;
            this.$vuetify.theme.themes.light.primary = color;   

            this.SaveLocalStorage();
            this.CloseDialogColor();
        },

        SaveLocalStorage () {
            localStorage.setItem('theme', JSON.stringify({
                dark: this.$vuetify.theme.dark,
                color: this.$vuetify.theme.themes.light.primary
            }));
        },

        CloseDialogColor () {
            this.Color = this.$vuetify.theme.themes.light.primary;
            this.DialogColor = false;
        }
    }
}
</script>