<template>
    <!--Dialog Status-->

    <v-dialog v-model="DialogStatusStore.show" max-width="400" persistent>
        <v-card>
            <!--Icon-->
            <div class="d-flex justify-center py-4">
                <v-avatar size="90">
                    <v-icon size="90" :color="DialogStatusStore.type">{{ DialogStatusStore.icon }}</v-icon>
                </v-avatar>
            </div>

            <!--Code-->
            <div class="text-center text-h4 font-weight-bold primary--text mb-2">
                <span :class="`${DialogStatusStore.type}--text`">{{ DialogStatusStore.code }}</span>
            </div>

            <!--Text-->
            <div class="text-center px-6 text-h5 font-weight-light">
                {{ DialogStatusStore.text }}
            </div>

            <!--Close Button-->
            <v-card-actions class="justify-center pa-0 pt-8">
                <v-btn block x-large elevation="0" :color="DialogStatusStore.type" @click="Close">
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