<template>
    <div class="container" style="padding-top: 5vh">
        <div>
          <h1 style="text-decoration: underline">Ultimate Valorantery</h1>
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
            <h4><span class="box">In party: <span class="bold">{{partycode}}</span></span> <a class="btn btn-danger" v-on:click="leaveparty">Leave Party</a></h4>
            <span>Current: {{current}}</span>
            <Valorantery :partycode="partycode"></Valorantery>
        </div>

        <div class="footer">
          <div class="container">
            Images from <a class="link-nocolor" href="https://valorant.fandom.com/wiki/Weapons">valorant.fandom.com</a>
          </div>
        </div>
    </div>
</template>

<script>
import Valorantery from "./Valorantery"
import axios from 'axios'

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
        data: {}
    };
  },
  methods: {
    createcode: function(event){
        this.partycode = ''     //this.randomString(5, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
        this.joined = true;
        var responses = {};
        axios
        .get('http://localhost:3000/createparty')
        .then(response => (this.partycode = response.data.data.code, this.current = response.data.data.cur));
        //create party on database
    },
    randomString: function (length, chars) {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    },
    joincode: function(event){
        this.joined = true;
        //register client as in party
        axios
        .get('http://localhost:3000/party/'+this.partycode)
        .then(response => (this.current = response.data.data.cur));
    },
    leaveparty: function(event){
      this.joined = false;
    }
  }
}
</script>

<style>
  @import url('../assets/css/val.css');
</style>