<template>
    <p> this is for a singular event page. </p>
    <p> Index: {{commentEventID}} </p>

    <input type="text" v-model="titleInput">
    <input type="text" v-model="textInput">
    <button @click="addComments"> submit comment </button>

    <div v-for="(comment) in this.$store.getters.getEventComments(commentEventID)" class="alert alert-warning">
        <h2> {{comment.title}} </h2>
        <p> {{comment.text}}</p>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { mapState } from 'vuex'

    export default {
        data() {
            return {
                titleInput: '',
                textInput: '',
                commentEventID: parseInt(this.$route.params.id)
            }
        },

        computed: {
            ...mapState([
                'comments',
            ]),

            ...mapGetters([
                'getEventComments'
            ])
        },

        methods: {
            addComments () {
                var newComment = {eventID: this.commentEventID, title: this.titleInput, text: this.textInput, dislikeCount: 0, likeCount: 0, user: "Test User"};
                this.$store.commit('addComments', newComment);
    
				// fetch('../json/comments.json', {
				// 	method: 'PUT',
				// 	headers: {
				// 	  'Content-Type': 'application/json'
				// 	},
				// 	body: JSON.stringify(this.$store.getters.getEvents())
				// })

				// .then(response => {
				// 	return response.json( )
				// })

				// .then(data => {
				// 	console.log(data) 
				// })
				// .catch(error => console.log('The error is: ', error))	

            }
        }
    }

</script>