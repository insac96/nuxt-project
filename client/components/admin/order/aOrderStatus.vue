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
                v-if="CloneOrder.verification.type"
                color="error" dark
                rounded elevation="0" 
                class="mx-0" large
                :loading="Loading.edit" 
                @click="EditDoneOrder"
            >
                Hoàn Thành
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn 
                large
                rounded elevation="0" 
                :disabled="Loading.edit"
                @click="Cancel"
            >
                Hủy
            </v-btn>
            
            <v-btn 
                color="edit" dark
                rounded elevation="0" 
                class="mx-0" large
                :loading="Loading.edit" 
                @click="EditStatusOrder"
            >
                {{ CloneOrder.verification.type ? 'Cập Nhật' : 'Xác Minh'}}
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
        async EditStatusOrder () {
            if(!this.$refs.form.validate()) return false;

            this.Loading.edit = true;
            
            try {
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditStatusOrder, {
                    _id: this.CloneOrder._id,
                    status: this.CloneOrder.verification.status
                });

                this.UpdateStatus(Edit);
                this.Loading.edit = false;
            }
            catch(e){
                this.Loading.edit = false;
            }   
        },

        async EditDoneOrder () {
            this.Loading.edit = true;
            
            try {
                let Edit = await this.$axios.$post(this.$api.laptop.admin.EditDoneOrder, {
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

        UpdateStatus (newUpdateOrder) {
            Object.assign(this.CloneOrder.verification, newUpdateOrder.verification);
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