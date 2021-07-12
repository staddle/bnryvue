<template>
    <div class="container" style="padding-top: 5vh">
        <div class="row">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text" id="basic-addon1">Creds: </span>
            </div>
            <input type="number" id="price" name="price" v-model="creds" v-on:keyup.enter="roll">
            <a class="btn btn-primary" v-on:click="roll">Roll</a>
            <div class="sidebtn">
              <a class="btn btn-secondary" v-on:click="nextround">Next Round</a>
            </div>
          </div>
        </div>
        <div class="weapons row">
          <div class="row" style="width: 100%">
            <div class="col">
              <div class="card bg-dark" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Primary</h5>
                  <hr class="divider">
                  <p class="card-text" id="primary">{{primary}}</p>
                </div>
                <img :src="primarysrc" v-if="primarysrc!=null" class="card-img-bottom">
              </div>
            </div>
            <div class="col">
              <div class="card bg-dark" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Secondary</h5>
                  <hr class="divider">
                  <p class="card-text" id="secondary">{{secondary}}</p>
                </div>
                <img :src="secondarysrc" v-if="secondarysrc!=null" class="card-img-bottom">
              </div>
            </div>
            <div class="col">
              <div class="card bg-dark" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Armor</h5>
                  <hr class="divider">
                  <p class="card-text" id="armor">{{armor}}</p>
                </div>
                <img :src="armorsrc" v-if="armorsrc!=null" class="card-img-bottom">
              </div>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import prices from '../../assets/prices.json'
import axios from 'axios'

export default {
  name: 'Valorantery',
  mounted(){
    this.prices = prices;
  },
  props: ['partycode', 'isleader'],
  data: function() {
    return {
      creds: 0,
      armor: null,
      secondary: null,
      primary: null,
      primarysrc: null,
      secondarysrc: null,
      armorsrc: null,
    };
  },
  methods: {
    roll: function(event) {
      this.calculate(this.creds);
    },
    nextround: function(event) {
      axios
        .get('http://localhost:3000/party/'+this.partycode+'/nextround')
        .then(response => (this.current = response.data.data.cur));
    },
    calculate: function(creds) {
      // primary
      var afford = this.canafford(creds, this.prices.primary);
      var prim = afford[Math.floor(Math.random() * afford.length)][1];
      creds -= prim.price;
      this.primary = prim.name;
      if(prim.name != 'No Primary'){
        this.primarysrc = require('../../assets/imgs/Weapons/' + prim.name + '.png');
      }else{
        this.primarysrc = require('../../assets/imgs/Weapons/No.svg');
      }
      // secondary
      var affordsec = this.canafford(creds, this.prices.secondary);
      var sec = affordsec[Math.floor(Math.random() * affordsec.length)][1];
      creds -= sec.price;
      this.secondary = sec.name;
      this.secondarysrc = require('../../assets/imgs/Weapons/' + sec.name + '.png');

      //armor
      if(creds>=this.prices.armor.full.price){
        this.armor = this.prices.armor.full.name;
        creds-=this.prices.armor.full.price;
        this.armorsrc = require('../../assets/imgs/Weapons/Heavy_Shields.png');
      }else if(creds>=this.prices.armor.half.price){
        this.armor = this.prices.armor.half.name;
        creds-=this.prices.armor.half.price;
        this.armorsrc = require('../../assets/imgs/Weapons/Light_Shields.png');
      }else{
        this.armor = 'No armor';
        this.armorsrc = require('../../assets/imgs/Weapons/No.svg');
      }
    },
    canafford: function(price, object){
      return Object.entries(object).filter(weapon => weapon[1].price<price);
    }
  }
}
</script>

<style>
  @import url('../../assets/css/val.css');
</style>