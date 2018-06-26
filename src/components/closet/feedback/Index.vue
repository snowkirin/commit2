<template>
  <div class="feedback">
    <div class="rating">
      <div class="inner">
        <p class="txt-rating">현재 대여 중인 <span class="txt-bold">의상 사이즈</span>가 어떠세요?</p>
        <ul class="list-rating">
          <li
            :class="{selected : rating === 'love'}"
            @click="clickRating('love')">
            <div class="image">
              <img :src="(rating !== 'love') ? '/static/img/closet/ico_feedback1.png' : '/static/img/closet/ico_feedback1_active.png'">
            </div>
            <p class="text">완전 좋아요!</p>
          </li>
          <li
            :class="{selected : rating === 'okay'}"
            @click="clickRating('okay')">
            <div class="image">
              <img :src="(rating !== 'okay') ? '/static/img/closet/ico_feedback2.png' : '/static/img/closet/ico_feedback2_active.png'">
            </div>
            <p class="text">괜찮아요!</p>
          </li>
          <li
            :class="{selected : rating === 'bad'}"
            @click="clickRating('bad')">
            <div class="image">
              <img :src="(rating !== 'bad') ? '/static/img/closet/ico_feedback3.png' : '/static/img/closet/ico_feedback3_active.png'">
            </div>
            <p class="text">아쉬워요!</p>
          </li>
        </ul>
      </div>
      <p class="txt-refer">※ 고객님의 의견은 맞춤형  큰 도움이 됩니다.</p>
    </div>

    <transition>
      <div
        v-show="feedback"
        class="review">
      <p class="txt-review">소중한 이용 후기 부탁드립니다.</p>
      <form>
        <div class="section">
          <div>
            <div class="section-a">
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 36px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:35px'">
                <div class="text">
                  <p class="txt-point">전체적인 의상 스타일은 어떠세요?</p>
                </div>
                <div>
                  <ul class="square-list">
                    <li
                      v-for="(data, idx) in ['러블리', '조금 화려', '시크', '심플']"
                      :key="idx"
                      :class="{selected: data === feedbackData.total}"
                      @click="clickEvt('total', data)">
                      {{ data }}
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 38px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:35px'">
                <div class="text">
                  <p class="txt-point">A. 반하이 블라우스는 어떠셨나요?</p>
                </div>
                <div class="image">
                  <img src="http://via.placeholder.com/160x190" alt="">
                </div>
              </div>
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 35px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:32px'">
                <div class="text">
                  <p class="txt-point">A-1. 사이즈</p>
                </div>
                <div>
                  <ul class="square-list">
                    <li
                      v-for="(data, idx) in ['딱 맞음', '조금 큼', '많이 큼', '조금 작음', '많이 작음']"
                      :key="idx"
                      :class="[(idx === 3) ? 'line-break' : '', {selected: data === feedbackData.a1}]"
                      @click="clickEvt('a1', data)">
                      {{ data }}
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 37px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:34px'">
                <div class="text">
                  <p class="txt-point">A-2. 핏</p>
                </div>
                <div>
                  <ul class="square-list">
                    <li
                      v-for="(data, idx) in ['오버 핏', '보통', '타이트']"
                      :key="idx"
                      :class="{selected: data === feedbackData.a2}"
                      @click="clickEvt('a2', data)">
                      {{ data }}
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 37px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:34px'">
                <div class="text">
                  <p class="txt-point">A-3. 착용감이 불편한 부분 </p>
                </div>
                <div>
                  <ul class="square-list">
                    <li
                      v-for="(data, idx) in ['어깨', '가슴', '소매 길이', '팔', '허리', '전체 기장']"
                      :key="idx"
                      :class="{selected: data === feedbackData.a3}"
                      @click="clickEvt('a3', data)">
                      {{ data }}
                    </li>
                  </ul>
                </div>

              </div>
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 37px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:34px'">
                <div class="text">
                  <p class="txt-point">A-4. 색상 및 패턴</p>
                </div>
                <div>
                  <ul class="square-list">
                    <li
                      v-for="(data, idx) in ['맘에 듦', '무난 함', '별로']"
                      :key="idx"
                      :class="{selected: data === feedbackData.a4}"
                      @click="clickEvt('a4', data)">
                      {{ data }}
                    </li>
                  </ul>
                  <div
                    v-if="feedbackData.a4 === '별로'"
                    class="form-row">
                    <input
                      type="text"
                      class="form-input"
                      placeholder="색상, 패턴이 맘에 들지 않은 이유를 적어주세요."
                      v-model="feedbackData.a4_1">
                  </div>
                </div>
                <!-- 별로를 선택했을때 input 오픈 -->
              </div>
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 38px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:35px'">
                <div class="text">
                  <p class="txt-point">A-5. 소재 및 질감</p>
                </div>
                <div>
                  <ul class="square-list">
                    <li
                      v-for="(data, idx) in ['맘에 듦', '무난 함', '별로']"
                      :key="idx"
                      :class="{selected: data === feedbackData.a5}"
                      @click="clickEvt('a5', data)">
                      {{ data }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="section-b">
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 0;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:37px'">
                <div class="text">
                  <p class="txt-point">B. 치마는 어떠셨나요?</p>
                </div>
                <div class="image">
                  <img src="http://via.placeholder.com/160x190" alt="">
                </div>
              </div>
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 39px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:32px'">
                <div class="text">
                  <p class="txt-point">B-1. 사이즈</p>
                </div>
                <div>
                  <ul class="square-list">
                    <li
                      v-for="(data, idx) in ['딱 맞음', '조금 큼', '많이 큼', '조금 작음', '많이 작음']"
                      :key="idx"
                      :class="[(idx === 3) ? 'line-break' : '', {selected: data === feedbackData.b1}]"
                      @click="clickEvt('b1', data)">
                      {{ data }}
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 37px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:34px'">
                <div class="text">
                  <p class="txt-point">B-2. 핏</p>
                </div>
                <div>
                  <ul class="square-list">
                    <li
                      v-for="(data, idx) in ['오버 핏', '보통', '타이트']"
                      :key="idx"
                      :class="{selected: data === feedbackData.b2}"
                      @click="clickEvt('b2', data)">
                      {{ data }}
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 37px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:34px'">
                <div class="text">
                  <p class="txt-point">B-3. 착용감이 불편한 부분 </p>
                </div>
                <div>
                  <ul class="square-list">
                    <li
                      v-for="(data, idx) in ['어깨', '가슴', '소매 길이', '팔', '허리', '전체 기장']"
                      :key="idx"
                      :class="{selected: data === feedbackData.b3}"
                      @click="clickEvt('b3', data)">
                      {{ data }}
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 37px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:34px'">
                <div class="text">
                  <p class="txt-point">B-4. 색상 및 패턴</p>
                </div>
                <div>
                  <ul class="square-list">
                    <li
                      v-for="(data, idx) in ['맘에 듦', '무난 함', '별로']"
                      :key="idx"
                      :class="{selected: data === feedbackData.b4}"
                      @click="clickEvt('b4', data)">
                      {{ data }}
                    </li>
                  </ul>
                  <div
                    v-if="feedbackData.b4 === '별로'"
                    class="form-row">
                    <input
                      type="text"
                      class="form-input"
                      placeholder="색상, 패턴이 맘에 들지 않은 이유를 적어주세요."
                      v-model="feedbackData.b4_1">
                  </div>
                </div>
              </div>
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 38px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:35px'">
                <div class="text">
                  <p class="txt-point">B-5. 소재 및 질감</p>
                </div>
                <div>
                  <ul class="square-list">
                    <li
                      v-for="(data, idx) in ['맘에 듦', '무난 함', '별로']"
                      :key="idx"
                      :class="{selected: data === feedbackData.b5}"
                      @click="clickEvt('b5', data)">
                      {{ data }}
                    </li>
                  </ul>
                </div>
              </div>
              <div
                class="row"
                :style="($mq === 'sm') ? 'padding-top: 37px;': ($mq === 'md') ? 'padding-top: 36px': 'padding-top:41px'">
                <div class="text">
                  <p class="txt-point">ZULY 서비스를 지인이나 친구에게 추천하실 의향이 있으신가요?</p>
                  <p class="txt-refer">(적극 추천하는 것을 10점 만점으로 생각하고 점수를 매겨주세요.)</p>
                </div>
                <div>
                  <ul class="square-list">
                    <li
                      v-for="(data, idx) in ['10', '9', '8', '7', '6', '5' , '4', '3', '2', '1']"
                      :key="idx"
                      :class="{selected: data === feedbackData.score}"
                      @click="clickEvt('score', data)">
                      {{ data }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="btn-submit">
          <button
            class="btn btn-primary"
            type="button"
            @click="feedback = false">
            제출 하기
          </button>
        </div>
      </form>
    </div>
    </transition>
  </div>
</template>

<script>
import TopSize from '@/components/closet/feedback/TopSize';
import Deco from '@/components/closet/feedback/Deco';
import Detail from '@/components/closet/feedback/Detail';
import Finish from '@/components/closet/feedback/Finish';

export default {
  name: 'feedBack',
  components: {
    TopSize,
    Deco,
    Detail,
    Finish,
  },
  data() {
    return {
      rating: 'bad',
      feedback: true,
      feedbackData: {
        total: '',
        a1: '',
        a2: '',
        a3: '',
        a4: '',
        a4_1: '',
        a5: '',
        b1: '',
        b2: '',
        b3: '',
        b4: '',
        b4_1: '',
        b5: '',
        score: '',
      },
      viewFeed: 'TopSize',
    };
  },
  methods: {
    clickEvt(target, data) {
      this.feedbackData[target] = data;
    },
    clickRating(data) {
      this.rating = data;
      this.feedback = true;
    },
  },
};
</script>

<style scoped lang="scss">
  .feedback {
    // 부모의 패딩값 만큼.
    margin-left: -20px;
    width: 100vw;
  }
  .rating {
    text-align: center;
    padding-left: 20px;
    padding-right: 20px;
    .inner {
      background-image: url('/static/img/closet/img_feedback.png');
      height: 187px;
      background-position: 50% 50%;
      background-size: cover;
      opacity: 0.9;
      padding-top: 32px;
      margin-bottom: 15px;
    }
    .txt-rating {
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -1px;
      color: #fff;
    }
    .list-rating {
      font-size: 0;
      margin-top: 21px;
      li {
        display: inline-block;
        color: #fff;
        font-size: 14px;
        letter-spacing: -0.6px;
        opacity: 0.6;
        &:nth-child(1) {
          margin-left: 0;
        }
        &:nth-child(2) {
          margin-left: 24px;
        }
        &:nth-child(3) {
          margin-left: 32px;
        }
        &.selected {
          opacity: 1;
        }
      }
      .image {
        img {
          width: 50px;
          height: 50px;
        }
      }
      .text {
        margin-top: 8px;
      }
    }
  }
  .review {
    margin-top: 26px;
    border-bottom: 2px solid #333;
    background-color: #f5f5f5;
    padding-bottom: 40px;
    .txt-review {
      background-color: #797979;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
      color: #fff;
      line-height: 43px;
      font-size: 16px;
      letter-spacing: -1px;
      text-align: center;
      height: 43px;
      position: relative;
      &::before {
        content: '';
        display: block;
        position: absolute;
        border-bottom: 11px solid #797979;
        border-left: 11px solid transparent;
        border-right: 11px solid transparent;
        top: -11px;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .section {
      background-color: #f5f5f5;
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 40px;
      /*border-bottom: 2px solid #333;*/
    }
    .section-a {
      padding-bottom: 30px;
      border-bottom: 1px dashed #a7a7a7;
    }
    .section-b {
      padding-top: 27px;
    }
    .text {
      margin-bottom: 12px;
      text-indent: -1px;
    }
    .txt-refer {
      margin-top: 4px;
    }
    .row {
      .image {
        background-color: #e9e9e9;
        padding-top: 32px;
        padding-bottom: 32px;
        text-align: center;
        img {
          border: 5px solid #fff;
          width: 170px;
          height: 200px;
        }
      }
    }
    .form-row {
      margin-top: 10px;
    }
    // 기본모양
    .square-list {
      font-size: 0;
      margin-left: 1px;
      margin-top: 1px;
      // clearfix
      &::after {
        display: block;
        content: '';
        clear: both;
      }
      li {
        // 선택되지 않았을 경우 + 기본값
        background-color: #fff;
        font-size: 15px;
        line-height: 48px;
        color: #bbb;
        text-align: center;
        float: left;
        border: 1px solid #c4c4c4;
        margin-left: -1px;
        margin-top: -1px;
        position: relative;
        cursor: pointer;
        // 가변 스타일
        width: calc(25% - 1px);
        //width: 123px;
        height: 50px;
        &.line-break {
          clear: both;
        }
        // 선택되었을 경우
        &.selected {
          color: #333;
          font-weight: 700;
          letter-spacing: -0.6px;
          outline: 2px solid #333;
          outline-offset: -2px;
          z-index: 10;
        }
      }
    }
    .btn-submit {
      padding-left: 20px;
      padding-right: 20px;
      button {
        width: 100%;
      }
    }
  }

  @media (min-width: 1279px) {
    .feedback {
      margin-left: 0;
      width: auto;
    }
    .rating {
      width: 1200px;
      margin: 0 auto;
      padding-left: 0;
      padding-right: 0;
      .inner {
        height: 254px;
        padding-top: 52px;
        margin-bottom: 20px;
      }
      .txt-rating {
        font-size: 20px;
        line-height: 28px;
      }
      .list-rating {
        margin-top: 24px;
        li {
          font-size: 15px;
          opacity: 0.6;
          &:nth-child(2) {
            margin-left: 52px;
          }
          &:nth-child(3) {
            margin-left: 55px;
          }
        }
        .image {
          img {
            width: 65px;
            height: 65px;
          }
        }
        .text {
          margin-top: 12px;
        }
      }
    }
    .review {
      margin-top: 28px;
      width: 1200px;
      margin-left: auto;
      margin-right: auto;
      border-bottom: 0 none;
      background-color: transparent;
      .txt-review {
        line-height: 48px;
        height: 48px;
      }
      .section {
        padding-left: 0px;
        padding-right: 0px;
        padding-bottom: 40px;
        font-size: 0;
        border-bottom: 2px solid #333;
        position: relative;
        &::after {
          position: absolute;
          content: '';
          border-right: 1px solid #e9e9e9;
          height: 92.899%;
          left: calc(50% - 1px);
          top: 56px;
        }

      }
      .section-a {
        padding-bottom: 0;
        border-bottom: 0 none;
        display: inline-block;
        vertical-align: top;
        width: 50%;
        padding-left: 40px;
        padding-right: 70px;

      }
      .section-b {
        padding-top: 0;
        display: inline-block;
        vertical-align: top;
        width: 50%;
        padding-left: 50px;
        padding-right: 59px;
      }
      .text {
        margin-bottom: 12px;
      }
      .btn-submit {
        margin-top: 22px;
        text-align: right;
        padding-left: 0;
        padding-right: 0;
        button {
          width: 287px;
          font-size: 16px;
          letter-spacing: -0.6px;
        }
      }
    }
  }

</style>
