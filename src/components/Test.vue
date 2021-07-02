<template>
  <div id="app">
    <section class="panel blue" ref="blue">
      <b>ONE</b>
    </section>
    <div class="blogpage page flexcol" id="blogpage" ref="turqoise">
      <img class="imgleft" src="../assets/imgs/undraw_Blog_post_re_fy5x.svg">
      <div class="textcontainer textright text-bg-dark">
          <div class="containercontent">
            <h1 class="textheading">My Blog</h1>
            <div class="textcontent">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet justo donec enim diam vulputate. Faucibus purus in massa tempor nec feugiat nisl pretium. Nisi est sit amet facilisis magna etiam tempor orci eu. Sed augue lacus viverra vitae congue. Commodo quis imperdiet massa tincidunt nunc pulvinar. Vitae semper quis lectus nulla at. Elementum nibh tellus molestie nunc non blandit. Pellentesque diam volutpat commodo sed. Aliquet lectus proin nibh nisl condimentum id venenatis a. Aliquet nibh praesent tristique magna sit amet. Risus at ultrices mi tempus. Natoque penatibus et magnis dis parturient montes nascetur.

                    In ornare quam viverra orci sagittis. Nullam vehicula ipsum a arcu cursus vitae. Ac felis donec et odio pellentesque diam volutpat. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero. Consequat semper viverra nam libero justo laoreet sit amet. Magna etiam tempor orci eu lobortis elementum nibh. Bibendum neque egestas congue quisque egestas diam in arcu. Semper ege facilisis gravida neque convallis.
            </div>
          </div>
      </div>
      <div class="timeline2-div timeline2-start">
        <div class="timeline2-top timeline-orange"></div>
        <div class="timeline2 timeline2-right timeline-orange"></div>
      </div>
    </div>
    <blog-page class="panel green" ref="green"></blog-page>
    <!--<section class="panel green" ref="green"></section>-->
    <section class="panel bordeaux" ref="red">
      <b>FOUR</b>
    </section>
  </div>
</template>

<script>
import { Controller, Scene } from 'scrollmagic'
import BlogPage from './projectPages/BlogPage.vue';

export default {
    components: {
        BlogPage
    },
  mounted(){

    var controller = new Controller({
      globalSceneOptions: {
				triggerHook: 'onLeave',
				duration: "200%" // this works just fine with duration 0 as well
				// However with large numbers (>20) of pinned sections display errors can occur so every section should be unpinned once it's covered by the next section.
				// Normally 100% would work for this, but here 200% is used, as Panel 3 is shown for more than 100% of scrollheight due to the pause.
			}
    })

    new Scene({
					triggerElement: this.$refs.blue
				})
				.setPin(this.$refs.blue, {pushFollowers: false})
        .addIndicators()
				.addTo(controller);
    new Scene({
					triggerElement: this.$refs.turqoise
				})
				.setPin(this.$refs.turqoise, {pushFollowers: false})
        .addIndicators()
				.addTo(controller);
    new Scene({
					triggerElement: this.$refs.green
				})
				.setPin(this.$refs.green, {pushFollowers: false})
        .addIndicators()
				.addTo(controller);
    new Scene({
					triggerElement: this.$refs.red
				})
				.setPin(this.$refs.red, {pushFollowers: false})
        .addIndicators()
				.addTo(controller);
  }
}
</script>

<style>
@import url('../assets/css/projets.css');
.blue{
  background-image: url('../assets/imgs/pexels-anni-roenkae-2693212.jpg');
}
.green{
  background-image: url('../assets/imgs/pexels-anni-roenkae-4793459.jpg');
}
.bordeaux{
  background-image: url('../assets/imgs/pexels-brett-sayles-3653997.jpg');
}
.turqoise{
  background-image: url('../assets/imgs/pexels-rostislav-uzunov-5011647.jpg');
}
.panel {
		height: 100vh;
		width: 100vw;
    color: white;
    text-align: center;
}
.panel.green {
  margin-bottom: 400px
}
b{
  font-size: 15px;
  position: relative;
  top: 50%;
}
</style>