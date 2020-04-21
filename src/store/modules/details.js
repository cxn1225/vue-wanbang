const state = {
    details: {}
}
const getters = {
    details: state => state.details
}
const mutations = {
    setDetails: (state, details) => state.details = details
}
const actions = {
    setDetailsAsync: ({ commit }, details) => commit("setDetails", details)
}

export default {
    state, getters, mutations, actions
}