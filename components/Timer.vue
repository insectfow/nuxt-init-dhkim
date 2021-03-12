<template>
    <transition name="totop">
        <div class="popup-modal actions-modal">
            <div class="modal-content">
                
                <div class="timer-wrap">
                    <h3 class="title">Timer</h3>
                    <div class="timer">00 : 00</div>
                    <div class="set-time-box">
                        <input type="number" v-model="minutes">
                        <input type="number" v-model="secondes">
                        <button @click.prevent="setTime()">Set Time</button>
                    </div>
                </div>
                <!-- <div class="active-button">
                    <button @click.prevent="button">Publish</button>
                    <button>Publish</button>
                    <button>Publish</button>
                </div>
                <div class="cancel-button">
                    <button>Cancel</button>
                </div> -->
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data(){
        return {
            timer: null,
            totalTime: (1 * 60),
            resetButton: false,
        }
    },
    computed: {
        minutes() {
            const minutes = Math.floor(this.totalTime / 60);
            return this.padTime(minutes);
        },
        seconds() {
            const seconds = this.totalTime - (this.minutes * 60);
            return this.padTime(seconds);
        }
    },
    methods:{
        startTimer() {
            this.timer = setInterval(() => this.countdown(), 1000);
            this.resetButton = true;
        },
        stopTimer() {
            clearInterval(this.timer);
            this.timer = nullthis.resetButton = true;
        },
        resetTimer() {
            this.totalTime = (1 * 60);
            clearInterval(this.timer);
            this.timer = null;
            this.resetButton = false;
        },
        padTime(time) {
            return (time < 10 ? '0' : '') + time;
        },
        countdown() {
            if(this.totalTime >= 1) {
                this.totalTime--;
            } else {
                this.totalTime = 0;
                this.resetTimer;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.popup-modal {
    width: 100%;
    max-height: 100%;
    position: fixed;
    z-index: 11;
    bottom: 0;
    border-radius: 0;
    opacity: .6;
    transition-duration: .3s;
    height: auto;
    /* background: #efeff4; */
    transition-property: transform , opacity;
    overflow-x: hidden;
    overflow-y: auto;
    opacity: 1;
    display: block;
    transform: translateZ(0);
    border-radius: 5px 5px 0 0;
}
.modal-content {
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    
}
.timer-wrap {
    height: 400px;
    width: 100%;
    background: $mainColor;
    > .title {
        font-size: 20px;
        text-align: center;
        padding: 0.5rem 0;
    }
    > .timer {
        text-align: center;
        font-size: 30px;
    }
}


.active-button, .cancel-button {
    width: 100%;
    padding:5px 10px;
}
.active-button button {
    width: 100%;
    height: 50px;
    border-radius: 5px;
}

.cancel-button button {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    color: #f00;
}

.totop-enter-active, .totop-leave-active {
  transition: bottom .5s ;
}
.totop-enter, .totop-leave-to {
  bottom: -100%;
}
</style>