<template>
  <div>
    <transition name="img">
      <div class="col-2">
        <div>
            <prismic-image class="preview__img" :field="post.data.image"/>
        </div>
        <div class="post__meta">
            <div class="post__source">
                <span class="post__metasmall"><prismic-rich-text :field="post.data.imagesource"/></span> 
            </div>
            <div class="preview__tags post__tags">
                <router-link :to="`/blog/tag/${tag}`" class="preview__tag" v-for="tag of post.tags" :key="tag"><font-awesome-icon icon="tag" class="preview__tag_icon"></font-awesome-icon>{{tag}}</router-link>
            </div>
            <div class="post__firstdate">
                <span class="post__metasmall">published: </span>{{prettyDate(post.first_publication_date)}}
            </div>
            <div class="post__lastdate" v-if="prettyDate(post.first_publication_date)!=prettyDate(post.last_publication_date)">
                <span class="post__metasmall">updated: </span>{{prettyDate(post.last_publication_date)}}
            </div>
            <div class="post__author">
                <span class="post__metasmall">by: </span>{{post.data.meta[0].author}}
            </div>
        </div>
      </div>
    </transition>
    <transition name="post">
      <article v-if="allReady" class="post col-8">
        <header class="post__header">
          <h2 class="post__title"><prismic-rich-text :field="title"/></h2>

          <blockquote class="post__subtitle"><prismic-rich-text :field="description"/></blockquote>
        </header>

        <section class="post__body rte"><prismic-rich-text :field="content"/></section>

        <footer class="post__footer">
          <Disqus v-if="commentsReady" shortname='bnry-de'/>
        </footer>
      </article>
    </transition>
  </div>
</template>

<script>
import { Disqus } from 'vue-disqus'
import { kebabify, prettyDate } from '../assets/helpers'

export default {
  name: 'blog-post',
  resource: 'BlogPost',
  components: { Disqus },
  props: { post: String },
  data() {
    return {
      title: [],
      author: '',
      content: [],
      published: '',
      description: [],
      commentsReady: false,
      ready: false
    }
  },
  computed: {
    allReady() {
      return this.ready && this.post;
    }
  },
  watch: {
    post(to, from) {
      if (to === from || !this.post) return;
      this.commentsReady = false
      /*this.$getResource('post', to)
        .then(this.showComments)
        .then(() => {
          this.ready = true;
        });*/
      this.$prismic.client.getByUID('blog-post', this.post)
        .then((document) => {
            this.mergeData(document);
        })
        .then(this.showComments)
        .then(() => {
          document.title = this.title[0].text + ' - MOONLVND';
          this.ready = true;
        });
    }
  },
  methods: {
    kebabify,
    prettyDate,
    showComments() {
      // This is injected by prerender-spa-plugin on build time, we don't prerender disqus comments.
      if (window.__PRERENDER_INJECTED &&
          window.__PRERENDER_INJECTED.prerendered) {
        return;
      }
      setTimeout(() => {
        this.commentsReady = true
      }, 1000)
    },
    mergeData(doc) {
      this.title = doc.data.title;
      this.author = doc.data.meta[0].author;
      this.content = doc.data.content;
      this.published = doc.first_publication_date;
      this.description = doc.data.meta[0].description;
    }
  },
  mounted() {
    if (!this.post) {
      this.ready = true;
      return;
    }
    this.$prismic.client.getByUID('blog-post', this.post)
        .then((document) => {
            this.mergeData(document);
        })
        .then(this.showComments)
        .then(() => {
          this.ready = true;
        });
  }
}
</script>