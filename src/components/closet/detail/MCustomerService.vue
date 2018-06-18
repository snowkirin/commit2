<template>
  <div class="customer-service">
    <p class="txt-main-title">
      고객님의 소 중한 의견으로 한 뼘 더 자라는 줄라이가 되겠습니다.
    </p>
    <div class="flex-list">
      <ul>
        <li
          v-bind:class="{ 'seleted': showContent === 'write' }"
          @click="activeContent('write')">1:1 문의</li>
        <li
          v-bind:class="{ 'seleted': showContent === 'list' }"
          @click="activeContent('list')">문의내역</li>
      </ul>
    </div>
    <!-- 1:1 문의 -->
    <div
      data-value="write"
      v-show="showContent === 'write'">
      <form>
        <div class="form-row">
          <select class="custom-select" name="inquiries_type">
            <option value="">문의종류를 선택해주세요.</option>
            <option :value="$const.INQUIRIES_SUBSCRIBE">구독문의</option>
            <option :value="$const.INQUIRIES_ORDER">주문문의</option>
            <option :value="$const.INQUIRIES_DELIVERY">배송문의</option>
            <option :value="$const.INQUIRIES_NORMAL">일반(기타)문의</option>
          </select>
        </div>
        <div class="form-row">
          <input type="text"
                 name="subject"
                 class="form-input"
                 placeholder="제목을 입력해주세요."/>
        </div>
        <div class="form-row">
          <textarea
            name="content"
            class="requirement-textarea"
            placeholder="문의 내용을 입력해주세요.">
          </textarea>
        </div>
        <div class="req-btn-area">
          <button
            class="btn btn-primary"
            @click="setInquiries">
            문의하기
          </button>
        </div>
      </form>
    </div>
    <!-- 문의 내역 -->
    <div data-value="list" v-show="showContent === 'list'">
      <table class="table">
        <colgroup>
          <col width="*">
          <col width="82">
        </colgroup>
        <tbody
          v-for="(item, idx) in inquiriesList"
          :key="idx">
        <tr
          @click="viewInquiries(item.id)">
          <td class="title">{{ item.subject }}</td>
          <td class="date">{{ item.inserted.substring(0, 10) }}</td>
        </tr>
        <tr
          class="content"
          :data-id="item.id">
          <td
            colspan="2">
            <div class="inner">
              <p class="type">문의유형 : {{ printInquiriesInfo.type_name }}</p>
              <div v-for="(item2, idx2) in printInquiriesInfo.list" :key="idx2">
                <p class="desc" style="white-space: pre-line">
                  {{ item2 .content }}
                </p>
              </div>
            </div>


          </td>
        </tr>
        </tbody>

      </table>
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
      // showContent: 'write',
      showContent: 'list',
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
      const target = document.querySelector(`[data-id="${id}"]`);

      if (this.showId && this.showId === id) {
        target.style.display = 'none';
        this.showId = null;
      } else {
        this.setInquiriesInfo(id);

        const content = document.querySelectorAll('.content');
        for (let i = 0; i < content.length; i += 1) {
          content[i].style.display = 'none';
        }

        target.style.display = 'table-row';
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
        text: content.value.trim(),
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
    console.log(this.$common);
  },
  updated() {
    const inquiriesHtml = document.querySelectorAll('.cs-left-data-title .subject');
    for (let i = 0; i < inquiriesHtml.length; i += 1) this.$common.dotdotdot(inquiriesHtml[i], 18);
  },
};
</script>

<style scoped lang="scss">
  @import '../style';
  .customer-service {
    padding: 20px;
  }
  .flex-list {
    ul {
      list-style: none;
      padding: 0;
      display: flex;
    }
    li {
      flex: 1;
      position: relative;
      border: 1px solid #c4c4c4;
      margin-left: -1px;
      line-height: 48px;
      text-align: center;
      color: #bbb;
      letter-spacing: -0.6px;
      &:first-child {
        margin-left: 0;
      }
      &.seleted {
        font-weight: 700;
        color: #333;
        z-index: 10;
        outline: 2px solid #333;
        outline-offset: -2px;
      }
    }
  }
  div[data-value="write"] {
    .form-row {
      margin-top: 10px;
    }
    .custom-select {
      width: 100%;
      height: 50px;
      padding-left: 9px;
      border: 1px solid #c4c4c4;
    }
    .requirement-textarea {
      width: 100%;
      height: 100px;
      border: 1px solid #c4c4c4;
      padding: 3px 11px 5px 10px;
      resize: none;
      font-size: 15px;
      line-height: 25px;
      letter-spacing: -0.6px;
    }
    .req-btn-area {
      margin-top: 20px;
      button {
        width: 100%;
      }
    }
  }
  div[data-value="list"] {
    .table {
      width: 100%;
      table-layout: fixed;
      text-align: left;
      .title,
      .date {
        font-size: 15px;
        line-height: 23px;
        height: 50px;
        border-top: 1px solid #e7e7e7;
      }
      .title {
        letter-spacing: -0.6px;
      }
      .date {
        font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
      }
      .content {
        display: block;
        .inner {
          background-color: #f5f5f5;
          padding: 10px;
          .type {
            font-size: 14px;
            line-height: 22px;
            letter-spacing: -0.6px;
            margin-bottom: 4px;
          }
          .desc {
            font-size: 14px;
            line-height: 20px;
            letter-spacing: -0.8px;
            color: #797979;
          }
        }
      }

    }
  }

/*.mobile-customer-service {
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
  margin-top: 10px;
}

label:after {
  content:"\f0dd";
  font-family: "FontAwesome";
  font-size: 16px;
}*/

</style>
