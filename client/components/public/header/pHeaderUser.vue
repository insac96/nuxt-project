<template>
    <!--p_header_user-->

    <div>
        <!--If Authentic False-->
        <v-btn 
            v-if="!UserStore.authentic"
            fab elevation="0" small 
            color="header_button" class="ml-1" 
            @click="$store.commit('user/changeDialogAuthentic', true)"
        >
            <v-icon>person</v-icon>
        </v-btn>

        <!--If Authentic True-->
        <v-menu 
            v-else
            attach left offset-y
            transition="slide-y-transition" 
            min-width="250"
            nudge-bottom="3"
        >
            <template v-slot:activator="{ on }">
                <v-btn fab elevation="0" small color="header_button" class="ml-1" v-on="on">
                    <v-icon>person</v-icon>
                </v-btn>
            </template>

            <LazyHydrate when-visible>
                <v-list>
                    <!--Info-->
                    <v-list-item>
                        <v-list-item-avatar>
                            <img :src="UserStore.profile.avatar" :alt="UserStore.profile.name">
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title class="text-capitalize text-h6 font-weight-bold">{{UserStore.profile.name}}</v-list-item-title>
                            <v-list-item-subtitle class="text-caption font-weight-bold">
                                <span :class="UserStore.role == 'ADMIN' ? 'admin--text' : 'guest--text'">{{UserStore.role}}</span>
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-divider></v-divider>

                    <!--Menu-->
                    <v-list-item v-if="UserStore.role == 'ADMIN'" to="/admin">
                        <v-list-item-icon><v-icon>admin_panel_settings</v-icon></v-list-item-icon>
                        <v-list-item-title>Admin Panel</v-list-item-title>
                    </v-list-item>

                    <!--Setting-->
                    <v-list-item>
                        <v-list-item-icon><v-icon>settings</v-icon></v-list-item-icon>
                        <v-list-item-title>Tài Khoản</v-list-item-title>
                    </v-list-item>

                    <v-divider></v-divider>

                    <!--Logout-->
                    <v-list-item @click="Logout">
                        <v-list-item-icon><v-icon>power_settings_new</v-icon></v-list-item-icon>
                        <v-list-item-title>Đăng Xuất</v-list-item-title>
                    </v-list-item>
                </v-list>
            </LazyHydrate>
        </v-menu>

        <!--Dialog Authentic-->
        <v-dialog 
            v-model="UserStore.dialogAuthentic" 
            persistent max-width="450" 
            @click:outside="$store.commit('user/changeDialogAuthentic', false)"
        >
            <PDialogAuthentic @cancel="$store.commit('user/changeDialogAuthentic', false)"></PDialogAuthentic>
        </v-dialog>
    </div>
</template>

<script>
export default {
    computed: {
        UserStore() {
            return this.$store.state.user;
        },
    },

    methods : {
        //Logout
        Logout () {
            this.$cookies.remove('token');

            this.$store.commit('user/logout');
        }
    }
}
</script>