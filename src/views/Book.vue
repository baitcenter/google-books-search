<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-nav-link slot="start" router-direction="back">
                    <ion-buttons >
                        <ion-back-button></ion-back-button>
                    </ion-buttons>
                </ion-nav-link>
                <ion-title v-if="book">{{book.volumeInfo.title}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding" v-if="book">
            <div class="modalHeader">
                <ion-thumbnail class="thumbnailImg">
                    <ion-img :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : require('@/assets/NotAvailable.jpg')"></ion-img>
                </ion-thumbnail>
            </div>
            <div class="border-b">
                <ion-text class="ion-text-start" color="medium">
                    <h6 class="mb-0 ion-text-uppercase">{{getAuthors}}</h6>
                </ion-text>
                <ion-text class="ion-text-start">
                    <h3 class="ion-no-margin"><b>{{book.volumeInfo.title}}</b></h3>
                </ion-text>
                <ion-text class="ion-text-start" color="medium">
                    <p class="mt-0 mb-8">{{book.volumeInfo.publisher ? book.volumeInfo.publisher : 'Independently Published'}} - {{book.volumeInfo.publishedDate}}</p>
                </ion-text>
            </div>
            <div class="" v-if="book.volumeInfo.categories">
                <ion-text class="ion-text-start">
                    <p class="mb-0 mt-8"><b>Categories :</b></p>
                    <p class="ion-no-margin">
                        <ion-chip color="tertiary" class="chip" outline
                                  v-for="(category, index) in book.volumeInfo.categories">
                            <ion-label>{{category}}</ion-label>
                        </ion-chip>
                    </p>
                </ion-text>
            </div>
            <div class="">
                <ion-text class="ion-text-start">
                    <p class="mb-8 mt-8"><b>Description :</b></p>
                    <p class="mt-0"><span v-html="getDescription"></span></p>
                </ion-text>
            </div>
            <ion-button expand="block" @click="goToViewer">Book Viewer</ion-button>
        </ion-content>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Book',
        components: {

        },
        data() {
            return {
                book: null
            }
        },
        mounted() {
            this.getBook()
        },
        watch: {
        },
        computed: {
            getAuthors () {
                if (this.book.volumeInfo.authors) {
                    let authors = this.book.volumeInfo.authors[0]
                    this.book.volumeInfo.authors[1] ? authors.concat(', ' + this.book.volumeInfo.authors[1]) : false
                    return authors
                } else {
                    return 'Unknown Author'
                }
            },
            getDescription() {
                return this.book.volumeInfo.description ? this.book.volumeInfo.description : 'Doesn\'t have Description...'
            }
        },
        methods: {
            goToViewer() {
                this.$router.push({ name: 'viewer', params: { bookId: this.book.id }});
            },
            getBook() {
                    axios.get(`https://www.googleapis.com/books/v1/volumes/${this.$route.params.bookId}`)
                        .then(response => {
                            this.book = response.data
                        })
                        .catch(error => {
                            console.log(error)
                        });
            }
        },
    }
</script>

<style scoped lang="scss">
    #BookModal {
        /*--background: #a6a6a6;*/
    }
    .bookModalContent {
        /*--background: #dfdfdf;*/
    }
    .thumbnailImg {
        margin-top: 5px;
        margin-bottom: 5px;
        height: auto;
        width: 80%;
        display: flex;
        align-items: center;
    }
    .modalHeader {
        margin-left: -16px;
        margin-right: -16px;
        margin-top: -16px;
        background-color: #303030;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 400px;
    }
    .chip {
        margin-left: 0;
    }

    .border-b {
        border-bottom: 1px grey solid;
    }
    .mt-0 {
        margin-top: 0;
    }
    .mb-0 {
        margin-bottom: 0;
    }
    .mt-8 {
        margin-top: 8px;
    }
    .mb-8 {
        margin-bottom: 8px;
    }
</style>

