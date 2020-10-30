<template>
    <v-app-bar app fixed flat color="header" height="60">
        <!--Button Bar
        <v-btn icon height="48" width="48">
            <v-icon>reorder</v-icon>
        </v-btn>-->

        <!--Logo-->
        <nuxt-link to="/" class="white--text text-h4 font-weight-bold">
            Pro<span class="primary--text">ject</span>
        </nuxt-link>

        <v-spacer></v-spacer>

        <!--Buttons Funciton-->
        <!--Search-->
        <v-btn fab elevation="0" small color="header_button" class="ml-1">
            <v-icon>search</v-icon>
        </v-btn>

        <!--Setting-->
        <PHeaderSetting></PHeaderSetting>

        <!--User-->
        <PHeaderUser></PHeaderUser>
    </v-app-bar>
</template>