<template>
    <div>
      <div class="row heading">
        <div class="w-50 mx-auto text-center">
          <router-link to="/blog" class="nolink">
            <h1>Blog</h1>
          </router-link>
          <hr class="divider">
        </div>
      </div>
      <div class="row">
        <blog-feed :filters="filters"/>
        <blog-post :post="post"/>
      </div>
    </div>
</template>

<script>
import BlogFeed from './BlogFeed'
import BlogPost from './BlogPost'

export default {
  name: 'Blog',
  components: {BlogFeed, BlogPost},
  resource: 'Blog',
  props: {
    post: String,
    author: String
  },

  data() {
    return {
      title: '',
      labels: {
        post: '',
        author: ''
      }
    }
  },

  computed: {
    content() {
      return {title: this.title, labels: this.labels}
    },
    filters() {
      let filters={}

      if (this.post) filters.post = this.post
      if (this.author) filters.author = this.author

      return filters
    }
  },
  watch: {
    '$route.name' (to, from) {
      if (to !== from) this.navs++
    }
  },
  mounted() {
    //this.$getResource('blog')
  }
}
</script>

<style lang="sass">
@import '../assets/css/blog.css'
</style>