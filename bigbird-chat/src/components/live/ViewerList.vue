<template>
    <div class="side-content">
        <h4 class="side-content-title">
            시청자 목록
            <span>{{'(' + viewerList.length + ')'}}</span>
        </h4>
        <div class="side-content-box">
            <div class="viewer-list-box">
                <div class="viewer-search-box">
                    <span></span>
                    <form autocomplete="off">
                        <input name="search" autocomplete="off" type="text" placeholder="시청자 검색" />
                    </form>
                </div>
                <ul class="viewer-list-scroll">
                    <li v-for="(list, idx) in viewerList" :key="idx">컨셉터스(concepters)</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'viewerList',
    data() {
        return {
            viewerList: [
                '컨셉터스(concepters)',
                '컨셉터스(concepters)',
                '컨셉터스(concepters)'
            ]
        };
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
.viewer-list-box {
    > .viewer-search-box {
        height: 40px;
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #eeeeee;
        box-sizing: border-box;
        padding: 0 20px;
        display: flex;
        justify-content: left;
        align-items: center;
        > form {
            width: calc(100% - 24px);
            height: 100%;
            input {
                display: inline-block;
                width: 100%;
                height: 100%;
                color: #000;
                border: none;
            }
            input::placeholder {
                color: #bbbbbb;
            }
        }

        > span {
            display: inline-block;
            width: 17px;
            height: 17px;
            background: url(../../assets/img/dodbo@2x.png) repeat center;
            background-size: cover;
            margin-right: 7px;
        }
    }
    > .viewer-list-scroll {
        overflow-x: hidden;
        overflow-y: auto;
        height: 705px;
        > li {
            padding: 6px 20px;
            box-sizing: border-box;
            font-size: 12px;
            color: #000;
        }
        > li:nth-child(2n-1) {
            background: #f9f9f9;
        }
        > li:nth-child(2n) {
            background: #fff;
        }
    }
}
</style>