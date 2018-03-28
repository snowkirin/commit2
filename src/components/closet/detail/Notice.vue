<template>
  <div class="notice mt44">
    <div class="main-point-text closet-title">공지사항</div>
    <div class="closet-title-text mt20">
      미확인 공지사항 2건 입니다.
    </div>
    <div class="closet-content mt50">
      <div class="notice-content">
        <div class="notice-rows notice-header">
          <div class="notice-number">번호</div>
          <div class="notice-subject">제목</div>
          <div class="notice-regdate">등록일</div>
        </div>
        <div class="notice-rows no-data">
          등록된 내용이 존재하지 않습니다.
        </div>
        <div class="notice-rows">
          <div class="notice-number">1</div>
          <div class="notice-subject">
            [공지] 웹사이트 이용약관 개정 안내 (2018년 3월 26일)
            <span class="new-content">new</span>
          </div>
          <div class="notice-regdate">18.03.20</div>
        </div>
        <div class="notice-rows-data">
2018년 3월 26일(월)부터 웹사이트 이용약관 일부가 개정되어, 아래와 같이 안내합니다.<br/>
※ 주요 변경내용 : 의도적으로 사이트 운영 또는 다른 회원의 사이트 이용을 방해하는 회원에 대한 약관 수정<br/>
- 제6조. 2항 수정<br/>
- 제7조. 2항, 3항 수정<br/>
- 제16조. 1항 수정<br/>
- 제20조. 1항 수정<br/>
- 시행일자<br/>
변경된 웹사이트 이용약관은 2018년 3월 26일자로 효력이 발생됩니다.<br/>
앞으로도 고객님의 즐겁고 편안한쇼핑을 위하여 더욱 노력하겠습니다.<br/>
감사합니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notice',
  methods: {
  },
};
</script>

<style scoped>
.notice {
  padding-bottom: 410px;
}

.notice-rows {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  color: #212121;
  border-bottom: solid 2px #e9e9e9;
}

.notice-header {
  height: 40px;
  line-height: 40px;
  font-weight: 600;
}

.notice-content {
  height: 60px;
  line-height: 60px;
}

.notice-number {
  width: 6%;
  text-align: center;
}

.notice-subject {
  width: 84%;
}

.notice-regdate {
  width: 10%;
  text-align: center;
}

.no-data {
  justify-content: center;
}

.new-content {
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  color: #f45649;
}

.notice-rows-data {
  background-color: #f5f5f5;
  padding: 22px 30px;
  line-height: 1;
}
</style>
