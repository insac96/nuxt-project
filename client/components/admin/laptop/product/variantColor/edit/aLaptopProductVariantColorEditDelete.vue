<template>
    <!--a_laptop_product_variantColor_edit_delete-->

    <div>
        <!--Body-->
        <v-alert outlined tile border="right" type="info" color="error" prominent class="ma-0 mb-4 text-subtitle-1">
            Chức năng này sẽ xóa màu sắc <strong>{{color.name}}</strong> của biến thể. Bạn có chắc chắn muốn xóa !
        </v-alert>

        <!--Footer-->
        <v-sheet class="d-flex">
            <v-btn 
                tile elevation="0" 
                large class="mx-0" 
                :disabled="Loading.delete"
                @click="$emit('cancel')"
            >
                Đóng
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn 
                color="error" 
                tile elevation="0" 
                large class="mx-0" 
                :loading="Loading.delete"
                @click="DeleteVariantColor"
            >
                Xóa
            </v-btn>
        </v-sheet>
    </div>
</template>

<script>
import LaptopAPI from '~/setting/laptop/api';

export default {
    props: ['color'],
    
    data () {
        return {
            Loading: {
                delete: false
            }
        }
    },

    methods : {
        async DeleteVariantColor () {
            this.Loading.delete = true;

            try {
                let Delete = await this.$axios.$post(LaptopAPI.admin.DeleteVariantColor, this.color);

                this.$emit('done');
                this.Loading.delete = false;
            }
            catch(e){
                return false;
            }
        }
    }
}
</script>