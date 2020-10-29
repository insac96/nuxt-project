<template>
    <!--g_laptop_product_link_comment-->

    <v-card tile flat>
        <!--Header-->
        <v-sheet color="heading" class="px-4 py-2 Sticky_Top">
            <span class="text-h6 text-sm-h5 grey--text text--darken-1 font-weight-bold">Bình Luận</span>
            
            <!--Input Comment-->
            <div v-if="UserStore.authentic" class="d-flex pt-4 pb-1">
                <v-avatar size="56">
                    <v-img :src="UserStore.profile.avatar" :alt="UserStore.profile.name"></v-img>
                </v-avatar>

                <v-text-field
                    full-width
                    class="ml-3"
                    v-model="Content"
                    placeholder="Để lại câu hỏi hoặc đánh giá của bạn"
                    :disabled="Loading.add"
                    outlined rounded
                    color="primary"
                    hide-details
                    autocomplete="off"
                    @keyup.enter="AddComment"
                ></v-text-field>
            </div>
        </v-sheet>

        <!--Body-->
        <v-card-text class="pt-8 pb-2" v-if="Comments.length > 0">
            <v-sheet v-for="(comment, index) in CommentsMap" :key="index" class="d-flex mb-6">               
                <v-avatar size="56">
                    <v-img :src="comment.user.profile.avatar" :alt="comment.user.profile.name"></v-img>
                </v-avatar>

                <v-sheet class="ml-3">
                    <!--Content-->
                    <v-card min-height="56" flat class="d-inline-flex align-center rounded-pill py-2 px-6" color="heading">
                        <span class="text-subtitle-1">{{comment.content}}</span>
                    </v-card>

                    <!--Information-->
                    <div class="pl-6 my-1">
                        <span class="text-capitalize font-weight-bold">{{comment.user.profile.name}}</span>
                        <span>-</span>  
                        <span>{{$dayjs(comment.create).fromNow()}}</span>

                        <v-btn text elevation="0" x-small class="ml-1" color="primary" @click="comment.showInputReply = true">Reply</v-btn>
                    </div>

                    <!--Replys-->
                    <div class="d-flex pl-6 mt-2" v-for="(reply, indexReply) in comment.reply" :key="indexReply">
                        <v-avatar size="40">
                            <v-img :src="reply.user.profile.avatar" :alt="reply.user.profile.name"></v-img>
                        </v-avatar>

                        <v-sheet class="ml-2">
                            <!--Content-->
                            <v-card flat class="d-inline-block rounded-pill py-2 px-4" color="heading">
                                <span class="text-subtitle-1">{{reply.content}}</span>
                            </v-card>
                            
                            <!--Information-->
                            <div class="pl-4 mt-1">
                                <span class="text-capitalize font-weight-bold">{{reply.user.profile.name}}</span>
                                <span>-</span>  
                                <span>{{$dayjs(reply.create).fromNow()}}</span>
                            </div>
                        </v-sheet>
                    </div>

                    <!--Input Reply-->
                    <div class="d-flex pl-6 mt-2" v-if="comment.showInputReply">
                        <v-avatar size="40">
                            <v-img :src="UserStore.profile.avatar" :alt="UserStore.profile.name"></v-img>
                        </v-avatar>

                        <v-text-field
                            v-model="Reply"
                            full-width dense
                            class="ml-3"
                            placeholder="Trả lời bình luận"
                            :disabled="Loading.reply"
                            outlined rounded
                            color="primary"
                            hide-details
                            autocomplete="off"
                            @keyup.enter="AddReply(comment)"
                        ></v-text-field>
                    </div>
                </v-sheet>
            </v-sheet>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="justify-center pt-0 pb-4" v-if="Comments.length != CommentCount">
            <v-btn 
                rounded outlined 
                elevation="0" 
                color="primary" 
                class="px-6" 
                :loading="Loading.more" 
                @click="MoreComment"
            >
                Hiển Thị Thêm
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import LaptopAPI from '@/setting/laptop/api';

export default {
    props: ['product'],

    data () {
        return {
            Content: '',
            Reply: '',
            Comments: this.product.comments,
            CommentCount: this.product.commentCount,
            Loading: {
                add: false,
                more: false,
                reply: false
            }
        }
    },

    computed: {
        UserStore() {
            return this.$store.state.user;
        },
        CommentsMap() {
            this.Comments.map(obj => {
                if(obj.showInputReply == null) return obj.showInputReply = false;
            });

            this.Comments.sort((x,y) => { 
                return new Date(y.create) - new Date(x.create)
            });

            return this.Comments;
        }
    },

    methods: {
        //Comment
        async AddComment () {
            this.Loading.add = true;

            try {
                let NewComment = await this.$axios.$post(LaptopAPI.guest.AddComment, {
                    company: this.product.company._id,
                    trademark: this.product.trademark._id,
                    product: this.product._id,
                    content: this.Content
                });

                this.DoneAddComment(NewComment);
                this.Loading.add = false;
            }
            catch(e){
                this.Loading.add = false;
                return false;
            }
        },

        DoneAddComment (NewComment) {
            NewComment.user = {
                _id: this.UserStore.id,
                profile: this.UserStore.profile
            };
            
            this.Comments.push(NewComment);
            this.CommentCount ++;
            this.Content = '';
        },

        async MoreComment () {
            this.Loading.more = true;

            try {
                let MoreComment = await this.$axios.$post(LaptopAPI.guest.MoreComment, {
                    product: this.product._id,
                    skip: this.Comments.length
                });

                MoreComment.forEach(comment => {
                    this.Comments.push(comment);
                });

                this.Loading.more = false;
            }
            catch(e){
                this.Loading.more = false;
                return false;
            }
        },

        //Reply
        async AddReply (comment) {
            this.Loading.reply = true;

            try {
                let NewReply = await this.$axios.$post(LaptopAPI.guest.AddReplyForComment, {
                    comment: comment._id,
                    content: this.Reply
                });

                this.DoneAddReply(comment, NewReply);
                this.Loading.reply = false;
            }
            catch(e){
                this.Loading.reply = false;
                return false;
            }
        },

        DoneAddReply (comment, NewReply) {
            NewReply.user = {
                _id: this.UserStore.id,
                profile: this.UserStore.profile
            };

            comment.reply.push(NewReply);
            this.Reply = '';
        },
    }
}
</script>