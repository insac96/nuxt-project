<template>
    <!--p_dialog_authentic-->
    
    <v-card flat class="px-4 px-md-10 py-8 py-md-10">
        <!--Body-->
        <v-card-text class="py-4 px-0">
            <v-form ref="form" v-model="Validate">
                <!--Username-->
                <v-text-field
                    v-model="Authentic.username"
                    :rules="[$Rules.required, $Rules.min, $Rules.max, $Rules.specialCharacters, $Rules.multiSpace]"
                    label="Username"
                    counter
                    maxlength="15"
                    rounded filled
                    height="55"   
                    autocomplete="off"
                    append-icon="person"
                    :error-messages="ErrorHint.username"
                    @click="ErrorHint.username = null"
                >
                    <template v-slot:message="{ message }">
                        {{ ErrorHint.username ? ErrorHint.username : message }}
                    </template>
                </v-text-field>

                <!--Password-->
                <v-text-field
                    v-model="Authentic.password"
                    :rules="[$Rules.required, $Rules.min, $Rules.multiSpace]"
                    label="Password"
                    type="password"
                    rounded filled
                    height="55"
                    autocomplete="off"
                    append-icon="lock"
                    :error-messages="ErrorHint.password"
                    @click="ErrorHint.password = null"
                >
                    <template v-slot:message="{ message }">
                        {{ ErrorHint.password ? ErrorHint.password : message }}
                    </template>
                </v-text-field>

                <!--Email-->
                <v-text-field
                    v-if="!SigninNow"
                    v-model="Authentic.email"
                    :rules="[$Rules.required, $Rules.email, $Rules.multiSpace]"
                    label="Email"
                    type="email"
                    rounded filled
                    height="55"
                    autocomplete="off"
                    append-icon="email"
                ></v-text-field>
            </v-form>
        </v-card-text>

        <!--Footer-->
        <v-card-actions class="flex-column justify-center px-0 pb-0">
            <v-btn
                v-if="SigninNow" 
                color="primary"
                rounded block
                height="50"
                elevation="0"
                class="text-subtitle-1"
                :loading="Loading.signin"
                @click="Signin"
            >Đăng Nhập</v-btn>

            <v-btn 
                v-else
                color="primary"
                rounded block
                height="50"
                elevation="0"
                class="text-subtitle-1"
                :loading="Loading.signup"
                @click="Signup"
            >Đăng Ký</v-btn>

            <v-btn text :ripple="false" color="white" class="mt-3 grey--text" v-if="SigninNow" @click="SigninNow = false">CHƯA CÓ TÀI KHOẢN</v-btn>
            <v-btn text :ripple="false" color="white" class="mt-3 grey--text" v-else @click="SigninNow = true">ĐÃ CÓ TÀI KHOẢN</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    data () {
        return {
            SigninNow: true,
            Authentic: {
                username: null,
                password: null,
                email: null
            },
            ErrorHint: {
                username: null,
                password: null,
                email: null
            },
            Validate: true,
            Loading: {
                signin: false,
                signup: false
            }
        }
    },

    computed: {
        UserStore() {
            return this.$store.state.user;
        }
    },

    methods : {
        async Signin () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.signin = true;

            try {
                let Signin = await this.$axios.$post(this.$api.user.guest.SignIn, {
                    username: this.Authentic.username,
                    password: this.Authentic.password
                });

                if(Signin.error) throw Signin;

                this.Login(Signin);

                this.Loading.signin = false;
            }
            catch(e){
                this.Loading.signin = false;

                if(e.error && e.status == 'username') return this.ErrorHint.username = e.message;
                if(e.error && e.status == 'password') return this.ErrorHint.password = e.message;
            } 
        },

        async Signup () {
            if(!this.$refs.form.validate()) return false;
            this.Loading.signup = true;

            try {
                let Signup = await this.$axios.$post(this.$api.user.guest.SignUp, {
                    username: this.Authentic.username,
                    password: this.Authentic.password,
                    email: this.Authentic.email
                });

                if(Signup.error) throw Signup;

                this.Login(Signup);

                this.Loading.signup = false;
            }
            catch(e){
                this.Loading.signup = false;

                if(e.error && e.status == 'username') return this.ErrorHint.username = e.message;
            } 
        },

        Login (UserData) {
            this.$cookies.set('token', UserData.token, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7
            });

            this.$store.commit('user/login', UserData);

            this.$emit('cancel');
        }
    }
}
</script>