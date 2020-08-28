import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Projects from './components/Projects.vue'
import About from './components/About.vue'
import Imprint from './components/Imprint.vue'
import Valorantery from './components/Valorantery.vue'
import ValorantParty from './components/ValorantParty.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PortalVue from 'portal-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(PortalVue)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

library.add(faCoffee)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

/*const GSAPScrollMagic = {
  install (Vue, options) {
    // GSAP
    Vue.prototype.$GSAP = {
      gsap,
      TweenMax,
      TimelineMax
    }
    // ScrollMagic
    Vue.prototype.$ScrollMagic = {
      Controller: new ScrollMagic.Controller(),
      Scene: ScrollMagic.Scene
    }
  }
}

Vue.use(GSAPScrollMagic)*/

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: Home},
    {path: '/projects', component: Projects},
    {path: '/about', component: About},
    {path: '/imprint', component: Imprint},
    {path: '/valorant', component: ValorantParty}
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
