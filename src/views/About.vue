<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="one">
      <div id="two">
        <div id="three">
          <div id="four" @click="clickMe">Click Me</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    methods: {
      clickMe(event) {
        console.log(event.target.closest('#one'));
      }
    }
  }
</script>
