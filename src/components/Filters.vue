<template>
    <div class="filters">
        <ion-toolbar>
            <ion-segment color="primary" mode="md"
                         :value="type"
                         @ionChange="type = $event.target.value">
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
            <ion-segment color="primary" mode="md"
                         :value="orderBy"
                         @ionChange="orderBy = $event.target.value">
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
            <ion-segment scrollable mode="md"
                         color="primary"
                         :value="filter"
                         @ionChange="filter = $event.target.value">
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
    </div>
</template>

<script>
    export default {
        name: "Filters",
        data() {
            return {
                type: '',
                orderBy: '',
                filter: '',
            }
        },
        mounted() {
            this.type = this.getType
            this.orderBy = this.getOrderBy
            this.filter = this.getFilter
        },
        watch: {
            type(val) {
                this.$store.commit('changeType', val)
                this.$bus.$emit('changeFilter')
            },
            orderBy(val) {
                this.$store.commit('changeOrderBy', val)
                this.$bus.$emit('changeFilter')
            },
            filter(val) {
                this.$store.commit('changeFilter', val)
                this.$bus.$emit('changeFilter')
            }
        },
        computed: {
            getType() {
                return this.$store.state.type
            },
            getOrderBy() {
                return this.$store.state.orderBy
            },
            getFilter() {
                return this.$store.state.filter
            },
        },
    }
</script>

<style scoped lang="scss">
    .filterContainer {
        padding-bottom: 5px;
    }
</style>
