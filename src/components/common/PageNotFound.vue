<template>
<div class="contents">
  <div>
    <div class="result">ERROR</div>
    <div class="code">404</div>
    <div class="reason">요청한 사이트가 존재하지 않습니다.</div>
    <router-link
      class="response"
      to="/">홈으로 가기</router-link>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'pageNotFound',
  computed: mapGetters({
    Authentication: 'login/Authentication'
  }),
  methods: {},
  created() {
    if (this.$route.path === '/index.html') this.$router.push({ path: '/' });
  }
};
</script>

<style scoped lang="scss">
.contents {
  background-color: #e9e9e9;
  text-align: center;
  /*display:flex;*/
  /*justify-content:center;*/
  /*align-items:center;*/
  height: 670px;
  padding-top: 114px;
}
.result,
.code {
  font-family: "Open Sans", "맑은 고딕", "Malgun Gothic", sans-serif;
}
.result {
  font-size: 15px;
  line-height: 25px;
  font-weight: 700;
  letter-spacing: -0.9px;
  position: relative;
  &:after {
    content: "";
    display: block;
    border-bottom: 1px solid #333;
    position: absolute;
    width: 34px;
    left: 50%;
    transform: translateX(-50%);
    bottom: -16px;
  }
}
.code {
  color: #fff;
  font-size: 160px;
  letter-spacing: 5px;
  font-weight: 300;
  margin-top: 34px;
  margin-bottom: 35px;
}
.reason {
  font-size: 15px;
  line-height: 23px;
  letter-spacing: -0.9px;
}
.response {
  color: #566b9c;
  font-size: 15px;
  line-height: 25px;
  letter-spacing: -0.9px;
  text-decoration: underline;
}

@media (min-width: 768px) {
  .contents {
    width: 1210px;
    margin: 0 auto;
  }
}
</style>
