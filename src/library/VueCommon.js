const VueCommon = {};

VueCommon.install = (Vue) => {
  const vue = Vue;
  vue.prototype.$common = {
    // 공통 세션체크 함수
    sessionCheck($router, $session) {
      if (!$session.exists()) {
        if (document.cookie.match(new RegExp('access_token=([^;]+)'))[1]) {
          $session.start();
        } else if ($router.history.current.name !== 'login') {
          alert('로그인 연결이 끊겼습니다.\n로그인 페이지로 이동합니다.');
          $router.push({ path: '/login' });
        }
      }
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
  };
};

export default VueCommon;
