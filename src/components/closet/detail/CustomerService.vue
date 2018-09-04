<template>
  <div class="contents">
    <div class="contents-header">
      <h3>소중한 의견으로 더 자라는 줄라이가 되겠습니다.</h3>
    </div>
    <div>
      <ul class="list-flex tap-wrap">
        <li
          class="item h-50"
          :class="{ 'selected': isSelected === 'write' }"
          @click="clickShowContent('write')"
        >
          1:1 문의
        </li>
        <li
          class="item h-50"
          :class="{ 'selected': isSelected === 'list' }"
          @click="clickShowContent('list')"
        >
          문의내역
        </li>
      </ul>
    </div>
    <div
      class="content"
      v-show="isSelected === 'write'"
    >
      <div class="content-inner">
        <!-- 1:1 문의 내역 Wrapper -->

        <div class="grid-flex grid-fixed inquiries-top">
          <div class="column w-27">
            <div class="select-inquires-type">
              <select v-model="inquiresType">
                <option value="">문의 종류를 선택해주세요</option>
                <option value="11092">구독문의</option>
                <option value="11903">주문문의</option>
                <option value="11904">배송문의</option>
                <option value="11901">일반(기타)문의</option>
              </select>
            </div>
          </div>
          <div class="column o-2">
            <div class="text-field">
              <input
                type="text"
                placeholder="제목을 입력해주세요."
                v-model="inquiresSubject"
              >
            </div>

          </div>
        </div>
        <div class="inquiries-mid">
          <textarea
            class="textarea-inquiries-content"
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="문의 내용을 입력해주세요."
            v-model="inquiresContent"
            >
          </textarea>
        </div>
      </div>
      <div class="button-wrap">
        <button
          type="button"
          class="btn btn-primary h-56"
          @click="clickContact"
        >
          문의하기
        </button>
      </div>
    </div>
    <div
      class="content"
      v-show="isSelected === 'list'"
    >
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
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'CustomerService',
  components: {
  },
  data() {
    return {
      isSelected: 'write',
      inquiresType: '',
      inquiresSubject: '',
      inquiresContent: '',
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
      getInquiriesDetail: 'inquiries/getInquiriesDetail',
      postInquiries: 'inquiries/postInquiries'
    }),
    clickShowContent(data) {
      this.isSelected = data;
    },
    clickContact() {
      const formData = {
        subject: this.inquiresSubject,
        email: 'a',
        email_noti: 'Y',
        cell_phone: '0',
        cell_phone_noti: 'Y',
        inquiry_type: this.inquiresType,
        content: this.inquiresContent
      };

      if (_.isEmpty(formData.subject)) {
        alert('제목을 입력해 주세요.');
        return;
      }
      if (_.isEmpty(formData.inquiry_type)) {
        alert('문의 종류를 선택해 주세요.');
        return;
      }
      if (_.isEmpty(formData.content)) {
        alert('문의 내용을 입력해주세요.');
        return;
      }
      this.postInquiries(formData).then(res => {
        if (res.data.result) {
          alert('등록되었습니다.');
          this.getInquiries();
        }
      });
    },
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
.inquiries-top {
  .column {
    &:nth-child(1) {
    }
  }
}

.content-inner {
  padding-top: 20px;
  padding-bottom: 20px;
}
.button-wrap {
  margin-top: 20px;
}

.select-inquires-type {
  select {
    @include fontSize(15px);
    width: 100%;
    height: 50px;
    padding: 0 10px;
  }
}
.textarea-inquiries-content {
  @include fontSize(15px);
  width: 100%;
  resize: none;
  padding: 27px 44px;
}
.inquiries-mid {
  margin-top: 10px;
}

// 테이블 공통 스타일
.tap-wrap {
  .item {
    flex-basis: 50%;
    max-width: 50%;
  }
}

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

@media (min-width: 768px) {
  .tap-wrap {
    .item {
      flex-basis: 195px;
      max-width: 195px;
    }
  }
}
</style>
