<template>
    <div class="container" style="padding-top: 5vh">
        <div>
          <h1 style="text-decoration: underline">Ultimate Valorantery</h1>
        </div>
        <div class="alert alert-primary" role="alert" v-if="alert==true">
          {{alerttext}}
          <span class="rightside">x</span>
        </div>
        <div class="buttons" v-if="joined==false">
            <div class="row">
                <div class="col">
                    <a class="btn btn-primary" v-on:click="createcode">Create Party</a>
                </div>
                <div class="col input-group">
                    <input v-model="partycode" placeholder="P4RTY" v-on:keyup.enter="joincode">  
                    <a class="btn btn-primary" v-on:click="joincode">Join Party</a>
                </div>
            </div>
        </div>
        
        <div class="randomizer" v-if="joined==true">
            <h4><span class="box">In party: <span class="bold">{{partycode}}</span></span> 
            <a class="btn btn-danger" v-on:click="leaveparty">Leave Party</a>
            <a class="btn btn-danger" v-on:click="deleteparty">Delete Party</a></h4>
            
            <Valorantery :partycode="partycode" :isleader="isleader"></Valorantery>
        </div>

        <div class="footer">
          <div class="container">
            Images from <a class="link-nocolor" href="https://valorant.fandom.com/wiki/Weapons">valorant.fandom.com</a>
            <!--TODO: REMOVE BEFORE PRODUCTION--><span style="float: right;">Current: {{current}}</span>
          </div>
        </div>
    </div>
</template>

<script>
import Valorantery from "./Valorantery"
import axios from 'axios'
import curFuncs from '../assets/curFuncs.js'

export default {
  name: 'ValorantParty',
  components: {
      Valorantery
  },
  data: function() {
    return {
        partycode: null,
        joined: false,
        current: null,
        data: {},
        isleader: false,
        alerttext: '',
        alert: false
    };
  },
  methods: {
    createcode: function(event){
        this.partycode = '';
        this.joined = true;
        var responses = {};
        axios //create party on database
        .get('http://localhost:3000/createparty')
        .then(response => (this.partycode = response.data.data.code, this.current = response.data.data.cur));
        this.isleader = true;
    },
    randomString: function (length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    },
    joincode: function(event){
        this.joined = true;
        axios //register client as in party
        .get('http://localhost:3000/party/'+this.partycode)
        .then(response => (this.current = curFuncs.fillUp(parseInt(response.data.data.cur,10).toString(2), 26)));
        this.isleader = false;
    },
    leaveparty: function(event){
      this.joined = false;
    },
    deleteparty: function(event){
      this.joined = false;
      this.isleader = false
      axios //register client as in party
        .get('http://localhost:3000/party/delete/'+this.partycode);
      this.alerttext = 'Party successfully deleted';
      this.alert = true;
      setTimeout(function() {
          this.alert = false;
      }, (3 * 1000));
    }
  }
}
</script>

<style>
  @import url('../assets/css/val.css');
</style>