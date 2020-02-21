<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-overwrite">
      <router-link class="navbar-brand navbar-brand-link" 
        to="/home"
        v-slot="{ href, route, navigate }"
      >
        <a :href="href" @click="navigate">
          <img class="d-inline-block align-top" src="./assets/icos/drawing_w.png" width="30" height="30">
          B<span class="navbar-font-secondary">I</span>N<span class="navbar-font-secondary">A</span>RY.de
        </a>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/projects">Projects</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import url('./assets/css/style.css');
  @import url('./assets/css/nav.css');
</style>
