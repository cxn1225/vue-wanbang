const state = {
  userId: ''
}
const getters = {
  user: state => state.userId
}
const mutations = {
  setuserId: (state, userId) => state.userId = userId
}
const actions = {
  setuserIdAsync: ({ commit }, userId) => commit("setuserId", userId)
}

export default {
  state, getters, mutations, actions
}