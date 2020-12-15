<template>
    <!--Dialog Status-->

    <v-dialog v-model="DialogStatusStore.show" max-width="300" persistent>
        <v-card>
            <!--Icon-->
            <div class="d-flex justify-center py-4">
                <v-avatar size="90">
                    <v-icon size="90" color="primary">{{ DialogStatusStore.icon }}</v-icon>
                </v-avatar>
            </div>

            <!--Code-->
            <div class="text-center text-h4 font-weight-bold primary--text">
                {{ DialogStatusStore.code }}
            </div>

            <!--Text-->
            <div class="text-center px-4 text-h6">
                {{ DialogStatusStore.text }}
            </div>

            <!--Close Button-->
            <v-card-actions class="justify-center py-4">
                <v-btn rounded elevation="0" @click="Close">
                    {{ DialogStatusStore.textCloseButton }}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    computed: {
        DialogStatusStore () {
            return this.$store.state.dialogStatus
        }
    },

    methods: {
        Close () {
            if(this.DialogStatusStore.actionClose) {
                this.DialogStatusStore.actionClose();
            }

            this.$store.commit('dialogStatus/close'); 
        }
    }
}
</script>