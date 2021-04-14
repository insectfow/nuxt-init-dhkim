export const state = () => ({
    path: 'news',
    tasks: []
})

export const mutations = {
    getPath(state, data){
        state.path = data;
    },
    addTask(state, data){
        if(!data){
            return
        }
        state.tasks.push( {
            name: data,
            checked: false,
            del: ''
        });
        state.tasks.name = '';
    },
    delTask(state, data){
        state.tasks.splice(state.tasks.indexOf(data), 1);
    },
    checkTask(state, data){
        console.log(state, 'check', data);
        state.tasks[data].checked = !state.tasks[data].checked;
    }
}
export const actions = {
    fetchPath(context, data) {
        context.commit('getPath', data)
    },
}