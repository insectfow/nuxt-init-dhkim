<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <span class="delivery-input-wrap clearfix">
                       {{text}}
                    </span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: ['text'],
    
    components: {},

    computed: {
    },
    mounted() {},

    methods: {        
        close() {
            this.$emit('close');
        },
        
    }
};
</script>
<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    display: table;
    transition: opacity 0.3s ease;
    .modal-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .modal-container {
            font-family: 'NotoSansKR-Regular';
            background: #fff;
            padding:6px 16px 8px;     
            border-radius: 10px;    
            box-shadow: 0 0 10px rgba(0,0,0,.16);   
            width: max-content;                       
            .delivery-input-wrap {                
                font-size: 14px;
                font-family: 'NotoSansKR-Medium';
                color: #0a0505;
                text-align: center;
            }
        }
    }
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

@media all and (max-width: 450px) {
    .modal-mask {
        width: 100%;        
    }
}
</style>