<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start" @click="$refs.selectLang.open()">
                    <ion-button class="ion-text-center">
                        <img class="translateIcon" src="@/assets/translateDark.png" v-if="!darkMode"/>
                        <img class="translateIcon" src="@/assets/translateIcon.png" v-else/>
                    </ion-button>
                </ion-buttons>

                <ion-select interface="popover" slot="start"
                            :value="lang"
                            @ionChange="lang = $event.target.value"
                            ref="selectLang"
                            class="selectLang">
                    <ion-select-option value="en">En</ion-select-option>
                    <ion-select-option value="fr">Fr</ion-select-option>
                    <ion-select-option value="es">Es</ion-select-option>
                    <ion-select-option value="de">De</ion-select-option>
                    <ion-select-option value="ar">Ar</ion-select-option>
                    <ion-select-option value="zh">Zh</ion-select-option>
                    <ion-select-option value="ja">Ja</ion-select-option>
                    <ion-select-option value="ru">Ru</ion-select-option>
                </ion-select>

                <ion-title>Google Books</ion-title>
                <ion-buttons slot="primary">
                    <ion-icon slot="start" name="moon"></ion-icon>
                    <ion-toggle id="themeToggle" slot="end"
                                color="light"
                                @ionChange="toggleDarkMode">
                    </ion-toggle>
                </ion-buttons>
            </ion-toolbar>
            <ion-toolbar class="ion-text-start">
                <ion-text>
                    <p class="ion-no-margin">
                        <ion-chip color="primary" class="chip" :outline="showTitleSearch" @click="toggleTitleSearch">
                            <ion-label>Title</ion-label>
                            <ion-icon :name="!showTitleSearch ? 'add-circle' : 'close-circle'"></ion-icon>
                        </ion-chip>
                        <ion-chip color="secondary" class="chip" :outline="showAuthorSearch"
                                  @click="toggleAuthorSearch">
                            <ion-label>Author</ion-label>
                            <ion-icon :name="!showAuthorSearch ? 'add-circle' : 'close-circle'"></ion-icon>
                        </ion-chip>
                        <ion-chip color="tertiary" class="chip" :outline="showGlobalSearch" @click="toggleGlobalSearch">
                            <ion-label>Global</ion-label>
                            <ion-icon :name="!showGlobalSearch ? 'add-circle' : 'close-circle'"></ion-icon>
                        </ion-chip>
                    </p>
                </ion-text>

                <transition-group name="list" tag="div">
                    <ion-searchbar animated position="start"
                                   :placeholder="'Title...'"
                                   v-bind:value="titleSearch"
                                   @input="titleSearch = $event.target.value"
                                   @ionClear="titleSearch = ''"
                                   v-if="this.showTitleSearch"
                                   key="title"
                                   class="searchBars">
                    </ion-searchbar>
                    <ion-searchbar animated position="start"
                                   :placeholder="'Author...'"
                                   v-bind:value="authorSearch"
                                   @input="authorSearch = $event.target.value"
                                   @ionClear="authorSearch = ''"
                                   v-if="this.showAuthorSearch"
                                   key="author"
                                   class="searchBars">
                    </ion-searchbar>
                    <ion-searchbar animated position="start"
                                   :placeholder="'Global Search...'"
                                   v-bind:value="globalSearch"
                                   @input="globalSearch = $event.target.value"
                                   @ionClear="globalSearch = ''"
                                   v-if="this.showGlobalSearch"
                                   key="global"
                                   class="searchBars">
                    </ion-searchbar>
                </transition-group>
            </ion-toolbar>

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

        <TheBookList :titleSearch="titleSearch"
                     :authorSearch="authorSearch"
                     :globalSearch="globalSearch"
                     :type="type"
                     :lang="lang"
                     :orderBy="orderBy"
                     :filter="filter">
        </TheBookList>
    </div>
</template>

<script>
    import TheBookList from '@/components/TheBookList.vue'

    export default {
        name: 'Home',
        components: {
            TheBookList,
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

                showTitleSearch: true,
                showAuthorSearch: false,
                showGlobalSearch: false,
                darkMode: false
            }
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
            toggleDarkMode(ev) {
                this.darkMode = ev.detail.checked
                document.body.classList.toggle('dark', ev.detail.checked)
            },
            toggleTitleSearch() {
                this.titleSearch = ''
                this.showTitleSearch = !this.showTitleSearch
            },
            toggleAuthorSearch() {
                this.authorSearch = ''
                this.showAuthorSearch = !this.showAuthorSearch
            },
            toggleGlobalSearch() {
                this.globalSearch = ''
                this.showGlobalSearch = !this.showGlobalSearch
            }
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
