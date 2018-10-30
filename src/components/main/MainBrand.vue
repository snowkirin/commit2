<template>
  <div class="contents">
    <div class="contents-header">
      <h3>BRANDS WE LOVE</h3>
      <p>주요 브랜드</p>
    </div>
    <div class="content">
      <ul class="list-brand">
        <li class="item">
          <img
            src="@/assets/img/main/brand_among.jpg"
            alt="among"
            @click="openPopup('among')"
          />
        </li>
        <li class="item">
          <img
            src="@/assets/img/main/brand_atre.jpg"
            alt="ATRE"
            @click="openPopup('atre')"
          />
        </li>
        <li class="item">
          <img
            src="@/assets/img/main/brand_ines.jpg"
            alt="INES"
            @click="openPopup('ines')"
          />
        </li>
        <li class="item">
          <img
            src="@/assets/img/main/brand_kindersalmon.jpg"
            alt="KINDERSALMON"
            @click="openPopup('kinder')"
          />
        </li>
        <li class="item">
          <img
            src="@/assets/img/main/brand_maison.jpg"
            alt="Maison de Ines"
            @click="openPopup('maison')"
          />
        </li>
        <li class="item">
          <img
            src="@/assets/img/main/brand_rocketxlunch.jpg"
            alt="ROCKET X LUNCH"
            @click="openPopup('rocket')"
          />
        </li>
        <li class="item">
          <img
            src="@/assets/img/main/brand_wnderkammerp.jpg"
            alt="WNDERKAMMER"
            @click="openPopup('wnderkammer')"
          />
        </li>
        <li class="item">
          <img
            src="@/assets/img/main/brand_youness.jpg"
            alt="YOUNESS"
            @click="openPopup('youness')"
          />
        </li>
      </ul>
    </div>

    <modal
      v-for="(data, idx) in brandData"
      :key="idx"
      :name="data.name"
      height="auto"
      :scrollable="true"
    >
      <div class="modal-content">
        <div class="modal-header">
          <p class="txt-brand-title">{{data.title}}</p>
          <p class="txt-brand-desc">{{data.desc}}</p>
        </div>
        <div>
          <swiper :options="swiperOption">
            <swiper-slide v-for="(imageData, imageIdx) in data.image" :key="imageIdx">
              <img :data-src="imageData.path" class="swiper-lazy">
              <div class="swiper-lazy-preloader"></div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </div>
        <div class="modal-close">
          <a class="btn-close" @click="$modal.hide(data.name)">
            <span class="icon-close"></span>
          </a>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';

export default {
  name: 'MainBrand',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 2,
        spaceBetween: 0,
        lazy: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        breakpoints: {
          1080: {
            slidesPerView: 1,
            spaceBetween: 0
          }
        }
      },
      brandData: [
        {
          name: 'among',
          title: '어몽',
          desc:
            'AMONG(어몽)은 옷을 입는 당신과, 당신을 보는 타인과, 옷을 만드는 우리, 그 사이의 조화로운 관계에 대해서 생각한다.',
          image: [
            {
              path: 'http://image.zuly.co.kr/resource/among-02/01.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/among-02/02.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/among-02/03.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/among-02/04.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/among-02/05.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/among-02/06.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/among-02/07.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/among-02/08.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/among-02/09.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/among-02/10.jpg'
            }
          ]
        },
        {
          name: 'atre',
          title: '아트레',
          desc:
            'ATRE(아트레)는 여유롭고 편안한 감성으로 심플하지만 노멀하지 않은, 실용적이지만 고급스러운, 어디에서나 돋보이는 여성을 지향한다.',
          image: [
            {
              path: 'http://image.zuly.co.kr/resource/atre/01.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/atre/02.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/atre/03.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/atre/04.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/atre/05.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/atre/06.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/atre/07.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/atre/08.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/atre/09.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/atre/10.jpg'
            }
          ]
        },
        {
          name: 'ines',
          title: '이네스',
          desc:
            'INES(이네스)는 메종 드 이네스의 세컨드 라벨로 조금은 더 사랑스럽고 캐주얼한 디자인으로 여성들에게 한발 더 다가서고자 하는 브랜드이다.',
          image: [
            {
              path: 'http://image.zuly.co.kr/resource/ines/01.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/ines/02.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/ines/03.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/ines/04.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/ines/05.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/ines/06.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/ines/07.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/ines/08.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/ines/09.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/ines/10.jpg'
            }
          ]
        },
        {
          name: 'kinder',
          title: '킨더살몬',
          desc:
            'KINDERSALMON(킨더살몬)은 새롭고 차별화된 감각과 세심한디테일, 정교한 마무리 그리고 편안함을 원칙으로 제품을 제작하고 있다.',
          image: [
            {
              path: 'http://image.zuly.co.kr/resource/kinder-02/01.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/kinder-02/02.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/kinder-02/03.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/kinder-02/04.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/kinder-02/05.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/kinder-02/06.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/kinder-02/07.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/kinder-02/08.jpg'
            }
          ]
        },
        {
          name: 'maison',
          title: '메종드이네스',
          desc:
            'MAISONDEINES(메종드이네스)는 2012년 SS collection을 시작으로 새롭게 론칭한 브랜드이다. 섬세한 디테일을 잃지않는 세심한 배려를 담아 표현하는 디자이너 브랜드이다.',
          image: [
            {
              path: 'http://image.zuly.co.kr/resource/maison/01.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/maison/02.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/maison/03.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/maison/04.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/maison/05.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/maison/06.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/maison/07.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/maison/08.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/maison/09.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/maison/10.jpg'
            }
          ]
        },
        {
          name: 'rocket',
          title: '로켓런치',
          desc:
            'ROCKET X LUNCH(로켓런치)는 우진원 디자이너의 브랜드 로켓 런치는 로고가 없어도 컬러 배색과 디자인만으로도 식별할 수 있도록 디자인된 브랜드이다.',
          image: [
            {
              path: 'http://image.zuly.co.kr/resource/rocket-02/01.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/rocket-02/02.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/rocket-02/03.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/rocket-02/04.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/rocket-02/05.jpg'
            }
          ]
        },
        {
          name: 'wnderkammer',
          title: '분더캄머',
          desc:
            'WNDERKAMMER(분더캄머) 브랜드 분더캄머는 자극적이지도 도발적이지도 않으며 꾸밈이 없는 자연스러움을 강조하고자 하는 브랜드이다.',
          image: [
            {
              path: 'http://image.zuly.co.kr/resource/wnderkammer/01.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/wnderkammer/02.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/wnderkammer/03.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/wnderkammer/04.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/wnderkammer/05.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/wnderkammer/06.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/wnderkammer/07.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/wnderkammer/08.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/wnderkammer/09.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/wnderkammer/10.jpg'
            }
          ]
        },
        {
          name: 'youness',
          title: '유니스',
          desc:
            '셔츠 뮤지엄 유니스는 여성의 셔츠와 블라우스를 전문으로 하는 브랜드다. 작품을 만들듯 정성을 다한 제품을 매번 다른 테마에 맞추어 선보인다.',
          image: [
            {
              path: 'http://image.zuly.co.kr/resource/youness/01.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/youness/02.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/youness/03.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/youness/04.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/youness/05.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/youness/06.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/youness/07.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/youness/08.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/youness/09.jpg'
            },
            {
              path: 'http://image.zuly.co.kr/resource/youness/10.jpg'
            }
          ]
        }
      ]
    };
  },
  methods: {
    openPopup(params) {
      if (params) {
        this.$modal.show(params);
      }
    }
  }
};
</script>

<style scoped lang="scss" src="@/assets/css/main-style.scss">
</style>
<style lang="scss" scoped>
  /deep/ .v--modal-overlay .v--modal-box {
  }
  /deep/ .swiper-lazy-preloader {
    position: relative;
    margin-top: 0;
    width: 30px;
    height: 30px;
  }
/deep/ .v--modal {
  max-width: 350px;
}
.modal-content {
  padding: 13px 20px 20px 20px;
  position: relative;
  .modal-header {
    margin-bottom: 15px;
  }
  .txt-brand-title {
    @include fontSize(15px);
    font-weight: 700;
    color: #3d3d35;
  }
  .txt-brand-desc {
    @include fontSize(12px);
    color: #797979;
    margin-top: 10px;
  }
}
.swiper-slide {
  img {
    max-width: 310px;
    max-height: calc(100vh - 150px);
  }
}

.modal-close {
  position: absolute;
  top: 10px;
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
    width: 25px;
    height: 25px;
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
.contents {
  background-color: #f7f7f7;
  padding-bottom: 45px;
}

.list-brand {
  display: flex;
  flex-wrap: wrap;
  margin-top: -10px;
  .item {
    flex: 0 0 calc(50% - (11px / 2));
    max-width: calc(50% - (11px / 2));
    margin-top: 10px;
    cursor: pointer;
    img {
      width: 100%;
    }
    &:nth-child(even) {
      margin-left: 11px;
    }
  }
}

@media (max-width: 370px) {
  .swiper-slide {
  }
  .swiper-slide img {

  }
}

@media (min-width: 1080px) {
  /deep/ .v--modal {
    max-width: 584px;
  }
  /deep/ .v--modal-overlay {
    background-color: transparent;
  }
  .swiper-slide {
    img {
      width: 271px;
    }
  }
  .contents {
    padding-bottom: 65px;
  }
  .list-brand {
    width: 1080px;
    margin: -20px auto 0;

    .item {
      flex: 0 0 calc(25% - ((24px * 3) / 4));
      max-width: 25%;
      margin-top: 20px;

      &:not(:nth-child(4n + 1)) {
        margin-left: 24px;
      }
    }
  }
  .modal-content {
    .txt-brand-desc {
      @include fontSize(14px);
    }
  }
}
</style>
