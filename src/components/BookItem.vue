<template>
    <ion-item @click="showBook" class="transitionBookItem">
        <ion-thumbnail slot="start" class="bookImg">
            <ion-img :src="book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : require('@/assets/NotAvailable.jpg')"></ion-img>
        </ion-thumbnail>
        <ion-label>
            <h2>{{book.volumeInfo.title}}</h2>
            <h3>{{getAuthors}}</h3>
            <p>{{book.volumeInfo.description ? book.volumeInfo.description : 'No description'}}</p>
            <p>{{book.volumeInfo.pageCount ? book.volumeInfo.pageCount : 'Unknown '}} pages</p>
        </ion-label>
    </ion-item>
</template>
<script>
    import BookModal from '@/components/BookModal.vue'

    export default {
        name: "book",
        props: ["book"],
        data() {
            return {

            }
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
            }
        },
        methods: {
            showBook() {
                return this.$ionic.modalController
                    .create({
                        component: BookModal,
                        componentProps: {
                            propsData: {
                                book: this.book
                            }
                        }
                    }).then(m => {
                        m.present()
                    })
            },
        }
    }
</script>
<style>
    .bookImg {
        height: 100%;
    }

    .transitionBookItem {
        transition: all 0.5s;
    }
</style>
