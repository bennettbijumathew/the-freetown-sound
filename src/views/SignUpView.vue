<template>
    <div class="login row g-4">
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="login-catchphrase neuton-extrabold"> 
                <h2 class="neuton-bold"> sign up for the freetown sound. </h2>        
            </div>
        </div> 

        <div class="col-12 col-sm-3 col-lg-3">
            <div class="login-input">
                <label for="username" class="neuton-bold label"> Enter account username </label>
                <input id="username" v-model="username" class="input neuton-regular">
            </div>
        </div>

        <div class="col-12 col-sm-3 col-lg-3">
            <div class="login-input">
                <label for="nickname" class="neuton-bold label"> Enter display name </label>
                <input id="nickname" v-model="nickname" type="password" class="input neuton-regular">
            </div>
        </div>

        <div class="col-12 col-sm-3 col-lg-3">
            <div class="login-input">
                <label for="password" class="neuton-bold label"> Enter the password </label>
                <input id="password" v-model="password" type="password" class="input neuton-regular">
            </div>
        </div>

        <div class="col-12 col-sm-3 col-lg-3">
            <div class="login-input">
                <label for="submit" class="neuton-bold label"> Create new account </label>
                <input id="submit" type="button" class="input neuton-regular" @click="addAccount()" value="Sign Up">
            </div>
        </div>

        <div v-if="output != ''" class="col-12 col-sm-12 col-lg-12">
            <div class="login-result">
                <h2 class="neuton-bold label"> {{ output }} </h2>

                <router-link :to="{name: 'home'}"> 
                    <button class="input neuton-regular"> Go to Home </button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            return {
                accounts: [],

                username: '',
                nickname: '',
                password: '',

                output: ''
            }
        },

        async created() {
            try {
                const response = await axios.get(`http://localhost:3000/accounts`);
                this.accounts = response.data;
            }
            
            catch (error) {
                console.error(error);
            }
        },

        computed: {
            getAuthenticated() {
                return this.$store.state.autheticated;
            }
        },

        methods: {
            async addAccount() {
                // checks if username is similar to any other usernames 
                for (let i = 0; i < this.accounts.length; i++) {
                    if (this.username == this.accounts[i].username) {
                        this.output = "Choose a different username. ";
                        return false; 
                    }
                }

                // checks if the username has at least 5 characters
                if (this.username.length <= 4) {
                    this.output = "You need at least 5 characters in your username.";
                    return false;
			    }

                // checks if password has at least 8 characters
                if (this.password.length <= 7) {
                    this.output = "You need at least 8 characters in your password.";
                    return false;
                }
                
                // checks if password has $, %, ^, &, *
                if (!/(?=[$%^&*])/.test(this.password.trim())) {
                    this.output = "Password dosen't have any special characters such as '$', '%', '^', '&', '*'";
                    return false;
                }

                // adds the new account
                var newAccount = {username: this.username.trim(), password: this.password.trim(), nickname: this.nickname.trim()};
                const response = await axios.post(`http://localhost:3000/accounts`, newAccount);
                this.accounts = [...this.accounts, response.data];

                this.output = 'You have created a new account.';
            }
        } 
    }
</script>

<style scoped>
    .label {
        padding-left: 0.4em;
        font-size: 1.3em;
    }

    .input {
        background-color: rgb(0, 0, 0);
        color: white;
        padding-left: 0.8em;
        padding-right: 0.8em;
        padding-bottom: 0.2em;

        margin-top: 0.2em;
        margin-left: 0.2em;
        margin-right: 0.2em;

        border-radius: 2em;
        border: none; 

        font-size: 1.2em;
        text-align: left;
    }

    .input:hover {
        background-color: #ff9e4f;
        color: white;
        transition: 0.3s;
    }

    .input:focus-visible {
        background-color: #ee8d3f;
        color: white;
    }
    

    .login {
        margin: 0.2em;
        margin-bottom: 2em;
    }

    .login-catchphrase {
        background: url(../assets/focal.png);
        color: whitesmoke; 

        border-radius: 2em;

        align-content: center;
        text-align: center;

        height: 6em;
        font-size: 1.6em;
    }

    .login-input {
        background-color: rgb(230, 211, 187);
        border-radius: 2em;
        padding: 1em;
        height: 100%;

        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .login-result {
        background-color: rgb(235, 221, 204);
        border-radius: 2em;
        padding: 1em;
    }
</style>