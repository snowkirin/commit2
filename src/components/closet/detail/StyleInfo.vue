<template>
  <div class="style-info">
    <p class="txt-main-title">줄라이는 베이직 스타일을 기본으로 합니다.</p>
    <div class="line line__default"></div>

    <div>
      <!-- 스타일 유형-->
      <div class="style-type">
        <p class="txt-point">스타일 유형</p>
        <div>
          <ul class="image-list">
            <li class="item">
              <img src="http://via.placeholder.com/65x100" alt="">
            </li>
            <li class="item">
              <img src="http://via.placeholder.com/65x100" alt="">
            </li>
            <li class="item">
              <img src="http://via.placeholder.com/65x100" alt="">
            </li>
            <li class="item">
              <img src="http://via.placeholder.com/65x100" alt="">
            </li>
          </ul>
        </div>
      </div>
      <div class="detail">
        <!--사이즈-->
        <div class="size">
          <p class="txt-point">사이즈</p>
          <div>
            <p class="text">
              키 165 cm, 가슴(브래지어) 85B<br/>
              블라우스/셔츠 44, 치마 55, 바지 27 inch
              <!--{{ this.printSize }}-->
            </p>
          </div>
        </div>
        <!-- 체형 -->
        <div class="body-type">
          <p class="txt-point">체형</p>
          <div>
            <ul class="text-list large" data-size="large">
              <li class="item">
                일자형 몸매
              </li>
            </ul>
          </div>
        </div>
        <!-- 선호 옷 색상, 패턴 -->
        <div class="prefer-color">
          <p class="txt-point">선호 옷 색상, 패턴</p>
          <div>
            <ul class="text-list">
              <li class="item">흰색</li>
              <li class="item">노란</li>
              <!--<template v-if="printPreferColors.length > 0">-->
                <!--<template v-for="(prefer, k) in printPreferColors">-->
                  <!--<li v-bind:key="k" class="item">-->
                    <!--{{ prefer }}-->
                  <!--</li>-->
                <!--</template>-->
              <!--</template>-->
              <!--<template v-else>-->
                <!--<li class="item">-->
                  <!--선택없음-->
                <!--</li>-->
              <!--</template>-->
            </ul>
          </div>
        </div>
        <div class="brand">
          <p class="txt-point">주로 구매하는 브랜드</p>
          <div>
            <ul class="text-list">
              <li class="item">
                흰색
              </li>
              <li class="item">
                노란
              </li>
              <li class="item">
                흰색
              </li>
              <li class="item">
                흰색
              </li>
              <li class="item">
                노란
              </li>
              <li class="item">
                흰색
              </li>
              <li class="item">
                흰색
              </li>
              <li class="item">
                노란
              </li>
              <li class="item">
                흰색
              </li>
            </ul>
          </div>
        </div>
        <div class="dress-code">
          <p class="txt-point">주로 활동하는 드레스 코드</p>
          <div>
            <ul class="text-list">
              <li class="item">
                흰색
              </li>
              <li class="item">
                노란
              </li>
              <li class="item">
                흰색
              </li>
              <li class="item">
                흰색
              </li>
              <li class="item">
                노란
              </li>
              <li class="item">
                흰색
              </li>
              <li class="item">
                흰색
              </li>
              <li class="item">
                노란
              </li>
              <li class="item">
                흰색
              </li>
            </ul>
          </div>
        </div>
        <div class="request">
          <p class="txt-point">요청사항</p>
          <div>
            <p class="text">
              따로 요청하신 사항이 존재하지 않습니다.
            </p>
            <!--<p
              v-if="mypageStyleData.etc"
              v-html="contentReplace(mypageStyleData.etc)"
              class="text"
            >
            </p>
            <p
              v-else
             class="text">
              따로 요청하신 사항이 존재하지 않습니다.
            </p>-->
          </div>
        </div>
        <div class="daily-look">
          <p class="txt-point">My Daily Look</p>
          <div>
            <ul class="image-list">
              <li class="item">
                <img src="http://via.placeholder.com/65x100" alt="">
              </li>
              <li class="item">
                <img src="http://via.placeholder.com/65x100" alt="">
              </li>
              <li class="item">
                <img src="http://via.placeholder.com/65x100" alt="">
              </li>
              <li class="item">
                <img src="http://via.placeholder.com/65x100" alt="">
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="btn-area">
        <button
          class="btn btn-primary"
          type="button">
          스타일 유형<br/> 수정하기
        </button>
        <button
          class="btn btn-primary"
          type="button">
          사이즈 및 선호 <br/>정보 수정하기
        </button>
      </div>
    </div>

  </div>
  <!--<div class="style mt40">
    <div class="main-point-text closet-title">스타일정보</div>
    <div class="closet-title-text mt15">
      줄라이는 베이직 스타일을 기본으로 합니다.
    </div>
    <div class="style-content mt30">
      <div class="style-content-area">
        <div class="style-content-left" style="margin-bottom: 40px;">
          <div class="style-content-row">
            <div class="style-content-header">사이즈</div>
            <div class="style-content-data mt30">
              {{ this.printSize }}
            </div>
          </div>
          <div class="style-content-row">
            <div class="style-content-header">선호 스타일</div>
            <div class="style-content-data mt20">
              <div class="style-point-box">
                {{ mypageStyleData.moodName }} {{ mypageStyleData.moodDesc }}
              </div>
            </div>
          </div>
          <div class="style-content-row">
            <div class="style-content-header">선호 옷 색상</div>
            <div class="style-content-data mt20">
              <template v-if="printPreferColors.length > 0">
                <template v-for="(prefer, k) in printPreferColors">
                  <div v-bind:key="k" class="style-point-box">
                    {{ prefer }}
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="style-point-box">
                  선택없음
                </div>
              </template>
            </div>
          </div>
          <div class="style-content-row">
            <div class="style-content-header">기피 옷 색상</div>
            <div class="style-content-data mt20">
              <template v-if="printExceptColors.length > 0">
                <template v-for="(except, k) in printExceptColors">
                  <div v-bind:key="k" class="style-point-box">
                    {{ except }}
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="style-point-box">
                  선택없음
                </div>
              </template>
            </div>
          </div>
        </div>
        <div class="style-content-center"></div>
        <div class="style-content-right">
          <div class="style-content-row">
            <div class="style-content-header">기피 복종</div>
            <div class="style-content-data mt20">
              <template v-if="printClothes.length > 0">
                <template v-for="(clothe, k) in printClothes">
                  <div v-bind:key="k" class="style-point-box">
                    {{ clothe }}
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="style-point-box">
                  선택없음
                </div>
              </template>
            </div>
          </div>
          <div class="style-content-row">
            <div class="style-content-header">기피 패턴</div>
            <div class="style-content-data mt20">
              <template v-if="printPattern.length > 0">
                <template v-for="(pattern, k) in printPattern">
                  <div v-bind:key="k" class="style-point-box">
                    {{ pattern }}
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="style-point-box">
                  선택없음
                </div>
              </template>
            </div>
          </div>
          <div class="style-content-row">
            <div class="style-content-header">요구사항</div>
            <div class="style-content-data mt30">
              <span v-if="mypageStyleData.etc" v-html="contentReplace(mypageStyleData.etc)"></span>
              <span v-else>따로 요청하신 사항이 존재하지 않습니다.</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="style-modify-btn mt30">
      <button class="button-login" style="float: right; width: 202px;" @click="moveNext">정보수정</button>
    </div>
  </div>-->
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'styleInfo',
  components: {
  },
  computed: {
    ...mapGetters({
      mypageStyleData: 'mypage/getMypageStyleData',
    }),
    printSize() {
      let htmlSize = '';

      if (this.mypageStyleData) {
        htmlSize = `키 ${this.mypageStyleData.tall_size}cm 허리 ${this.mypageStyleData.waist_size}inch
         가슴(브래지어) ${this.mypageStyleData.bust_size}cm, 힙(팬티) ${this.mypageStyleData.hip_size}cm
        `;
      }

      return htmlSize;
    },
    printPreferColors() {
      let data = [];

      if (this.mypageStyleData.prefer_color) {
        data = this.mypageStyleData.prefer_color.split(',');
      }

      return data;
    },
    printExceptColors() {
      let data = [];

      if (this.mypageStyleData.except_color) {
        data = this.mypageStyleData.except_color.split(',');
      }

      return data;
    },
    printClothes() {
      let data = [];

      if (this.mypageStyleData.except_clothes) {
        data = this.mypageStyleData.except_clothes.split(',');
      }

      return data;
    },
    printPattern() {
      let data = [];

      if (this.mypageStyleData.except_pattern) {
        data = this.mypageStyleData.except_pattern.split(',');
      }

      return data;
    },
  },
  methods: {
    ...mapActions({
      setMypageStyle: 'mypage/setMypageStyle',
    }),
    moveNext() {
      this.$router.push({ path: '/join/size' });
    },
    contentReplace(text) {
      const result = this.$common.enterReplace(text);
      return result;
    },
  },
  created() {
    this.setMypageStyle();
  },
};
</script>

<style scoped lang="scss">
  .style-info {
    padding: 20px;
  }
  .line {
    margin-top: 15px;
    margin-bottom: 16px;
  }
  // Image List
  .image-list {
    list-style: none;
    font-size: 0;
    .item {
      display: inline-block;
      margin-left: 6.6px;
      &:first-child {
        margin-left: 0;
      }
    }
  }
  // Text List
  .text-list {
    list-style: none;
    font-size: 0;
    margin-left: -8px;
    margin-top: 8px;
    &.large {
      li {
        padding: 0 10.6px;
      }
    }
    li {
      padding: 0 6.8px;
      margin-left: 8px;
      margin-top: 8px;
      line-height: 28px;
      display: inline-block;
      font-size: 15px;
      letter-spacing: -0.6px;
      color: #797979;
      text-align: center;
      background-color: #f4f4f4;
    }
  }
  .text {
    font-size: 15px;
    line-height: 23px;
    letter-spacing: -0.6px;
    color: #797979;
    margin-top: 7px;
  }
  .style-type {
    .image-list {
      margin-top: 10px;
    }
  }
  .detail {
    padding: {
      top: 14px;
      bottom: 20px;
    }
    border: {
      top: 2px solid rgba(51,51,51,0.5);
      bottom: 2px solid rgba(51,51,51,0.5);
    }
    margin: {
      top: 20px;
      bottom: 20px;
    }
    .size {
    }
    .body-type,
    .prefer-color,
    .brand,
    .dress-code,
    .request,
    .daily-look {
      margin-top: 35px;
    }

    .body-type {
    }
    .prefer-color {
    }
    .brand {
    }
    .dress-code {
    }
    .request {
    }
    .daily-look {
      .image-list {
        margin-top: 14px;
      }
    }
  }
  .btn-area {
    display: flex;
    .btn-primary {
      font-size: 15px;
      line-height: 18px;
      flex: 1;
      &:first-child {
        margin-right: 8px;
      }
    }
  }
  @media (min-width: 1279px) {
    .style-info {
      width: 1200px;
      padding: 20px 0;
      margin: 0 auto;
    }
  }
</style>
