<template>
    <!--g_laptop_product_link_comment-->

    <v-card tile flat>
        <!--Header-->
        <v-sheet color="heading" class="px-4 pt-2 Sticky_Top">
            <span class="text-h6 text-sm-h5 grey--text text--darken-1 font-weight-bold">Bình Luận</span>
            
            <!--Input Comment-->
            <div v-if="UserStore.authentic" class="d-flex pt-4">
                <v-avatar size="56">
                    <v-img :src="UserStore.profile.avatar" :alt="UserStore.profile.name"></v-img>
                </v-avatar>

                <v-form ref="form" v-model="Validate" @submit.prevent="AddComment" style="width: 100%" class="ml-3">
                    <v-text-field
                        v-model="Content"
                        :rules="[ $Rules.required, $Rules.multiSpace ]"
                        placeholder="Để lại câu hỏi hoặc đánh giá của bạn"
                        :disabled="Loading.add"
                        rounded solo flat
                        background-color="input_heading"
                        color="primary"
                        maxlength="200"
                        height="56"
                        counter
                        autocomplete="off"
                    ></v-text-field>
                </v-form>
            </div>
        </v-sheet>

        <!--Body-->
        <v-card-text class="pt-8 pb-2" v-if="Comments.length > 0">
            <v-sheet v-for="(comment, index) in CommentsMap" :key="index" class="d-flex mb-6">
                <!--Avatar User - Left-->        
                <v-avatar size="56">
                    <v-img :src="comment.user.profile.avatar" :alt="comment.user.profile.name"></v-img>
                </v-avatar>

                <!--Comment - Right-->  
                <v-sheet class="ml-3">
                    <!--Content-->
                    <v-card min-height="56" flat class="d-inline-flex align-center rounded-xl py-2 px-6" color="heading">
                        <span class="text-subtitle-1">{{comment.content}}</span>
                    </v-card>

                    <!--Information-->
                    <div class="pl-6 my-1">
                        <span class="text-capitalize font-weight-bold">{{comment.user.profile.name}}</span>
                        <span>-</span>  
                        <span>{{$dayjs(comment.create).fromNow()}}</span>

                        <v-btn text elevation="0" x-small class="ml-1" color="primary" @click="comment.showInputReply = true">Reply</v-btn>
                    </div>

                    <!--Reply-->
                    <GLaptopProductLinkReplyOfComment :product="product" :comment="comment"></GLaptopProductLinkReplyOfComment>
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
            Comments: this.product.comments,
            CommentCount: this.product.commentCount,
            Validate: true,
            Loading: {
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
        }
    },

    methods: {
        //Add
        async AddComment () {
            if(!this.$refs.form.validate()) return false;
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

        //Done Add
        DoneAddComment (NewComment) {
            NewComment.user = {
                _id: this.UserStore.id,
                profile: this.UserStore.profile
            };
            
            this.Comments.push(NewComment);
            this.CommentCount ++;
            
            this.$refs.form.reset();
        },

        //More
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
        }
    }
}
</script>