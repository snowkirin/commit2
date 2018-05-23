<template>
<div class="detail-frame">
  <div class="detail-content scroll">
    <div class="detail-modal-btn" @click="closeModal">
      <div class="btn-times"></div>
    </div>
    <div class="detail-image-area">
      <div class="detail-message detail-subimage">
        <div class="thumnail-image-area" @click="clickThum(0)">
          <img class="thumnail-detailimage thumnail-active" src="http://dev-image.zuly.co.kr/product/2018/04/16/f487b29f-aafb-44de-9c33-7a39caef5344.jpg" />
        </div>
        <div class="thumnail-image-area" @click="clickThum(1)">
          <img class="thumnail-detailimage" src="http://dev-image.zuly.co.kr/product/2018/04/16/59962728-14f4-4352-be4a-b6facd017ddb.jpg" />
        </div>
        <div class="thumnail-image-area" @click="clickThum(2)">
          <img class="thumnail-detailimage" src="http://dev-image.zuly.co.kr/product/2018/04/16/f487b29f-aafb-44de-9c33-7a39caef5344.jpg" />
        </div>
        <div class="thumnail-image-area" @click="clickThum(3)">
          <img class="thumnail-detailimage" src="http://dev-image.zuly.co.kr/product/2018/04/16/59962728-14f4-4352-be4a-b6facd017ddb.jpg" />
        </div>
      </div>
      <div class="detail-message detail-mainimage">
        <div class="prev-navigation" @click="clickPrev()">
          <svg class="nav-svg-size" viewBox="0 0 50 80" xml:space="preserve">
            <polyline fill="none" stroke="#333333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375"></polyline>
          </svg>
        </div>
        <div class="next-navigation" @click="clickNext()">
          <svg class="nav-svg-size" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 80" xml:space="preserve">
            <polyline fill="none" stroke="#333333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="0.375,0.375 45.63,38.087 0.375,75.8"/>
          </svg>
        </div>
        <div class="main-image-area">
          <carousel
            :per-page="1"
            :navigateTo.sync="navigateTo"
            :navigationEnabled="navigationEnabled"
            :paginationEnabled="paginationEnabled"
            :navigationPrevLabel="navigationPrevLabel"
            :navigationNextLabel="navigationNextLabel">
            <slide data-index="0"
                   :slideClick="handleSlideClick">
              <img class="main-image" src="http://dev-image.zuly.co.kr/product/2018/04/16/f487b29f-aafb-44de-9c33-7a39caef5344.jpg" />
            </slide>
            <slide data-index="1"
                  :slideClick="handleSlideClick">
              <img class="main-image" src="http://dev-image.zuly.co.kr/product/2018/04/16/59962728-14f4-4352-be4a-b6facd017ddb.jpg" />
            </slide>
            <slide data-index="2"
                  :slideClick="handleSlideClick">
              <img class="main-image" src="http://dev-image.zuly.co.kr/product/2018/04/16/f487b29f-aafb-44de-9c33-7a39caef5344.jpg" />
            </slide>
            <slide data-index="3"
                  :slideClick="handleSlideClick">
              <img class="main-image" src="http://dev-image.zuly.co.kr/product/2018/04/16/59962728-14f4-4352-be4a-b6facd017ddb.jpg" />
            </slide>
          </carousel>
        </div>
      </div>
      <div class="detail-message detail-maininfo en-font">
        <span class="detail-info-header">상품정보 보기</span>
        <span class="detail-info">색상 : 핑크</span>
        <span class="detail-info">핏감 : 슬림</span>
        <span class="detail-info">두께 : 얇음</span>
        <span class="detail-info">신축성 : 있음</span>
        <span class="detail-info">비침 : 있음</span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
  name: 'detail-modal',
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      content: '',
      type: 'detail',
      modal: null,
      navigateTo: 0,
      navigationEnabled: false,
      paginationEnabled: false,
      navigationPrevLabel: `<svg width='30px' height='60px' viewBox='0 0 50 80' xml:space='preserve'>
                              <polyline fill='none' stroke='#333333' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' points='45.63,75.8 0.375,38.087 45.63,0.375'/>
                            </svg>`,
      navigationNextLabel: `<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='30px' height='60px' viewBox='0 0 50 80' xml:space='preserve'>
                              <polyline fill='none' stroke='#333333' stroke-width='1' stroke-linecap='round' stroke-linejoin='round' points='0.375,0.375 45.63,38.087 0.375,75.8'/>
                            </svg>`,
    };
  },
  props: {
  },
  methods: {
    openModal() {
      this.modal.style.display = 'block';
    },
    closeModal() {
      this.modal.style.display = 'none';
    },
    clickThum(number) {
      const thumbList = document.querySelectorAll('.thumnail-detailimage');

      for (let i = 0; thumbList.length > i; i += 1) {
        if (number === i) thumbList[i].classList.add('thumnail-active');
        else thumbList[i].classList.remove('thumnail-active');
      }

      this.navigateTo = number;
    },
    clickPrev() {
      const currentPage = this.navigateTo;
      if (currentPage > 0) this.navigateTo = currentPage - 1;

      this.clickThum(this.navigateTo);
    },
    clickNext() {
      const currentPage = this.navigateTo;
      if (currentPage < 3) this.navigateTo = currentPage + 1;

      this.clickThum(this.navigateTo);
    },
    handleSlideClick(dataset) {
      console.log(dataset);
    },
  },
  mounted() {
    this.modal = document.querySelector('div.detail-frame');
  },
};
</script>

<style scoped>
.detail-frame {
  display: none;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: transparent;
  z-index: 1000;
  opacity: 1;
  text-align: center;
}

.detail-content {
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  min-width: 300px;
  width: 55%;
  height: inherit;
  padding: 25px;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.2) 5px 5px 30px 0px;
  border: solid 1px #333333 !important;
  border: solid 1px var(--black-two);
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
}

.detail-message {
  width: 100%;
  font-size: 18px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: -0.2px;
  text-align: center;
  color: #333333;
}

.mb0 {
  margin-bottom: 0px;
}

.detail-info-header {
  word-break:pre-line;
  display: block;
  text-align:left;
  font-size:16px;
  font-weight:bold;
  margin-bottom: 18px;
}

.detail-info {
  word-break:pre-line;
  display: block;
  text-align: left;
}

.detail-modal-title {
  width: 100%;
  padding-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.08;
  letter-spacing: -0.7px;
  text-align: left;
  color: #333333;
  box-sizing: border-box;
}

.detail-modal-btn {
  width: 48px;
  height: 48px;
  position: fixed;
  opacity: 1;
  top: 30px;
  left: 98%;
  z-index: 9999;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

div.btn-times {
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 6px;
}

div.btn-times:before, div.btn-times:after {
  content: '';
  position: absolute;
  width: 30px;
  height: 2px;
  background-color: #333333;
  border-radius: 2px;
  top: 23px;
  box-shadow: 0 0 2px 0 #ccc;
}

div.btn-times:before {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  transform: rotate(45deg);
  left: 9px;
}

div.btn-times:after {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  transform: rotate(-45deg);
  right: 9px;
}

.main-image-area {
  width: 100%;
}

.main-image {
  width: 100%;
}

.VueCarousel-navigation-prev {
  left: 0 !important;
  width: 40px !important;
  height: 80px !important;
  transform: translate(0%, 0%) !important;
}

.VueCarousel-navigation-next {
  transform: translate(0%, 0%) !important;
}

.detail-image-area {
  display:table;
}

.detail-mainimage {
  position: relative;
  float: left; width: 65%;
  margin: 0 20px 0 20px;
}

.detail-subimage {
  float: left; width: 10%;
}

.detail-maininfo {
  float: left; width: 19%;
}

.prev-navigation {
  position: absolute;
  top: 50%;
  z-index: 10;
  left: 20px;
  cursor: pointer;
}

.next-navigation {
  position: absolute;
  top: 50%;
  z-index: 10;
  right: 20px;
  cursor: pointer;
}

.nav-svg-size {
  width: 30px; height: 60px;
}

.thumnail-image-area {
  padding: 0 0 12px 10px;
}

.thumnail-detailimage {
  width: 100%;
}

.thumnail-active {
  border: solid 1px #333333;
}

.scroll {
  height: 96%;
  overflow: scroll;
}

.scroll::-webkit-scrollbar {
  width: 8px;
}

.scroll::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: #dadada;
}

@media screen and (max-width: 486px) {
  .detail-frame {
    top: 0;
    background: rgba(0,0,0,.7);
  }

  .detail-modal-btn {
    top: 6.3%;
    left: 91.4%;
  }

  .thumnail-detailimage {
    width: 50px;
  }

  .scroll {
    height: 90%;
    overflow: scroll;
  }

}
</style>
