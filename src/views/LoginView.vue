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

    <div v-if="this.authenticated == true">
        <p> you have logined in ! </p>
    </div>

    <div v-if="this.authenticated == false">
        <p> this account is not avaliable. </p>
        <p> please sign up. </p>
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
                firstPassword: 'password',
                secondPassword: 'password',  
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

        methods: {
            login() {
                for (let i = 0; i < this.accounts.length; i++) {
                    if (this.username == this.accounts[i].username && this.firstPassword == this.accounts[i].password  && this.secondPassword == this.accounts[i].password) {
                        this.authenticated = true; 
                        break; 
                    }

                    else {
                        this.authenticated = false;
                    }
                }
            }
        } 
    }
</script>
