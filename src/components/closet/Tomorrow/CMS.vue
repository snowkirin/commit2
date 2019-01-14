<template>
  <div class="cms" v-if="dataExist && dateValid">
    <div class="cms-base" :style="{ backgroundColor: cmsData.banner_color }">
      <div class="cms-overlay" v-if="false"></div>
      <div class="cms-container">
        <div
          class="cms-title"
          @click="showContent = !showContent"
          :style="{ backgroundColor: cmsData.banner_color }"
        >
          <p
            :style="{ color: cmsData.banner_text_color }"
          >
            {{ cmsData.banner_text }}
          </p>
        </div>
        <transition name="slideDown">
          <div
            v-if="showContent"
            class="cms-content"
            :style="{ backgroundColor: cmsData.banner_color }"
          >
            <div>
              <div @click="goToLink">
                <img
                  :src="$common.ZulyImage() + cmsData.main_image_path"
                  alt=""
                />
              </div>
            </div>
            <button
              type="button"
              @click="showContent = false"
              class="btn-close"
            >
              닫기
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import SubscriptionAPI from '@/library/api/subscriptions';
export default {
  name: 'CMS',
  data() {
    return {
      cmsData: {},
      showContent: false,
      dataExist: false,
      dateValid: false,
    };
  },
  computed: {
    ...mapGetters({
      isTomorrowDirect: 'subscriptions/isTomorrowDirect',
      TomorrowDirectMemberId: 'subscriptions/TomorrowDirectMemberId'
    }),

  },
  methods: {
    goToLink() {
      const { link_url: linkUrl, external_link: externalLink } = this.cmsData;
      if (externalLink === 'N') {
        //  내부 경로일경우
        this.$router.push({ path: linkUrl });
      } else {
        //  외부 경로일경우
        window.open(linkUrl, '_blank');
        // example: '//www.naver.com' 또는 'https://www.naver.com' 이렇게 적어줘야 함.
      }
      this.showContent = false;
    },
    parseISO(s) {
      // ISO => UTC
      s = s.split(/\D/);
      return new Date(Date.UTC(s[0], --s[1], s[2], s[3], s[4], s[5], s[6]));
    },
    dateValidCheck() {
      const currentDate = new Date();
      const startDate = this.parseISO(this.cmsData.start_datetime);
      const endDate = this.parseISO(this.cmsData.end_datetime);
      if (startDate < currentDate) {
        this.dateValid = endDate >= currentDate;
      } else {
        this.dateValid = false;
      }
    },

  },
  async mounted() {
    let resultData;
    if (this.isTomorrowDirect) {
      resultData = await SubscriptionAPI.GetCMS(this.TomorrowDirectMemberId);
    } else {
      resultData = await SubscriptionAPI.GetCMS();
    }
    if (resultData.data.result) {
      this.dataExist = true;
      this.cmsData = resultData.data.data;
      this.dateValidCheck();
    }
  }
};
</script>

<style scoped lang="scss">
.slideDown-enter-active {
}
.slideDown-leave-active {
}
.cms {
  &-base {
    position: relative;
    z-index: 9999;
    @include mobile {
      margin: {
        top: -30px;
        left: -20px;
        right: -20px;
        bottom: 30px;
      }
    }
    @include tablet {
      margin: {
        top: -40px;
        left: 0;
        right: 0;
        bottom: 40px;
      }
    }
    @include desktop {
      margin: {
        top: -40px;
        bottom: 40px;
      }
    }
  }
  &-title {
    @include fontSize(15px);
    padding: 16px 0;
    text-align: center;
    cursor: pointer;
  }
  &-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    cursor: pointer;
    @include tablet {
      display: none;
    }
  }
  &-container {
    position: relative;
  }
  &-content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30px 15px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    img {
      max-width: 100%;
    }
  }
  .btn-close {
    position: absolute;
    right: 10px;
    top: 10px;
    border: 0;
    width: 15px;
    height: 15px;
    background: url('~@/assets/img/main/btn_close.svg') no-repeat 0 0;
    background-size: cover;
    overflow: hidden;
    text-indent: -9999px;
    cursor: pointer;
  }
}
</style>
