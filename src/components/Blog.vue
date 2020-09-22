<template>
    <div>
        This is a blog
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Blog',
  data: function() {
    return{
      entries: []
    };
  },
  mounted: function() {
    /*axios //create party on database
      .get('http://localhost:3000/blog/latest/10')
      .then(response => (this.entries.push(response.data.data))); //see how it looks with curl and change
        */
  }
}
</script>