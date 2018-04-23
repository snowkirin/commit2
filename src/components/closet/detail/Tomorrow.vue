<template>
  <div class="tomorrow mt40">
    <div class="closet-card-none" v-show="!isShow">
      <div class="closet-card-none-content">
        <div class="content-table mauto">
          <span><b>D-{{ tomorrowCloset.styling_dday }}일 후</b><br/>옷장이 채워집니다.</span>
        </div>
      </div>
    </div>
    <div v-show="isShow">
      <div class="main-point-text closet-title mt30">내일의 옷장</div>
      <div class="closet-title-text mt20">
        2가지 데일리룩 후보 중 마음에 드는<br/>
        의상을 선택해주세요.
      </div>
      <div class="closet-card-area mt50">
        <div class="closet-card" @click="selectStyle(printStyleFirst, 'first')" data-value="first">
          <div class="closet-card-title">TYPE A</div>
          <div class="closet-card-title" v-show="isMobile">
            <i class="fa fa-heart fa-lg"></i>
          </div>
          <div class="closet-card-images">
            <template v-for="(image, k) in printStyleFirst.image">
              <div v-bind:key="k" class="thumnail-image-area">
                <div class="thumnail-image"
                  v-bind:style="{
                    backgroundImage: `url('${$common.IMAGEURL() + image}')`,
                  }"
                ></div>
              </div>
            </template>
          </div>
          <div class="closet-card-text">
            <div class="closet-card-text-title mt25">스타일 팁</div>
            <div class="closet-card-text-title-text mt10" v-html="$common.htmlEnterLine(printStyleFirst.stylingTip)">
            </div>
            <div class="closet-card-text-title">상품 설명</div>
            <div class="closet-card-text-title-text mt10" v-html="printArrText(printStyleFirst.description)">
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
          <div class="closet-card-title">TYPE B</div>
          <div class="closet-card-title" v-show="isMobile">
            <i class="fa fa-heart fa-lg"></i>
          </div>
          <div class="closet-card-images">
            <template v-for="(image, k) in printStyleSecond.image">
              <div v-bind:key="k" class="thumnail-image-area">
                <div class="thumnail-image"
                  v-bind:style="{
                    backgroundImage: `url('${$common.IMAGEURL() + image}')`,
                  }"
                ></div>
              </div>
            </template>
          </div>
          <div class="closet-card-text">
            <div class="closet-card-text-title mt25">스타일 팁</div>
            <div class="closet-card-text-title-text mt10" v-html="$common.htmlEnterLine(printStyleSecond.stylingTip)">
            </div>
            <div class="closet-card-text-title">상품 설명</div>
            <div class="closet-card-text-title-text mt10" v-html="printArrText(printStyleSecond.description)">
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'tomorrow',
  data() {
    return {
      isMobile: false,
      isShow: false,
      selected: {},
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
    printDDay(tmr) {
      let rtn = 0;

      if (tmr.products) {
        this.isShow = true;
      } else if (tmr.select_dday > 0) {
        this.isShow = false;
        rtn = tmr.select_dday;
      }

      return rtn;
    },
    async selectStyle(style, type) {
      await this.setTomorrowSelect({
        subscriptionId: this.tomorrowCloset.subscription_id,
        products: [...this.parseIntProduct(...style.productId)],
      });

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

        for (let i = 0; i < card.length; i += 1) {
          card[i].onmouseover = () => {};
          card[i].onmouseout = () => {};
        }
      }

      if (type) {
        obj.classList.add('closet-card-on');
        obj.querySelector('.closet-card-images').classList.add('closet-card-active-color');
        obj.querySelector('.closet-card-title i').style.color = 'red';
        obj.querySelector('.closet-card-active').style.display = 'block';

        const thumbImage = obj.querySelectorAll('.thumnail-image');

        for (let i = 0; i < thumbImage.length; i += 1) {
          thumbImage[i].style.height = '343px';
          thumbImage[i].style.opacity = '0.4';
        }
      } else {
        obj.classList.remove('closet-card-on');
        obj.querySelector('.closet-card-images').classList.remove('closet-card-active-color');
        obj.querySelector('.closet-card-title i').style.color = 'black';
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

      obj.onmouseover = () => {
        this.styleOnOff(true, obj);
      };

      obj.onmouseout = () => {
        this.styleOnOff(false, obj);
      };
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

    this.printDDay(this.tomorrowCloset);
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
  font-size: 20px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -0.4px;
  color: #797979;
  margin: 25px 20px 0 20px;
}

.closet-card-title-on {
  color: #212121;
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

.closet-card-text {
  margin: 30px 20px 100px 20px;
}

.closet-card-text-title {
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -1px;
  color: #212121;
}

.closet-card-text-title-text {
  font-size: 18px;
  letter-spacing: -1px;
  color: #212121;
}

.closet-card-hashtag {
  font-size: 18px;
  line-height: 1.4;
  letter-spacing: -1px;
  text-align: left;
  color: #566b9c;
  margin-bottom: 20px;
}

.closet-card-on {
  border: solid 2px #fb5143;
  background-color: #f5f5f5;
}

.closet-card-bottom {
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  margin: 30px 20px 0 20px;
  position: absolute;
  bottom: 0;
}

.closet-card-active {
  display: none;
  color: #f45649;
  text-align: center;
  position: absolute;
  top: 25%;
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
  .closet-card-area, .closet-card, .closet-card-none-content {
    display: block !important;
    width: 100% !important;
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
    top: 23% !important;
  }

  .closet-card-active i {
    display: none !important;
  }

  .content-table span {
    font-size: 26px;
  }
}
</style>
