<template>
    <div class="signup row g-4">
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="page-catchphrase neuton-extrabold"> 
                <h2 class="neuton-bold"> The Account Page. </h2>        
            </div>
        </div> 

        <div class="col-12 col-sm-7 col-lg-5">
            <div class="signup-container"> 
                <div> 
                    <h3 class="neuton-bold"> Create a new account </h3>     
                </div>

                <!-- This is the error message, it is hidden until an error is found -->
                <div class="signup-error" v-if="error != ''"> 
                    <p class="neuton-regular"> {{error}} </p>
                </div>

                <div class="signup-inputs">
                    <label for="username" class="neuton-bold label"> Enter account username </label>
                    <input id="username" v-model="username" class="input neuton-regular">
                </div>

                <div class="signup-inputs">
                    <label for="nickname" class="neuton-bold label"> Enter a nick name </label>
                    <input id="nickname" v-model="nickname" type="text" class="input neuton-regular">
                </div>

                <div class="signup-inputs">
                    <label for="password" class="neuton-bold label"> Enter the password </label>
                    <input id="password" v-model="password" type="text" class="input neuton-regular">
                </div>

                <div class="signup-submit">
                    <!-- This input creates a new account using the text inputs -->
                    <input id="submit" type="button" class="button neuton-regular" @click="addAccount()" value="create">
                    
                    <!-- This is a link to the log in page -->
                    <p class="neuton-regular"> 
                        Want to log in?

                        <router-link :to="{name: 'login'}" class="neuton-regular login-link"> Click here </router-link>
                    </p>
                </div>
            </div>
        </div> 

        <!-- This is the image -->
        <div class="col-12 col-sm-5 col-lg-7">
            <div class="signup-page neuton-extrabold"> </div>
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

                error: ''
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
                console.error(error);
            }
        },


        methods: {
            async addAccount() {
                // Prevents account to be added based on if inputted username is already used. 
                for (let i = 0; i < this.accounts.length; i++) {
                    if (this.username == this.accounts[i].username) {
                        this.error = "Choose a different username. ";
                        return false; 
                    }
                }

                // If the username has less than 5 characters, don't add account.
                if (this.username.length <= 4) {
                    this.error = "You need at least 5 characters in your username.";
                    return false;
			    }

                // If the password has less than 8 characters, don't add account.
                if (this.password.length <= 7) {
                    this.error = "You need at least 8 characters in your password.";
                    return false;
                }
                
                // If the password does not have $, %, ^, &, *, dont add account. 
                if (!/(?=[$%^&*])/.test(this.password.trim())) {
                    this.error = "Password dosen't have any special characters such as '$', '%', '^', '&', '*'";
                    return false;
                }

                // Once all of the conditions are passed, a new account is put to the variables using the details.
                var newAccount = {username: this.username.trim(), password: this.password.trim(), nickname: this.nickname.trim()};
                
                // A post request is made to post the new account into the accounts database. 
                const response = await axios.post(`http://localhost:3000/accounts`, newAccount);
                
                // The new account is added onto the accounts array, 
                this.accounts = [...this.accounts, response.data];
                this.error = '';

                // Makes the user go to the home page. 
                this.$router.push({ path: '/' })
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

    /* Classes for the signup part of the page. */
    .signup {
        margin: 0.2em;
        margin-bottom: 2em;
    }

    .signup-container {
        background-color: var(--signup-background);
        
        border-radius: 2em;
        
        padding: 1.5em;
    }

    .signup-inputs {
        display: flex; 
        flex-direction: column;

        margin-top: 1.2em;
        margin-bottom: 1.2em;
    }

    .signup-error {
        background-color: var(--error);

        border: 1px solid;
        border-radius: 1em;

        padding: 0.5em;

        margin-top: 1.2em;
        margin-bottom: 1.2em;
    }
    
    .signup-submit {
        display: flex; 
        justify-content: space-between;
        align-items: center;

        font-size: 1.1em;
        text-align: right;

        padding-top: 0.5em;
        padding-bottom: 0.5em;
    }

    .signup-page {
        background-image: url(../assets/signup.jpg);
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
        color: var(--button-text);

        transition: 0.3s;
    }

    .button:active {
        background-color: var(--button-active);
        color: var(--button-text);

        transition: 0.3s;
    }
</style>