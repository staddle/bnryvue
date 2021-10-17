<template>
  <div class="aboutmepage">
      <div class="borderpadding" id="aboutmetext" style="opacity: 0;">
          <img class="portrait" src="../../assets/imgs/Portrait.png">
          <div class="abouttext">
            <h2 style="padding-bottom: 1rem;" id="testthis">Who am I?</h2>
            <div>
              I am <strong>Niclas</strong>, a software developer from Dresden, Germany. I study computer science at TU Dresden since 2018 and have been working on various projects for the university.
              You can see my personal projects down below.
              <p></p>
              Apart from programming, I enjoy gaming (obviously) and making music. I mainly play League of Legends in amateur leagues (<a href="https://www.primeleague.gg/de/leagues/teams/112448-davids-salt-miners">link to my team here</a>)
              and osu! (<a class="cleanlink link-purple" href="https://osu.ppy.sh/users/9329597">my profile here</a>). My music is released on <a href="https://soundcloud.com/moonlvnd">SoundCloud</a>.
            </div>
          </div>
        </div>
  </div>
</template>

<script>
import { ScrollScene, addIndicators } from 'scrollscene'
import { gsap } from 'gsap'

export default {
  mounted(){
    const aboutmeFade = gsap.timeline({paused: true})
    aboutmeFade.to('#aboutmetext', {duration: 1, opacity: 1, ease: 'ease'})

    const sceneLinks = new ScrollScene({
            triggerElement: '#aboutme',
            triggerHook: 0.7,
            gsap: {
                timeline: aboutmeFade
            },
            duration: 0
        })
  }
}
</script>

<style>
  @import url('../assets/css/projets.css');
</style>