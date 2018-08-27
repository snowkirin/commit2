module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/assets/css/variables.scss";'
      }
    }
  },
  chainWebpack: config => {
		const svgRule = config.module.rule('svg');
		svgRule.uses.clear();
		// add replacement loader(s)
		svgRule
			.use('vue-svg-loader')
			.loader('vue-svg-loader');
	}
};
