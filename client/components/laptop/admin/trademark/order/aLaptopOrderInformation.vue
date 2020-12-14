<template>
    <!--a_laptop_order_information-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 edit--text">Information Order</v-card-title>
        <v-card-subtitle>Cập nhật thông tin đơn hàng</v-card-subtitle>

        <!--Body-->
        <v-card-text>
            <v-form ref="form" v-model="Validate">
                <!--Name-->
                <v-text-field
                    v-model="CloneOrder.vendor.name"
                    :rules="[ $Rules.required ]"
                    label="Name"
                    filled rounded
                    placeholder="Nhập tên người nhận hàng"
                    append-icon="person"
                    color="edit"
                    :disabled="Loading.edit"
                    autocomplete="off"
                >
                </v-text-field>

                <!--Phone-->
                <v-text-field
                    v-model="CloneOrder.vendor.phone"
                    :rules="[ $Rules.required, $Rules.phone ]"
                    label="Phone"
                    type="number"
                    filled rounded
                    placeholder="Nhập số điện thoại nhận hàng"
                    append-icon="phone"
                    color="edit"
                    :disabled="Loading.edit"
                    autocomplete="off"
                >
                </v-text-field>

                <!--Address-->
                <v-text-field
                    v-model="CloneOrder.vendor.address"
                    :rules="[ $Rules.required ]"
                    label="Address"
                    filled rounded
                    placeholder="Nhập địa chỉ nhận hàng"
                    append-icon="location_on"
                    color="edit"
                    :disabled="Loading.edit"
                    autocomplete="off"
                >
                </v-text-field>

                <!--Note-->
                <v-text-field
                    v-model="CloneOrder.note"
                    label="Note"
                    filled rounded
                    placeholder="Ghi chú đơn hàng"
                    append-icon="article"
                    color="edit"
                    :disabled="Loading.edit"
                    autocomplete="off"
                >
                </v-text-field>
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-spacer></v-spacer>

            <v-btn 
                rounded elevation="0" large 
                :disabled="Loading.edit"
                @click="Cancel"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="edit" dark
                rounded elevation="0" 
                large class="mx-0" 
                :loading="Loading.edit" 
                @click="EditInformationOrder"
            >
                Lưu
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props : ['order'],

    data () {
        return {
            CloneOrder: JSON.parse(JSON.stringify(this.order)),
            Validate: true,
            Loading: {
                edit: false
            }
        }
    },

    watch: {
        order (newVal) {
            this.CloneOrder = JSON.parse(JSON.stringify(newVal))
        }
    },

    methods : {
        async EditInformationOrder () {
            if(!this.$refs.form.validate()) return false;

            this.Loading.edit = true;
            
            try {
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditInformationOrder, {
                    order: this.CloneOrder._id,
                    vendor: this.CloneOrder.vendor._id,
                    newVendor: {
                        name: this.CloneOrder.vendor.name,
                        phone: this.CloneOrder.vendor.phone,
                        address: this.CloneOrder.vendor.address
                    },
                    note: this.CloneOrder.note
                });

                this.Update();
                this.Loading.edit = false;
            }
            catch(e){
                this.Loading.edit = false;
            }   
        },

        Update () {
            this.order.note = this.CloneOrder.note;
            Object.assign(this.order.vendor, this.CloneOrder.vendor);

            this.Cancel();
        },

        Cancel () {
            this.$refs.form.resetValidation();
            this.$emit('cancel');
        }
    },
}
</script>