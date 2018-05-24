<template>
  <div class="size subContent mauto size-margin">
    <div class="content-title mt70">
      <span v-show="!this.Authentication.authenticated">사이즈</span>
      <styleMenu v-show="this.Authentication.authenticated" menuTitle="사이즈"></styleMenu>
    </div>
    <div class="explain mt10">
      다음 질문들은 스타일리스트가 체형을 정확히 파악하여 연출하는데 도움이 됩니다.
    </div>
    <div class="sizeLine mt25"></div>
    <div class="content-form mauto">
      <sizeTooltip ref="tall" :dataId="0" sizeTitle="키" customTooltip="최근에 측정된 키를 입력해주세요."></sizeTooltip>
      <div class="tall-input-group" :class="{ error: errors.has('tall') }">
        <div class="tall-input">
          <input type="number" name="tall" class="form-login-input" placeholder="최근 측정한 키를 입력" v-validate="'required'" maxlength="3"/>
        </div>
        <div class="tall-input-unit">cm</div>
      </div>
      <div class="field">
        <span class="error" v-show="errors.has('tall')" style="text">키를 입력해주세요.</span>
      </div>
      <sizeTooltip
        ref="bust"
        :bustError.sync="bustError"
        :dataId="1"
        :dataSet="[75, 80, 85, 90]"
        :initData="initData"
        sizeUnit="cm"
        sizeTitle="가슴"
        customTooltip="평상시 착용 하시는 브래지어 사이즈에서 앞에 있는 숫자를 입력해 주세요. 예를 들어 지금 착용하신 브래지어에 80A 이라고 라벨에 적혀 있다면, 80 이라고 입력 해주세요.">
      </sizeTooltip>
      <div class="field">
        <span class="error" v-show="!initFlag && bustError">가슴 사이즈를 선택해주세요.</span>
      </div>
      <sizeTooltip
        ref="waist"
        :waistError.sync="waistError"
        :dataId="2"
        :dataSet="[24, 26, 28, 30]"
        :initData="initData"
        sizeUnit="inch"
        sizeTitle="허리"
        customTooltip="즐겨 입으시는 바지의 인치를 입력 해주세요.">
      </sizeTooltip>
      <div class="field">
        <span class="error" v-show="!initFlag && waistError">허리 사이즈를 선택해주세요.</span>
      </div>
      <sizeTooltip
        ref="hip"
        :hipError.sync="hipError"
        :dataId="3"
        :dataSet="[80, 85, 90, 95]"
        :initData="initData"
        sizeUnit="cm"
        sizeTitle="힙"
        customTooltip="평상시 착용 하시는 팬티의 사이즈 숫자를 입력해 주세요. 예를 들어 지금 착용하신 팬티에 90 이라고 라벨에 적혀 있다면, 90이라고 입력 해주세요.">
      </sizeTooltip>
      <div class="field">
        <span class="error" v-show="!initFlag && hipError">힙 사이즈를 선택해주세요.</span>
      </div>
      <styleButton currentLocation="size" currentNumber="1"></styleButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import SizeTooltip from '@/components/join/SizeTooltip';
import StyleMenu from '@/components/join/common/StyleMenu';
import StyleButton from '@/components/join/common/StyleButton';
import ToolTip from '@/components/join/common/ToolTip';

export default {
  name: 'size',
  data() {
    return {
      clickCount: 0,
      initFlag: true,
      bustError: true,
      waistError: true,
      hipError: true,
      initData: {},
    };
  },
  components: {
    SizeTooltip,
    StyleMenu,
    StyleButton,
    ToolTip,
  },
  computed: {
    ...mapGetters({
      Authentication: 'login/Authentication',
      mypageStyleData: 'mypage/getMypageStyleData',
    }),
  },
  methods: {
    ...mapActions({
      setSizeData: 'signup/setSizeData',
      setMypageStyle: 'mypage/setMypageStyle',
      setMypageCache: 'mypage/setMypageCache',
    }),
    toolTipEvt() {
      this.$refs.mtooltip.toolTipEvt();
    },
    loadSize(type) {
      let rtn = 0;
      if (type === 'tall') rtn = (this.mypageStyleData.tall_size) ? this.mypageStyleData.tall_size : 0;
      else if (type === 'bust') rtn = (this.mypageStyleData.bust_size) ? this.mypageStyleData.bust_size : 0;
      else if (type === 'waist') rtn = (this.mypageStyleData.waist_size) ? this.mypageStyleData.waist_size : 0;
      else if (type === 'hip') rtn = (this.mypageStyleData.hip_size) ? this.mypageStyleData.hip_size : 0;

      return rtn;
    },
    stylingMenuOnoff() {
      const mnu = document.querySelector('.content-menu-box');

      if (mnu.style.display === 'none') mnu.style.display = 'block';
      else mnu.style.display = 'none';
    },
    async saveSize() {
      const sizeData = {
        tall: document.querySelector('input[name=tall]').value,
        bust: this.$refs.bust.value,
        waist: this.$refs.waist.value,
        hip: this.$refs.hip.value,
      };
      await this.setSizeData(sizeData);
      this.$localStorage.set('S1', JSON.stringify(sizeData));
    },
    moveNext() {
      this.initFlag = false;
      this.$validator.validateAll().then((result) => {
        if (result) {
          if (!this.bustError && !this.waistError && !this.hipError) {
            this.saveSize();
            this.$router.push({ path: 'styling' });
          }
        }
      });
    },
  },
  async mounted() {
    let localStorage = this.$localStorage.get('S1');

    if (this.Authentication.authenticated) {
      if (!this.mypageStyleData.bust_size) await this.setMypageStyle();
      document.querySelector('input[name=tall]').value = this.mypageStyleData.tall_size;
      this.initData = {
        bust: this.mypageStyleData.bust_size,
        waist: this.mypageStyleData.waist_size,
        hip: this.mypageStyleData.hip_size,
      };
    } else if (localStorage) {
      localStorage = JSON.parse(localStorage);
      document.querySelector('input[name=tall]').value = localStorage.tall;
      this.setMypageCache({
        tall_size: localStorage.tall,
        bust_size: localStorage.bust,
        waist_size: localStorage.waist,
        hip_size: localStorage.hip,
      });
      this.initData = {
        bust: localStorage.bust,
        waist: localStorage.waist,
        hip: localStorage.hip,
      };
    }
  },
};
</script>

<style scoped>
.size {
  position: relative;
  text-align: center;
}

.sizeLine {
  height: 1px;
  opacity: 0.2;
  background-color: #333333;
}

.size-tt-text {
  width: 392px;
  text-align: left;
  font-size: 16px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  color: #333333;
}

.fa-exclamation-circle {
  display: none;
}

.tooltipLocation {
  position: absolute;
  z-index: 5;
  left: -1%;
  top: 24%;
}

.tall-input-group {
  width: 392px;
  display: table;
  table-layout: fixed;
  padding: 0;
  height: 60px;
}

.tall-input {
  display: table-cell;
  text-align: center;
  width: 75%;
}

.tall-input-unit {
  display: table-cell;
  vertical-align:bottom;
  text-align: left;
  padding-left: 15px;
  height: 60px;
  font-size: 16px;
  font-weight: 300;
}

.field {
  text-align: left;
}

@media screen and (max-width: 486px) {
  .size-tt-text {
    width: 100%;
  }

  .fa-exclamation-circle {
    display: inline-block;
    color: #aaaaaa;
    cursor: pointer;
  }

  .size-margin {
    margin-left: 20px;
    padding-right: 20px;
    overflow-x:hidden;
  }

  .tall-input-group {
    width: 100%;
    display: table;
    table-layout: fixed;
    padding: 0;
    height: 60px;
  }

  .tall-input {
    display: table-cell;
    text-align: center;
    width: 75%;
  }

  .tall-input-unit {
    display: table-cell;
    vertical-align:bottom;
    text-align: left;
    padding-left: 15px;
    height: 60px;
    font-size: 20px;
    font-weight: 300;
  }
}
</style>
