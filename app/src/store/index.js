import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ['Notes']
})
const vuexSkynet = new VuexPersistence({
  //TODO skynet persistence
})

Vue.use(Vuex)
/**
 * Vuex store of misc functions and data used throughout the application
 */
const utils = { 
  namespaced: true,
  state: {
    /**
     * Nice formatting for human readable dates
     * @param {Date} date 
     * @returns a human readable date string
     */
    timeSince: function(date) {
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = seconds / 31536000;
      if (interval > 1) {
        return Math.floor(interval) + " years";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + " months";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + " days";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + " hours";
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + " minutes";
      }
      return Math.floor(seconds) + " seconds";
    },
  }
}
/**
 * List of all the notes and their metadata, mutations for modifying the notes list, actions for creating new notes 
 */
const notes = {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    setNotes(state, payload){
      state.list = payload
    },
    pushNote(state, payload){
      let exists = state.list.filter(x => x.id == payload.id)
      if(exists.length > -1) state.list.push(payload)
    },
    popNote(state, payload){
      state.notes = state.list.filter(x => x.id != payload.id)
    },
    saveNote(state, payload){
      let exists = state.list.filter(x => x.id == payload.id)[0]
      state.list[state.list.indexOf(exists[0])] = payload
    }
  },
  actions: {
    /**
     * Creates a new note
     * @returns a new note with default text
     */
    newNote({commit}){
      let placeholder = `# %% [markdown]
# Your New Sky Note
Decentralized your thoughts. 
#### Some features 
* Mix Markdown, HTML, CSS and Javascript.
* The file format is a plaintext file, which plays nice with version control systems like git.
* Runs entirely in your browser, everything is static: no server, no setup and no build step.

> Tip: Press the ▶ Play button on the left to run a cell's code.
# %% [javascript]
// You write vanilla Javascript
const greeting = "Hello world!";

// The last statement in a cell will be displayed if it is not undefined.
greeting`      
      let now = Date.now()
      let note = {id: now, title: 'New Note', changed: now, data: placeholder}
      commit('pushNote', note)
      return note
    },
  },
}

export default new Vuex.Store({
  modules: {
    Notes: notes,
    Utils: utils
  },
  plugins: [vuexLocal.plugin]
})
