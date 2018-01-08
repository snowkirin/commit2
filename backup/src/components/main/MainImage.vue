<template>
  <div class="zuly-main-image">
  	<div class="zuly-main-textarea">
  		<span>Everything as Style</span><br/>
  		<span>Zuly</span><br/><br/>
  		<span>
  		  <button type="button" class="btn btn-default btn-custom1">정기 구독 신청</button>
		  <button type="button" class="btn btn-default btn-custom2">나의 스타일 찾기</button>
  		</span>
  	</div>
  </div>
</template>

<script>
export default {
  name: 'main-image',
  components: {
  },
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

button.btn-custom1 {
  background-color: rgb(173, 68, 133);
  color: rgb(255, 255, 255);
}

button.btn-custom2 {
  background-color: rgb(94, 94, 94);
  color: rgb(255, 255, 255);
}
</style>