<template>
    <div class="con">
        <div class="row">
          <div class="col-2"><img class="portrait" src="../assets/imgs/Portrait.png"></div>
          <div class="col-10">
            <h2>Who am I?</h2>
            <div>
              I am <strong>Niclas</strong>, a software developer from Dresden, Germany. I study computer science at TU Dresden since 2018 and have been working on various projects for the university.
              You can see my personal projects on the <router-link to="/projects">projects page</router-link>.
              <p></p>
              Apart from programming, I enjoy gaming (obviously) and making music. I mainly play League of Legends in amateur leagues (<a href="https://www.primeleague.gg/de/leagues/teams/112448-davids-salt-miners">link to my team here</a>)
              and osu! <a href="https://osu.ppy.sh/users/9329597">(my profile here)</a>. My music is released on <a href="https://soundcloud.com/moonlvnd">SoundCloud</a>.
            </div>
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'About'
}
</script>

<style>
  @import url('../assets/css/about.css');
</style>