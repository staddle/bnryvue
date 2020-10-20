<template>
    <transition-group tag="ul" name="preview-appear" :class="{'col-2' : reading, 'blog__feed': !reading}">
        <li v-for="post in posts" :key="post.uid" class="preview">
            <div :class="classes">
                <router-link class="preview__link" :to="`/blog/${post.uid}`">
                    <div class="preview__card row" id="triggerblock" ref="triggerblock">
                        <div id="triggerImg" ref="triggerImg" :class="{'col-md-2 col-sm-4 col-4 maxheight' : !reading}">
                            <prismic-image class="preview__img" :field="post.data.image"/>
                        </div>
                        <div class="col-md-10 col-sm-8 col-8 maxheight" v-if="!reading">
                            <div class="preview__title">
                                <prismic-rich-text class="preview__title_div" :field="post.data.title"/>
                            </div>
                            <div class="preview__tags color5">
                                <span TODO:to="`/blog/tag/${tag}`" class="preview__tag" v-for="tag of post.tags" :key="tag"><font-awesome-icon icon="tag" class="preview__tag_icon"></font-awesome-icon>{{tag}}</span>
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
                                        <span v-if="prettyDate(post.first_publication_date)!=prettyDate(post.last_publication_date)"><span class="preview__smalltext">last updated on </span>{{ prettyDate(post.last_publication_date) }}</span>
                                    </time>
                                </h5>
                            </div>
                        </div>
                    </div>
                </router-link>
            </div>
            <div v-if="reading" class="post__meta">
                <div class="post__source">
                    <span class="post__metasmall"><prismic-rich-text :field="post.data.imagesource"/></span> 
                </div>
                <div class="preview__tags post__tags">
                    <span TODO:to="`/blog/tag/${tag}`" class="preview__tag" v-for="tag of post.tags" :key="tag"><font-awesome-icon icon="tag" class="preview__tag_icon"></font-awesome-icon>{{tag}}</span>
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
        </li>
    </transition-group>
</template>

<script>
import { scrollTo, kebabify, prettyDate } from '../assets/helpers'
import { ScrollScene, addIndicators } from 'scrollscene'
import { gsap } from 'gsap'

export default {
    name: 'blog-feed',
    resource: 'BlogFeed',
    props: {filters: Object },
    
    data() {
        return { 
            posts : []
        }
    },
    computed: {
        reading() { return this.filters.post },
        classes() {
            return {
                'preview': true,
                'blog__post': true,
                'preview--reading': this.reading
            }
        },
        feed() {
            const filterBy = { //to add more filters simply append new method here ↓
                post: (filter, {id}) => filter === id,
                author: (filter, {author}) => filter === this.kebabify(author)
            }

            if(!Object.keys(this.filters).length) return this.posts

            return this.posts.filter(post => {
                return Object.keys(this.filters).every(filter => {
                    return filterBy[filter](this.filters[filter], post)
                })
            })
        }
    },
    methods: {scrollTo, kebabify, prettyDate },
    beforeMount() { 
        this.$prismic.client.query(
            this.$prismic.Predicates.at('document.type', 'blog-post'),
            { orderings: '[my.blog-post.meta.published desc]'/*, pageSize: 10, page: this.page*/}
        ).then((response) => {
            this.posts = response.results;
        })
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