<template>
  <div class="mappage page flexcol" ref="mappage">
      
      <div class="textcontainer textleft text-bg-dark">
          <div class="containercontent timeline-left timeline-turkis">
            <h1 class="textheading">RPG Map</h1>
            <div class="textcontent">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Faucibus purus in massa tempor nec feugiat nisl pretium. Nisi est sit amet facilisis magna etiam tempor orci eu. Sed augue lacus viverra vitae congue. Commodo quis imperdiet massa tincidunt nunc pulvinar. Vitae semper quis lectus nulla at. Elementum nibh tellus molestie nunc non blandit. Pellentesque diam volutpat commodo sed. Aliquet lectus proin nibh nisl condimentum id venenatis a. Aliquet nibh praesent tristique magna sit amet. Risus at ultrices mi tempus. Natoque penatibus et magnis dis parturient montes nascetur.

                    In ornare quam viverra orci sagittis. Nullam vehicula ipsum a arcu cursus vitae. Ac felis donec et odio pellentesque diam volutpat. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Consequat semper viverra nam libero justo laoreet sit amet. Magna etiam tempor orci eu lobortis elementum nibh. Bibendum neque egestas congue quisque egestas diam in arcu. Semper ege facilisis gravida neque convallis.
            </div>
          </div>
      </div>
      <img class="imgright mappageimg" src="../../assets/imgs/undraw_adventure_map_hnin.svg">
      <div class="timeline2-div timeline2-end">
        <div class="timeline2-top timeline2-topleft-orange-turkis timeline-turkis"></div>
        <div class="timeline2 timeline2-left timeline-turkis"></div>
      </div>
  </div>
</template>

<script>
import { ScrollScene, addIndicators} from 'scrollscene'
import { gsap } from 'gsap'

export default {
  mounted(){
    let sceneLinks = new ScrollScene({
            triggerElement: this.$refs.mappage,
            triggerHook: 'onLeave',
            duration: "200%"
        })
    sceneLinks.Scene.setPin(this.$refs.mappage, {pushFollowers: false})
  }
}
</script>

<style>
    @import url('../../assets/css/projets.css');
</style>