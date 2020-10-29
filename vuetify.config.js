import colors from 'vuetify/es5/util/colors';

export default {
    theme: {
        //dark: false,
        options: {
            customProperties: true,
        },
        themes: {
            dark: {
                primary: "#00BCD4",
                secondary: "#d2d2d2",
                background: "#121212",
                header: "#191919",
                input_header: "#313131",
                nav: "#1E1E1E",
                heading: "#272727",

                primary_admin: "#00BCD4",
                background_admin: "#121212",
                header_admin: "#2d2d2d",
                heading_admin: "#272727",
                heading_admin_text: "#ffffff"
            },
            light: {
                primary: "#00BCD4",
                secondary: "#05042c",
                background: "#f4f5f9",
                header: "#05042c",
                input_header: "#FFFFFF",
                nav: "#FFFFFF",
                heading: "#f0f0f0",

                primary_admin: colors.indigo,
                background_admin: "#f4f5f9",
                header_admin: colors.indigo,
                heading_admin: "#e4e4e4",
                heading_admin_text: "#616161"
            }
        }
    }
}