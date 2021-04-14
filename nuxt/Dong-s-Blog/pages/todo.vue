<template>
    <main class="main-page">
        <div class="todo-list-wrap">
            <h3 @click="$router.push('/')" >To Do List</h3>
            <div class="add-list">
                <input type="text" class="input-list" autocomplete="off" placeholder="Add New Task" v-model="text" @keyup.enter="newItem">
                <button type="submit" class="submit-list" @click="newItem" title="add Task">
                    <i class="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
                </button>
            </div>
            <ul class="todo-list">
                <li v-for="(task, idx) in tasks" :key="idx">
                    <label class="task-list-item-label" @click="checkTask(idx)">
                        <i class="fa fa-circle-o" aria-hidden="true" v-if="!task.checked"></i>
                        <i class="fa fa-dot-circle-o" aria-hidden="true" v-else></i>
                        <span :class="task.checked ? 'checked' : ''">{{task.name}}</span>
                    </label>
                    <button type="submit" class="del-list" @click="delItem(task)">
                        <i class="fa fa-trash fa-lg" aria-hidden="true"></i>
                    </button >
                </li>
            </ul>
        </div>
    </main>
</template>

<script>
export default {
    data(){
        return {
            show: false,
            text: ''
        }
    },
    computed: {
        tasks(){
            return this.$store.state.tasks;
        }
    },
    methods: {
       newItem(){
           this.$store.commit('addTask', this.text);
           this.text = '';
       },
       delItem(task){
           this.$store.commit('delTask', task);
       },
       checkTask(idx){
           this.$store.commit('checkTask', idx);
       }
    }
}
</script>

<style>

.move-enter-active, .move-leave-active {
  
}
.move-enter, .move-leave-to {
    opacity: 0;
}

.main-page {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../assets/img/bg.jpg') center no-repeat;
    background-size: cover;
    box-sizing: border-box;
    z-index: 1;
}


.task-list-item-label .checked {
    color: #707070;
    text-decoration: line-through red;
}

.todo-list-wrap {
    width: 400px;
    /* height: 158px; */
    min-height: 170px;
    margin: 0 auto;
    box-shadow: 3px 3px 10px rgba(0,0,0,0.2);
    background: #fff;
    border-radius: 6px;
    padding: 20px;
}
.todo-list-wrap h3 {
    font-size: 1.4rem;
    color: #000;
    margin: 0;
}

.todo-list-wrap .add-list {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    margin-top: 20px;
    
}
.todo-list-wrap .add-list .input-list {
    width: calc(100% - 50px);
    height: 100%;
    border: none;
    border-bottom: 1px solid #000;
    box-sizing: border-box;

}
.todo-list-wrap .add-list .submit-list {
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border-radius: 50px;
    border: none;
    background: #fff;
    margin: 0;
    padding: 0;
}
.todo-list {
    margin-top: 20px;
}
.todo-list > li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    margin-bottom: 5px;
    box-sizing: border-box;
}
label {
    width: calc(100% - 30px);
}
.todo-list > li span {
    font-size: 14px;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: calc(100% - 30px);
}
.del-list {
    width: 28px;
    height: 28px;
    min-width: 28px;
    background: #fff;
    border: none;
    padding: 0;
    margin: 0;
}
button:focus {
    outline: none;
}

@media screen and (max-width: 640px) {
        .todo-list-wrap {
            width: 300px;
        }
}
@media screen and (max-width: 360px) {
        .todo-list-wrap {
            width: 240px;
        }
}
</style>