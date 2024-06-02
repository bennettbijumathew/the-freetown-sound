<template>
    <div class="event row g-3"> 
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="event-catchphrase neuton-extrabold" v-bind:style="{ 'background-image': 'linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0)), url(' + currentEvent.image + ') ' } "> 
                <h2 class="neuton-bold"> {{currentEvent.name}}. </h2>
            </div>
        </div>

        <!-- <div class="col-12 col-sm-12 col-lg-12">
            <div class="comment"> 
                <div class="text-center">
                    <h2 class="neuton-bold"> comments </h2>
                </div> 

                <div v-for="comment in comments" class="col-12 col-sm-12 col-lg-12">
                    <div class="comment-card">
                        <h2 class="neuton-bold"> {{comment.title}} </h2>
                        <p class="neuton-regular"> {{comment.text}}</p>
                        <h6 class="neuton-bold"> Posted by {{comment.user}} </h6>

                        <div v-if="getAuthenticated == true && comment.user == this.$store.state.currentUsername"> 
                            <button @click="deleteComment(comment.id)"> delete </button>
                            <button @click="editComment(comment.id)"> edit comment </button>
                        </div>
                    </div>
                </div>

            </div>
        </div> -->

        <div class="col-6 col-sm-6 col-lg-6">
            <div class="text-center comment">
                <h2 class="neuton-bold"> comments </h2>
            </div> 
        </div>

        <div class="col-6 col-sm-6 col-lg-6">
            <div class="text-center comment">
                <button> add comment </button>
                <button> search comments </button>
            </div> 
        </div>

        <div v-for="comment in comments" class="col-12 col-sm-12 col-lg-12">
            <div class="comment-card">
                <h2 class="neuton-bold"> {{comment.title}} </h2>
                <p class="neuton-regular"> {{comment.text}}</p>
                <h6 class="neuton-bold"> Posted by {{comment.user}} </h6>

                <div v-if="getAuthenticated == true && comment.user == this.$store.state.currentUsername"> 
                    <button @click="deleteComment(comment.id)"> delete </button>
                    <button @click="editComment(comment.id)"> edit comment </button>
                </div>
            </div>
        </div>

    </div>

    <!--  -->
    <!-- <div v-if="getAuthenticated == true" class="alert alert-info">
        <h2> Search </h2>
        <input v-model="commentSearch">
        
        <div v-for="comment in searchComments(commentSearch)">
            <h2> {{comment.title}} </h2>
            <p> {{comment.text}}</p>
            <h6> {{comment.user}}, {{comment.eventID}}</h6>

        </div>
    </div> -->

    <!-- <div class="alert alert-danger" v-if="getAuthenticated == true">
        <h2> Add </h2>
        <input type="text" v-model="titleAdd">
        <input type="text" v-model="textAdd">
        <button @click="addComment()"> submit comment </button>
    </div> -->

    <!-- <div class="alert alert-danger" v-if="getAuthenticated == true"> 
        <h2> Edit </h2>
        <input type="text" v-model="titleEdit">
        <input type="text" v-model="textEdit">
    </div> -->
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

        computed: {
            getAuthenticated() {
                return this.$store.state.autheticated;
            }
        },

        methods: {
            async addComment() {
                var newComment = {eventID: this.eventID, title: this.titleAdd, text: this.textAdd, user: this.$store.state.currentUsername};
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

<style scoped>
    .event {
        margin: 0.2em;
        margin-bottom: 2em;
    }

    .event-catchphrase {
        background: url(../assets/focal.png);
        color: whitesmoke; 

        border-radius: 2em;

        align-content: center;
        text-align: center;

        height: 6em;
        font-size: 1.6em;
    }

    .comment {
        background-color: rgb(211, 194, 172);
        border-radius: 2em;
        padding: 0.5em;
    }

    .comment-card {
        border-radius: 2em;
        padding: 1em;
        background-color: antiquewhite;
        margin-left: 1em;
        margin-right: 1em;
        margin-bottom: 1em;
    }

    /* classes created for all screens - col */
    @media (min-width: 0px) { 

    }

    /* classes created for large screens - col-sm */
    @media (min-width: 576px) {

    }

    /* classes created for large screens - col-lg */
    @media (min-width: 992px) {        

    }
</style>