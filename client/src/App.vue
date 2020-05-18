<template>
  <div id="app" style="height: 100vh; max-width: 100% background-color: #343a40;">
    <PostComponet style="ackground-color: #343a40" msg="Welcome to Notepad!"/>
  </div>
</template>

<script>
import PostComponet from './components/postComponet.vue'

export default {
  name: 'App',
  components: {
    PostComponet
  }
}
</script>

<style>
#app {
  position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    height:100%;
    width:100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #343a40;
  width: 100%;
  min-height: 100%;
}
</style>
