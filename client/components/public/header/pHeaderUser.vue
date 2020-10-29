<template>
    <!--g_layout_header_user-->

    <div>
        <!--If Authentic False-->
        <v-btn icon @click="Dialog = true" v-if="!UserStore.authentic">
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
                <v-btn icon v-on="on">
                    <v-icon>person</v-icon>
                </v-btn>
            </template>

            <v-list>
                <!--Info-->
                <v-list-item>
                    <v-list-item-avatar>
                        <img :src="UserStore.profile.avatar" :alt="UserStore.profile.name">
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title class="text-capitalize text-h6 font-weight-bold">{{UserStore.profile.name}}</v-list-item-title>
                        <v-list-item-subtitle class="text-caption font-weight-bold">
                            <span :class="UserStore.role == 'ADMIN' ? 'error--text' : 'teal--text'">{{UserStore.role}}</span>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <!--Menu-->
                <v-list-item v-if="UserStore.role == 'ADMIN'" to="/admin">
                    <v-list-item-icon><v-icon>admin_panel_settings</v-icon></v-list-item-icon>
                    <v-list-item-title>Admin Panel</v-list-item-title>
                </v-list-item>

                <!--Cart-->
                <v-list-item>
                    <v-list-item-icon><v-icon>shopping_cart</v-icon></v-list-item-icon>
                    <v-list-item-title>Giỏ Hàng</v-list-item-title>
                </v-list-item>

                <v-list-item>
                    <v-list-item-icon><v-icon>settings</v-icon></v-list-item-icon>
                    <v-list-item-title>Cài Đặt</v-list-item-title>
                </v-list-item>

                <v-divider></v-divider>

                <!--Logout-->
                <v-list-item @click="Logout">
                    <v-list-item-icon><v-icon>power_settings_new</v-icon></v-list-item-icon>
                    <v-list-item-title>Đăng Xuất</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <!--Dialog Authentic-->
        <v-dialog v-model="Dialog" max-width="450">
            <GUserAuthentic 
                @cancel="Dialog = false" 
            ></GUserAuthentic>
        </v-dialog>
    </div>
</template>

<script>
import UserAPI from '@/setting/user/api';

export default {
    data () {
        return {
            Dialog: false,
        }
    },

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