<template>
  <div class="style mt40">
    <div class="main-point-text closet-title">스타일정보</div>
    <div class="closet-title-text mt20">
      ZULY는 베이직 스타일을 기본으로 합니다.
    </div>
    <div class="style-content mt50">
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
            <div class="style-content-header">기피 재질</div>
            <div class="style-content-data mt20">
              <template v-if="printMaterial.length > 0">
                <template v-for="(material, k) in printMaterial">
                  <div v-bind:key="k" class="style-point-box">
                    {{ material }}
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
              <span v-if="mypageStyleData.etc">{{ mypageStyleData.etc }}</span>
              <span v-else>따로 요청하신 사항이 존재하지 않습니다.</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="style-modify-btn mt30">
      <button class="button-login" style="float: right; width: 202px;" @click="moveNext">정보수정</button>
    </div>
  </div>
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
    printMaterial() {
      let data = [];

      if (this.mypageStyleData.except_material) {
        data = this.mypageStyleData.except_material.split(',');
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
  },
  created() {
    this.setMypageStyle();
  },
};
</script>

<style scoped>
.style-modify-btn {
  height: 150px;
}

.style-content {
  border-top: 2px solid #212121;
  border-bottom: 2px solid #212121;
}

.style-content-area {
  display: flex;
}

.style-content-center {
  width: 0.1%;
  background-color: #797979;
  margin: 30px;
  opacity: 0.5;
}

.style-content-left, .style-content-right {
  width: 49.8%;
}

.style-content-row {
  margin-top: 40px;
}

.style-content-header {
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.4px;
  color: #212121;
}

.style-content-data {
  font-size: 18px;
  line-height: 1;
  color: #212121;
}

.style-content-header span {
  font-weight: normal;
}

.style-point-box {
  display: inline-block;
  margin-top: 10px;
  margin-right: 10px;
  height: 20px;
  line-height: 20px;
  background-color: #f4f4f4;
  padding: 5px 10px;
}
</style>
