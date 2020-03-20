<template>
    <ion-content fullscreen>
        <transition name="fadeTop">
            <div class="ion-text-center ion-margin-vertical" v-show="this.loading">
                <ion-spinner color="dark"></ion-spinner>
            </div>
        </transition>
        <ion-list class="booksContainer" scroll-y="true">
            <transition-group name="list" tag="div">
                <BookItem v-for="(book, index) in this.books"
                          :book="book"
                          :key="book.id + _.random(0, 1000)">
                </BookItem>
            </transition-group>
        </ion-list>

        <div class="booksIconContainer">
            <transition name="fade">
                <ion-img class="booksIcon"
                         :class="this.nothing && this.isSearching ? 'grayFilter' : ''"
                         :src="require('@/assets/booksIcon.png')"
                         v-if="this.nothing || !this.isSearching">
                </ion-img>
            </transition>
            <transition name="fade">
                <ion-text color="medium" class="errorText" v-if="this.nothing && this.isSearching">
                    <ion-icon name="search" style="margin-right: 4px;"></ion-icon>
                    <h6 class="ion-no-margin">No Result</h6>
                </ion-text>
            </transition>
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
            "orderBy",
            "filter"
        ],
        components: {
            BookItem
        },
        data() {
            return {
                loading: false,
                books: [],
                maxResults: '10',
                totalItems: null
            }
        },
        created() {
            this.debouncedGetSearch = _.debounce(this.getBooks, 500)
        },
        mounted() {
            this.$bus.$on('changeFilter', () => {
                this.loading = true
                this.getBooks()
            })
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
            getFilter() {
                return this.filter === 'all' ? '' : '&filter=' + this.filter
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
                                this.type
                            }&langRestrict=${
                                this.lang
                            }&orderBy=${
                                this.orderBy
                            }${
                                this.getFilter
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
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .fadeTop-enter-active {
        transition: all .5s;
    }
    .fadeTop-leave-active {
        transition: all .3s;
    }
    .fadeTop-enter, .fadeTop-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateY(-10px);
    }

    .grayFilter {
        filter: grayscale(100%);
    }
    .booksIcon {
        visibility: visible; // Prevent bug
    }
    .booksIconContainer {
        width: 40%;
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .errorText {
        display: flex;
        align-items: center;
    }
</style>
