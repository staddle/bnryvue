<template>
    <div class="container" style="padding-top: 5vh">
        <div>
          <h1 style="text-decoration: underline">Valorant Randomizer</h1>
        </div>
        <div>
          <div class="input-group">
            <label for="price">Creds: </label>
            <input type="text" id="price" name="price">
            <a class="btn btn-primary" v-on:click="roll">Roll</a>
          </div>
        </div>
        <div>
          <div class="card bg-dark" style="width: 18rem;">
            <img class="card-img-top" src="" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">Primary</h5>
              <p class="card-text">Weapon</p>
            </div>
          </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Valorantery',
  methods: {
    roll: function(event) {
      
    }
  }
}
</script>