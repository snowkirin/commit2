<template>
  <footer>
    <div class="footer-area">
      © 2017 TRNT. All Rights Reserved.
    </div>    
  </footer>
</template>

<script>
export default {
  name: 'zuly-footer',
};
</script>

<style scoped>
footer {
    display: table;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: #FFFFFF;
    border-top: 1px solid;
}

.footer-area {
  display: table-cell;
  width: 100%;
  height: 60px;
  text-align: center;
  vertical-align: middle;
}
</style>
