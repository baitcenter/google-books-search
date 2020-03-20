<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-button class="ion-text-center">
                        <img class="translateIcon" src="@/assets/translateDark.png"/>
                    </ion-button>
                </ion-buttons>
                <ion-title>Google Books</ion-title>
            </ion-toolbar>
            <ion-toolbar class="ion-text-start">
                <ion-searchbar animated position="start"
                               :placeholder="'Title...'"
                               v-bind:value="titleSearch"
                               @input="titleSearch = $event.target.value">
                </ion-searchbar>
                <ion-searchbar animated position="start"
                               :placeholder="'Author...'"
                               v-bind:value="authorSearch"
                               @input="authorSearch = $event.target.value">
                </ion-searchbar>
                <ion-searchbar animated position="start"
                               :placeholder="'Global Search...'"
                               v-bind:value="globalSearch"
                               @input="globalSearch = $event.target.value">
                </ion-searchbar>
            </ion-toolbar>

            <ion-toolbar>
                <ion-segment color="dark" :value="type" @ionChange="type = $event.target.value">
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
                <ion-title>{{type}}</ion-title>
            </ion-toolbar>

        </ion-header>

        <TheBookList :titleSearch="titleSearch"
                     :authorSearch="authorSearch"
                     :globalSearch="globalSearch"
                     :type="type"
                     :lang="lang">
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
                type: 'books',
                lang: 'fr'
            }
        },
        computed: {
        },
        methods: {},
    }
</script>

<style lang="scss">
    .translateIcon {
        width: 25px;
        height: auto;
    }
</style>
