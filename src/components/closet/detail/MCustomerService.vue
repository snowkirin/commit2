<template>
  <div class="customer-service">
    <p class="txt-main-title">
      고객님의 소중한 의견으로 더 자라는 줄라이가 되겠습니다.
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
        <div class="write-inner">
          <div class="write-header">
            <div class="form-row">
            <label class="select-label"></label>
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
          </div>
          <div class="write-body">
            <div class="form-row">
            <textarea
              name="content"
              class="requirement-textarea"
              placeholder="문의 내용을 입력해주세요.">
            </textarea>
            </div>
          </div>
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
      <table class="table" cellpadding="0" cellspacing="0">
        <colgroup>
          <col v-if="$mq !== 'sm'" width="82">
          <col width="*">
          <col :width="$mq !== 'sm' ? 166 : 86">
        </colgroup>
        <thead v-if="$mq !== 'sm'">
        <tr>
          <th class="txt-index">번호</th>
          <th class="txt-title">제목</th>
          <th class="txt-date">등록일</th>
        </tr>
        </thead>
        <tbody
          v-for="(item, idx) in inquiriesList"
          :key="idx">
        <tr
          @click="viewInquiries(item.id)">
          <td v-if="$mq !== 'sm'" class="txt-index">{{inquiriesList.length - idx}}</td>
          <td class="txt-title">{{ item.subject }}</td>
          <td class="txt-date">{{ item.inserted.substring(0, 10) }}</td>
        </tr>
        <tr
          class="content"
          :data-id="item.id">
          <td
            :colspan="$mq === 'sm'? 2 : 3">
            <div class="inner">
              <div class="header-inquiries">
                <p class="type">문의유형 : {{ printInquiriesInfo.type_name }}</p>
                <p
                  class="desc"
                  style="white-space: pre-line"
                  v-for="(item2, idx2) in printInquiriesInfo.list"
                  :class="item2.content_type_name === '문의' ? 'desc-inquiries' : 'desc-answer'"
                  :key="idx2">{{ item2 .content }}</p>
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
  },
  updated() {
    const inquiriesHtml = document.querySelectorAll('.cs-left-data-title .subject');
    for (let i = 0; i < inquiriesHtml.length; i += 1) this.$common.dotdotdot(inquiriesHtml[i], 18);
  },
};
</script>

<style scoped lang="scss">
  @import '../style';
  @mixin clearfix {
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }
  .customer-service {
    padding: 25px 20px 20px 20px;
  }

  .flex-list {
    margin-top: 20px;
    margin-bottom: 25px;
    ul {
      font-size: 0;
      position: relative;
      &::after {
        content: '';
        display: block;
        position: absolute;
        height: 1px;
        width: 100%;
        background-color: #c4c4c4;
        bottom: 0;
        z-index: -1;
      }
    }
    li {
      text-align: center;
      cursor: pointer;
      user-select: none;
      display: inline-block;
      font-size: 15px;
      letter-spacing: -0.6px;
      width: 50%;
      height: 50px;
      color: #bbb;
      border: 1px solid #c4c4c4;
      line-height: 48px; // Center
      &:first-child {}
      &.seleted {
        color: #333;
        font-weight: 700;
        outline: 1px solid #333;
        outline-offset: -1px;
      }
    }
  }

  div[data-value="write"] {
    .form-row {
      margin-top: 10px;
      position: relative;
    }
    .select-label {
      position: absolute;
      right: 13px;
      top: 10px;
    }
    .select-label:after {
      content:"\f0dd";
      font-family: "FontAwesome";
      font-size: 16px;
    }
    .custom-select {
      width: 100%;
      height: 50px;
      padding-left: 9px;
      border: 1px solid #c4c4c4;
      font-size: 15px;
      line-height: 23px;
      letter-spacing: -0.6px;
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
      &::placeholder {
        color: #bbb;
      }
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
      border-top: 1px solid #e9e9e9;
      position: relative;
      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: #333;
        position: absolute;
        bottom: 0;
      }
      .txt-index,
      .txt-date {
        text-align: center;
      }
      tbody {
        .txt-index,
        .txt-title,
        .txt-date {
          border-bottom: 1px solid #e9e9e9;
          height: 53px;
          font-size: 15px;
          line-height: 23px;
          letter-spacing: -0.6px;
        }
        .txt-index,
        .txt-date {
          font-family: 'Open Sans', '맑은 고딕', 'Malgun Gothic', sans-serif;
        }
        .txt-date {
          letter-spacing: 0;
        }
      }
      .content {
        display: none;
        .inner {
          background-color: #f5f5f5;
          padding: 10px;
          .type,
          .desc {
            font-size: 14px;
          }
          .type {
            line-height: 22px;
            letter-spacing: -0.6px;
            margin-bottom: 4px;
            color: #333;
          }
          .desc {
            line-height: 20px;
            letter-spacing: -0.8px;
            color: #797979;
            &.desc-answer {
              margin-top: 20px;
              padding-top: 21px;
              border-top: 1px dashed #a7a7a7;
              &::before {
                content: '답변';
                display: block;
                font-size: 14px;
                line-height: 20px;
                letter-spacing: -0.8px;
                color: #333;
                font-weight: 500;
                margin-bottom: 5px;
              }
            }
          }
        }
      }
      .header-inquiries {
        padding-bottom: 10px;
      }
      .body-inquiries {
        padding-top: 10px;
      }
    }
  }

  @media (min-width: 768px) {
    .customer-service {
      padding: 32px 0 0 0;
      width: 1200px;
      margin: 0 auto;
    }
    .flex-list {
      ul {
      }
      li {
        font-size: 16px;
        letter-spacing: -1px;
        width: 195px;
        &:first-child {}
        &.seleted {
          outline: 2px solid #333;
          outline-offset: -2px;
        }
      }
    }
    div[data-value="write"] {
      .write-header {
        @include clearfix();
        padding-top: 22px;
        position: relative;
        border-top: 2px solid #333;
        .form-row {
          float: left;
          margin-top: 0;
          &:nth-child(1) {
            // Selectbox
            width: 300px;
          }
          &:nth-child(2) {
            margin-left: 15px;
            width: calc(100% - 300px - 15px)
          }
        }
      }
      .write-body {
        padding-bottom: 21px;
        border-bottom: 1px solid #333;
      }
      .requirement-textarea {
        height: 300px;
        padding: 10px 44px 13px;
      }
      .req-btn-area {
        text-align: right;
        .btn {
          width: 287px;
          height: 60px;
        }
      }
    }
    div[data-value="list"] {
      .table {
        border-top: 2px solid #333;

        .txt-title {
          padding-left: 30px;
        }
        .txt-date {
          padding-right: 39px;
        }
        thead {
          display: table-row-group;
          th {
            height: 43px;
            font-size: 15px;
            line-height: 21px;
            letter-spacing: -1px;
            color: #333;
            border-bottom: 1px solid #e9e9e9;
          }
        }
        tbody {
          .txt-index,
          .txt-title,
          .txt-date {
            font-size: 16px;
            letter-spacing: -1px;
          }
        }
        .content {
          .inner {
            padding: 25px 30px;
            .type,
            .desc {
              font-size: 15px;
              letter-spacing: -1px;
              line-height: 23px;
            }
            .type {
              margin-bottom: 10px;
              letter-spacing: -1px;
            }
            .desc {
              &.desc-answer {
                padding-top: 16px;
                margin-top: 16px;
                &::before {
                  margin-bottom: 10px;
                  font-size: 15px;
                  letter-spacing: -1px;
                  line-height: 23px;
                }
              }
              letter-spacing: -1px;
            }
          }
        }
      }
    }

  }
</style>
