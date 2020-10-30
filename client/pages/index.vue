<template>
    <!--Home Page-->
    
    <v-container class="pa-0" fluid>
        <v-parallax src="/cover.jpg" class="Cover">
            <v-overlay absolute :value="true">
                <div class="pa-4 text-center">
                    <h1 class="font-weight-bold mb-4">
                        Wellcome
                    </h1>
                    <h4 class="font-weight-thin">
                        Sản phẩm là tổng hợp của các dự án nhỏ trong hệ sinh thái GitHub của tôi
                    </h4>
                    <h5 class="mt-8">
                        Express | MongoDB | NuxtJS
                    </h5>
                    <div class="mt-6">
                        <v-btn large elevation="0" color="#f0f0f0" light href="https://github.com/insac96" link>
                            <v-icon class="mr-2">source</v-icon> GitHub
                        </v-btn>
                        <v-btn large elevation="0" color="#0D47A1" dark href="https://www.facebook.com/mitto.tran.18" link>
                            <v-icon class="mr-2">facebook</v-icon> Facebook
                        </v-btn>
                    </div>
                </div>
            </v-overlay>
        </v-parallax>
    </v-container>
</template>

<script>
export default {
    layout: 'guest',
}
</script>

<style lang="scss" scoped>
    .Cover {
        height: calc(100vh - 60px) !important;

        h1 {
            font-size: 4em;
        }

        h4 {
            font-size: 1.6em;
        }

        h5 {
            font-size: 1.1em;
        }
    }
</style>