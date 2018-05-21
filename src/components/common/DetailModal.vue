<template>
<div class="detail-frame">
  <div class="detail-content">
    <div class="detail-modal-title">스키니핏 팬츠
      <div class="detail-modal-btn" @click="closeModal">
        <div class="btn-times"></div>
      </div>
    </div>
    <div class="detail-message">
      <!-- <div>
        <div class="button-prev">
          <ruler height="100%" width="100%">
            <svg viewBox="0 0 42 80" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
              <polyline fill="none" stroke="#333333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="45.63,75.8 0.375,38.087 45.63,0.375"/>
            </svg>
          </ruler>
        </div>
        <div class="button-next">
          <ruler height="100%" width="100%">
            <svg viewBox="0 0 42 80" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
              <path d="M1 0l40 40.083L1.166 80" style="fill: none; fill-rule: evenodd; stroke: #333333; stroke-width: 1; stroke-linecap: round; stroke-linejoin: round"></path>
            </svg>
          </ruler>
        </div>
      </div> -->
      <carousel
        :per-page="1"
        :navigationEnabled="navigationEnabled"
        :paginationEnabled="paginationEnabled"
        :navigationPrevLabel="navigationPrevLabel"
        :navigationNextLabel="navigationNextLabel">
        <slide class="main-image-area">
          <div class="main-image" style="background-image: url('http://dev-image.zuly.co.kr/product/2018/04/16/59962728-14f4-4352-be4a-b6facd017ddb.jpg');"></div>
        </slide>
        <slide>
          <div class="main-image" style="background-image: url('http://dev-image.zuly.co.kr/product/2018/04/16/f487b29f-aafb-44de-9c33-7a39caef5344.jpg');"></div>
        </slide>
        <slide>
          <div class="main-image" style="background-image: url('http://dev-image.zuly.co.kr/product/2018/04/16/59962728-14f4-4352-be4a-b6facd017ddb.jpg');"></div>
        </slide>
      </carousel>
    </div>
    <div class="detail-message mb0 en-font">
      <span class="detail-info-header">상품정보 보기</span>
      <span class="detail-info">색상 : 핑크</span>
      <span class="detail-info">핏감 : 슬림</span>
      <span class="detail-info">두께 : 얇음</span>
      <span class="detail-info">신축성 : 있음</span>
      <span class="detail-info">비침 : 있음</span>
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
      navigationEnabled: true,
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
  },
  mounted() {
    this.modal = document.querySelector('div.detail-frame');
    document.querySelector('.VueCarousel-navigation-prev').style.transform = 'translate(0%)';
    document.querySelector('.VueCarousel-navigation-prev').style.marginTop = '-12%';
    document.querySelector('.VueCarousel-navigation-next').style.transform = 'translate(0%)';
    document.querySelector('.VueCarousel-navigation-next').style.marginTop = '-12%';
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
  width: inherit;
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
  margin-bottom: 20px;
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
  background-color: #FFFFFF;
  position: absolute;
  opacity: 1;
  top: 5%;
  left: 95%;
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
  width: 350px;
  height: 450px;
}

.main-image {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
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

.prev-custom {
  padding: 20px;
}

.button-prev {
  position: absolute;
  z-index: 10;
  left: 20px;
  top: 32%;
  width: 20px;
  height: 40px;
  padding: 20px;
  border: 0;
  background: none;
  -webkit-transform: translate(0%, 0%) scale(1);
  transform: translate(0%, 0%) scale(1.5);
}

.button-next {
  position: absolute;
  z-index: 10;
  right: 20px;
  top: 32%;
  width: 20px;
  height: 40px;
  padding: 20px;
  border: 0;
  background: none;
  -webkit-transform: translate(0%, 0%) scale(1);
  transform: translate(0%, 0%) scale(1.5);
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

  .main-image-area {
    width: 200px;
    height: 300px;
  }

}
</style>
