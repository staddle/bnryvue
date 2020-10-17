<template>
    <div>
      <blog-feed :filters="filters"/>
      <blog-post :post="post"/>
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

  mounted() {
    this.$getResource('blog')
      .then(x => {
        //aaa
      })
  }
}
</script>

<style lang="sass">
@import '../assets/css/blog.css'
</style>