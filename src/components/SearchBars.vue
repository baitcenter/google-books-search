<template>
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
</template>

<script>
    export default {
        name: "SearchBars",
        data () {
            return {
                titleSearch: '',
                authorSearch: '',
                globalSearch: '',
                showTitleSearch: true,
                showAuthorSearch: false,
                showGlobalSearch: false,
            }
        },
        mounted() {
        },
        watch: {
            titleSearch(val) {
                this.$store.commit('changeTitleSearch', val)
            },
            authorSearch(val) {
                this.$store.commit('changeAuthorSearch', val)
            },
            globalSearch(val) {
                this.$store.commit('changeGlobalSearch', val)
            },
        },
        methods: {
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

<style scoped>

</style>
