<template>
  <div class="notice mt40">
    <div class="main-point-text closet-title">공지사항</div>
    <div class="closet-title-text mt15">
      줄라이의 소식을 확인해보세요.
    </div>
    <div class="closet-content mt50">
      <div class="notice-rows notice-header">
        <div class="notice-number">번호</div>
        <div class="notice-subject">제목</div>
        <div class="notice-regdate">등록일</div>
      </div>
      <template v-if="noticeList.length > 0" v-for="(notice, k) in noticeList">
        <div v-bind:key="k" class="notice-content notice-rows" @click="noticeView(notice.id)">
          <div class="notice-number">
            {{ noticeList.length - k }}
          </div>
          <div class="notice-subject">
            {{ notice.title }}
            <span v-show="$moment().diff($moment(notice.inserted), 'days') < 7" class="new-content">new</span>
          </div>
          <div class="notice-regdate">
            {{ notice.inserted }}
          </div>
        </div>
        <div v-bind:key="'data_'+ k" class="notice-rows-data" :data-id="notice.id">
          <span v-html="contentReplace(notice)"></span>
        </div>
      </template>
      <template v-else>
        <div class="notice-content">
          등록된 내용이 존재하지 않습니다.
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'notice',
  computed: {
    ...mapGetters({
      noticeList: 'mypage/notice/getNoticeList',
    }),
  },
  methods: {
    ...mapActions({
      setNoticeList: 'mypage/notice/setNoticeList',
    }),
    noticeView(id) {
      const noticeContent = document.querySelector(`[data-id="${id}"]`);

      if (noticeContent.style.display === 'none' || noticeContent.style.display === '') noticeContent.style.display = 'block';
      else noticeContent.style.display = 'none';
    },
    contentReplace(text) {
      const result = this.$common.enterReplace(text.content);
      return result;
    },
  },
  created() {
    this.setNoticeList();
  },
};
</script>

<style scoped>
.notice-rows {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  color: #333333;
  border-bottom: solid 2px #e9e9e9;
  cursor: pointer;
}

.notice-header {
  height: 40px;
  line-height: 40px;
  font-weight: 600;
}

.notice-content {
  height: 50px;
  line-height: 50px;
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
  display: none;
  background-color: #f5f5f5;
  padding: 22px 30px;
  line-height: 1.4;
  font-size: 14px;
}

@media screen and (max-width: 486px) {
  .notice-number {
    width: 15% !important;
  }

  .notice-subject {
    width: 60% !important;
  }

  .notice-regdate {
    width: 25% !important;
  }
}
</style>
