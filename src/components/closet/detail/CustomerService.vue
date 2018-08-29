<template>
  <div class="contents">
    <div class="contents-header">
      <h3>소중한 의견으로 더 자라는 줄라이가 되겠습니다.</h3>
    </div>
    <div class="content">
      <div>
        <table
          class="table table-Inquires"
          ref="table"
        >
          <colgroup>
            <col width="82">
            <col width="*">
            <col width="92">
          </colgroup>
          <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="(data, idx) in InquiresList">
            <tr
              class="inquiry-tr"
              data-show="false"
              :key="idx"
              @click="helloWorld(data.id, $event)"
            >
              <td class="index">{{InquiresList.length - idx }}</td>
              <td class="title">{{ data.subject }}</td>
              <td class="date">{{ data.inserted }}</td>
            </tr>
            <tr
              class="answer-tr"
              :key="idx+'answer'"
              :ref="'data-'+data.id"
            >
              <td colspan="3" v-if="!_.isEmpty(detailData)">
                <div class="answer-wrap">
                  <div class="request-wrap">
                    <p class="txt-type-name">문의 유형: {{ detailData.data[0].type_name }}</p>
                    <p class="txt-subject">{{ detailData.data[0].subject }}</p>
                  </div>
                  <div class="response-wrap">
                    <p class="txt-answer">답변</p>
                    <p class="txt-content">{{ detailData.list[0].content}}</p>
                  </div>
                </div>
              </td>
            </tr>
          </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!--<div class="customer-service">
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
    &lt;!&ndash; 1:1 문의 &ndash;&gt;
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
    &lt;!&ndash; 문의 내역 &ndash;&gt;
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
  </div>-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VueJsonPretty from 'vue-json-pretty';

export default {
  name: 'CustomerService',
  components: {
    VueJsonPretty
  },
  data() {
    return {
      detailData: {}
    };
  },
  computed: {
    ...mapGetters({
      InquiresList: 'inquiries/InquiresList'
    })
  },
  methods: {
    ...mapActions({
      getInquiries: 'inquiries/getInquiries',
      getInquiriesDetail: 'inquiries/getInquiriesDetail'
    }),
    helloWorld(id, event) {
      const target =
        event.target.tagName === 'TR'
          ? event.target
          : event.target.closest('tr');
      const questionTR = this.$refs.table.querySelectorAll('.inquiry-tr');
      this.getInquiriesDetail(id)
        .then(res => {
          this.detailData = res.data.result;
        })
        .then(() => {
          if (target.dataset.show === 'true') {
            target.dataset.show = 'false';
          } else {
            _.forEach(questionTR, value => {
              value.dataset.show = 'false';
            });
            target.dataset.show = 'true';
          }
        });
    }
  },
  async created() {
    await this.getInquiries();
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/closet-style.scss">
</style>
<style scoped lang="scss">
// 테이블 공통 스타일
table {
  @include fontSize(15px);
  width: 100%;
  table-layout: fixed;
  border-top: 2px solid #333;
  border-bottom: 1px solid #333;
  th,
  td {
    height: 52px;
    vertical-align: middle;
    &.align-top {
      vertical-align: top;
      height: auto;
    }
  }
  th {
    font-weight: 700;
  }
  td {
    border-top: 1px solid #e9e9e9;
  }
}
.inquiry-tr {
  cursor: pointer;
  &[data-show='false'] {
    + .answer-tr {
      display: none;
    }
  }
  &[data-show='true'] {
    + .answer-tr {
      display: table-row;
    }
  }
}
.index,
.date {
  text-align: center;
}
.answer-wrap {
  @include fontSize(14px);
  background-color: #f5f5f5;
  padding: 16px 12px;
}

.txt-subject,
.txt-content {
  margin-top: 5px;
  color: #797979;
}
.response-wrap {
  border-top: 1px dashed #a7a7a7;
  padding: 20px 0;
  margin-top: 18px;
}
.txt-answer {
  font-weight: 700;
}
.txt-content {
  white-space: pre;
}

/*
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
        content: "";
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
      letter-spacing: -0.9px;
      width: 50%;
      height: 50px;
      color: #bbb;
      border: 1px solid #c4c4c4;
      line-height: 48px; // Center
      &:first-child {
      }
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
      content: "\f0dd";
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
      letter-spacing: -0.9px;
    }
    .requirement-textarea {
      width: 100%;
      height: 100px;
      border: 1px solid #c4c4c4;
      padding: 3px 11px 5px 10px;
      resize: none;
      font-size: 15px;
      line-height: 25px;
      letter-spacing: -0.9px;
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
        content: "";
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
          letter-spacing: -0.9px;
        }
        .txt-index,
        .txt-date {
          font-family: "Open Sans", "맑은 고딕", "Malgun Gothic", sans-serif;
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
            leeter-spacing: -0.8px;
            margin-bottom: 4px;
            color: #333;
          }
          .desc {
            line-height: 20px;
            color: #797979;
            &.desc-answer {
              margin-top: 20px;
              padding-top: 21px;
              border-top: 1px dashed #a7a7a7;
              &::before {
                content: "답변";
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
        &:first-child {
        }
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
            width: calc(100% - 300px - 15px);
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
            letter-spacing: -0.9px;
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
              letter-spacing: -0.9px;
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
                  letter-spacing: -0.9px;
                  line-height: 23px;
                }
              }
              letter-spacing: -1px;
            }
          }
        }
      }
    }
  }*/
</style>
