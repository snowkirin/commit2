const VueGlobalConst = {};

VueGlobalConst.install = Vue => {
  Vue.prototype.$const = {
    INQUIRIES_NORMAL: "11901",
    INQUIRIES_SUBSCRIBE: "11902",
    INQUIRIES_ORDER: "11903",
    INQUIRIES_DELIVERY: "11904",
    STYLE_NATURAL: "13501",
    STYLE_UNIQUE: "13502",
    STYLE_CLASSIC: "13503",
    STYLE_FEMININE: "13504",
    STYLE_MODERN: "13505",
    MANAGEMENT_MATERIAL: "10200",
    MANAGEMENT_PATTERN: "10300"
  };
};

export default VueGlobalConst;
