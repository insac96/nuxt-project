<template>
    <v-app-bar app fixed color="header" height="60">
        <!--Logo-->
        <nuxt-link to="/" class="white--text text-h4 font-weight-bold">
            Pro<span class="primary--text">ject</span>
        </nuxt-link>

        <v-spacer></v-spacer>

        <!--Buttons Funciton-->
        <div class="d-flex">
            <!--Search-->
            <v-btn fab elevation="0" small color="header_button" class="ml-1">
                <v-icon>search</v-icon>
            </v-btn>

            <!--Setting-->
            <PHeaderSetting></PHeaderSetting>

            <!--User-->
            <PHeaderUser></PHeaderUser>
        </div>
    </v-app-bar>
</template>

<script>
export default {
    data () {
        return {
        }
    }
}
</script>