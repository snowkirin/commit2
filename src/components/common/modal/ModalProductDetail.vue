<template>
  <div class="modal-product-detail">
    <div class="grid-flex">
      <div class="column column-side">
        <div class="list-thumb" id="listThumb">
          <template v-for="(data, idx) in images" >
            <div :key="idx" @click="clickSwiperMove(idx)" class="item" :class="{selected: idx === 0}">
              <img :src="$common.ZulyImage()+data.image_path" alt="">
            </div>
          </template>
        </div>
      </div>
      <div class="column column-main">
        <div>
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(data, idx) in images" :key="idx">
              <img :src="$common.ZulyImage()+data.image_path" alt="">
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
      </div>
      <div class="column column-text">
        <div class="txt-product-name">
          <p>
            {{this.basics.product_name}}
          </p>
        </div>
        <div class="txt-product-explain">
          <div class="material-wrap">
            <template v-for="( data, idx ) in details.material">
              <div :key="idx">
                <p>
                  <span>{{data.type}}소재 :</span>
                  <span v-for="(data2, idx2) in data.composition" :key="idx2">
                  {{data2.material}} {{data2.ratio}}%
                </span>
                </p>
              </div>

            </template>
          </div>
          <div>
            <p>
              <span>핏감 : </span>
              <span>{{ details.fit }}</span>
            </p>
            <p>
              <span>두께 : </span>
              <span>{{details.thickness}}</span>
            </p>
            <p>
              <span>신축성 : </span>
              <span>{{ details.flexibility }}</span>
            </p>
            <p>
              <span>비침 : </span>
              <span>{{ details.see_through }}</span>
            </p>

          </div>
        </div>
      </div>
    </div>
    <div class="modal-close">
      <a class="btn-close" @click="$emit('close')">
        <span class="icon-close"></span>
      </a>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import VueJsonPretty from 'vue-json-pretty';
let currentIndex = 0;
export default {
  name: 'ModalProductDetail',
  props: ['data'],
  components: {
    swiper,
    swiperSlide,
    VueJsonPretty
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          slideChange: function() {
            const thumbList = document.getElementById('listThumb');
            const thumbItem = thumbList.querySelectorAll('.item');
            _.forEach(thumbItem, value => {
              value.classList.remove('selected');
            });
            thumbList
              .querySelectorAll('.item')
              [this.activeIndex].classList.add('selected');
          }
        }
      },
      basics: {},
      details: {},
      images: []
    };
  },
  methods: {
    clickSwiperMove(idx) {
      this.$refs.mySwiper.swiper.slideTo(idx);
      console.log(currentIndex);
    },
    activeSelected(idx) {
      return idx === currentIndex;
    }
  },
  created() {
    this.basics = this.data.basics;
    this.details = this.data.details;
    this.images = this.data.images;
  }
};
</script>
<style scoped lang="scss">
.modal-product-detail {
  padding: 20px;
  position: relative;
}
img {
  width: 100%;
}
.column-side {
  display: none;
}
.txt-product-name {
  @include fontSize(16px);
  font-weight: 700;
}
.txt-product-explain {
  @include fontSize(14px);
  margin-top: 10px;
}

.list-thumb {
  .item {
    margin-top: 5px;
    cursor: pointer;
    &.selected {
      outline: 2px solid $color-primary;
      outline-offset: -2px;
    }
    &:first-child {
      margin-top: 0;
    }
  }
}
.modal-close {
  position: absolute;
  top: 18px;
  right: 21px;
  overflow: hidden;
  z-index: 10;
  .btn-close {
    cursor: pointer;
  }
  .icon-close {
    display: block;
    width: 30px;
    height: 30px;
    position: relative;
    &::before,
    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: #333;
      position: absolute;
      transform-origin: 50% 50%;
      top: 50%;
      left: 0;
    }
    &::before {
      transform: rotate(45deg);
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
}

@media (min-width: 768px) {
  .column-side {
    display: block;
    flex-basis: 60px;
    max-width: 60px;
    margin-right: 15px;
  }
  .column-main {
    flex-basis: 55%;
    max-width: 55%;
  }
  .column-text {
    margin-left: 15px;
  }
}
</style>
