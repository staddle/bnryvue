import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Home from './components/Home.vue'
import Projects from './components/Projects.vue'
import About from './components/About.vue'
import Imprint from './components/Imprint.vue'
import Valorantery from './components/Valorantery.vue'
import Blog from './components/Blog.vue'
import ValorantParty from './components/ValorantParty.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PortalVue from 'portal-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faTag } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueDisqus from 'vue-disqus'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
	
import PrismicVue from '@prismicio/vue'
import linkResolver from './link-resolver'; 

Vue.use(PrismicVue, {
  endpoint: "https://bnryde.cdn.prismic.io/api/v2",
  linkResolver
});
Vue.use(PortalVue)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueDisqus, {
  shortname: 'bnry-de'
})

library.add(faCoffee, faTag)
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
    {path: '/valorant', component: ValorantParty},
    {path: '/blog', name: 'feed', component: Blog},
    {path: '/blog/:post', name: 'post', props: true, component: Blog},
    {path: '/blog/by/:author', name: 'author', props: true, component: Blog}
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
