<template>
    <div class="side-content">
        <h4 class="side-content-title">판매현황</h4>
        <div class="side-content-box">
            <ul class="sales-status-box">
                <li>
                    <span>누적 접속자수</span>
                    <strong>3,000</strong>
                </li>
                <li>
                    <span>주문서 작성</span>
                    <strong>58</strong>
                </li>
                <li>
                    <span>주문완료</span>
                    <strong>100</strong>
                </li>
            </ul>
            <ul class="sales-status-list">
                <li v-for="(lists, idx) in 6" :key="idx">
                    <p class="sales-status-left">
                        <strong>
                            히알루론산 기초 화장품
                            A세트
                        </strong>
                        <span>
                            <span class="line995">주문수량 500개</span>
                            <span>남은수량 500개</span>
                        </span>
                    </p>
                    <p class="sales-status-right">
                        <strong>500,000원</strong>
                        <span>주문금액</span>
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'salesStatus',
    data() {
        return {};
    }
};
</script>

<style lang="scss" scoped>
input:focus {
    outline: none;
}
.side-content-title {
    background: #fff;
    padding: 40px 20px 20px;
    box-sizing: border-box;
    font-size: 16px;
    color: #000;
    border-bottom: 1px solid #eeeeee;
}
.sales-status-box {
    width: 100%;
    height: 82px;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: center;
    align-items: center;
    > li {
        width: 33.333%;
        text-align: center;
        > span {
            display: inline-block;
            width: 100%;
            font-size: 12px;
            color: #707070;
        }
        > strong {
            display: inline-block;
            width: 100%;
            font-size: 16px;
            font-family: 'Noto Sans CJK KR Bold';
            color: #000;
        }
    }
}
.sales-status-list {
    padding: 0 10px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: auto;
    height: 661px;
    > li {
        width: 100%;
        height: 68px;
        border-bottom: 1px solid #eeeeee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 10px;
        box-sizing: border-box;
        > .sales-status-left {
            display: flex;
            flex-flow: column;
            > strong {
                font-size: 14px;
                color: #707070;
            }
            > span {
                font-size: 12px;
                > span {
                    color: #ccc;
                }
            }
        }
        > .sales-status-right {
            display: flex;
            flex-flow: column;
            align-items: flex-end;
            > strong {
                font-size: 14px;
                color: #000;
                font-family: 'Noto Sans CJK KR Medium';
            }
            > span {
                font-size: 12px;
                color: #ccc;
            }
        }
    }
}
</style>