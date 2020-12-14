<template>
    <!--User Admin Index-->

    <v-card tile flat>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary--text">Users</v-card-title>
        <v-card-subtitle>Danh sách tài khoản</v-card-subtitle>

        <!--Body-->
        <div>
            <!--Option Search-->
            <v-sheet class="d-flex align-center pa-3" color="heading">
                <!--Input Search-->
                <v-form ref="form" @submit.prevent="ShowUserByQuery" >
                    <v-text-field
                        v-model="KeySearch"
                        outlined dense rounded
                        placeholder="Tìm theo tên thành viên"
                        append-icon="search"
                        color="primary"
                        hide-details
                        autocomplete="off"
                        @click:append="ShowUserByQuery"
                    ></v-text-field>
                </v-form>

                <v-spacer></v-spacer>

                <!--Button Select Role-->
                <div>
                    <!--Company-->
                    <v-menu offset-y min-width="170" nudge-bottom="5">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn 
                                height="40" 
                                color="primary" outlined
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
            <v-simple-table class="Table">
                <template v-slot:default>
                    <!--Table Header-->
                    <thead>
                        <tr>
                            <th width="100">Avatar</th>
                            <th>Tên Thành Viên</th>
                            <th class="text-center" width="120">Chức Vụ</th>
                            <th class="text-center" width="160">Trạng Thái</th>
                        </tr>
                    </thead>

                    <!--Table Body-->
                    <tbody>
                        <tr v-for="(user, indexUser) in Users" :key="indexUser">
                            <!--1 - User Avatar-->
                            <td class="py-2">
                                <v-avatar size="50"><v-img :src="user.profile.avatar" :alt="user.profile.name"></v-img></v-avatar>
                            </td>

                            <!--2 - User Name-->
                            <td class="text-uppercase font-weight-bold primary--text">{{ user.profile.name }}</td>

                            <!--3 - User Role-->
                            <td class="text-center font-weight-bold">
                                <v-chip
                                    dark
                                    :color="user.role == 'ADMIN' ? 'admin' : 'guest'"
                                >
                                    {{ user.role }}
                                </v-chip>
                            </td>

                            <!--4 - User Verification-->
                            <td class="text-center font-weight-bold">
                                <v-chip
                                    dark
                                    :color="user.verification ? 'info' : ''"
                                >
                                    {{ user.verification ? 'Đã Xác Minh' : 'Chưa Xác Minh' }}
                                </v-chip>
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
            <v-sheet class="d-flex justify-space-between align-center py-2 px-4" color="heading">
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
        </div>
    </v-card>
</template>

<script>
export default {
    async asyncData({$axios, $api}){
        try {
            let Get = await $axios.$post($api.user.admin.GetUsers, {
                skip: 0
            });

            return {
                Users: Get.users,
                Count: Get.count
            }
        }
        catch(e){
            console.log(e)
            return {
                Users: [],
                Count: 0
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