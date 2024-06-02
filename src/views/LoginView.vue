<template>
    <p> sign in </p>

    <div> 
        <label> username </label>
        <input v-model="username">
    </div>

    <div> 
        <label> password </label>
        <input v-model="firstPassword">
    </div>

    <div> 
        <label> re-type password </label>
        <input v-model="secondPassword">
    </div>

    <div>
        <button @click="login()"> sign in </button>
    </div>

    <h2> {{output}}</h2>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            return {
                accounts: [],

                username: 'Groverwatch',
                firstPassword: 'bobman$*',
                secondPassword: 'bobman$*',  

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
