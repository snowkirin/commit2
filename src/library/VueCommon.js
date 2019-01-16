const VueCommon = {};

VueCommon.install = Vue => {
  Vue.prototype.$common = {
    /* [ Function ] */
    /**
     * @return {string}
     */
    IMAGEURL() {
      return process.env.VUE_APP_API_IMAGE_URL + 'medium/';
    },
    IMAGE_NOT_EXIST(event, height = '100%') {
      event.target.src = this.DEFAULT_IMAGE();
      event.target.style.height = height;
    },
    /**
     * @return {string}
     */
    DEFAULT_IMAGE() {
      return `${require('@/assets/img/no-image.svg')}`;
    },
    ZulyImage(data) {
      let imageSize = '';
      if (!data) {
        imageSize = 'medium/';
      } else {
        if (data < 200) {
          imageSize = '';
        } else if (data < 600) {
          imageSize = 'small/';
        } else if (data < 1000) {
          imageSize = 'medium/';
        } else {
          imageSize = 'large/';
        }
      }
      /** @namespace process.env.VUE_APP_API_IMAGE_URL */
      return process.env.VUE_APP_API_IMAGE_URL + imageSize;
    },

    /**
     * @return {boolean}
     */
    InputDataValidation(target, msg, focus, email = false) {
      if (!target) {
        alert(msg);
        return false;
      }
      if (!target.value) {
        alert(msg);
        if (focus) target.focus();
        return false;
      }
      if (email) {
        const emRegex = /\S+@\S+\.\S+/;
        if (!emRegex.test(target.value)) {
          alert('정확한 메일주소를 입력해주세요.');
          if (focus) target.focus();
          return false;
        }
      }
      return true;
    },
    phoneValidation(data) {
      const regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
      const phone = data.split('-').join('');

      return regPhone.test(phone);
    },
    /* [ Variable ] */
    // 경고창 옵션
    dialogAlertOptions: {
      okText: '확인',
      customClass: 'zuly-alert',
      backdropClose: true
    }
  };
};

export default VueCommon;
