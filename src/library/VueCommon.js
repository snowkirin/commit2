const VueCommon = {};

VueCommon.install = (Vue) => {
  const vue = Vue;
  vue.prototype.$common = {
    // 세션체크
    sessionCheck($router, $store) {
      if ($store.state.login.Authentication.authenticated) $router.push({ path: '/closet' });
    },

    appendJS(URL) {
      const htmlScript = document.createElement('script');
      htmlScript.setAttribute('src', URL);
      document.head.appendChild(htmlScript);
    },
    appendCSS(URL) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = URL;
      link.media = 'all';
      document.head.appendChild(link);
    },

    // 엔터키이벤트
    submitEvt(evt, callback) {
      if (evt.keyCode === 13) callback();
    },

    NumberValidateEvt(evt) {
      const allowKeyCode = [8, 9, 37, 38, 39, 40, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];
      const theEvent = evt || window.event;
      let key = theEvent.keyCode || theEvent.which;
      if (allowKeyCode.includes(key)) return true;
      key = String.fromCharCode(key);
      const regex = /[0-9]|\./;
      if (!regex.test(key)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
      }

      return false;
    },

    // Validation Check
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

    dataValidation(data, msg) {
      if (!data) {
        alert(msg);
        return false;
      }
      return true;
    },

    phoneValidation(data) {
      const regPhone = /^((01[1|6|7|8|9])[1-9]+[0-9]{6,7})|(010[1-9][0-9]{7})$/;
      const phone = data.split('-').join('');

      return regPhone.test(phone);
    },

    dotdotdot(obj, height) {
      const target = obj;
      const text = target.textContent;

      for (let i = 0; i < text.length; i += 1) {
        if (target.offsetHeight > height) {
          target.textContent = `${text.substring(0, (text.length - i - 1))} ...`;
        } else break;
      }
    },
  };
};

export default VueCommon;
