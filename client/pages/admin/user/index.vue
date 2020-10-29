<template>
    <!--User Admin Index-->

    <v-card tile flat class="BoxShadow">
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary_admin--text">Users</v-card-title>
        <v-card-subtitle>Danh sách tài khoản</v-card-subtitle>

        <!--Body-->
        <v-sheet>
            <!--Option Search-->
            <v-sheet class="d-flex align-center pa-3" color="heading_admin">
                <!--Input Search-->
                <div>
                    <v-text-field
                        v-model="KeySearch"
                        outlined dense rounded
                        placeholder="Tìm theo tên thành viên"
                        append-icon="search"
                        color="primary_admin"
                        hide-details
                        autocomplete="off"
                        @click:append="ShowUserByQuery"
                        @change="ShowUserByQuery"
                    ></v-text-field>
                </div>

                <v-spacer></v-spacer>

                <!--Button Select Role-->
                <div>
                    <!--Company-->
                    <v-menu offset-y min-width="170" nudge-bottom="5">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn 
                                height="40" 
                                color="primary_admin" outlined
                                rounded elevation="0" class="pr-2"
                                v-bind="attrs" v-on="on"
                            >
                                {{RoleSelectShow ? RoleSelectShow : 'All Role'}}
                                <v-icon class="ml-1">arrow_drop_down</v-icon>
                            </v-btn>
                        </template>

                        <v-list>
                            <v-list-item @click="SetRoleSelect()">
                                <v-list-item-title>ALL</v-list-item-title>
                            </v-list-item>

                            <v-list-item
                                v-for="(role, index) in SelectRole" :key="index"
                                @click="SetRoleSelect(role)"
                            >
                                <v-list-item-title>{{ role }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-sheet>

            <!--Table-->
            <v-simple-table class="Table_Laptop">
                <template v-slot:default>
                    <!--Table Header-->
                    <thead>
                        <tr class="TR THead">
                            <th class="TH" width="100">Avatar</th>
                            <th class="TH">Tên Thành Viên</th>
                            <th class="TH text-center" width="120">Chức Vụ</th>
                            <th class="TH text-center" width="160">Trạng Thái</th>
                        </tr>
                    </thead>

                    <!--Table Body-->
                    <tbody>
                        <tr v-for="(user, indexUser) in Users" :key="indexUser" class="TR TR_Hover">
                            <!--1 - User Avatar-->
                            <td class="TD py-2">
                                <v-avatar><v-img :src="user.profile.avatar" :alt="user.profile.name"></v-img></v-avatar>
                            </td>

                            <!--2 - User Name-->
                            <td class="TD text-uppercase font-weight-bold primary_admin--text">{{ user.profile.name }}</td>

                            <!--3 - User Role-->
                            <td class="TD text-center font-weight-bold text-subtitle-1">
                                <span :class="user.role == 'ADMIN' ? 'error--text' : 'teal--text'">{{ user.role }}</span>
                            </td>

                            <!--4 - User Verification-->
                            <td class="TD text-center font-weight-bold text-subtitle-1">
                                <span v-if="user.verification" class="info--text">Đã Xác Minh</span>
                                <span v-else class="grey--text">Chưa Xác Minh</span>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <!--If List Product Empty-->
            <v-alert
                v-if="Users.length < 1" 
                class="mb-0" tile
            >
                Không có thành viên nào hiển thị
            </v-alert>

            <!--Body Footer-->
            <v-sheet class="d-flex justify-space-between align-center py-2 px-4" color="heading_admin">
                <!--Count-->
                <v-chip> 
                    <span>{{Users.length}} / {{Count}}</span>
                </v-chip>

                <!--Button Next Previous-->
                <v-btn 
                    elevation="0" rounded 
                    v-if="(Users.length < Count)" 
                    @click="ShowUserByQuery('more');"
                >
                    More
                </v-btn>
            </v-sheet>
        </v-sheet>
    </v-card>
</template>

<script>
import UserAPI from '@/setting/user/api';

export default {
    async asyncData({$axios}){
        try {
            let Get = await $axios.$post(UserAPI.admin.GetUsers, {
                skip: 0
            });

            return {
                Users: Get.users,
                Count: Get.count
            }
        }
        catch(e){
            return {
                Users: []
            }
        }
    },

    data () {
        return {
            SelectRole: [
                'GUEST', 'ADMIN'
            ],
            RoleSelectShow: null,
            KeySearch: null
        }
    },

    methods : {
        //Set Query
        SetRoleSelect (role) {
            this.RoleSelectShow = role ? role : null;

            this.ShowUserByQuery();
        },

        //Search
        async ShowUserByQuery (type) {
            try {
                let Search = await this.$axios.$post(UserAPI.admin.GetUsers, {
                    skip: (type === 'more') ? this.Users.length : 0,
                    role: this.RoleSelectShow ? this.RoleSelectShow : null,
                    key: this.KeySearch ? this.KeySearch : null,
                });

                if(type === 'more') return this.Users = this.Users.concat(Search.users);

                this.Users = Search.users;
                this.Count = Search.count;
            }
            catch(e){
                return false;
            }
        }
    }
}
</script>