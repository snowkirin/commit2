<template>
  <div class="modal">
    <div class="modal-overlay" @click="$emit('close')"></div>
    <div class="modal-container">
      <div class="modal-title">
        <h3>마케팅정보 수신동의</h3>
      </div>
      <div class="modal-content">
        <p>개인정보보호법 제22조 제4항에 의해 선택정보 사항에 대해서는 기재하지 않으셔도 서비스를 이용하실 수 있습니다.</p>
        <ol>
          <li>1. 마케팅 및 광고에의 활용 <br>신규 서비스(제품) 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 및 참여기회 제공, 인구통계학적 특성에 따른 서비스 제공 및 광고 게재, 서비스의 유효성 확인, 접속빈도 파악 또는 회원의 서비스 이용에 대한 통계 등을 목적으로 개인정보를 처리합니다.</li>
          <li>2. 어니언그라운드는 줄라이(ZULY) 서비스를  운용함에 있어 각종 정보를 서비스 화면, 전화, e-mail, SMS, 우편물 등의 방법으로 줄라이 회원에게 제공할 수 있으며, 줄라이 회원들에게  의무적으로 안내되어야 하는 정보성 내용은 수신동의 여부와 무관하게 제공됩니다.</li>
          <li>3. 고객이 본 수신 동의를 철회 하고자 할 경우, 사이트를 통해서 수신 동의 철회를 요청 하실 수 있습니다.</li>
        </ol>
      </div>
      <button class="modal-close" type="button" @click="$emit('close')">Close</button>
    </div>
  </div>
</template>

<script>
import { termsMixin } from './mixin';
export default {
  name: 'TermsMarketing',
  mixins: [termsMixin]
};
</script>

<style scoped lang="scss" src="./style.scss"></style>
