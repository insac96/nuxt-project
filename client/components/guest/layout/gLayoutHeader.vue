<template>
    <v-app-bar app fixed dark flat color="header" height="64">
        <!--Button Bar
        <v-btn icon height="48" width="48">
            <v-icon>reorder</v-icon>
        </v-btn>-->

        <!--Logo-->
        <nuxt-link to="/">
            <v-img 
                src="https://thinkpro.vn/images/logo2.svg" 
                alt="logo" 
                width="130" max-width="150" 
                class="ml-0"
            ></v-img>
        </nuxt-link>

        <v-spacer></v-spacer>

        <!--Buttons Funciton-->
        <!--Search-->
        <v-btn icon>
            <v-icon>search</v-icon>
        </v-btn>

        <!--Setting-->
        <PHeaderSetting></PHeaderSetting>

        <!--User-->
        <PHeaderUser></PHeaderUser>
    </v-app-bar>
</template>