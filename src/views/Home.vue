<template>
    <div class="ion-page">
        <ion-header>

            <TheTopHeader></TheTopHeader>

            <SearchBars></SearchBars>

            <ion-toolbar>
                <ion-segment color="primary" :value="type" @ionChange="type = $event.target.value">
                    <ion-segment-button value="all" layout="icon-start">
                        <ion-label>All</ion-label>
                        <ion-icon name="apps"></ion-icon>
                    </ion-segment-button>
                    <ion-segment-button value="books" layout="icon-start">
                        <ion-label>Books</ion-label>
                        <ion-icon name="book"></ion-icon>
                    </ion-segment-button>
                    <ion-segment-button value="magazines" layout="icon-start">
                        <ion-label>Magazines</ion-label>
                        <ion-icon name="document"></ion-icon>
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>

            <ion-toolbar>
                <ion-segment color="success" :value="orderBy" @ionChange="orderBy = $event.target.value">
                    <ion-segment-button value="newest" layout="icon-start">
                        <ion-label>Newest</ion-label>
                        <ion-icon name="pizza"></ion-icon>
                    </ion-segment-button>
                    <ion-segment-button value="relevance" layout="icon-start">
                        <ion-label>Relevance</ion-label>
                        <ion-icon name="git-compare"></ion-icon>
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>

            <ion-toolbar class="filterContainer">
                <ion-segment scrollable color="secondary"
                             :value="filter" @ionChange="filter = $event.target.value">
                    <ion-segment-button value="all" layout="icon-start">
                        <ion-label>All</ion-label>
                        <ion-icon name="apps"></ion-icon>
                    </ion-segment-button>
                    <ion-segment-button value="partial" layout="icon-start">
                        <ion-label>Partial</ion-label>
                        <ion-icon name="bookmark"></ion-icon>
                    </ion-segment-button>
                    <ion-segment-button value="full" layout="icon-start">
                        <ion-label>Full</ion-label>
                        <ion-icon name="bookmarks"></ion-icon>
                    </ion-segment-button>
                    <ion-segment-button value="ebooks" layout="icon-start">
                        <ion-label>E-Books</ion-label>
                        <ion-icon name="tv"></ion-icon>
                    </ion-segment-button>
                </ion-segment>
            </ion-toolbar>

        </ion-header>

        <keep-alive>
        <TheBookList :titleSearch="titleSearch"
                     :authorSearch="authorSearch"
                     :globalSearch="globalSearch"
                     :type="type"
                     :lang="lang"
                     :orderBy="orderBy"
                     :filter="filter">
        </TheBookList>
        </keep-alive>
    </div>
</template>

<script>
    import TheBookList from '@/components/TheBookList.vue'
    import TheTopHeader from '@/components/TheTopHeader.vue'
    import SearchBars from '@/components/SearchBars.vue'

    export default {
        name: 'Home',
        components: {
            TheBookList,
            TheTopHeader,
            SearchBars
        },
        data() {
            return {
                titleSearch: '',
                authorSearch: '',
                globalSearch: '',
                type: 'all',
                lang: 'fr',
                orderBy: 'newest',
                filter: 'all',
            }
        },
        mounted() {
            this.$bus.$on('changeLang', (newLang) => {
                this.lang = newLang
            })
            this.$bus.$on('changeTitleSearch', (newSearch) => {
                this.titleSearch = newSearch
            })
            this.$bus.$on('changeAuthorSearch', (newSearch) => {
                this.authorSearch = newSearch
            })
            this.$bus.$on('changeGlobalSearch', (newSearch) => {
                this.globalSearch = newSearch
            })
        },
        watch: {
            type() {
                this.$bus.$emit('changeFilter')
            },
            lang() {
                this.$bus.$emit('changeFilter')
            },
            orderBy() {
                this.$bus.$emit('changeFilter')
            },
            filter() {
                this.$bus.$emit('changeFilter')
            }
        },
        computed: {},
        methods: {
        },
    }
</script>

<style lang="scss">
    .translateIcon {
        width: 25px;
        height: auto;
    }
    .filterContainer {
        padding-bottom: 5px;
    }
    .searchBars {
        transition: all 0.5s;
        padding-bottom: 0 !important;
        padding-top: 0 !important;
    }
    .selectLang {
        --padding-start: 0;
    }



    .list-enter, .list-leave-to {
      opacity: 0;
      transform: translateX(-50px);
    }
    .list-leave-active {
      /*position: absolute;*/
      /*z-index: 10;*/
    }
    .list-move {
      transition: transform 0.5s;
    }
</style>
