<template>
    <div>
        This is about me :)
        <img class="parralaxme" id="rosa" src="../assets/imgs/pink_1.png" style="position: absolute; top: 0; left: 0;">
        <img class="parralaxme" id="pinki" src="../assets/imgs/pink_2.png" style="position: absolute; top: 0; left: 0;">
        <div class="testbig"></div>
    </div>
</template>

<script>

export default {
  name: 'Projects',
  created () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
      handleScroll (event){
        var normal = document.getElementById('rosa');
        var other = document.getElementById('pinki');
        
      }
  }
}
</script>