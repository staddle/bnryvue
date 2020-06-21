<template>
    <div class="container-fluid fitFull">
        <img src='../assets/imgs/tri_1viewport.jpg' class="backgroundimg" style="position: absolute; top: 0vh;">
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
        <div class="percent50" style="position: absolute; top: 100vh">
            <div class="parallax" style="height: 100%">
                <img ref='parallax1' class='toparallax' speed='0.2' src='../assets/imgs/pinkfull_transparent.png'>
            </div>
        </div>
        <img src='../assets/imgs/p2z1.png' class="backgroundimg" style="position: absolute; top: 150vh">
        <div class="percent50" style="position: absolute; top: 250vh">
            <div class="parallax" style="height: 100%">
                <img ref='parallax2' class='toparallax' speed='0.2' src='../assets/imgs/pinkfull_transparent.png'>
            </div>
        </div>
        <img src='../assets/imgs/p3.png' class="backgroundimg" style="position: absolute; top: 300vh">
    </div>
</template>

<script>
import { ScrollScene, addIndicators } from 'scrollscene'
import { gsap } from 'gsap'
import Parallax from 'vue-parallaxy'

export default {
    components: {
        //Parallax
    },
    created () {
        window.addEventListener('scroll', this.handleScroll);
        window.addEventListener('ready', this.handleScroll);
    },
    destroyed () {
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('ready', this.handleScroll);
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
    },
    methods: {
        handleScroll(event){
            var img = this.$refs.parallax1;
            var imgParent = this.$refs.parallax1.parentElement;
            var speed = parseFloat(img.attributes['speed'].value);
            var rect = imgParent.getBoundingClientRect();
            var imgY = rect.top + document.body.scrollTop;
            var winY = document.body.scrollTop;
            var winH = parseFloat(getComputedStyle(document.body, null).height.replace("px", ""));
            var parentH = imgParent.clientHeight;

            // The next pixel to show on screen      
            var winBottom = winY + winH;

            // If block is shown on screen
            if (winBottom > imgY && winY < imgY + parentH) {
                // Number of pixels shown after block appear
                var imgBottom = ((winBottom - imgY) * speed);
                // Max number of pixels until block disappear
                var imgTop = winH + parentH;
                // Porcentage between start showing until disappearing
                //var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
                var imgPercent = ((imgBottom / imgTop) * 100);
            }
            //img.style.top = imgPercent + '%';
            img.style.transform = 'translate(0%, -' + imgPercent + '%)';
            
            //again for other
            img = this.$refs.parallax2;
            imgParent = this.$refs.parallax2.parentElement;
            speed = parseFloat(img.attributes['speed'].value);
            rect = imgParent.getBoundingClientRect();
            imgY = rect.top + document.body.scrollTop;
            winY = document.body.scrollTop;
            winH = parseFloat(getComputedStyle(document.body, null).height.replace("px", ""));
            parentH = imgParent.clientHeight;

            // The next pixel to show on screen      
            winBottom = winY + winH;

            // If block is shown on screen
            if (winBottom > imgY && winY < imgY + parentH) {
                // Number of pixels shown after block appear
                imgBottom = ((winBottom - imgY) * speed);
                // Max number of pixels until block disappear
                imgTop = winH + parentH;
                // Porcentage between start showing until disappearing
                //var imgPercent = ((imgBottom / imgTop) * 100) + (50 - (speed * 50));
                imgPercent = ((imgBottom / imgTop) * 100);
            }
            
            //img.style.top = imgPercent + '%';
            img.style.transform = 'translate(0%, -' + imgPercent + '%)';
        }
    }
}
</script>

<style>

</style>