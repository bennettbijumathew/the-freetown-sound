<template>
    <div class="login row g-4">
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="login-catchphrase neuton-extrabold"> 
                <h2 class="neuton-bold"> accounts </h2>        
            </div>
        </div> 

        <div v-if="output != ''" class="col-12 col-sm-12 col-lg-12">
            <div class="container-fluid login-container text-center">
                <h3 class="neuton-bold"> {{ output }} </h3>

                <router-link :to="{name: 'home'}"> 
                    <button class="input neuton-regular"> Go to Home </button>
                </router-link>
            </div>
        </div>

        <div class="col-12 col-sm-12 col-lg-7">
            <div class="container-fluid login-container">
                <h2 class="text-center neuton-bold"> Log into your account.  </h2>

                <dv class="login-input">
                    <label for="username" class="neuton-bold label"> Enter the username </label>
                    <input id="username" v-model="username" class="input neuton-regular">
                </dv>

                <div class="login-input">
                    <label for="firstPassword" class="neuton-bold label"> Enter the password </label>
                    <input id="firstPassword" v-model="firstPassword" type="password" class="input neuton-regular">
                </div>

                <div class="login-input">
                    <label for="secondPassword" class="neuton-bold label"> Re-enter the password </label>
                    <input id="secondPassword" v-model="secondPassword" type="password" class="input neuton-regular">
                </div>

                <div class="login-input">
                    <label for="submit" class="neuton-bold label"> Log into the account </label>
                    <input id="submit" type="button" class="input neuton-regular" @click="login()" value="Log In">
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-12 col-lg-5"> 
            <img src="../assets/location.jpg" class="login-image"> 
        </div>

        <div class="col-12 col-sm-12 col-lg-12"> 
            <div class="container-fluid login-container text-center">
                <h2 class="neuton-bold"> Don't have an account? </h2>

                <router-link :to="{name: 'signup'}"> 
                    <button class="input neuton-regular"> Sign Up </button>
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
                firstPassword: '',
                secondPassword: '',  

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
            login() {
                for (let i = 0; i < this.accounts.length; i++) {
                    if (this.username == this.accounts[i].username && this.firstPassword == this.accounts[i].password  && this.secondPassword == this.accounts[i].password) {
                        this.$store.state.autheticated = true;
                        this.$store.state.currentUsername = this.accounts[i].username;
                        this.output = 'You have logged into the website. ';
                        break; 
                    }

                    else {
                        this.output = 'You have entered the wrong details. ';
                    }
                }
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
        background-color: rgb(244, 255, 254);
        color: black;
        
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
        background-color: rgb(210, 243, 241);
        transition: 0.3s;
    }

    .input:focus-visible {
        background-color: rgb(204, 240, 237);
        transition: 0.3s;
    }
    
    .login {
        margin: 0.2em;
        margin-bottom: 2em;
    }

    .login-catchphrase {
        background: url(../assets/focal.png);
        background-size: cover;
        color: whitesmoke; 

        border-radius: 2em;

        align-content: center;
        text-align: center;

        height: 6em;
        font-size: 1.6em;
    }

    .login-container {
        background-color: rgb(240, 230, 218);
        border-radius: 2em;
        padding: 1em;
    }

    .login-input {
        background-color: rgb(230, 211, 187);
        border-radius: 2em;
        padding: 1em;
        height: 100%;

        display: flex;
        justify-content: center;
        flex-direction: column;

        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    .login-result {
        background-color: rgb(235, 221, 204);
        border-radius: 2em;
        padding: 1em;
    }

    .login-image {
        border-radius: 2em;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
</style>