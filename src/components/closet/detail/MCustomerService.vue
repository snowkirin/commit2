<template>
  <div class="mobile-customer-service mt40">
    <div class="main-point-text closet-title">문의 신청 / 내역</div>
    <div class="closet-title-text mt15">
      고객님의 소중한 의견으로 한 뼘 더 자라는 줄라이가 되겠습니다.
    </div>
    <div class="cs-menu mt30">
      <div class="day-name-group">
        <div class="day-name" v-bind:class="{ 'day-name-active': showContent === 'write' }" @click="activeContent('write')">1:1 문의</div>
        <div class="day-name" v-bind:class="{ 'day-name-active': showContent === 'list' }" @click="activeContent('list')">문의내역</div>
      </div>
    </div>
    <div class="content-form" data-value="write" v-show="showContent === 'write'">
      <div class="mt10">
        <label name="select-title"></label>
        <select class="cs-select-box" name="inquiries_type">
          <option value="">문의종류를 선택해주세요.</option>
          <option :value="$const.INQUIRIES_SUBSCRIBE">구독문의</option>
          <option :value="$const.INQUIRIES_ORDER">주문문의</option>
          <option :value="$const.INQUIRIES_DELIVERY">배송문의</option>
          <option :value="$const.INQUIRIES_NORMAL">일반(기타)문의</option>
        </select>
      </div>
      <div class="mt10">
        <input type="text" name="subject" class="form-login-input" placeholder="제목을 입력해주세요."/>
      </div>
      <div class="mt10">
        <textarea name="content" class="requirement-textarea" placeholder="문의 내용을 입력해주세요."></textarea>
      </div>
      <div class="req-btn-area mt10">
        <button class="button-login" @click="setInquiries">
          문의하기
        </button>
      </div>
    </div>
    <div class="mt10" data-value="list" v-show="showContent === 'list'">
      <template v-for="(inquiries, k) in inquiriesList">
        <div v-bind:key="k" class="list-data-rows" @click="viewInquiries(inquiries.id)">
          <div class="subject">{{ inquiries.subject }}</div>
          <div class="date">
              {{ inquiries.inserted.substring(2, 10) }}
          </div>
        </div>
        <div v-bind:key="'ct_'+ k" class="list-data-content" :data-id="inquiries.id">
          <div class="inquiries-type">문의유형 : {{ printInquiriesInfo.type_name }}</div>
          <template v-for="(lis, k) in printInquiriesInfo.list">
            <div v-bind:key="k" class="inquiries-subject">
              {{ lis.content_type_name }}
            </div>
            <div v-bind:key="'ct_'+ k" class="inquiries-content">
              {{ lis.content }}
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'mCustomerService',
  data() {
    return {
      showId: null,
      showContent: 'write',
    };
  },
  computed: {
    ...mapGetters({
      isInquiries: 'mypage/inquiries/getIsInquiries',
      inquiriesList: 'mypage/inquiries/getInquiriesList',
      inquiriesInfo: 'mypage/inquiries/getInquiriesInfo',
    }),
    printInquiriesInfo() {
      const rtn = {
        type_name: '',
        list: [],
      };

      if (this.inquiriesInfo && this.inquiriesInfo.first) {
        rtn.type_name = `${this.inquiriesInfo.first.type_name} 문의`;
        rtn.list = this.inquiriesInfo.list;
      }

      return rtn;
    },
  },
  methods: {
    ...mapActions({
      setInquiriesList: 'mypage/inquiries/setInquiriesList',
      setInquiriesInfo: 'mypage/inquiries/setInquiriesInfo',
      setMobileInquiries: 'mypage/inquiries/setMobileInquiries',
    }),
    activeContent(content) {
      this.showContent = content;
    },
    viewInquiries(id) {
      const target = document.querySelector(`.list-data-content[data-id="${id}"]`);

      if (this.showId && this.showId === id) {
        target.style.display = 'none';
      } else {
        this.setInquiriesInfo(id);
        const content = document.querySelectorAll('.list-data-content');
        for (let i = 0; i < content.length; i += 1) {
          content[i].style.display = 'none';
        }

        target.style.display = 'block';
        this.showId = id;
      }
    },
    async setInquiries() {
      const inquiriesType = document.querySelector('select[name=inquiries_type]');
      const subject = document.querySelector('input[name=subject]');
      const content = document.querySelector('textarea[name=content]');

      if (!this.$common.InputDataValidation(inquiriesType, '문의종류를 선택해주세요.', false)) return;
      if (!this.$common.InputDataValidation(subject, '제목을 입력해주세요.', true)) return;
      if (!this.$common.InputDataValidation(content, '문의 내용을 입력해주세요.', true)) return;

      await this.setMobileInquiries({
        type: inquiriesType.value,
        subject: subject.value,
        text: content.value,
      });

      if (this.isInquiries) {
        this.setInquiriesList();
        inquiriesType.value = '';
        subject.value = '';
        content.value = '';

        alert('문의글 등록이 완료되었습니다.');
      }
    },
  },
  created() {
    this.setInquiriesList();
  },
  updated() {
    const inquiriesHtml = document.querySelectorAll('.cs-left-data-title .subject');
    for (let i = 0; i < inquiriesHtml.length; i += 1) this.$common.dotdotdot(inquiriesHtml[i], 18);
  },
};
</script>

<style scoped>
.mobile-customer-service {
  padding-bottom: 410px;
}

.day-name-group {
  height: 50px !important;
}

.cs-select-box {
  height: 50px;
  width: 100%;
  font-size: 16px;
  font-weight: 300;
  padding-left: 10px;
}

.requirement-textarea {
  width: 88%;
  height: 250px;
  background-color: #ffffff;
  border-top: solid 1px #999999;
  padding: 20px;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.2px;
  text-align: left;
  color: #797979;
}

.list-data-rows {
  width: 100%;
  padding: 30px 0;
  display: block;
  border-bottom: solid 1px #dadada;
  cursor: pointer;
}

.list-data-rows > .subject {
  width: 75%;
  display: inline-block;
  font-size: 16px;
  line-height: 1;
  letter-spacing: -0.5px;
  color: #333333;
}

.list-data-rows > .date {
  display: inline-block;
  float: right;
  font-size: 16px;
  line-height: 1;
  letter-spacing: -0.4px;
  color: #797979;
}

.list-data-content {
  display: none;
  background-color: #f5f5f5;
  padding: 20px;
  line-height: 1;
  word-wrap: break-word;
}

.inquiries-type {
  line-height: 2;
  border-bottom: 1px solid #333333;
}

.inquiries-subject {
  line-height: 2;
}


label {
  position: absolute;
  margin-left: 80%;
  margin-top: 15px;
}

label:after {
  content:"\f0dd";
  font-family: "FontAwesome";
  font-size: 16px;
}

</style>
