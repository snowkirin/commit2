<template>
  <div class="tomorrow mt40">
    <div class="closet-card-none" v-show="!isShow">
      <div class="closet-card-none-content">
        <div class="content-table mauto">
          <span><b>{{ printDDay(tomorrowCloset.styling_dday) }}</b><br/>옷장이 채워집니다.</span>
        </div>
      </div>
    </div>
    <div v-show="isShow">
      <div class="main-point-text closet-title">내일의 옷장</div>
      <div class="closet-title-text mt15">
        2가지 데일리룩 후보 중 마음에 드는<br/>
        의상을 선택해주세요.
      </div>
      <div class="closet-title-sub-text">
        (기한 내 미선택 시, 회원님께 더 어울릴 스타일로 자동 지정 후 배송 됩니다.)
      </div>
      <div class="closet-card-area mt30">
        <div class="closet-card" @click="selectStyle(printStyleFirst, 'first')" data-value="first">
          <div v-show="isMobile">
            <i class="fa fa-heart fa-lg heart-icon"></i>
          </div>
          <div class="closet-card-title select-title en-font">A. Codi Look</div>
          <div class="closet-card-images">
            <template v-for="(image, k) in printStyleFirst.image">
              <div v-if="image !== null" v-bind:key="k" class="thumnail-image-area">
                <div class="thumnail-image" v-bind:class="{ 'thumnail-image-left100': centerImage(printStyleFirst.image) }"
                  v-bind:style="{
                    'background-image': `url('${$common.IMAGEURL() + image}')`,
                  }"
                ></div>
              </div>
            </template>
          </div>
          <div class="closet-card-text">
            <div class="closet-card-text-title mt25">스타일 팁</div>
            <div class="closet-card-text-title-text mt10" v-html="$common.htmlEnterLine(printStyleFirst.stylingTip)">
            </div>
          </div>
          <div class="closet-card-bottom">
            <div class="dotted-line mt30"></div>
            <div class="closet-card-hashtag mt20" v-html="$common.htmlEnterLine(printStyleFirst.hashTag)">
            </div>
          </div>
          <div class="closet-card-active">
            <i class="fa fa-heart fa-4x"></i>
            <p>좋아요</p>
            <p>선택할게요</p>
          </div>
        </div>
        <div class="closet-card-block"></div>
        <div class="closet-card" @click="selectStyle(printStyleSecond, 'second')" data-value="second">
          <div v-show="isMobile">
            <i class="fa fa-heart fa-lg heart-icon"></i>
          </div>
          <div class="closet-card-title select-title en-font">B. Item Codi</div>
          <div class="closet-card-images">
            <template v-for="(image, k) in printStyleSecond.image">
              <div v-if="image !== null" v-bind:key="k" class="thumnail-image-area">
                <div class="thumnail-image" v-bind:class="{ 'thumnail-image-left100': centerImage(printStyleSecond.image) }"
                  v-bind:style="{
                    'background-image': `url('${$common.IMAGEURL() + image}')`,
                  }"
                ></div>
              </div>
            </template>
          </div>
          <div class="closet-card-text">
            <div class="closet-card-text-title mt25">스타일 팁</div>
            <div class="closet-card-text-title-text mt10" v-html="$common.htmlEnterLine(printStyleSecond.stylingTip)">
            </div>
          </div>
          <div class="closet-card-bottom">
            <div class="dotted-line mt30"></div>
            <div class="closet-card-hashtag mt20" v-html="$common.htmlEnterLine(printStyleSecond.hashTag)">
            </div>
          </div>
          <div class="closet-card-active">
            <i class="fa fa-heart fa-4x"></i>
            <p>좋아요</p>
            <p>선택할게요</p>
          </div>
        </div>
      </div>
    </div>
    <alert-modal ref="view" width="320" height="190"></alert-modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import AlertModal from '@/components/common/AlertModal';

export default {
  name: 'tomorrow',
  components: {
    AlertModal,
  },
  data() {
    return {
      isMobile: false,
      isShow: false,
      selected: {},
      alertMsg: '',
    };
  },
  computed: {
    ...mapGetters({
      tomorrowCloset: 'mypage/closet/getTomorrowCloset',
      tomorrowNone: 'mypage/closet/getTomorrowNone',
      tomorrowSelect: 'mypage/closet/getTomorrowSelect',
    }),
    printStyleFirst() {
      let firstStyle = {
        productId: [],
        description: [],
        image: [],
        stylingTip: '',
        hashTag: '',
        selected: false,
      };

      if (Array.isArray(this.tomorrowCloset.products)) {
        if (this.tomorrowCloset.products[0]) {
          firstStyle = this.setArrayData(firstStyle, {
            prdId: this.tomorrowCloset.products[0].id,
            description: this.tomorrowCloset.products[0].description,
            image: this.tomorrowCloset.products[0].image,
          });

          firstStyle.stylingTip = this.tomorrowCloset.products[0].styling_tip;
          firstStyle.hashTag = this.tomorrowCloset.products[0].hashtag;
          firstStyle.selected = (this.tomorrowCloset.products[0].selected);
        }

        if (this.tomorrowCloset.products[1]) {
          firstStyle = this.setArrayData(firstStyle, {
            prdId: this.tomorrowCloset.products[1].id,
            description: this.tomorrowCloset.products[1].description,
            image: this.tomorrowCloset.products[1].image,
          });
        }
      }

      return firstStyle;
    },
    printStyleSecond() {
      let secondStyle = {
        productId: [],
        description: [],
        image: [],
        stylingTip: '',
        hashTag: '',
        selected: false,
      };

      if (Array.isArray(this.tomorrowCloset.products)) {
        if (this.tomorrowCloset.products[2]) {
          secondStyle = this.setArrayData(secondStyle, {
            prdId: this.tomorrowCloset.products[2].id,
            description: this.tomorrowCloset.products[2].description,
            image: this.tomorrowCloset.products[2].image,
          });

          secondStyle.stylingTip = this.tomorrowCloset.products[2].styling_tip;
          secondStyle.hashTag = this.tomorrowCloset.products[2].hashtag;
          secondStyle.selected = (this.tomorrowCloset.products[2].selected);
        }

        if (this.tomorrowCloset.products[3]) {
          secondStyle = this.setArrayData(secondStyle, {
            prdId: this.tomorrowCloset.products[3].id,
            description: this.tomorrowCloset.products[3].description,
            image: this.tomorrowCloset.products[3].image,
          });
        }
      }

      return secondStyle;
    },
  },
  methods: {
    ...mapActions({
      setTomorrowCloset: 'mypage/closet/setTomorrowCloset',
      setTomorrowSelect: 'mypage/closet/setTomorrowSelect',
    }),
    centerImage(value) {
      for (let i = 0; value.length > i; i += 1) {
        if (value[i] === null) return true;
      }
      return false;
    },
    isShowFlag(tmr) {
      if (tmr.products) {
        this.isShow = true;
      } else if (tmr.select_dday > 0) {
        this.isShow = false;
      }

      return true;
    },
    printDDay(date) {
      let changeDay = '';
      if (date === 0 || date < 0) {
        changeDay = 'D day';
      } else {
        changeDay = `D-${date}일 후`;
      }

      return changeDay;
    },
    async selectStyle(style, type) {
      if (this.tomorrowCloset.select_dday >= 0) {
        await this.setTomorrowSelect({
          subscriptionId: this.tomorrowCloset.subscription_id,
          products: [...this.parseIntProduct(...style.productId)],
        });
        if (type === 'first') {
          this.$common.viewAlertModal('<b class="en-font">A. Codi Look</b> 배송됩니다.', this.$refs, 'alert');
        } else {
          this.$common.viewAlertModal('<b class="en-font">B. Item Codi</b> 배송됩니다.', this.$refs, 'alert');
        }
      } else {
        this.$common.viewAlertModal('선택기간이 지났습니다.<br />고객센터로 문의해주세요.', this.$refs, 'alert');
        return;
      }

      if (type === 'first') {
        this.styleOnOff(true, document.querySelector('[data-value="first"]'), true);
        this.styleOnOff(false, document.querySelector('[data-value="second"]'), false);
      }
      if (type === 'second') {
        this.styleOnOff(false, document.querySelector('[data-value="first"]'), false);
        this.styleOnOff(true, document.querySelector('[data-value="second"]'), true);
      }

      if (this.tomorrowSelect) await this.setTomorrowCloset();
    },
    parseIntProduct(...data) {
      const rtn = [];

      for (let i = 0; i < data.length; i += 1) {
        rtn.push(parseInt(data[i], 10));
      }

      return rtn;
    },
    printArrText(desc) {
      let rtn = '';

      for (let i = 0; i < desc.length; i += 1) {
        rtn += this.$common.htmlEnterLine(desc[i]);
      }

      return rtn;
    },
    setArrayData(data, { prdId, description, image }) {
      return {
        productId: [...data.productId, prdId],
        description: [...data.description, description],
        image: [...data.image, image],
        stylingTip: data.stylingTip,
        hashTag: data.hashTag,
        selected: data.selected,
      };
    },
    styleOnOff(type, target, selected) {
      const obj = target;

      if (selected) {
        const card = document.querySelectorAll('.closet-card');

        if (!this.$common.deviceCheck()) {
          for (let i = 0; i < card.length; i += 1) {
            card[i].onmouseover = () => {};
            card[i].onmouseout = () => {};
          }
        }
      }

      if (type) {
        obj.classList.add('closet-card-on');
        obj.querySelector('.closet-card-images').classList.add('closet-card-active-color');
        obj.querySelector('.heart-icon').classList.add('heart-icon-on');
        obj.querySelector('.select-title').classList.add('select-title-on');
        obj.querySelector('.closet-card-active').style.display = 'block';

        const thumbImage = obj.querySelectorAll('.thumnail-image');

        for (let i = 0; i < thumbImage.length; i += 1) {
          thumbImage[i].style.height = '343px';
          thumbImage[i].style.opacity = '0.4';
        }
      } else {
        obj.classList.remove('closet-card-on');
        obj.querySelector('.closet-card-images').classList.remove('closet-card-active-color');
        obj.querySelector('.heart-icon').classList.remove('heart-icon-on');
        obj.querySelector('.select-title').classList.remove('select-title-on');
        obj.querySelector('.closet-card-active').style.display = 'none';

        const thumbImage = obj.querySelectorAll('.thumnail-image');

        for (let i = 0; i < thumbImage.length; i += 1) {
          thumbImage[i].style.height = '343px';
          thumbImage[i].style.opacity = '1';
        }
      }
    },
    hoverEvt(target) {
      const obj = target;

      if (!this.$common.deviceCheck()) {
        obj.onmouseover = () => {
          this.styleOnOff(true, obj);
        };

        obj.onmouseout = () => {
          this.styleOnOff(false, obj);
        };
      } else {
        obj.onclick = () => {
          this.styleOnOff(true, obj);
        };
      }
    },
    mobileVisible() {
      if (window.outerWidth <= 486) this.isMobile = true;
      else this.isMobile = false;
    },
  },
  async created() {
    await this.setTomorrowCloset();

    this.mobileVisible();
    window.addEventListener('resize', this.mobileVisible);

    this.isShowFlag(this.tomorrowCloset);
  },
  mounted() {
    const card = document.querySelectorAll('.closet-card');

    for (let i = 0; i < card.length; i += 1) {
      this.hoverEvt(card[i]);
    }
  },
  updated() {
    if (this.printStyleFirst.selected) this.styleOnOff(true, document.querySelector('[data-value="first"]'), true);
    if (this.printStyleSecond.selected) this.styleOnOff(true, document.querySelector('[data-value="second"]'), true);
  },
  destroyed() {
    window.removeEventListener('resize', this.mobileVisible);
  },
};
</script>

<style scoped>
.closet-card-area {
  display: flex;
}

.closet-card {
  display: inline-block;
  width: 48.6%;
  height: auto;
  border: solid 2px #e9e9e9;
  cursor: pointer;
  position: relative;
}

.closet-card-title {
  text-align: left;
  line-height: 15px;
  font-size: 18px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  color: #797979;
  margin: 25px 20px 0 20px;
}

.closet-card-title-on {
  color: #333333;
}

.heart-icon {
  position: absolute;
  top: 4.6%;
  left: 86.5%;
  line-height: 15px;
  font-size: 27px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  color: #e9e9e9;
}

.heart-icon-on {
  color: #f45649;
}

.select-title-on {
  color: #333333;
}

.closet-card-images {
  margin: 20px 20px 0 20px;
  height: 343px;
}

.thumnail-image-area {
  position: relative;
  display: inline-block;
  width: 50%;
  height: 343px;
}

.thumnail-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  height: 343px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.thumnail-image-left100 {
  left: 100% !important;
}

.closet-card-text {
  margin: 30px 20px 100px 20px;
}

.closet-card-text-title {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -1px;
  color: #333333;
}

.closet-card-text-title-text {
  font-size: 16px;
  letter-spacing: -0.4px;
  color: #333333;
}

.closet-card-hashtag {
  font-size: 16px;
  line-height: 1.4;
  letter-spacing: -0.4px;
  text-align: left;
  color: #683b3f;
  text-transform:capitalize;
}

.closet-card-on {
  border: solid 2px #fb5143;
  background-color: #f5f5f5;
}

.closet-card-bottom {
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  margin: 20px;
  position: absolute;
  bottom: 0;
}

.closet-card-active {
  display: none;
  color: #f45649;
  text-align: center;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%,-50%);
}

.closet-card-active p {
  font-size: 20px;
  line-height: 0.5;
}

.closet-card-active-color {
  background-color: rgba(0, 0, 0, 1);
  height: 343px;
}

@media screen and (max-width: 486px) {
  .heart-icon {
    position: absolute;
    top: 4.6%;
    line-height: 15px;
    font-size: 27px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    color: #e9e9e9;
  }

  .heart-icon-on {
    color: #f45649;
  }

  .closet-card-area, .closet-card {
    display: block !important;
    width: 100% !important;
  }

  .closet-card-none-content  {
    width: 90%;
  }

  .closet-card-active-color {
    background-color: rgba(0, 0, 0, 1);
    height: 249px;
  }

  .closet-card-images {
    margin: 20px 20px 0 20px;
    height: 249px;
  }

  .closet-card-images {
    display: flex !important;
    justify-content: space-between !important;
  }

  .thumnail-image-area {
    width: 49% !important;
    height: 250px !important;
  }

  .thumnail-image {
    width: 100% !important;
    height: 250px !important;
  }

  .closet-card-active {
    top: 36% !important;
  }

  .closet-card-active i {
    display: none !important;
  }

  .content-table span {
    font-size: 26px;
  }
  .mt50 {
    margin-top: 30px !important;
  }
}
</style>
