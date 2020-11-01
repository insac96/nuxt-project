<template>
    <v-sheet>
        <!--Replys-->
        <div class="d-flex pl-6 mt-2" v-for="(reply, indexReply) in comment.reply" :key="indexReply">
            <!--Avatar User - Left-->  
            <v-avatar :size="44">
                <v-img :src="reply.user.profile.avatar" :alt="reply.user.profile.name"></v-img>
            </v-avatar>

            <!--Reply - Right-->
            <v-sheet class="ml-2">
                <!--Content-->
                <v-card flat class="rounded-xl py-2 px-4" color="box" min-height="40">
                    <div class="text-capitalize font-weight-bold">
                        <span v-if="reply.user.role == 'ADMIN'" class="admin--text">{{reply.user.profile.name}}</span>
                        <span v-else class="guest--text">{{reply.user.profile.name}}</span>
                    </div>

                    <span class="text-subtitle-1">{{reply.content}}</span>
                </v-card>
                
                <!--Information-->
                <div class="pl-4 mt-1">
                    <span>{{$dayjs(reply.create).fromNow()}}</span>

                    <v-btn text elevation="0" x-small class="ml-1" color="delete" :loading="Loading.delete" @click="DeleteReply(reply, indexReply)">Delete</v-btn>
                </div>
            </v-sheet>
        </div>

        <!--Input Reply-->
        <div v-if="comment.showInputReply" class="d-flex pl-6 mt-2">
            <v-avatar :size="40">
                <v-img :src="UserStore.profile.avatar" :alt="UserStore.profile.name"></v-img>
            </v-avatar>

            <v-form ref="form" class="ml-2" style="width: 100%" @submit.prevent="AddReply(comment)" v-model="Validate">
                <v-text-field
                    v-model="Reply"
                    full-width dense
                    :rules="[ $Rules.required, $Rules.multiSpace ]"
                    counter
                    maxlength="200"
                    placeholder="Trả lời bình luận"
                    :disabled="Loading.reply || Loading.delete"
                    outlined rounded
                    color="primary"
                    autocomplete="off"
                ></v-text-field>
            </v-form>
        </div>
    </v-sheet>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    props: ['product', 'comment'],

    data () {
        return {
            Reply: '',
            Validate: true,
            Loading: {
                reply: false,
                delete: false
            }
        }
    },

    computed: {
        UserStore() {
            return this.$store.state.user;
        }
    },

    methods: {
        //Add
        async AddReply (comment) {
            if(!this.$refs.form.validate()) return false;
            this.Loading.reply = true;

            try {
                let NewReply = await this.$axios.$post(LaptopAPI.admin.AddReplyForComment, {
                    company: this.product.company._id,
                    trademark: this.product.trademark._id,
                    product: this.product._id,
                    comment: comment._id,
                    content: this.Reply
                });

                this.DoneAddReply(comment, NewReply);
                this.Loading.reply = false;
            }
            catch(e){
                this.Loading.reply = false;
            }
        },

        //Done Add
        DoneAddReply (comment, NewReply) {
            NewReply.user = {
                _id: this.UserStore.id,
                profile: this.UserStore.profile,
                role: this.UserStore.role,
            };

            comment.reply.push(NewReply);

            this.$refs.form.reset();
        },

        //Delete
        async DeleteReply (reply, indexReply) {
            this.Loading.delete = true;

            try {
                let Delete = await this.$axios.$post(LaptopAPI.admin.DeleteReplyOfComment, {
                    _id: reply._id
                });

                this.$delete(this.comment.reply, indexReply);

                this.Loading.delete = false;
            }
            catch(e){
                this.Loading.delete = false;
            }
        }
    }
}
</script>
