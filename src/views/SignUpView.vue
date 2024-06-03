<template>
    <div class="signup row g-4">
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="signup-catchphrase neuton-extrabold"> 
                <h2 class="neuton-bold"> sign up for the freetown sound. </h2>        
            </div>
        </div> 

        <div v-if="output != ''" class="col-12 col-sm-12 col-lg-12">
            <div class="container-fluid signup-container text-center">
                <h3 class="neuton-bold"> {{ output }} </h3>

                <router-link :to="{name: 'home'}"> 
                    <button class="input neuton-regular"> Go to Home </button>
                </router-link>
            </div>
        </div>

        <div class="col-12 col-sm-12 col-lg-7">
            <div class="container-fluid signup-container">
                <h2 class="text-center neuton-bold"> Create a new account.  </h2>

                <div class="signup-input">
                    <label for="username" class="neuton-bold label"> Enter account username </label>
                <input id="username" v-model="username" class="input neuton-regular">
                </div>

                <div class="signup-input">
                    <label for="nickname" class="neuton-bold label"> Enter display name </label>
                <input id="nickname" v-model="nickname" type="text" class="input neuton-regular">
                </div>

                <div class="signup-input">
                    <label for="password" class="neuton-bold label"> Enter the password </label>
                    <input id="password" v-model="password" type="text" class="input neuton-regular">
                </div>

                <div class="signup-input">
                    <label for="submit" class="neuton-bold label"> Create the account </label>
                    <input id="submit" type="button" class="input neuton-regular" @click="login()" value="Sign Up">
                </div>
            </div>
        </div>

        <div class="col-12 col-sm-12 col-lg-5"> 
            <img src="../assets/location.jpg" class="signup-image"> 
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

    .signup {
        margin: 0.2em;
        margin-bottom: 2em;
    }

    .signup-catchphrase {
        background: url(../assets/focal.png);
        color: whitesmoke; 

        border-radius: 2em;

        align-content: center;
        text-align: center;

        height: 6em;
        font-size: 1.6em;
    }

    .signup-container {
        background-color: rgb(240, 230, 218);
        border-radius: 2em;
        padding: 1em;
    }

    .signup-input {
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

    .signup-result {
        background-color: rgb(235, 221, 204);
        border-radius: 2em;
        padding: 1em;
    }

    .signup-image {
        border-radius: 2em;
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
</style>