import types from './join.mutations';

export default {
  SaveJoinData(context, type, payload) {
    console.log(type, payload);
    switch (type) {
      case 'size-info':
        context.commit(types.SAVE_SIZE_DATA, payload);
        break;
      case 'preferred-style':
        context.commit(types.SAVE_PREFERRED_STYLE_DATA, payload);
        break;
      case 'user-info':
        context.commit(types.SAVE_USER_INFO_DATA, payload);
        break;
      default:
        alert('Nothing');
    }
  }
}
