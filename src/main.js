import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Projects from './components/Projects.vue'
import About from './components/About.vue'


Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', alias: '/home', component: Home},
    {path: '/projects', component: Projects},
    {path: '/about', component: About}
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
