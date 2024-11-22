<template>
    <div class="event row g-3"> 
        <!-- Header of the page -->
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="page-catchphrase"> 
            <!-- <div class="page-catchphrase" v-bind:style="{ 'background-image': 'linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0)), url(' + currentEvent.image + ') ' } ">  -->
                <h2 class="neuton-extrabold"> Valeria </h2>
            </div>
        </div>
        
        <!-- Title for the comment section with buttons to open the add and search dialog -->
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="inputs">
                <div class="inputs-title">
                    <h2 class="neuton-bold"> Comments </h2>

                    <!-- If the user is logged in, the dialog buttons will be shown -->
                    <div v-if="getAuthenticated == true">
                        <button class="button neuton-regular" @click="toggleAddPopout"> add </button>
                        <button class="button neuton-regular" @click="toggleSearchPopout"> search </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- This is the add popout, It is only shown when the user is logged in -->
        <div class="col-12 col-sm-12 col-lg-12" v-if="addPopoutIsOpen == true">
            <div class="inputs">
                <div class="inputs-title">
                    <h3 class="neuton-bold"> Add a comment </h3>

                    <!-- This button closes the popout -->
                    <button class="button neuton-regular" @click="addPopoutIsOpen = !addPopoutIsOpen;"> close </button>
                </div>

                <!-- These are the inputs that are used to add new comments -->
                <div>
                    <div class="inputs-container">
                        <label for="titleAddInput" class="label neuton-bold"> Enter a title for your comment </label>
                        <input type="text" id="titleAddInput" v-model="titleAddInput" maxlength="80" class="input neuton-regular">
                    </div>
                    
                    <div class="inputs-container">
                        <label for="textAddInput" class="label neuton-bold"> Enter a comment </label>
                        <textarea id="textAddInput" v-model="textAddInput" maxlength="600" class="input neuton-regular"> </textarea>
                    </div>

                    <!-- This button adds a new comment -->
                    <input id="submit" type="button" class="button neuton-regular" value="add" @click="addComment">
                </div>
            </div>
        </div>

        <!-- This is the search popout, It is only shown when the user is logged in -->
        <div class="col-12 col-sm-12 col-lg-12" v-if="searchPopoutIsOpen == true">
            <div class="inputs">
                <div class="inputs-title">
                    <h3 class="neuton-bold"> Search for comments </h3>

                    <!-- This button closes the popout -->
                    <button class="button neuton-regular" @click="searchPopoutIsOpen = !searchPopoutIsOpen;"> close </button>
                </div>

                <!-- These are the inputs that are used to search comments -->
                <div class="inputs-container">
                    <label for="commentSearchInput" class="label neuton-bold"> Find a comment </label>
                    <input type="text" id="commentSearchInput" v-model="commentSearchInput" maxlength="80" class="input neuton-regular">
                </div>
            </div>
        </div>

        <!-- This is the edit popout, It is only shown when the user is logged in -->
        <div class="col-12 col-sm-12 col-lg-12" v-if="editPopoutIsOpen == true">
            <div class="inputs">
                <div class="inputs-title">
                    <h3 class="neuton-bold"> Edit a comment </h3>

                    <!-- This button closes the popout -->
                    <button class="button neuton-regular" @click="editPopoutIsOpen = !editPopoutIsOpen;"> close </button>
                </div>

                <!-- These are the inputs that are used to edit comments -->
                <div>
                    <div class="inputs-container">
                        <label for="titleEditInput" class="label neuton-bold"> Edit the title of your comment </label>
                        <input type="text" id="titleEditInput" v-model="titleEditInput" maxlength="80" class="input neuton-regular">
                    </div>
                    
                    <div class="inputs-container">
                        <label for="textEditInput" class="label neuton-bold"> Edit the contents of the comment </label>
                        <textarea id="textEditInput" v-model="textEditInput" maxlength="600" class="input neuton-regular"> </textarea>
                    </div>

                    <!-- This button edits a comment -->
                    <input id="submit" type="button" class="button neuton-regular" value="edit" @click="editComment">
                </div>
            </div>
        </div>

        <!-- This is the comment section -->
        <div class="col-12 col-sm-12 col-lg-12">
            <div class="comments">
                <!-- Shows each comment wihtin a pagniated version of the comments array -->
                <div class="comment" v-for="comment in getComments">
                    <div>
                        <h4 class="neuton-bold"> {{comment.title}} </h4>
                        <p class="neuton-regular comment-text"> {{comment.text}} </p>
                        <p class="neuton-bold"> Posted by {{comment.user}} </p>
                    </div>

                    <!-- If the user is logged in, and has created the comment, they can delete and edit the comment  -->
                    <div v-if="getAuthenticated == true && getCurrentUser == comment.user">
                        <button class="button neuton-regular" @click="toggleEditPopout(comment.id)"> edit </button>
                        <button class="button neuton-regular" @click="deleteComment(comment.id)"> delete </button>
                    </div>
                </div>

                <!-- An message for when there is nothing on the page -->
                <div v-if="pageCount == 0 || pageRange == 0">
                    <h5 class="error neuton-bold"> Nothing here! Try searching a new thing.  </h5>
                </div>

                <!-- This is a pagination element, that allows user to navigate through pages of comments -->
                <paginate
                    :page-count="pageCount"    
                    :page-range="pageRange" 
                    :margin-pages="1"
                    :click-handler="advancePage" 
                    :prev-text="'previous'" 		
                    :next-text="'next'" 

                    :container-class="'pagination neuton-regular'"
                    :page-class="'page-item'"
                    :page-link-class="'page-link'"
                    :active-class="'active'"
                    :disabled-class="'disabled'"
                >
                </paginate>
            </div>  
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import paginate from "vuejs-paginate-next";

    export default {
        components: {
            paginate
        },

        data() {
            return {
                titleAddInput: '',
                textAddInput: '',

                commentSearchInput: '',

                titleEditInput: '',
                textEditInput: '',

                addPopoutIsOpen: false, 
                searchPopoutIsOpen: false,
                editPopoutIsOpen: false,

                eventID: parseInt(this.$route.params.id),
                currentEvent: {},

                currentComment: null, 

                comments: [], 

                currentPage: 1, 
                pageRange: 3, 
                pageCount: 1
            }
        },

        async created() {
            // Gets the event information from the database and then puts it into a variable
            try {
                const response = await axios.get(`http://localhost:3000/events/${this.eventID}`);
                this.currentEvent = response.data;
            }
            
            // If the response dosen't work, an error is printed to the console 
            catch(error) {
                console.error(error);
            }

            // Gets the comments from the event from the database and then puts it into a variable
            try {
                const response = await axios.get(`http://localhost:3000/comments`);
                this.comments = response.data.filter(comment => comment.eventID == this.eventID)
            }
            
            // If the response dosen't work, an error is printed to the console 
            catch(error) {
                console.error(error);
            }
        },

        computed: {
            // Gets the authentication status.
            getAuthenticated() {
                return this.$store.state.autheticated;
            },

            // Gets the current user of the website.
            getCurrentUser() {
                return this.$store.state.currentUsername;
            },

            getComments() {
                let current = this.currentPage * this.pageRange;
                let start = current - this.pageRange;

                // If the search popout is not open, show all of the comments
                if (this.searchPopoutIsOpen == false) {
                    this.pageCount = Math.ceil(this.comments.length / this.pageRange)

                    // Returns the current comments that the user is viewing.  
                    return this.comments.slice(start, current);
                }

                // If the search popout is open, shown a filtered comments
                else {
                    let filteredComments = []; 
                    let word = this.commentSearchInput.toLowerCase()


                    // Sets the page count, and eturns an empty array based on a lack of an input
                    if (word.length == 0) {
                        this.pageCount = Math.ceil(filteredComments.length / this.pageRange)
                        return filteredComments;
                    }

                    // Loops through each comment to find comments with the inputted word in it
                    for (let comment of this.comments) {
                        if (comment.text.toLowerCase().match(word) || comment.title.toLowerCase().match(word)) {
                            filteredComments.push(comment)
                        }
                    }

                    // Sets the page count, and then returns the filtered comments
                    this.pageCount = Math.ceil(filteredComments.length / this.pageRange)

                    // Returns the current comments that the user is viewing.  
                    return filteredComments.slice(start, current);
                }
            },
        }, 

        methods: {
             // This function toggles the add popout
             toggleAddPopout() {
                if (this.addPopoutIsOpen == true) {
                    this.addPopoutIsOpen = false;
                }

                else if (this.addPopoutIsOpen == false) {
                    this.addPopoutIsOpen = true; 
                }

                // If one of the other popouts are open, only allow the add popout to be open
                if (this.addPopoutIsOpen == true && (this.searchPopoutIsOpen == true || this.editPopoutIsOpen == true)) {
                    this.addPopoutIsOpen = true;
                    this.searchPopoutIsOpen = false;
                    this.editPopoutIsOpen = false;
                }
            }, 

            // This function toggles the search popout
            toggleSearchPopout() {
                if (this.searchPopoutIsOpen == true) {
                    this.searchPopoutIsOpen = false 
                }

                else if (this.searchPopoutIsOpen == false) {
                    this.searchPopoutIsOpen = true 
                }

                // If one of the other popouts are open, only allow the search popout to be open
                if (this.searchPopoutIsOpen == true && (this.addPopoutIsOpen == true || this.editPopoutIsOpen == true)) {
                    this.searchPopoutIsOpen = true;
                    this.addPopoutIsOpen = false;
                    this.editPopoutIsOpen = false;
                }

            }, 

            // This function toggles the edit popout  
            toggleEditPopout(commentID) {
                if (this.editPopoutIsOpen == false) {
                    // Finds the index of the comment in the comments array
                    var index = this.comments.findIndex((comment) => comment.id == commentID);
                    
                    // Opens the edit popout. 
                    this.editPopoutIsOpen = true;

                    // Sets the text inputs to the comment correlating to the index
                    this.titleEditInput = this.comments[index].title;
                    this.textEditInput = this.comments[index].text;

                    // Sets the current comment id to the comment correlating to the index
                    this.currentComment = this.comments[index].id;
                }

                // If one of the other popouts are open, only allow the edit popout to be open
                if (this.editPopoutIsOpen == true && (this.searchPopoutIsOpen == true || this.addPopoutIsOpen == true)) {
                    this.editPopoutIsOpen = true;
                    this.addPopoutIsOpen = false;
                    this.searchPopoutIsOpen = false;
                }
            },

            // This function edits a comment
            async editComment() {
                // Prevents a null comment from being edited
                if (this.currentComment == null) {
                    return
                }

                const response = await axios.get(`http://localhost:3000/comments/${this.currentComment}`);
                
                // Creates a comment variable using the current comment id and the new details
                var editedComment = {
                    id: response.data.id, 
                    eventID: response.data.eventID, 
                    title: this.titleEditInput, 
                    text: this.textEditInput, 
                    user: response.data.user
                };

                // Replaces the old comment with the edited comment in the database
                await axios.put(`http://localhost:3000/comments/${this.currentComment}`, editedComment);

                // Replaces the old comment with the edited comment in the comments array using an index
                var index = this.comments.findIndex((comment) => comment.id == this.currentComment);
                this.comments[index] = editedComment;

                // Resets the edit inputs
                this.titleEditInput = '';
                this.textEditInput = '';

                // Closes the edit popout. 
                this.editPopoutIsOpen = false;

                // Sets current comment to null so that no more comments can be edited. 
                this.currentComment = null;
            },

            // This function adds a new comment 
            async addComment() {
                // Prevents a comment from being added
                if (this.titleAddInput == '') {
                    return;
                }

                // Prevents a comment from being added 
                if (this.textAddInput == '') {
                    return;
                }

                var newComment = { 
                    eventID: this.eventID, 
                    title: this.titleAddInput, 
                    text: this.textAddInput, 
                    user: this.getCurrentUser
                };

                // Posts a new comment into the comments database and the comments array
                const response = await axios.post(`http://localhost:3000/comments`, newComment);
                this.comments = [...this.comments, response.data];

                // Resets the inputs
                this.titleAddInput = '';
                this.textAddInput = '';
            },

            // This function deletes a comment using an id. 
            deleteComment(commentID) {
                axios.delete(`http://localhost:3000/comments/${commentID}`);
                this.comments = this.comments.filter((comment) => comment.id !== commentID);
            }, 

            // This function is used by the pagination to handle clicks from the user
            advancePage(pageNumber) {
                this.currentPage = Number(pageNumber);
            }
        }
    }
</script>

<style>
    /* Classes for the pagination section of the page */
    .pagination {
        display: flex; 
        justify-content: center;
    }

    .pagination > .page-item > a:first-child {
        border-radius: 2em;
    }

    .pagination > .page-item > a:last-child {
        border-radius: 2em;
    }

    .pagination > .page-item:first-child {
        width: 6em;        
    }

    .pagination > .page-item:last-child {
        width: 6em;        
    }

    .pagination > .page-item > a {
        background-color: var(--button);
        color: var(--button-text);

        font-size: 1.1em;
    }

    .pagination > .page-item > a:hover {
        background-color: var(--button-hover);

        transition: 0.3s;
    }

    .pagination > .page-item > a:active {
        background-color: var(--button-active);

        transition: 0.3s;
    }

    .page-item {
        margin-left: 0.2em;
        margin-right: 0.2em;
    }

    .page-link {
        border-radius: 2em;

        height: 2.5em;
        min-width: 2.5em;

        text-align: center
    }

    .pagination > .active > a {
        background-color: var(--button-current);
        border: none;
    }

    .pagination > .disabled > a {
        background-color: var(--button-disabled);
        border: none;
    }
</style>

<style scoped>
    /* Resets all of the margins and padding of every element to 0 */
    * {
        margin: 0; 
        padding: 0;
    }

    /* Classes for the event page */
    .event {
        margin: 0.2em;
        margin-bottom: 2em;
    }

    .event-description {
        background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0)), url(../assets/focal.png);
        background-size: cover;
        color: var(--alternate-text); 

        border-radius: 2em;
        padding: 1em;

        height: 300px;
        
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        text-decoration: none;
    }

    /* Classes for the comment section of the page */
    .comments {
        background-color: var(--comments-background);
        border-radius: 2em;
        padding: 1.5em;
    }

    .comment {
        border-bottom: 1px solid var(--text);

        padding-bottom: 1.5em;
        padding-top: 1.5em;

        display: flex; 
        justify-content: space-between;
        align-items: center;
    }

    .comment:first-child {
        border-top: none;

        padding-top: 0em;
    }

    .comment:last-of-type {
        border-bottom: none;

        padding-bottom: 0em;
    }

    .comment-text {
        margin-bottom: 1em;
    }

    /* Classes for the input section of the page */
    .inputs {
        background-color: var(--comments-inputs-background);

        border-radius: 2em;

        padding: 1.5em;
    }

    .inputs-title {
        display: flex; 
        justify-content: space-between;
        align-items: center;
    }

    .inputs-container {
        display: flex; 
        flex-direction: column;

        margin-top: 1.2em;
        margin-bottom: 1.2em;
    }

    /* Classes for the button */
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
        height: 2em;

        margin-left: 0.3em;
    }

    .button:hover {
        background-color: var(--button-hover);

        transition: 0.3s;
    }

    .button:active {
        background-color: var(--button-active);

        transition: 0.3s;
    }

    /* Classes for the label of each input */
    .label {
        font-size: 1.1em;
    }

    /* Classes for each input */
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
</style>