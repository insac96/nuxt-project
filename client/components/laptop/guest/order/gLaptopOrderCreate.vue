<template>
    <!--Guest Laptop Order Create-->

    <v-card>
        <!--Header-->
        <v-sheet class="d-flex justify-space-between align-center pr-4">
            <!--Left-->
            <div>
                <v-card-title class="font-weight-bold text-h6 text-sm-h5 primary--text">Đơn Hàng</v-card-title>
                <v-card-subtitle>Tạo đơn hàng mới</v-card-subtitle>
            </div>

            <!--Right-->
            <v-btn small icon elevation="0" @click="$emit('cancel')">
                <v-icon>close</v-icon>
            </v-btn>
        </v-sheet>

        <!--Body - If UserStore.contacts.length < 1-->
        <v-card tile flat v-if="UserStore.contacts.length < 1 || addContact">
            <!--Body-->
            <v-card-text class="py-0">
                <v-alert 
                    v-if="UserStore.contacts.length < 1" 
                    type="warning" color="primary" 
                    border="left" text
                >
                    Hiện tại bạn chưa có thông tin nơi nhận hàng
                </v-alert>

                <v-form ref="form" v-model="Validate">
                    <v-text-field
                        v-model="NewContact.name"
                        :rules="[ $Rules.required ]"
                        label="Name"
                        filled rounded
                        placeholder="Nhập tên người nhận hàng"
                        append-icon="phone"
                        :disabled="Loading.create"
                        autocomplete="off"
                    >
                    </v-text-field>

                    <v-text-field
                        v-model="NewContact.phone"
                        :rules="[ $Rules.required, $Rules.phone ]"
                        label="Phone"
                        type="number"
                        filled rounded
                        placeholder="Nhập số điện thoại nhận hàng"
                        append-icon="phone"
                        :disabled="Loading.create"
                        autocomplete="off"
                    >
                    </v-text-field>

                    <v-text-field
                        v-model="NewContact.address"
                        :rules="[ $Rules.required ]"
                        label="Address"
                        filled rounded
                        placeholder="Nhập địa chỉ nhận hàng"
                        append-icon="location_on"
                        :disabled="Loading.create"
                        autocomplete="off"
                    >
                    </v-text-field>
                </v-form>
            </v-card-text>

            <!--Footer-->
            <v-card-actions class="px-4 pb-4">
                <v-spacer></v-spacer>

                <v-btn 
                    v-if="addContact"
                    elevation="0" rounded 
                    :loading="Loading.create"
                    @click="addContact = false"
                >
                    Quay Lại
                </v-btn>

                <v-btn 
                    elevation="0" color="primary" 
                    rounded 
                    :loading="Loading.create"
                    @click="CreateNewContact"
                >
                    Thêm Mới
                </v-btn>
            </v-card-actions>
        </v-card>

        <!--Body - If UserStore.contacts.length > 0-->
        <v-tabs v-else background-color="primary" dark v-model="Tab" class="rounded-0" hide-slider>
            <v-tab class="ml-2">Giao Hàng</v-tab>
            <v-tab>Lấy Tại Cửa Hàng</v-tab>

            <!--Delivery-->
            <v-tab-item>
                <v-card tile flat>
                    <!--Body-->
                    <v-form ref="form" v-model="Validate" class="px-4 pt-4">
                        <v-select
                            v-model="NewDelivery.vendor"
                            :rules="[ $Rules.required ]"
                            :items="UserStore.contacts"
                            item-value="_id"
                            item-text="address"
                            label="Thông Tin"
                            filled rounded
                            placeholder="Chọn địa chỉ giao hàng"
                            append-icon="location_on"
                            :disabled="Loading.create"
                            autocomplete="off"
                        >
                            <template v-slot:item="{ item, attrs, on }">
                                <v-list-item two-line v-bind="attrs" v-on="on">
                                    <v-list-item-content>
                                        <v-list-item-title>{{item.phone}}</v-list-item-title>
                                        <v-list-item-subtitle>{{item.address}}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>

                            <template v-slot:append-item>
                                <v-list-item @click="addContact = true">
                                    Thêm địa chỉ mới
                                </v-list-item>
                            </template>
                        </v-select>

                        <v-text-field
                            v-if="NewDelivery.vendor"
                            :value="GetPhoneByID(NewDelivery.vendor)"
                            :rules="[ $Rules.required ]"
                            label="Phone"
                            filled rounded
                            append-icon="phone"
                            disabled
                        >
                        </v-text-field>

                        <v-text-field
                            v-model="NewDelivery.pay"
                            :rules="[ $Rules.required ]"
                            label="Thanh Toán"
                            filled rounded
                            append-icon="payment"
                            disabled
                        >
                        </v-text-field>
                    </v-form>

                    <!--Footer-->
                    <v-card-actions class="px-4 pb-4">
                        <v-spacer></v-spacer>

                        <v-btn 
                            elevation="0" color="primary" 
                            rounded 
                            :loading="Loading.create"
                            @click="CreateNewDelivery"
                        >
                            Xác Nhận
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-tab-item>

            <!--Reserve-->
            <v-tab-item>

            </v-tab-item>
        </v-tabs>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';
import UserAPI from '@/setting/user/api';

export default {
    data () {
        return {
            Tab: 0,
            t: false,

            //Contact
            Validate: true,
            addContact: false,
            NewContact: {
                name: this.$store.state.user.profile.name,
                phone: null,
                address: null
            },

            //Delivery
            NewDelivery: {
                vendor: null,
                pay: 'Thanh Toán Khi Nhận Hàng'
            },

            //Reserve
            NewReserve: {
                vendor: null,
            },

            Loading: {
                create: false
            }
        }
    },

    computed: {
        UserStore () {
            return this.$store.state.user;
        }
    },

    methods : {
        async CreateNewContact () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.create = true;
            
            try {
                let NewContact = await this.$axios.$post(UserAPI.guest.CreateNewContact, {
                    name: this.NewContact.name,
                    phone: this.NewContact.phone,
                    address: this.NewContact.address,
                });

                this.$store.commit('user/addNewContact', NewContact);

                this.addContact = false;

                this.$refs.form.reset();
                this.$refs.form.resetValidation();

                this.Loading.create = false;
            }
            catch(e){
                this.Loading.create = false;
            }   
        },

        async CreateNewDelivery () {

        },

        GetPhoneByID (id) {
            let indexItem = this.UserStore.contacts.findIndex(e => e._id == id);

            return this.UserStore.contacts[indexItem].phone;
        }
    }
}
</script>