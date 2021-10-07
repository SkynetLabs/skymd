<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    
    <router-view/>
  </div>
</template>
<script>
export default {
  // created(){
  //   this.$store.dispatch("Notes/loadNotes").then(() => {
  //     this.$bvToast.toast(`Your notes were successfully loaded`, {
  //       title: 'Success',
  //       variant: 'success'
  //     })                
  //   }).catch((err) => {
  //     this.$bvToast.toast(`${err['message']}`, {
  //       title: 'Error',
  //       variant: 'danger'
  //     })                
  //   })
  // }
}
</script>

<style lang="scss">
  @import '~bootstrap/scss/bootstrap.scss';
  @import '~bootstrap-vue/src/index.scss';

//@import "~@/assets/scss/vendors/bootstrap-vue/index";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
