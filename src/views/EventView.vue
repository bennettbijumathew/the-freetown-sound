<template>
    <div class="event row g-3"> 
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="event-catchphrase neuton-extrabold" v-bind:style="{ 'background-image': 'linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0)), url(' + currentEvent.image + ') ' } "> 
                <h2 class="neuton-bold"> {{currentEvent.name}}. </h2>
            </div>
        </div>

        <div class="col-12 col-sm-12 col-lg-12">
            <div class="comment-container"> 
                <div class="text-center">
                    <h2 class="neuton-bold"> comments </h2>
                </div> 

                <div v-if="getAuthenticated == true">
                    <div class="text-center"> 
                        <input type="button" class="button neuton-regular" value="add comment" @click="openAddInput = !openAddInput; openSearchInput = false; openEditInput = false; hideComments = false;">
                        <input type="button" class="button neuton-regular" value="search comments" @click="openSearchInput = !openSearchInput; openAddInput = false; openEditInput = false; hideComments = true;">
                        <input type="button" class="button neuton-regular" value="edit comment" @click="openEditInput = !openEditInput; openAddInput = false; openSearchInput = false; hideComments = false;">
                    </div>

                    <!-- dialog for adding comments -->
                    <div v-if="openAddInput == true" class="search neuton-regular">
                        <div class="comment-input">
                            <label for="titleAdd" class="neuton-bold label"> Add a title to the comment </label>
                            <input type="text" id="titleAdd" v-model="titleAdd" class="input">
                        </div>

                        <div class="comment-input">
                            <label for="textAdd" class="neuton-bold label"> Talk about the event </label>
                            <input type="text" id="textAdd" v-model="textAdd" class="input">
                        </div>

                        <div class="comment-input">
                            <label for="commentSearch" class="neuton-bold label"> Submit a new comment </label>
                            <button @click="addComment()" class="input"> submit comment </button>
                        </div>
                    </div>

                    <!-- dialog for search comment  -->
                    <div v-if="openSearchInput == true" class="neuton-regular">
                        <div class="comment-input">
                            <label for="commentSearch" class="neuton-bold label"> Search </label>
                            <input id="commentSearch" class="input" v-model="commentSearch">
                        </div>
                    </div>

                    <!-- dialog for editing comments -->
                    <div v-if="openEditInput == true" class="search neuton-regular"> 
                        <div class="comment-input">
                            <label for="titleEdit" class="label"> Edit comment title </label>

                            <input type="text" id="titleEdit" v-model="titleEdit" class="input">
                        </div>

                        <div class="comment-input">
                            <label for="textEdit" class="label"> Edit comment. </label>

                            <input type="text" id="textEdit" v-model="textEdit" class="input">
                        </div>
                    </div>
                </div>                 
            </div>
        </div>

        <!-- comments for normal view -->
        <div v-for="comment in getComments" class="col-12 col-sm-12 col-lg-12">
            <div class="comment-card" v-if="openSearchInput == false">
                <h2 class="neuton-bold"> {{comment.title}} </h2>
                <p class="neuton-regular"> {{comment.text}}</p>
                <h6 class="neuton-bold"> Posted by {{comment.user}} </h6>

                <div v-if="getAuthenticated == true && comment.user == this.$store.state.currentUsername"> 
                    <button @click="deleteComment(comment.id)" class="button neuton-regular"> delete </button>
                    <button @click="editComment(comment.id)" class="button neuton-regular"> edit comment </button>
                </div>
            </div>
        </div>

        <div class="d-flex justify-content-center neuton-bold" v-if="openSearchInput == false || hideComments == false"> 
            <paginate
                :page-count="Math.ceil(comments.length / 3)"    
                :page-range="3" 
                :margin-pages="1"
                :click-handler="clickCallback" 
                :prev-text=" 'Previous Page' " 		
                :next-text="'Next Page'" 
                :container-class="'pagination'" 
                :active-class="'currentPage'">
            </paginate>
        </div>

        <!-- commments for search -->
        <div v-for="comment in searchComments(commentSearch)" class="col-12 col-sm-12 col-lg-12">
            <div class="comment-card" v-if="openSearchInput == true || hideComments == false">
                <h2 class="neuton-bold"> {{comment.title}} </h2>
                <p class="neuton-regular"> {{comment.text}}</p>
                <h6 class="neuton-bold"> Posted by {{comment.user}} </h6>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios"
    import Paginate from "vuejs-paginate-next";

    export default {
        components: {
            Paginate
        },

        data() {
            return {
                titleAdd: '',
                textAdd: '',
                
                titleEdit: '',
                textEdit: '',

                commentSearch: '', 

                eventID: parseInt(this.$route.params.id),
                currentEvent: {},
                
                comments: [],

                openSearchInput: false,
                openAddInput: false,
                openEditInput: false, 
                hideComments: false,

                currentPage: 1
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
            },

            getComments: function() {
                let current = this.currentPage * 3;  // total 24 units, suppose 2 per page, 12 pages
                let start = current - 3;
                return this.comments.slice(start, current);
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

                this.titleEdit = '';
                this.textEdit = '';
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
            },

            clickCallback: function(pageNum) {
                this.currentPage = Number(pageNum);
            }
        }
    }

</script>

<style scoped>
    .pagination-button {
        background-color: rgb(240, 230, 218);
    }

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

    /* classes for navigation buttons */
    .button {
        padding-left: 0.8em;
        padding-right: 0.8em;
        padding-bottom: 0.2em;

        margin-left: 0.2em;
        margin-right: 0.2em;

        border-radius: 2em;
        border: none; 

        background-color: rgb(244, 255, 254);
        color: black;

        font-size: 1.1em;
    }

    .button:hover {
        background-color: rgb(210, 243, 241);
        transition: 0.3s;
    }

    .button:active {
        background-color: rgb(204, 240, 237);
        transition: 0.3s;
    }

    .event {
        margin: 0.2em;
        margin-bottom: 2em;
    }

    .event-catchphrase {
        background: url(../assets/focal.png);
        background-size: cover;
        color: whitesmoke; 

        border-radius: 2em;

        align-content: center;
        text-align: center;

        height: 6em;
        font-size: 1.6em;
    }

    .comment-container {
        background-color: rgb(240, 230, 218);
        border-radius: 2em;
        padding: 1em;
    }

    .comment-input {
        background-color: rgb(230, 211, 187);
        border-radius: 2em;
        padding: 1em;
        height: 100%;

        display: flex;
        justify-content: center;
        flex-direction: column;

        margin-top: 1em;
        margin-bottom: 0.5em;
    }

    .comment-card {
        border-radius: 2em;
        padding: 1em;
        background-color: antiquewhite;
    }
</style>