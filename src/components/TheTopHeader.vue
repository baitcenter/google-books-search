<template>
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
</template>

<script>
    export default {
        name: "TheTopHeader",
        data () {
            return {
                darkMode: false,
                lang: '',
            }
        },
        mounted() {
            this.lang = this.getLang
        },
        watch: {
            lang(val) {
                this.$store.commit('changeLang', val)
                this.$bus.$emit('changeFilter')
            }
        },
        computed: {
            getLang() {
                return this.$store.state.lang
            },
        },
        methods: {
            toggleDarkMode(ev) {
                this.darkMode = ev.detail.checked
                document.body.classList.toggle('dark', ev.detail.checked)
            },
        },
    }
</script>

<style scoped lang="scss">
    .translateIcon {
        width: 25px;
        height: auto;
    }
    .selectLang {
        --padding-start: 0;
    }
</style>
