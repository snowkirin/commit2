<template>
  <div class="contents">
    <div class="contents-header">
      <h3>선호 스타일</h3>
      <p>어떤 스타일을 받고 싶으신가요?</p>
    </div>
    <form name="preferredStyleForm">
      <div class="content">
        <div class="grid-flex list-preferred-style">
          <div
            class="column"
            :class="{'w-50': $mq === 'sm', 'w-33': $mq === 'md', 'w-25': $mq === 'lg'}"
            v-for="(data, idx) in preferredStyleListData"
            :key="idx"
          >
            <div
              class="item"
              @click="clickPreferredStyle(data, $event)"
            >
              <span class="icon-heart">
                <svg width="20px" height="19px" viewBox="0 0 20 19" version="1.1" xmlns="http://www.w3.org/2000/svg"
                     xmlns:xlink="http://www.w3.org/1999/xlink">
                <g transform="translate(-153.000000, -246.000000)" fill="#ffffff" class="svg">
                    <path
                      d="M163,264.333333 L162.653278,264.036854 C155.057295,257.540361 153,255.253502 153,251.538828 C153,248.484719 155.366214,246 158.27466,246 C160.705257,246 162.079149,247.449523 163,248.539922 C163.920851,247.449523 165.294743,246 167.72534,246 C170.633786,246 173,248.484719 173,251.538828 C173,255.253502 170.942705,257.540361 163.346722,264.036854 L163,264.333333 Z"
                      id="Fill-1"></path>
                </g>
              </svg>
              </span>
              <div>
                <img :src="$common.IMAGEURL() + data.image_path"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn-complete">
        <button
          class="btn btn-primary h-56"
          type="button"
          :disabled="totalSelected === 0"
          @click="clickComplete"
        >
          다음(2/4)
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import MemberAPI from '@/library/api/member';

export default {
  name: 'PreferredStyle',
  data() {
    return {
      // 페이지 진입했을때의 시간.
      startTime: 0,
      // 총 이미지 선택 갯수.
      totalSelected: 0,
      // 이미지의 선택, 취소를 기록.
      clickHistory: [],
      // 호출한 데이터를 이곳에 넣어준다.
      preferredStyleListData: [],
      // 회원가입에 필요한 데이터 집어넣기
      preferredStyleData: {
        selectCntT: 0,
        selectCntM: 0,
        selectCntC: 0,
        selectCntF: 0,
        selectSeq: '',
        selectDuration: 0
      }
    };
  },
  methods: {
    ...mapActions({
      ADD_PREFERRED_STYLE_DATA: 'join/ADD_PREFERRED_STYLE_DATA'
    }),
    clickPreferredStyle(data, event) {
      /*
      * 선호 스타일 이미지를 클릭하였을때
      * 기존에 선택되지 않은것이라면 해당 이미지의 타입과 지금까지 선택된 이미지의 카운터를 상승,
      * 기존에 선택된 것이라면 해당 이미지의 타입과 지금까지 선택된 이미지의 카운터를 하락.
      * 추적을 위해 어떤 이미지를 선택하고 뺏는지 클릭 히스토리 저장
      * 이미지는 총 6개까지 선택할 수 있다.
      * */
      const item = event.target.closest('.item');
      if (!item.classList.contains('selected')) {
        if (this.totalSelected === 6) {
          this.$dialog.alert('최대 6개까지 선택 가능합니다.', {
            okText: '확인',
            customClass: 'zuly-alert',
            backdropClose: true
          });
          return;
        }
        switch (data.style_type) {
          case 'T':
            this.preferredStyleData.selectCntT++;
            break;
          case 'M':
            this.preferredStyleData.selectCntM++;
            break;
          case 'C':
            this.preferredStyleData.selectCntC++;
            break;
          case 'F':
            this.preferredStyleData.selectCntF++;
            break;
          default:
            console.error('조건에 맞는 타입이 없습니다.');
        }
        this.totalSelected++;
        item.classList.add('selected');
      } else {
        switch (data.style_type) {
          case 'T':
            this.preferredStyleData.selectCntT--;
            break;
          case 'M':
            this.preferredStyleData.selectCntM--;
            break;
          case 'C':
            this.preferredStyleData.selectCntC--;
            break;
          case 'F':
            this.preferredStyleData.selectCntF--;
            break;
          default:
            console.error('조건에 맞는 타입이 없습니다.');
        }
        this.totalSelected--;
        item.classList.remove('selected');
      }
      // 클릭 히스토리 저장
      this.clickHistory.push(data.image_id);
    },
    clickComplete() {
      // 버튼을 눌렀을 시의 시간에서 페이지 접속했을때의 시간을 뺀다.
      this.preferredStyleData.selectDuration = new Date() - this.startTime;
      // 전달해야 할 값이 배열이 아니라 문자열이라 Array -> String 으로 변경
      this.preferredStyleData.selectSeq = _.toString(this.clickHistory);
      // 입력한 값을 스토어에 저장한다.
      this.ADD_PREFERRED_STYLE_DATA({ ...this.preferredStyleData });
      // 다음페이지로 이동
      this.$router.push({
        path: '/join/user-info'
      });
    }
  },
  created() {
    MemberAPI.GetStyleType()
      .then(({ data }) => {
        if (data.questions.length === 0) {
          alert('데이터가 존재하지 않습니다.');
        } else {
          // Success
          this.preferredStyleListData = data.questions;
        }
      })
      .catch(error => {
        alert('통신중 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
        console.error(error);
      });
  },
  mounted() {
    // 페이지에 진입했을때 그 시간을 저장한다.
    this.startTime = new Date();
  }
};
</script>
<style scoped lang="scss" src="@/assets/css/join-style.scss">
</style>
<style scoped lang="scss">
.list-preferred-style {
  margin-left: -15px;
  margin-top: -15px;
  .column {
    padding-left: 15px;
    margin-top: 15px;
  }
  .item {
    position: relative;
    cursor: pointer;
    .icon-heart {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 10;
    }
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background-color: rgba(0, 0, 0, 0.05);
      z-index: 10;
    }
    &.selected {
      outline: 2px solid $color-primary;
      outline-offset: -2px;

      &:after {
        content: '';
        display: block;
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        position: absolute;
        left: 2px;
        top: 2px;
        background-color: rgba(0, 0, 0, 0.14);
        z-index: 20;
      }
      .icon-heart {
        .svg {
          fill: $color-primary;
        }
      }
    }
  }
  img {
    width: 100%;
  }
}
</style>
