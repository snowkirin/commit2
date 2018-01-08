import Vue from 'vue';
import Router from 'vue-router';
import MainContent from '@/components/main/MainContent';
import StyleSurvey from '@/components/stylesurvey/survey';
import MyCloset from '@/components/closet/MyCloset';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'index',
      component: MainContent,
    },
    {
      path: '/stylesurvey/',
      name: 'stylesurvey',
      component: StyleSurvey,
      children: [
        { path: ':id', component: StyleSurvey },
      ],
    },
    {
      path: '/mycloset/',
      name: 'myCloset',
      component: MyCloset,
    },
  ],
});
