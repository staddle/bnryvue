<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-overwrite">
      <a class="navbar-brand navbar-brand-link" href="#">
        <img class="d-inline-block align-top" src="../assets/icos/drawing_w.png" width="30" height="30">
        B<span class="navbar-font-secondary">I</span>N<span class="navbar-font-secondary">A</span>RY.de
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <router-link class="nav-link nav-active-line" to="/">Home</router-link>
        </li>
        <!--<li class="nav-item">
          <router-link class="nav-link" to="{name: '/home', hash: '#aboutme'}">Projects</router-link>
        </li>-->
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Nav'
}
</script>

<style scoped>
.navbar-brand-link span {
  color: #8d9ba5;
  -moz-transition: color .2s ease-in;
  -o-transition: color .2s ease-in;
  -webkit-transition: color .2s ease-in;
  transition: color .2s ease-in; }

.navbar-brand-link:hover span {
  color: #fff; }

.nav-item {
  padding: 0px 0px; }

.nav-link {
  padding: 10px 0px;
  -moz-transition: all .2s ease-in;
  -o-transition: all .2s ease-in;
  -webkit-transition: all .2s ease-in;
  transition: all .2s ease-in;
  border-bottom: 2px solid #8d9ba500; }

.nav-link.nav-active-line {
  border-bottom: 2px solid #8d9ba5; }

.nav-link:hover {
  border-bottom: 2px solid #8d9ba5; }

.navbar {
  padding: 0rem 1rem;
  background-color: rgba(20, 20, 20, 0.7);
  color: white; }

.navbar-overwrite {
  position: sticky;
  top: 0; 
  z-index: 5;}

.nav-active-line {
  border-bottom: 2px solid #01baef; }

</style>