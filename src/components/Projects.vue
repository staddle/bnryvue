<template>
    <div>
        <!--Projects go here--> 
        <div class="container-fluid container-fix">
          <b-carousel
            id="carousel-1"
            v-model="slide"
            :interval="100000"
            controls
            indicators
            background="#ababab"
            img-width="100vw"
            img-height="60vh"
            style="text-shadow: 1px 1px 2px #333;"
            @sliding-start="onSlideStart"
            @sliding-end="onSlideEnd"
          >
            <b-carousel-slide>
              <template v-slot:img>
                <img
                  class="d-block image-size"
                  src="../assets/imgs/DiscordBot.png"
                >
              </template>
            </b-carousel-slide>
            <b-carousel-slide>
              <template v-slot:img>
                <img
                  class="d-block image-size"
                  src="../assets/imgs/MainPage.png"
                >
              </template>
            </b-carousel-slide>
            <b-carousel-slide>
              <template v-slot:img>
                <img
                  class="d-block image-size"
                  src="../assets/imgs/blogp.png"
                >
              </template>
            </b-carousel-slide>
            <b-carousel-slide>
              <template v-slot:img>
                <img
                  class="d-block image-size"
                  src="../assets/imgs/InteractiveMap_Trim.gif"
                >
              </template>
            </b-carousel-slide>
          </b-carousel>
        </div>
        <div class="margins">
          <h1 v-text="content[slide].h" class="heading"></h1>
          <div v-text="content[slide].c"></div>
        </div>
    </div>
</template>

<script>
import pcontent from '../assets/projects.json'

export default {
  name: 'Projects',
  mounted(){
    this.content = pcontent;
  },
  data () {
    return {
      slide: 0,
      sliding: null,
      content: []
    }
  },
  methods: {
      onSlideStart() {
        this.sliding = true
      },
      onSlideEnd() {
        this.sliding = false
      }
    }
}
</script>

<style scoped>
  @import url('../assets/css/projets.css');
</style>