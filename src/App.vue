<template>
  <div id="app"><router-view /></div>
</template>
<script>
export default {
  name: 'app',
  created() {
    console.log(
      `%c
███████╗██╗   ██╗██╗  ██╗   ██╗
╚══███╔╝██║   ██║██║  ╚██╗ ██╔╝
  ███╔╝ ██║   ██║██║   ╚████╔╝
 ███╔╝  ██║   ██║██║    ╚██╔╝
███████╗╚██████╔╝███████╗██║
╚══════╝ ╚═════╝ ╚══════╝╚═╝
Save Time, Save Money, Save The Space
♥ Subscribe to Zuly ♥
`,
      'font-family:monospace;'
    );
  }
};
</script>
<style lang="scss" src="./assets/css/common.scss"></style>
