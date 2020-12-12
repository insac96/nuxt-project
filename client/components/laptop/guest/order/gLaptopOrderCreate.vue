<template>
    <!--Guest Laptop Order Create-->
    <div>
        <v-card>
            <!--Header-->
            <v-sheet class="d-flex align-center pr-4" color="primary">
                <!--Left-->
                <v-card-title class="font-weight-bold text-h6 text-sm-h5 white--text">
                    {{ addContact ? 'Thêm Thông Tin' : 'Tạo Đơn Hàng' }}
                </v-card-title>

                <v-spacer></v-spacer>

                <!--Right-->
                <v-btn small dark icon elevation="0" @click="$emit('cancel')">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-sheet>

            <!--Body - If addContact = true-->
            <v-card tile flat v-if="addContact" class="pt-6">
                <!--Body-->
                <v-card-text class="py-0">
                    <v-form ref="form" v-model="Validate">
                        <v-text-field
                            v-model="NewContact.name"
                            :rules="[ $Rules.required ]"
                            label="Name"
                            filled rounded
                            placeholder="Nhập tên người nhận hàng"
                            append-icon="person"
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
                <v-card-actions class="pa-4 pt-0">
                    <v-spacer></v-spacer>

                    <v-btn 
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

            <!--Body - Else-->
            <v-card tile flat v-else class="pt-6">
                <!--Body-->
                <v-form ref="form" v-model="Validate" class="px-4">
                    <v-select
                        v-model="NewOrder.vendor"
                        :rules="[ $Rules.required ]"
                        :items="Contacts"
                        item-value="_id"
                        item-text="address"
                        label="Thông Tin"
                        filled rounded
                        placeholder="Chọn thông tin người đặt"
                        append-icon="location_on"
                        :disabled="Loading.order"
                        autocomplete="off"
                        no-data-text="No Data"
                        @click="GetContacts"
                    >
                        <template v-slot:item="{ item, attrs, on }">
                            <v-list-item two-line v-bind="attrs">
                                <v-list-item-content v-on="on">
                                    <v-list-item-title>{{item.phone}}</v-list-item-title>
                                    <v-list-item-subtitle>{{item.address}}</v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-btn icon color="delete" @click="DeleteContact(item._id)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </v-list-item-action>
                            </v-list-item>
                        </template>
                        
                        <template v-slot:append-item>
                            <v-list-item @click="addContact = true">
                                Thêm thông tin người đặt hàng
                            </v-list-item>
                        </template>
                    </v-select>

                    <v-text-field
                        v-if="NewOrder.vendor"
                        :value="GetContactByID(NewOrder.vendor, 'name')"
                        :rules="[ $Rules.required ]"
                        label="Người Nhận"
                        filled rounded
                        append-icon="person"
                        disabled
                    >
                    </v-text-field>

                    <v-text-field
                        v-if="NewOrder.vendor"
                        :value="GetContactByID(NewOrder.vendor, 'phone')"
                        :rules="[ $Rules.required ]"
                        label="Điện Thoại"
                        filled rounded
                        append-icon="phone"
                        disabled
                    >
                    </v-text-field>

                    <v-select
                        v-model="NewOrder.type"
                        :items="TypeOrder"
                        item-value="value"
                        item-text="text"
                        :rules="[ $Rules.required ]"
                        label="Hình Thức"
                        placeholder="Chọn hình thức nhận hàng"
                        filled rounded
                        append-icon="local_shipping"
                        :disabled="Loading.order"
                        autocomplete="off"
                    >
                    </v-select>

                    <v-select
                        v-model="NewOrder.pay"
                        :items="PayOrder"
                        item-value="value"
                        item-text="text"
                        :rules="[ $Rules.required ]"
                        label="Thanh Toán"
                        placeholder="Chọn hình thức thanh toán"
                        filled rounded
                        append-icon="payment"
                        :disabled="Loading.order"
                        autocomplete="off"
                    >
                    </v-select>

                    <v-text-field
                        v-model="NewOrder.note"
                        label="Note"
                        filled rounded
                        placeholder="Ghi chú đơn hàng"
                        append-icon="article"
                        color="edit"
                        autocomplete="off"
                    >
                    </v-text-field>
                </v-form>

                <!--Footer-->
                <v-card-actions class="pa-4 pt-0">
                    <v-spacer></v-spacer>

                    <v-btn 
                        elevation="0" color="primary" 
                        rounded 
                        :loading="Loading.order"
                        @click="CreateNewOrder"
                    >
                        Tạo Đơn Hàng
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-card>

        <!--Dialog Done-->
        <v-dialog v-model="DialogDone" max-width="300" persistent>
            <v-card>
                <div class="d-flex justify-center py-4">
                    <v-avatar size="100" color="primary">
                        <v-icon size="100" color="white">check</v-icon>
                    </v-avatar>
                </div>

                <div class="text-center px-4 text-h6">
                    Đặt Hàng Thành Công
                </div>

                <v-card-actions class="justify-center py-4">
                    <v-btn rounded elevation="0" @click="$emit('done')">Đóng</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';
import UserAPI from '@/setting/user/api';

export default {
    props: ['listProductOrder'],

    data () {
        return {
            Contacts: [],

            //DialogDone
            DialogDone: false,

            //Contact
            Validate: true,
            addContact: false,
            NewContact: {
                name: null,
                phone: null,
                address: null
            },

            //Order
            NewOrder: {
                vendor: null,
                pay: null,
                type: null,
                note: null
            },
            PayOrder: [
                {value: 1, text: 'Thanh Toán Khi Nhận Hàng'},
                {value: 2, text: 'Thanh Toán Trước'},
            ],
            TypeOrder: [
                {value: 1, text: 'Giao Hàng'},
                {value: 2, text: 'Đặt trước, nhận tại cửa hàng'},
            ],

            //Loading
            Loading: {
                get: false,
                order: false,
                create: false,
                delete: false
            }
        }
    },

    computed: {
        UserStore () {
            return this.$store.state.user;
        }
    },

    methods : {
        async GetContacts () {
            if(this.Contacts.length > 0) return false;

            this.Loading.get = true;

            try {
                let Contacts = await this.$axios.$get(UserAPI.guest.GetListContact);
                
                this.Contacts = this.Contacts.concat(Contacts);
                this.Loading.get = false;
            }
            catch(e){
                this.Loading.get = false;
            }   
        },

        async CreateNewContact () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.create = true;

            try {
                let NewContact = await this.$axios.$post(UserAPI.guest.CreateNewContact, {
                    name: this.NewContact.name,
                    phone: this.NewContact.phone,
                    address: this.NewContact.address,
                });

                this.Contacts.push(NewContact);

                this.addContact = false;

                this.$refs.form.reset();
                this.$refs.form.resetValidation();

                this.Loading.create = false;
            }
            catch(e){
                this.Loading.create = false;
            }   
        },

        async DeleteContact (_id) {
            this.Loading.delete = true;
            
            try {
                let Delete = await this.$axios.$post(UserAPI.guest.DeleteContact, {
                    _id: _id
                });

                let indexItem = this.Contacts.findIndex(e => e._id == _id);

                if (indexItem > -1) {
                    this.$delete(this.Contacts, indexItem);
                }

                if(this.NewOrder.vendor == _id) {
                    this.NewOrder.vendor = null; 
                }

                this.Loading.delete = false;
            }
            catch(e){
                this.Loading.delete = false;
            }   
        },

        async CreateNewOrder () {
            if(!this.$refs.form.validate()) return false;
            if(this.listProductOrder.length < 1) return false;
            
            this.Loading.order = true;

            try {
                let NewOrder = await this.$axios.$post(LaptopAPI.guest.CreateNewOrder, {
                    vendor: this.NewOrder.vendor,
                    pay: this.NewOrder.pay,
                    type: this.NewOrder.type,
                    note: this.NewOrder.note,
                    listProductOrder: this.listProductOrder
                });

                this.DialogDone = true;

                this.$refs.form.reset();
                this.$refs.form.resetValidation();

                this.Loading.order = false;
            }
            catch(e){
                this.Loading.order = false;
            }   
        },

        GetContactByID (id, type) {
            let indexItem = this.Contacts.findIndex(e => e._id == id);

            return this.Contacts[indexItem][type];
        }
    }
}
</script>