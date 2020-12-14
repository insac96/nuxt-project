<template>
    <!--Laptop Product Link Comment-->

    <v-card tile flat>
        <!--Header-->
        <v-card-title class="font-weight-bold text-h4 primary--text">Comment</v-card-title>
        <v-card-subtitle>Các bình luận của sản phẩm</v-card-subtitle>

        <!--Body-->
        <v-card-text class="pb-0">
            <v-sheet v-for="(comment, indexComment) in CommentsMap" :key="indexComment" class="d-flex mb-6">
                <!--Avatar User - Left-->        
                <v-avatar :size="56">
                    <v-img :src="comment.user.profile.avatar" :alt="comment.user.profile.name"></v-img>
                </v-avatar>

                <!--Comment - Right-->  
                <v-sheet class="ml-2">
                    <!--Content-->
                    <v-card flat class="rounded-xl py-2 px-6" color="box">
                        <div class="text-capitalize font-weight-bold">
                            <span v-if="comment.user.role == 'ADMIN'" class="admin--text">{{comment.user.profile.name}}</span>
                            <span v-else class="guest--text">{{comment.user.profile.name}}</span>
                        </div>
                        <span class="text-subtitle-1">{{comment.content}}</span>
                    </v-card>

                    <!--Information-->
                    <div class="pl-6 my-1"> 
                        <span>{{$dayjs(comment.create).fromNow()}}</span>

                        <v-btn text elevation="0" x-small class="ml-1" color="primary" @click="comment.showInputReply = true">Reply</v-btn>
                        <v-btn text elevation="0" x-small class="ml-1" color="delete" :disabled="Loading.delete" @click="DeleteComment(comment, indexComment)">Delete</v-btn>
                    </div>

                    <!--Reply-->
                    <ALaptopProductLinkReplyOfComment :product="product" :comment="comment"></ALaptopProductLinkReplyOfComment>
                </v-sheet>
            </v-sheet>
        </v-card-text>

        <!--Footer-->
        <v-sheet v-if="UserStore.authentic" color="heading" class="d-flex px-4 py-2 Sticky_Bottom">
            <v-avatar :size="56">
                <v-img :src="UserStore.profile.avatar" :alt="UserStore.profile.name"></v-img>
            </v-avatar>

            <v-form ref="form" v-model="Validate" @submit.prevent="AddComment" style="width: 100%" class="ml-2">
                <v-text-field
                    v-model="NewContent"
                    :rules="[ $Rules.required, $Rules.multiSpace ]"
                    placeholder="Để lại câu hỏi hoặc đánh giá của bạn"
                    :disabled="Loading.add || Loading.delete"
                    rounded solo flat
                    background-color="heading_input"
                    color="primary"
                    maxlength="200"
                    :height="56"
                    hide-details
                    autocomplete="off"
                ></v-text-field>
            </v-form>
        </v-sheet>
    </v-card>
</template>

<script>
export default {
    props: ['product'],

    data () {
        return {
            NewContent: '',
            Comments: this.product.comments,
            Validate: true,
            Loading: {
                add: false,
                delete: false
            }
        }
    },

    computed: {
        UserStore() {
            return this.$store.state.user;
        },
        CommentsMap() {
            this.Comments.sort((x,y) => { 
                return new Date(y.create) - new Date(x.create)
            });

            return this.Comments;
        },
    },

    methods: {
        //Add
        async AddComment () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.add = true;

            try {
                let NewComment = await this.$axios.$post(this.$api.laptop.admin.AddComment, {
                    company: this.product.company._id,
                    trademark: this.product.trademark._id,
                    product: this.product._id,
                    content: this.NewContent
                });

                this.DoneAddComment(NewComment);
                this.Loading.add = false;
            }
            catch(e){
                this.Loading.add = false;
            }
        },

        //Done Add
        DoneAddComment (NewComment) {
            NewComment.user = {
                _id: this.UserStore.id,
                profile: this.UserStore.profile,
                role: this.UserStore.role,
            };
            NewComment.reply = [];
            
            this.Comments.push(NewComment);
            
            this.$refs.form.reset();
        },

        //Delete
        async DeleteComment (comment, indexComment) {
            this.Loading.delete = true;

            try {
                let Delete = await this.$axios.$post(this.$api.laptop.admin.DeleteComment, {
                    _id: comment._id
                });

                this.$delete(this.Comments, indexComment);

                this.Loading.delete = false;
            }
            catch(e){
                this.Loading.delete = false;
            }
        }
    }
}
</script>