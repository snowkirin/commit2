<template>
  <div class="modal-product-detail">
    <div class="modal-header">
      <p class="txt-modal-title">
        {{this.basics.product_name}}
      </p>
    </div>

    <div class="modal-content">
      <div class="swiper">
        <swiper :options="swiperOption" ref="mySwiper" class="swiper-box">
          <swiper-slide v-for="(data, idx) in images" :key="idx" class="swiper-item">
            <img :src="$common.ZulyImage()+data.image_path" alt="">
          </swiper-slide>
          <swiper-slide class="swiper-item" :style="{ height: containerHeight+'px'}">
            <div class="swiper-explain">
              <p>핏감: {{details.fit}}</p>
              <p>두께: {{details.thickness}}</p>
              <p>신축성: {{details.flexibility}}</p>
              <p v-if="materialType('겉감')">겉감: {{materialType('겉감')}}</p>
              <p v-if="materialType('안감')">안감: {{materialType('안감')}}</p>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
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

export default {
  name: 'ModalProductDetail',
  props: ['data'],
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      basics: {},
      details: {},
      images: [],
      containerHeight: 0
    };
  },
  computed: {},
  methods: {
    materialType(type) {
      const materialData = this.details.material;
      let materialResult = '';
      _.forEach(materialData, value => {
        if (value.type === type) {
          _.forEach(value.composition, (value2, idx2) => {
            materialResult += `${idx2 > 0 ? ', ' : ''}${value2.material} ${
              value2.ratio
            }%`;
          });
        }
      });
      return materialResult;
    },
    resize() {
      this.containerHeight = this.$refs.mySwiper.$el.offsetHeight;
    }
  },
  created() {
    this.basics = this.data.basics;
    this.details = this.data.details;
    this.images = this.data.images;
  },
  mounted() {
    this.resize();
  }
};
</script>
<style scoped lang="scss">
.modal-product-detail {
  padding: 20px;
}
.modal-content {
  margin-top: 15px;
}

.txt-modal-title {
  @include fontSize(15px);
  font-weight: 700;
}
.swiper {
  .swiper-container {
    background-color: #f5f5f5;
  }
  .swiper-item {
    text-align: center;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    img {
      width: 100%;
    }
  }
  .swiper-explain {
    @include fontSize(14px);
    width: 60%;
  }
}
.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  overflow: hidden;
  z-index: 10;
  .btn-close {
    cursor: pointer;
    display: block;
    width: 30px;
    height: 30px;
  }
  .icon-close {
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
}
</style>
