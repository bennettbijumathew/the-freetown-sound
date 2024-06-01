<template>
    <p> this is for a singular event page. </p>
    <p> Index: {{currentEvent}} </p>

    <div v-if="this.authenticated == true" class="alert alert-info">
        <h2> Search </h2>
        <input v-model="commentSearch">
        
        <div v-for="comment in searchComments(commentSearch)">
            <h2> {{comment.title}} </h2>
            <p> {{comment.text}}</p>
            <h6> {{comment.user}}, {{comment.eventID}}</h6>

        </div>
    </div>

    <div class="alert alert-danger">
        <h2> Add </h2>
        <input type="text" v-model="titleAdd">
        <input type="text" v-model="textAdd">
        <button @click="addComment()"> submit comment </button>
    </div>

    <div class="alert alert-danger">
        <h2> Edit </h2>
        <input type="text" v-model="titleEdit">
        <input type="text" v-model="textEdit">
    </div>

    <div v-for="comment in comments" class="alert alert-warning">
        <h2> {{comment.title}} </h2>
        <p> {{comment.text}}</p>
        <h6> {{comment.user}}, {{comment.eventID}}</h6>
        <button @click="deleteComment(comment.id)"> delete </button>
        <button @click="editComment(comment.id)"> edit comment </button>
    </div>
</template>

<script>
    import axios from "axios"

    export default {
        data() {
            return {
                titleAdd: '',
                textAdd: '',
                
                titleEdit: '',
                textEdit: '',

                commentSearch: '', 

                eventID: parseInt(this.$route.params.id),
                currentEvent: {},
                
                comments: []
            }
        },

        async created() {
            try {
                const response = await axios.get(`http://localhost:3000/events/${this.eventID}`);
                this.currentEvent = response.data;
            }
            
            catch(error) {
                console.error(error);
            }

            try {
                const response = await axios.get(`http://localhost:3000/comments`);
                this.comments = response.data.filter(comment => comment.eventID == this.eventID)
            }
            
            catch(error) {
                console.error(error);
            }
        },

        methods: {
            async addComment() {
                var newComment = {eventID: this.eventID, title: this.titleAdd, text: this.textAdd, user: "Kevin Knowles"};
                const response = await axios.post(`http://localhost:3000/comments`, newComment);

                this.comments = [...this.comments, response.data];
                this.titleAdd = '';
                this.textAdd = '';
            },

            deleteComment(commentID) {
                axios.delete(`http://localhost:3000/comments/${commentID}`);
                this.comments = this.comments.filter((comment) => comment.id !== commentID);
            }, 

            async editComment(commentID) {
                const response = await axios.get(`http://localhost:3000/comments/${commentID}`);
                var newComment = {id: response.data.id, eventID: response.data.eventID, title: this.titleEdit, text: this.textEdit, user: response.data.user};
                var commentIndex = this.comments.findIndex((comment) => comment.id == commentID);

                await axios.put(`http://localhost:3000/comments/${commentID}`, newComment);
                this.comments[commentIndex] = newComment;
            },

            searchComments(word) {
                let filteredComments = []; 
                word = word.toLowerCase()

                if (word.length == 0) {
                    return filteredComments;
                }

                for (let i = 0; i < this.comments.length; i++) {
                    if (this.comments[i].text.toLowerCase().match(word) || this.comments[i].title.toLowerCase().match(word)) {
                        filteredComments.push(this.comments[i])
                    }
                }

                return filteredComments;
            }
        }
    }

</script>