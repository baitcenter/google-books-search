<template>
    <ion-content fullscreen>
        <div class="ion-text-center ion-margin-top" v-show="this.loading">
            <ion-spinner color="dark"></ion-spinner>
        </div>
        <ion-list class="booksContainer" scroll-y="true">
            <transition-group name="list" tag="div">
                <BookItem v-for="(book, index) in this.books"
                          :book="book"
                          :key="book.id + _.random(0, 1000)">
                </BookItem>
            </transition-group>
        </ion-list>

        <div class="booksIconContainer">
            <ion-img class="booksIcon" :class="this.nothing && this.isSearching ? 'grayFilter' : ''"
                     :src="require('@/assets/booksIcon.png')" v-if="this.nothing || !this.isSearching">
            </ion-img>
            <ion-text>
                <h6>
                    <ion-icon name="search"></ion-icon>
                    No Result
                </h6>
            </ion-text>
        </div>

    </ion-content>
</template>

<script>
    import axios from 'axios'

    import BookItem from '@/components/BookItem.vue'

    export default {
        name: 'books',
        props: ["titleSearch",
            "authorSearch",
            "globalSearch",
            "type",
            "lang",
        ],
        components: {
            BookItem
        },
        data() {
            return {
                loading: false,
                books: [],
                orderBy: 'newest',
                maxResults: '10',
                totalItems: null
            }
        },
        created() {
            this.debouncedGetSearch = _.debounce(this.getBooks, 500)
        },
        mounted() {
        },
        watch: {
            getTitleSearch: function (newSearch, oldSearch) {
                console.log("J'attends que vous arrêtiez de taper...")
                this.loading = true
                this.debouncedGetSearch()
            },
            getAuthorSearch: function (newSearch, oldSearch) {
                console.log("J'attends que vous arrêtiez de taper...")
                this.loading = true
                this.debouncedGetSearch()
            },
            getGlobalSearch: function (newSearch, oldSearch) {
                console.log("J'attends que vous arrêtiez de taper...")
                this.loading = true
                this.debouncedGetSearch()
            },
        },
        computed: {
            getTitleSearch () {
                return this.titleSearch
            },
            getAuthorSearch() {
                return this.authorSearch
            },
            getGlobalSearch() {
                return this.globalSearch
            },
            getType() {
                return this.type
            },
            getLang() {
                return this.lang
            },
            nothing() {
                return this.totalItems <= 0;
            },
            isSearching() {
                return this.getTitleSearch.length > 0 || this.getAuthorSearch.length > 0 || this.getGlobalSearch.length > 0
            }
        },
        methods: {
            getBooks() {
                if (this.getTitleSearch.length > 0 || this.getAuthorSearch.length > 0 || this.getGlobalSearch.length > 0) {
                    axios
                        .get(
                            `https://www.googleapis.com/books/v1/volumes?q=${
                                this.getGlobalSearch ? this.getGlobalSearch : ''
                            }${
                                this.getTitleSearch ? 'intitle:' + this.getTitleSearch : ''
                            }${
                                this.getAuthorSearch ? '+inauthor:' + this.getAuthorSearch : ''
                            }&printType=${
                                this.getType
                            }&langRestrict=${
                                this.getLang
                            }&orderBy=${
                                this.orderBy
                            }&maxResults=${
                                this.maxResults
                            }`
                        )
                        .then(response => {
                            console.log(response.data.items)
                            this.totalItems = response.data.totalItems
                            this.books = response.data.items
                            this.loading = false
                        })
                        .catch(error => {
                            console.log(error)
                        });
                } else {
                    this.books = []
                    this.loading = false
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateX(-50px);
    }

    .list-leave-active {
        position: absolute;
        /*z-index: 10;*/
    }
    .list-move {
        transition: transform 0.5s;
    }

    .grayFilter {
        filter: grayscale(100%);
    }
    .booksIcon {
    }
    .booksIconContainer {
        width: 40%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
