<template>
    <div class="ui one column centered grid">
      <img class="ui centered image marginBottom" src="/src/assets/suzy.jpg" />

      <div class="ui centered grid one column" style="text-align:center">
        <h3 >당신의 일상에 '쉼표''를 달아드립니다.</h3>
        <P>zuly는 스타일리스트 분들의 제안을 통해 일상의 데일리룩을 제공하는 서비스 입니다.</P>
      </div>

      <div class="wrapper">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/grL6UtBeiiU" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>
      </div>

      <div>
        <h3 class="borderTop six wide" >
          월&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="circle">화&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          수&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span class="circle">목&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          금&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          토&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          일&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </h3>
        <h3>언제 어떻게 받아 보나요?</h3>
        <P class="borderBottom">정기 구독시 한 달에 2번 화요일 or 목요일 선택한 날짜에 스타일링된 의상을 받게 됩니다.</P>
      </div>
      <div>
        <a href="#zuly" class="ui icon button">
            <i class="toggle up icon"></i>
        </a>
      </div>
    </div>
</template>

<script>
export default {
  name: 'story-about',
  components: {
  },
};
</script>

<style>
.borderBottom {
  border-bottom: 2px solid #9E9E9E;
}
.borderTop{
  border-top: 2px solid #9E9E9E;
}
.circle {
  width: 10px;
  height: 10px;
  background: #EEEEEE;
  border-radius: 10px;
}

iframe{
  max-width: 100% !important;
}

.marginBottom{
  margin-bottom: 20px;
}
</style>
