<template>
    <div class="container-fluid fitFull">
        <!--<div class="alert alert-info alerttop col-lg-3 col-md-4" role="alert" v-if="alertShown">
            <div class="row">
                <div class="col-11">   
                    <router-link :to="alertLink" class="alertlink">
                        <prismic-rich-text :field="alert"></prismic-rich-text>
                    </router-link>
                </div> 
                <div class="col-1">
                    <a class="alert-close" v-on:click="alertSwitch()" href="#"><font-awesome-icon icon="times"></font-awesome-icon></a>
                </div>
            </div>
        </div>-->
        <!--<intersect @enter="changeSpeed = 0.002" @leave="changeSpeed = 0">
            <flat-surface-shader type="webgl" 
                                :light="{ambient: '#3A055A', diffuse: '#2a1438', autopilot: 'true'}"
                                :mesh="{speed: changeSpeed}"
                                class="shader"
                                height="100vh">                            
            </flat-surface-shader>
        </intersect>-->
        <div class="padthetop"></div>
        
        <span id="anchor-top-mid" class="fixed-mid"></span>
        <div class="row" id="top">
            <div class="width-100 vertical-center">
                <div class="col-before"></div>
                <div id="triggerName" ref="triggerName" class="maindiv">
                    <div id="bigName" ref="bigName" class="links-header">staddle</div>
                    <div>
                        <hr id='divider1' class="divider">
                        <ul id="links-list" class="links-list flex-content" scroll="handleScroll">
                            <li class="links-list-item">
                                <a class="links-link links-link-twitter" href="https://twitter.com/staddle_">>&#8239;twitter</a>
                            </li>
                            <li class="links-list-item">
                                <a class="links-link links-link-twitch" href="https://twitch.tv/staddle_">>&#8239;twitch</a>
                            </li>
                            <li class="links-list-item">
                                <a class="links-link links-link-github" href="https://github.com/staddle">>&#8239;github</a>
                            </li>
                            <li class="links-list-item">
                                <a class="links-link links-link-osu" href="https://osu.ppy.sh/users/9329597">>&#8239;osu!</a>
                            </li>
                            <li class="links-list-item">
                                <a class="links-link links-link-steam" href="https://steamcommunity.com/id/staddle/">>&#8239;steam</a>
                            </li>
                            <li class="links-list-item">
                                <a class="links-link links-link-youtube" href="https://www.youtube.com/channel/UCiYBRlAdcUNSnBbCSgkamkA">>&#8239;youtube</a>
                            </li>
                        </ul>
                    </div>
                    
                </div>
                <div class="col-before"></div>
                <div class="scroll-down-div">
                    <font-awesome-icon class="scroll-down" icon="chevron-down"></font-awesome-icon>
                </div>
            </div>
        </div>
        <projects></projects>
        <contact-me></contact-me>
        <Footer class="footercl"></Footer>
    </div>
</template>

<script>
import { ScrollScene, addIndicators } from 'scrollscene'
import { gsap } from 'gsap'
import { Controller, Scene } from 'scrollmagic'

import Projects from './Projects.vue'
import Intersect from 'vue-intersect'
import ContactMe from './projectPages/ContactMe.vue'
import Footer from './Footer.vue'

export default {
    components: {
        Projects,
        //Intersect,
        ContactMe,
        Footer,
    },
    data() {
        return {
            alert: null,
            alertShown: this.$store.state.alertShown,
            alertLink: '/',
            changeSpeed: 0.002
        }
    },
    beforeMount() { 
        this.$prismic.client.getSingle('homepagenews').then((document) => {
            if(document.data.enabled){
                this.alert = document.data.alert;
                this.alertLink = document.data.link;
            }
        });
    },
    mounted () {
        const linksTL = gsap.timeline({paused: true})

        linksTL.to("#links-list", {duration: 1, css: {opacity: 0, "transform": "translate(0, -50px)"}})
        linksTL.to("#divider1", {duration: 1, css: {width: 0}}, ">")

        const sceneLinks = new ScrollScene({
            triggerElement: '#triggerName',
            triggerHook: 0.5,
            offset: 200,
            gsap: {
                timeline: linksTL
            },
            duration: 200
        })

        var fixedX = 10, fixedY = 20;
        const nameTL = gsap.timeline({paused: true})
        var rect = this.$refs.bigName.getBoundingClientRect();
        var transX = fixedX - rect.right;
        var transY = fixedY - rect.top;
        // eslint-disable-next-line
        //console.log(transX + ' ' + transY);
        nameTL.to("#bigName", {
            duration: .5,
            opacity: 0
            });   
        
        const sceneName = new ScrollScene({
            triggerElement: '#anchor-top-mid',
            triggerHook: 0.5,
            offset: 300,
            gsap: {
                timeline: nameTL,
            }
        })
        //aboutme
        const aboutmeFade = gsap.timeline({paused: true})
        aboutmeFade.to('#aboutmetext', {duration: 1, opacity: 1, ease: 'ease'})

        new ScrollScene({
                triggerElement: '#aboutme',
                triggerHook: 0.7,
                gsap: {
                    timeline: aboutmeFade
                },
                duration: 0
        })
    },
    methods: {
        alertSwitch() {
            this.$store.commit('switchAlert');
            this.alertShown = this.$store.state.alertShown;
        },
        stopAnimation() {
            this.changeSpeed = 0;
        },
        startAnimation(){
            this.changeSpeed = 0.002;
        }
    }
}
</script>

<style>
    @import url('../assets/css/projets.css');
</style> 