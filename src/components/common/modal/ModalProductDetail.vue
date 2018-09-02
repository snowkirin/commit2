<template>
  <div class="modal-product-detail">
    <div class="grid-flex">
      <div class="column column-side">
        <div class="list-thumb" id="listThumb">
          <template v-for="(data, idx) in images" >
            <div :key="idx" @click="clickSwiperMove(idx, $event)" class="item" :class="{selected: idx === 0}">
              <img :src="$common.ZulyImage()+data.image_path" alt="">
            </div>
          </template>
        </div>
      </div>
      <div class="column column-main w-55">
        <div>
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide v-for="(data, idx) in images" :key="idx">
              <img :src="$common.ZulyImage()+data.image_path" alt="">
            </swiper-slide>
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
            const thumbItem =thumbList.querySelectorAll('.item');
            _.forEach(thumbItem, (value) => {
              value.classList.remove('selected');
            })
            thumbList.querySelectorAll('.item')[this.activeIndex].classList.add('selected');
          }
        }
      },
      basics: {},
      details: {},
      images: [],
    };
  },
  methods: {
    clickSwiperMove(idx, event) {
      this.$refs.mySwiper.swiper.slideTo(idx);
      console.log(currentIndex);
    },
    activeSelected(idx) {
      if (idx === currentIndex) {
        return true;
      } else {
        return false;
      }
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

.item {
  &.selected {
    outline: 1px solid $color-primary;
  }
}

@media (min-width: 768px) {
  .column-side {
    display: block;
    flex-basis: 60px;
    max-width: 60px;
    margin-right: 15px;
  }
  .column-text {
    margin-left: 15px;
  }
}
</style>
