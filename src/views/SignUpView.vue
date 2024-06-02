<template>
    <p> sign up </p>

    <div> 
        <label> username </label>
        <input v-model="username">
    </div>

    <div> 
        <label> nickname </label>
        <input v-model="nickname">
    </div>

    <div> 
        <label> password </label>
        <input v-model="password">
    </div>

    <div>
        <button @click="addAccount()"> sign in </button>
    </div>

    <div v-if="output != ''"> 
        <p> {{output}} </p>
    </div>

    <div v-for="account in accounts"> 
        <p> {{ account.id }}, {{ account.username }}, {{ account.password }}</p>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            return {
                accounts: [],

                username: 'admin',
                nickname: 'Kevin Knowles',
                password: 'password',

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
