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
import WIP from './components/WIP.vue'
import Feed from './components/danbooru/Feed.vue'
import FeedView from './components/danbooru/FeedView.vue'
import newHome from './components/newHome.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PortalVue from 'portal-vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faTag, faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import VueDisqus from 'vue-disqus'
import Vuex from 'vuex'

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
Vue.use(Vuex)

library.add(faCoffee, faTag, faTimes)
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
    {path: '/home', component: Home , meta: { title: route => { return 'staddle' } }},
    {path: '/projects', component: Projects, meta: { title: route => { return 'BNRY - Projects' } }},
    {path: '/about', component: About, meta: { title: route => { return 'BNRY - About' } }},
    {path: '/imprint', component: Imprint, meta: { title: route => { return 'BNRY - Imprint' } }},
    //{path: '/valorant', component: ValorantParty, meta: { title: route => { return 'Ultimate Valorantery' } }},
    {path: '/valorant', component: WIP, meta: { title: route => { return 'Ultimate Valorantery' } }},
    {path: '/blog', name: 'feed', component: Blog, meta: { title: route => { return 'MOONLVND' } }},
    {path: '/blog/:post', name: 'post', props: true, component: Blog, meta: { title: route => { return 'MOONLVND' } }},
    {path: '/blog/by/:author', name: 'author', props: true, component: Blog, meta: { title: route => { return 'MOONLVND' } }},
    {path: '/blog/tag/:tag', name: 'tag', props: true, component: Blog, meta: { title: route => { return 'MOONLVND' } }},
    {path: '/danbooru/', name: 'danfeed', component: Feed, meta: {title: route => { return 'Danbooru - Feed' } }},
    {path: '/danbooru/feed/', name: 'danfeedview', component: FeedView, meta: {title: route => { return 'Danbooru - FeedView' } }},
    {path: '/newhome', component: newHome}
  ]
})

router.afterEach((to, from) => { //change document title for every route change
  Vue.nextTick(() => {
    document.title = to.meta.title(to)
  })
})

const store = new Vuex.Store({
  state: {
    alertShown : true,
    tagShown: false
  },
  mutations: {
    switchAlert(state) {
      state.alertShown = ! state.alertShown;
    },
    switchTagShown(state){
      state.tagShown = !state.tagShown;
    }
  }
})

new Vue({
  router,
  render: h => h(App),
  store: store
}).$mount('#app')
