<template>
<div class="zuly-main-image">
  <div class="zuly-main-textarea">
    <h3>Everything as Style</h3>
    <h1>Zuly</h1>
    </br>
    <div>
  		  <button class="ui inverted violet button">정기 구독 신청</button>
		    <button class="ui inverted purple button">나의 스타일 찾기</button>
  	</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'main-image',
  components: {},
};
</script>

<style scoped>
div.zuly-main-image {
  display: table;
  width: 100%;
  height: 250px;
}

div.zuly-main-textarea {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 100%;
}
</style>
