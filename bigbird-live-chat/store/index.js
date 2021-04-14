import Vuex from 'vuex'
const createStore  = () => {
    return new Vuex.Store({
        getters : {
            loadedPayloads(state){
                return state.loadedPayloads;
            },
            loadedConfigs(state){
                return state.loadedConfigs;
            }
        },
        state : {
            loadedPayloads: null,
            loadedConfigs: null
        },
        mutations: {
            setPayload(state, payload){
                state.loadedPayloads = payload;
                console.log('payload_mutations =>',payload); 
            },
            setConfig(state, config){
                state.loadedConfigs = config;
                console.log('config_mutations =>',config);
            }
        },
        actions : {
            setPayload({commit, state}, payload){
                // console.log('state :', state);
                // console.log('stateb :', state.loadedPayloads);
                if(state.loadedPayloads === null){
                    commit('setPayload', payload);
                }
            },
            setConfig({commit, state}, config){
                // console.log('state2 :', state);
                if(!state.loadedConfigs){
                    commit('setConfig', config);
                }
                // console.log('state2b :', state.loadedConfigs);
            },
            
        }     
    })
}
export default createStore
