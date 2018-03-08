export default {
  setListProc(selList, dataList, imgKey) {
    if (selList.has(imgKey)) {
      selList.delete(imgKey);
      dataList[dataList.findIndex(el => el.key === imgKey)].selected = false;
    } else {
      selList.add(imgKey);
      dataList[dataList.findIndex(el => el.key === imgKey)].selected = true;
    }
  },
  setActiveMenu(state, activeMenuText, activeMenuValue) {
    state.default = activeMenuText;
    state.nav[activeMenuValue] = true;
  },

  openPopupCenter(url, title, w, h) {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

    let width = 0;
    if (window.innerWidth) width = window.innerWidth;
    else if (document.documentElement.clientWidth) width = document.documentElement.clientWidth;
    else width = screen.width;

    let height = 0;
    if (window.innerHeight) height = window.innerHeight;
    else if (document.documentElement.clientHeight) height = document.documentElement.clientHeight;
    else height = screen.height;

    const left = ((width / 2) - (w / 2)) + dualScreenLeft;
    const top = ((height / 2) - (h / 2)) + dualScreenTop;
    const newWindow = window.open(url, title, `scrollbars=yes, width=${w}, height=${h}, top=${top}, left=${left}`);

    if (window.focus) {
      newWindow.focus();
    }
  },
};
