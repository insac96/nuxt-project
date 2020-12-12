<template>
    <!--a_laptop_order_status-->

    <v-card>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 edit--text">Status Order</v-card-title>
        <v-card-subtitle>Cập nhật trạng thái đơn hàng</v-card-subtitle>

        <!--Body-->
        <v-card-text>
            <v-form ref="form" v-model="Validate">
                <v-text-field
                    v-model="CloneOrder.verification.status"
                    :rules="[ $Rules.specialCharacters, $Rules.multiSpace ]"
                    label="Status"
                    filled rounded
                    placeholder="Cập nhật trạng thái"
                    append-icon="article"
                    color="edit"
                    autocomplete="off"
                    messages="Để trống nếu không xảy ra lỗi khi xác minh"
                >
                </v-text-field>
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="px-6 py-4 pt-0">
            <v-btn 
                color="teal" dark
                rounded elevation="0" 
                large class="mx-0" 
                :loading="Loading.edit" 
                @click="EditDoneOrder"
            >
                Hoàn Thành
            </v-btn>

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
                @click="EditStatusOrder"
            >
                {{ CloneOrder.status ? 'Cập Nhật' : 'Xác Minh'}}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';

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
        async EditStatusOrder () {
            if(!this.$refs.form.validate()) return false;

            this.Loading.edit = true;
            
            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditStatusOrder, {
                    _id: this.CloneOrder._id,
                    status: this.CloneOrder.verification.status
                });

                this.Loading.edit = false;

                this.Update(Edit);
            }
            catch(e){
                this.Loading.edit = false;
            }   
        },

        async EditDoneOrder () {
            this.Loading.edit = true;
            
            try {
                let Edit = await this.$axios.$post(LaptopAPI.admin.EditDoneOrder, {
                    _id: this.CloneOrder._id,
                });

                this.Loading.edit = false;

                this.order.done.type = true;
                this.order.pay = 2;

                this.Cancel();
            }
            catch(e){
                this.Loading.edit = false;
            }   
        },

        Update (newUpdateOrder) {
            Object.assign(this.order.verification, newUpdateOrder.verification);

            this.Cancel();
        },

        Cancel () {
            this.$refs.form.resetValidation();
            this.$emit('cancel');
        }
    },
}
</script>