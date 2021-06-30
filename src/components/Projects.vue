<template>
    <div>
        <about-me></about-me>
        <blog-page id="blog" ref="blogp"></blog-page>
        <website-page id="website"></website-page>
        <bot-page id="bot"></bot-page>
        <map-page id="map"></map-page>
    </div>
</template>

<script>
import AboutMe from './projectPages/AboutMe.vue'
import BlogPage from './projectPages/BlogPage.vue'
import BotPage from './projectPages/BotPage.vue'
import MapPage from './projectPages/MapPage.vue'
import WebsitePage from './projectPages/WebsitePage.vue'
import Intersect from 'vue-intersect'

export default {
  name: 'Projects',
  components: {
    BlogPage,
    AboutMe,
    WebsitePage,
    BotPage,
    MapPage,
  },
  data ()
    {
  },
}
</script>

<style scoped>
  @import url('../assets/css/projets.css');
</style>