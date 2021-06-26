<template>
    <div class="blog__feed col-md-10 col-sm-12 mx-auto" v-if="!reading">
        <content-placeholders v-if="this.posts.length==0" :rounded="true">
              <content-placeholders-heading />
              <content-placeholders-text :lines="6" />
              <br>
              <content-placeholders-heading />
              <content-placeholders-text :lines="6" />
        </content-placeholders>
        <transition-group tag="ul" name="preview-appear" class="blog__list">
            <li v-for="post in posts" :key="post.uid" class="preview">
                <div :class="classes">
                    <router-link class="preview__link" :to="`/blog/${post.uid}`">
                        <div class="preview__card row">
                            <div class="col-md-2 col-sm-4 col-4 maxheight">
                                <prismic-image class="preview__img" :field="post.data.image"/>
                            </div>
                            <div class="col-md-10 col-sm-8 col-8 maxheight">
                                <div class="preview__title">
                                    <prismic-rich-text class="preview__title_div" :field="post.data.title"/>
                                </div>
                                <div class="preview__tags">
                                    <router-link :to="`/blog/tag/${tag}`" class="preview__tag color5" v-for="tag of post.tags" :key="tag"><font-awesome-icon icon="tag" class="preview__tag_icon"></font-awesome-icon>{{tag}}</router-link>
                                </div>
                                <div class="preview__desc">
                                    <prismic-rich-text :field="post.data.meta[0].description"/>
                                </div>
                                <div class="preview__details">
                                    <h5 class="preview__meta">
                                        <span class="preview__smalltext preview__color_light">by </span>
                                        <router-link class="preview__author" :to="`/blog/by/${ post.data.meta[0].author }`" @click.native="scrollTo(0)" v-html="`${post.data.meta[0].author}`"></router-link>
                                        <time class="preview__published preview__color_light">
                                            <span class="preview__smalltext">on </span>{{ prettyDate(post.first_publication_date) }}
                                        </time>
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </li>
        </transition-group>
        <div class="feed__pages">
            <ul class="feed__pagination">
                <li class="feed__pageitem">
                    <router-link class="feed__pagelink" :to="pageLink('prev')" aria-label="Previous" :class="{'feed__disabledlink' : pageLink('prev')==''}">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </router-link>
                </li>
                <li v-for="nmb in range(pages,1)" :key="nmb" class="feed__pageitem"><router-link class="feed__pagelink" :class="{'router-link-active' : nmb == page}" :to="pageLink(nmb)">{{nmb}}</router-link></li>
                <li class="feed__pageitem">
                    <router-link class="feed__pagelink" :to="pageLink('next')" aria-label="Previous" :class="{'feed__disabledlink' : pageLink('next')==''}">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { scrollTo, kebabify, prettyDate } from '../assets/helpers'

export default {
    name: 'blog-feed',
    resource: 'BlogFeed',
    props: {filters: Object },
    
    data() {
        return { 
            posts : [],
            pages: null,
            results_per_page: null,
            page: null,
            next_page: null,
            prev_page: null
        }
    },
    computed: {
        reading() { return this.filters.post },
        classes() {
            return {
                'preview': true,
                'blog__post': true,
                'preview__reading': this.reading
            }
        },
        feed() {
            const filterBy = { //to add more filters simply append new method here ↓
                post: (filter, {id}) => filter === id,
                author: (filter, {author}) => filter === author,
                tag: (filter, {tag}) => filter === tag
            }

            if(!Object.keys(this.filters).length) return this.posts

            return this.posts.filter(post => {
                return Object.keys(this.filters).every(filter => {
                    return filterBy[filter](this.filters[filter], post)
                })
            })
        }
    },
    methods: {scrollTo, kebabify, prettyDate,
        range(size, startAt=1) {
            var arr = [...Array(size).keys()].map(i => i + startAt);
            return arr;
        },
        fillFromResponse(response) {
            this.posts = response.results;
            this.pages = response.total_pages;
            this.results_per_page = response.results_per_page;
            this.page = response.page;
            this.next_page = response.next_page;
            this.prev_page = response.prev_page;
        },
        pageLink(page) {
            if(page == 'prev') return this.page==1 ? '' : {path: this.$route.path, query : { p : this.page - 1}};
            if(page == 'next') return this.page==this.pages ? '' : {path: this.$route.path, query : { p : this.page + 1}};
            if(page > 0) return {path: this.$route.path, query : { p : page}};
            return this.$route.path;
        }
    },
    beforeMount() { 
        var pageq = this.$route.query.p;
        if(this.filters.author){
            this.$prismic.client.query(
                [this.$prismic.Predicates.at('document.type', 'blog-post'), this.$prismic.Predicates.at('my.blog-post.meta.author', this.filters.author)],
                { orderings: '[my.blog-post.meta.published desc]'/*, pageSize: 10*/, page: pageq ? pageq : 1} 
            ).then((response) => {
                 this.fillFromResponse(response);
            })
        }else if(this.filters.tag){
            this.$prismic.client.query(
                [this.$prismic.Predicates.at('document.type', 'blog-post'), this.$prismic.Predicates.at('document.tags', [this.filters.tag])],
                { orderings: '[my.blog-post.meta.published desc]'/*, pageSize: 10*/, page: pageq ? pageq : 1}
            ).then((response) => {
                this.fillFromResponse(response);
            })
        }else{
            this.$prismic.client.query(
                this.$prismic.Predicates.at('document.type', 'blog-post'),
                { orderings: '[my.blog-post.meta.published desc]'/*, pageSize: 10*/, page: pageq ? pageq : 1}
            ).then((response) => {
                 this.fillFromResponse(response);
            })
        }
    },
    mounted() {
        //const imgTL = gsap.timeline({})

        //imgTL.to("#triggerblock", {duration: 1, css: {"position": "fixed", "left": "5rem"}})

        //won't work unless you get $refs in a state after v-for is fired else refs can't access elements generated by v-for bindings
        /*const triggerEl = this.$refs.triggerblock.$el

        const sceneLinks = new ScrollScene({
            triggerElement: triggerEl, 
            toggle: {
                element: this.$refs.triggerImg,
                className: 'blog__side'
            }
        });
        //sceneLinks.Scene.setClassToggle('#triggerImg', "blog__side")
        sceneLinks.Scene.addIndicators({});*/
    }
}
</script>