<template>
    <div class="container-fluid">
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
        <div class="testbig"></div>
    </div>
</template>

<script>
import { ScrollScene, addIndicators } from 'scrollscene'
import { gsap } from 'gsap'

export default {
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
        console.log(transX + ' ' + transY);
        nameTL.to("#bigName", {
            duration: .5,
            opacity: 0
            });   
        
        const sceneName = new ScrollScene({
            triggerElement: '#anchor-top-mid',
            triggerHook: 0.5,
            offset: 300,
            gsap: {
                timeline: nameTL
            }
        })
    }
}
</script>

<style>

</style>