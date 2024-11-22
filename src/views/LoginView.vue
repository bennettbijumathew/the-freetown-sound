<template>
    <div class="login row g-4">
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="page-catchphrase neuton-extrabold"> 
                <h2 class="neuton-bold"> The Account Page. </h2>        
            </div>
        </div> 

        <div class="col-12 col-sm-7 col-lg-5">
            <div class="login-container"> 
                <div> 
                    <h3 class="neuton-bold"> Log into your account  </h3>     
                </div>

                <!-- This is the error message, it is hidden until an error is found -->
                <div class="login-error" v-if="error != ''"> 
                    <p class="neuton-regular"> {{error}} </p>
                </div>

                <div class="login-inputs">
                    <label for="username" class="label neuton-bold"> Username </label>
                    <input id="username" v-model="username" class="input neuton-regular">
                </div>

                <div class="login-inputs">
                    <label for="firstPassword" class="label neuton-bold"> Enter the password </label>
                    <input id="firstPassword" v-model="firstPassword" type="password" class="input neuton-regular">
                </div>

                <div class="login-inputs">
                    <label for="secondPassword" class="label neuton-bold"> Re-enter the password </label>
                    <input id="secondPassword" v-model="secondPassword" type="password" class="input neuton-regular">
                </div>

                <div class="login-submit">
                    <!-- This input logs the user in using the text inputs -->
                    <input id="submit" type="button" class="button neuton-regular" @click="login()" value="log in">
                    
                    <!-- This is a link to the sign up page -->
                    <p class="neuton-regular"> 
                        Don't have an account? 

                        <router-link :to="{name: 'signup'}" class="neuton-regular login-link"> Create an account </router-link>
                    </p>
                </div>
            </div>
        </div> 

        <!-- This is the image -->
        <div class="col-12 col-sm-5 col-lg-7">
            <div class="login-page neuton-extrabold"> </div>
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
                error: '',
            }
        },


        async created() {
            // Once the state has been created, the database is loaded and put into the accounts array. 
            try {
                const response = await axios.get(`http://localhost:3000/accounts`);
                this.accounts = response.data;
            }
            
            // If the database has not been loaded, an error will appear.
            catch (error) {
                this.error =  error
                console.error(error);
            }
        },

        methods: {
            login() {
                // Loops through every account. 
                for (let i = 0; i < this.accounts.length; i++) {
                    // If log-in details match to an account, proceed.
                    if (this.username == this.accounts[i].username && this.firstPassword == this.accounts[i].password  && this.secondPassword == this.accounts[i].password) {
                        // Changes the authentication to true. This applies to the whole website due to the store. 
                        this.$store.state.autheticated = true;
                        this.$store.state.currentUsername = this.accounts[i].username;
                        this.error = '';
                        
                        // Makes the user go to the home page. 
                        this.$router.push({ path: '/' })

                        // Prevents any further action from happening. 
                        break; 
                    }

                    // If the details are not matching, proceed.
                    else {
                        // Changes the authentication to false. This applies to the whole website due to the store. 
                        this.$store.state.autheticated = false;
                        this.$store.state.currentUsername = '';

                        this.error = 'You have entered the wrong details';
                    }
                }
            }
        } 
    }
</script>

<style scoped>
    /* Resets all of the padding and margin to be 0 */
    * {
        margin: 0em;
        padding: 0em;
    }

    /* Classes for the login part of the page. */
    .login {
        margin: 0.2em;
        margin-bottom: 2em;
    }

    .login-container {
        background-color: var(--login-background);

        border-radius: 2em;
        
        padding: 1.5em;
    }

    .login-inputs {
        display: flex; 
        flex-direction: column;

        margin-top: 1.2em;
        margin-bottom: 1.2em;
    }

    .login-error {
        background-color: var(--error);

        border: 1px solid;
        border-radius: 1em;

        padding: 0.5em;
        padding-left: 1em;

        margin-top: 1.2em;
        margin-bottom: 1.2em;
    }
    
    .login-submit {
        display: flex; 
        justify-content: space-between;
        align-items: center;

        font-size: 1.1em;
        text-align: right;

        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }

    .login-page {
        background-image: url(../assets/login.jpg);
        background-size: cover;

        border-radius: 2em;

        align-content: center;
        text-align: center;

        height: 100%;
    }

    .login-link {
        text-decoration: none;
    }

    /* Classes for the label of each input. */
    .label {
        font-size: 1.1em;
    }

    /* Classes for each input. */
    .input {
        border: 1px solid;
        border-radius: 1em;

        padding: 0.5em;
        padding-left: 1em;
    }

    .input:hover {
        filter: brightness(96%);

        transition: 0.3s;
    }

    .input:focus-visible {
        filter: brightness(98%);

        transition: 0.3s;
    }

    /* Classes for the button. */
    .button {
        background-color: var(--button);
        color: var(--button-text);

        padding-left: 0.8em;
        padding-right: 0.8em;
        padding-bottom: 0.3em;
        padding-top: 0.1em;

        border-radius: 2em;
        border: none; 

        font-size: 1em;
        width: 5em;
    }

    .button:hover {
        background-color: var(--button-hover);
        color: white;

        transition: 0.3s;
    }

    .button:active {
        background-color: var(--button-active);
        color: white;

        transition: 0.3s;
    }
</style>