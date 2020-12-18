<template>
    <!--g-layout-footer-->

    <v-footer color="header lighten-1" padless>
        <v-row justify="center" no-gutters>
            <v-btn
                v-for="link in links"
                :key="link"
                color="white"
                text
                rounded
                class="my-2"
            >
                {{ link }}
            </v-btn>

            <v-col
                class="header py-4 text-center white--text"
                cols="12"
            >
                <strong class="primary--text">TitaLap</strong> @Copyright {{ new Date().getFullYear() }}
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
export default {
    data: () => ({
        links: [
            'Thông Tin',
            'Dịch Vụ',
            'Liên Hệ',
        ],
    }),
}
</script>