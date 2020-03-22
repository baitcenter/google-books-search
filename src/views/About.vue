<template>
    <div class="ion-page">
        <ion-header>
            <ion-toolbar>
                <ion-nav-link slot="start" router-direction="back">
                    <ion-buttons >
                        <ion-back-button></ion-back-button>
                    </ion-buttons>
                </ion-nav-link>
                <ion-title>{{this.$route.params.bookId}}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
<!--            "http://books.google.fr/books?id=j7rLDwAAQBAJ&printsec=frontcover&dq=intitle:c&hl=&as_pt=ALLTYPES&cd=1&source=gbs_api"-->


            <ion-button expand="block" @click="displayViewer">A block button</ion-button>

            <div id="viewerCanvas" style="width: 100%; height: 100%;"></div>
        </ion-content>
    </div>
</template>

<script>
    export default {
        name: 'About',
        components: {

        },
        data() {
            return {
            }
        },
        beforeCreate() {
            // let viewerApi = document.createElement('script')
            // viewerApi.setAttribute('src', 'https://www.google.com/books/jsapi.js')
            // document.head.appendChild(viewerApi)
            window.google.books.load({"language": "en"})
        },
        created() {
        },
        mounted() {
            setTimeout(() => {
                this.displayViewer()
            }, 500)

            // window.google.books.setOnLoadCallback(this.displayViewer)
        },
        watch: {
        },
        computed: {},
        methods: {
            displayViewer() {
                console.log(google)
                console.log('init')
                let viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
                viewer.load('ISBN:0738531367');
            }
        },
    }
</script>

<style lang="scss">

</style>

