<template>
    <transition name="modal">
        <div class="modal-mask" >
            <div class="modal-container" :style="{top : top+ 'px', left: left+ 'px'}">
                <ul>   
                    <!-- <li>
                       <a href="#" >패널티이력</a>
                    </li>                 -->
                    <template v-if="userInfoTab">
                         <li v-if="userInfoTab ==='muted'">
                            <a href="#" @click.prevent="goMute(data.userID || data.id)">{{type == '1' ? '벙어리 적용' :'복원하기'}}</a>
                        </li>
                        <li v-else >
                            <a href="#" @click.prevent="goBan(data.userID || data.id)">{{type == '1' ? '강퇴하기' :'복원하기'}}</a>
                        </li> 
                    </template>
                     <template v-else>
                         <li>
                            <a href="#" @click.prevent="goMute(data.userID || data.id)">{{type == '1' ? '벙어리 적용' :'벙어리 복원하기'}}</a>
                        </li>
                        <li >
                            <a href="#" @click.prevent="goBan(data.userID || data.id)">{{type == '1' ? '강퇴하기' :'강퇴 복원하기'}}</a>
                        </li> 
                     </template>
                    
                    <!-- <li>
                       <a href="#" >아이디 복사</a>
                    </li>                     -->
               </ul>
            </div>    
            <div class="back-block" @click="close"></div>      
        </div>
    </transition>
</template>

<script>
export default { 
    props: ['data', 'left', 'top','type' , 'userInfoTab'],   
    components: {},

    computed: {
        
    },
    mounted() {
    },

    methods: {        
        close() {
            this.$emit('close');
        },
        goMute(id){
            this.$emit('goMute', id);           
        },
        goBan(id){
            this.$emit('goBan', id);           
        },
        userStageData(data){
            console.log(data);
        }
        
    }
};
</script>
<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9998;    
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.2);
    transition: opacity 0.3s ease;

    > .modal-container {
        position: absolute;
        width: 120px;
        background: #fff;
        z-index: 100;
        > ul {
            > li {
                > a {
                    display: block;
                    width: 100%;
                    padding: 6px 0;
                    box-sizing: border-box;
                    text-align: center;
                    font-size: 12px;
                    color: #707070;
                    border-bottom: 1px solid#EEEEEE;
                }
            }
            > li:last-child {
                > a {
                    border-bottom: none;
                }
            }
        
        }
    }
    > .back-block {
        width: 100%;
        height: 100%;
        z-index: -1;
        
    }
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter ,
.modal-leave-active {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

// @media all and (max-width: 374px) {
//     .modal-mask {
//         .delivery-btn-box {
//             > button {
//                 width: 48% !important;
//             }
//             > button:first-child {
//                 width: 48% !important;
//             }
//         }
//     }
// }
</style>