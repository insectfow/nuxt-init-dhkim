<template>
    <page-box>
        <div class="page">
            <header-box>
                <h1 class="title">나의 사이트</h1>
            </header-box>
            <page-content>
                <section class="main-menu">
                    <a href="#" @click.prevent="timerModal(true)" class="card-wrap">
                        timer
                    </a>
                    <a class="card-wrap">
                        
                    </a>
                    <!-- <img src="@/assets/img/cat.jpg" alt="cat"> -->
                </section>
            </page-content>
        </div>
        <footer-box />
        <modal-box>
            <overlay :show="isModal" @close="timerModal(false)"></overlay>
            <timer v-show="isModal" />
        </modal-box>
    </page-box>
</template>

<script>
export default {
    head: {
        title : '메인페이지'
    },
    data(){
        return {
            isModal: false
        }
    },
    methods: {
        timerModal(boolean){
            if(!boolean){
                return this.isModal = false;
            }
            this.isModal = true;
        }
    }
}
</script>

<style>

</style>