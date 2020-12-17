<template>
    <!--g_laptop_product_link_comment-->

    <v-card tile flat>
        <!--Header-->
        <v-sheet color="heading" class="Sticky_Top px-4 py-2">
            <span class="text-h6 text-sm-h5 grey--text text--darken-1 font-weight-bold">Bình Luận</span>
        </v-sheet>

        <!--Fetch Pendding-->
        <v-card-text v-if="$fetchState.pending">
            <v-skeleton-loader type="list-item-avatar-two-line" v-for="i in 3" :key="i"></v-skeleton-loader>
        </v-card-text>

        <!--Fetch Error-->
        <v-card-text v-else-if="$fetchState.error">
            <v-alert type="error" class="BoxShadow"> {{$fetchState.error.message}} </v-alert>
        </v-card-text>
        
        <!--Fetch Done-->
        <div v-else>
            <v-card-text class="py-6 pb-0" v-if="Comments.length > 0">
                <v-sheet v-for="(comment, index) in CommentsMap" :key="index" class="d-flex mb-4">
                    <!--Avatar User - Left-->        
                    <v-avatar :size="SizeComment">
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

                            <v-btn v-if="UserStore.authentic" text elevation="0" x-small class="ml-1" color="primary" @click="comment.showInputReply = true">Reply</v-btn>
                        </div>

                        <!--Reply-->
                        <GLaptopProductLinkReplyOfComment :product="product" :comment="comment"></GLaptopProductLinkReplyOfComment>
                    </v-sheet>
                </v-sheet>
            </v-card-text>

            <!--Footer-->
            <v-card-actions class="justify-center py-2" v-if="Comments.length != countComment">
                <v-btn 
                    rounded 
                    elevation="0" 
                    color="primary" 
                    class="px-6" 
                    :loading="Loading.more" 
                    @click="MoreComment"
                >
                    Hiển Thị Thêm
                </v-btn>
            </v-card-actions>

            <!--Input Comment-->
            <div v-if="UserStore.authentic" class="d-flex pa-4">
                <v-avatar :size="SizeComment">
                    <v-img :src="UserStore.profile.avatar" :alt="UserStore.profile.name"></v-img>
                </v-avatar>

                <v-form ref="form" v-model="Validate" @submit.prevent="AddComment" style="width: 100%" class="ml-2">
                    <v-text-field
                        v-model="Content"
                        :rules="[ $Rules.required, $Rules.multiSpace ]"
                        placeholder="Để lại câu hỏi hoặc đánh giá của bạn"
                        :disabled="Loading.add"
                        rounded solo flat
                        background-color="box"
                        color="primary"
                        maxlength="200"
                        :height="SizeComment"
                        hide-details
                        autocomplete="off"
                    ></v-text-field>
                </v-form>
            </div>

            <div v-else class="d-flex justify-center pa-4">
                <v-btn 
                    rounded 
                    elevation="0" 
                    color="primary" 
                    @click="$store.commit('user/changeDialogAuthentic', true)"
                >
                    Đăng Nhập Để Sử Dụng Tính Năng
                </v-btn>
            </div>
        </div>
    </v-card>
</template>

<script>
export default {
    props: ['product'],

    data () {
        return {
            Skip: 0,
            Content: '',
            Comments: null,
            countComment: null,
            Validate: true,
            Loading: {
                get: true,
                add: false,
                more: false
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
        SizeComment () {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs': return 48
                case 'sm': return 56
                case 'md': return 56
                case 'lg': return 56
                case 'xl': return 56
            }
        },
    },

    async fetch () {
        try {
            let Get = await this.$axios.$post(this.$api.laptop.guest.GetListCommentByProductID, {
                product: this.product._id
            });

            this.Comments = Get.comments;
            this.countComment = Get.countComment;

            this.Loading.get = false;
        }
        catch(e){
            throw new Error(e.toString());
        }
    },

    fetchOnServer: false,

    methods: {
        //Add
        async AddComment () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.add = true;

            try {
                let NewComment = await this.$axios.$post(this.$api.laptop.guest.AddComment, {
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

        //Done Add
        DoneAddComment (NewComment) {
            NewComment.user = {
                _id: this.UserStore.id,
                profile: this.UserStore.profile,
                role: this.UserStore.role,
            };
            NewComment.reply = [];
            
            this.Comments.push(NewComment);
            this.countComment ++;
            
            this.$refs.form.reset();
        },

        //More
        async MoreComment () {
            this.Loading.more = true;

            try {
                let MoreComment = await this.$axios.$post(this.$api.laptop.guest.MoreComment, {
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
        }
    }
}
</script>