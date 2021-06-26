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
        <intersect @enter="changeSpeed = 0.002" @leave="changeSpeed = 0">
            <flat-surface-shader type="webgl" 
                                :light="{ambient: '#3A055A', diffuse: '#2a1438', autopilot: 'true'}"
                                :mesh="{speed: changeSpeed}"
                                class="shader"
                                height="120vh">                            
            </flat-surface-shader>
        </intersect>
        
        <span id="anchor-top-mid" class="fixed-mid"></span>
        <div class="row">
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
            </div>
        </div>
        <vue-diagonal :deg="5" background="#343a40" class="diag1">
            <div class="diag1move" id="diag1"><!--<font-awesome-icon icon="level-up-alt" class="arrowrot"></font-awesome-icon>-->
                <img src="../assets/imgs/arrow.png" class="arrowrot" id="diag1arrow"> <span class="scrollfont">Scroll</span>
            </div>
        </vue-diagonal>
        <projects class="proj"></projects>
    </div>
</template>

<script>
import { ScrollScene, addIndicators } from 'scrollscene'
import { gsap } from 'gsap'
import Projects from './Projects.vue'
import Intersect from 'vue-intersect'

export default {
    components: {
        Projects,
        Intersect
    },
    data() {
        return {
            alert: null,
            alertShown: this.$store.state.alertShown,
            alertLink: '/',
            changeSpeed: 0.002
        }
    },
    created () {
        //window.addEventListener('scroll', this.handleScroll);
        //window.addEventListener('ready', this.handleScroll);
    },
    destroyed () {
        //window.removeEventListener('scroll', this.handleScroll);
        //window.removeEventListener('ready', this.handleScroll);
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

        const scrollTL = gsap.timeline({paused: true})
        scrollTL.to("#diag1", {
            duration: .5,
            opacity: 0
        })
        

        const sceneDiag = new ScrollScene({
            triggerElement: '#diag1',
            triggerHook: 0.5,
            offset: 200,
            gsap: {
                timeline: scrollTL
            }
        })
        
        const scrollTL1 = gsap.timeline({paused: true})
        /*scrollTL.to("#diag1", {
            duration: .5,
            opacity: 0
        })*/
        scrollTL1.to("#diag1arrow", {
            duration: .5,
            css: {"rotate": "90deg"}
        })

        const sceneDiag1 = new ScrollScene({
            triggerElement: '#diag1',
            triggerHook: 0.5,
            offset: 100,
            gsap: {
                timeline: scrollTL1
            }
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
    .shader{
    width: 100vw;
    height: 120vh;
    margin-top: -3rem;
  }
</style>