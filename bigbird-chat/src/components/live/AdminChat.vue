<template>
  <div class="side-content">
    <h4 class="side-content-title">관리자 채팅</h4>
    <div class="side-content-box">
      <div class="admin-chat-box">
        <ul class="chat-list" ref="listScroll">
          <li>
            <ul>
              <li class="user-name">삼성전자(samsung)</li>
              <li class="user-chat">
                <span class="chat-comment">
                  안녕하세요 광고주입니다.
                </span>
                <span class="chat-time">16:14</span>
              </li>
            </ul>
          </li>
          <li>
            <ul>
              <li class="user-name">ehdgus441(ehdgus441)</li>
              <li class="user-chat">
                <span class="chat-comment">
                  안녕하세요 인플루언서입니다.
                </span>
                <span class="chat-time">16:14</span>
              </li>
            </ul>
          </li>
          <li
            v-for="(list, idx) in chatList"
            :key="idx"
            :class="list.type === 1 ? 'my-chat' : ''"
          >
            <ul>
              <li class="user-chat">
                <span class="chat-time">{{ list.chatTime }}</span>
                <span class="chat-comment">{{ list.comment }}</span>
              </li>
            </ul>
          </li>
        </ul>
        <div class="chat-board">
          <input
            type="text"
            placeholder="대화를 나눠보세요"
            v-model="isComment"
            @keyup.enter="submit"
          />
          <button @click.prevent="submit">전송</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "adminChat",
  data() {
    return {
      chatList: [
        {
          type: 1,
          chatTime: "16:14",
          comment: "안녕하세요~"
        }
      ],
      isComment: null,
      myComment: {}
    };
  },

  updated() {
    this.$refs.listScroll.scrollTop = this.$refs.listScroll.scrollHeight;
  },
  methods: {
    submit() {
      if (this.isComment !== null) {
        this.myComment = {
          type: 1,
          chatTime: "16:14",
          comment: this.isComment
        };
        this.chatList.push(this.myComment);
        this.isComment = null;
        this.$refs.listScroll.scrollTop = this.$refs.listScroll.scrollHeight;
      } else {
        alert("입력해주세요");
      }
    }
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
.admin-chat-box {
  width: 100%;
  > .chat-list {
    width: 100%;
    height: 685px;
    border-bottom: 1px solid #eeeeee;
    box-sizing: border-box;
    padding: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    > li {
      width: 100%;
      margin-bottom: 20px;
      > ul {
        width: 100%;
        > .user-name {
          font-family: "Noto Sans CJK KR Medium";
          font-size: 14px;
          color: #000;
        }
        > .user-chat {
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          width: 100%;
          margin-top: 6px;
          > .chat-comment {
            border-radius: 10px;
            background: #f9f9f9;
            padding: 10px;
            display: inline-block;
            max-width: calc(100% - 55px);
            color: #707070;
          }
          > .chat-time {
            display: inline-block;
            color: #bbbbbb;
            font-size: 10px;
            margin-left: 10px;
          }
        }
      }
    }
    > li.my-chat {
      > ul {
        > .user-chat {
          justify-content: flex-end;
          margin-top: 0;
          > .chat-comment {
            color: #fff;
            background: #2699fb;
          }
          > .chat-time {
            margin-left: 0;
            margin-right: 10px;
          }
        }
      }
    }
    > li:last-child {
      margin-bottom: 0;
    }
  }
  > .chat-board {
    width: 100%;
    height: 60px;
    display: flex;
    > input {
      width: calc(100% - 100px);
      height: 100%;
      padding: 0 20px;
      font-size: 14px;
      color: #000;
      border: none;
    }
    > button {
      width: 100px;
      height: 100%;
      background: #2699fb;
      color: #fff;
      font-size: 14px;
      font-family: "Noto Sans CJK KR Medium";
      border: none;
    }
  }
}
</style>