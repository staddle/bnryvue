<template>
  <div class="contactpage">
      <!--<div>
        <img class="contactimg" src="../../assets/imgs/pexels-rostislav-uzunov-5011647.jpg">
      </div>-->
      <div class="contactmecontainer">
        <form class="contactmebg" ref="form" @submit.prevent="sendEmail">
          <h1 class="contactheading">Interested? - Contact me</h1>
          <div class="contactinputs">
            <input class="contactinput contactinputpad" type="text" v-model="name" placeholder="Name" name="name"/>
            <input class="contactinput" type="email" v-model="email" placeholder="E-Mail" name="email"/><br>
            <textarea class="contacttext" name="message" v-model="message" placeholder="What do you want to contact me about?"></textarea>
          </div>
          <input type="submit" class="contactbtn" value="Contact"/>
        </form>
      </div>
  </div>
</template>

<script>
import emailjs from 'emailjs-com';

emailjs.init("user_e4JRyBKX7925GSvdWfCkx");
export default {
  name: 'ContactMe',
  data(){
    return{
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    sendEmail(){
      emailjs.sendForm('service_biytav5', 'template_6ld3vn9', this.$refs.form, 'user_e4JRyBKX7925GSvdWfCkx')
        .then((result) => {
          console.log('Success', result.text);
        }, (error) => {
           console.log('Failed', error.text);
        });
      this.name='';
      this.email='';
      this.message='';
    }
  }
}
</script>

<style>

</style>