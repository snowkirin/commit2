import Vue from 'vue';
import Router from 'vue-router';
import MainContent from '@/components/main/MainContent';
import StyleSurvey from '@/components/stylesurvey/survey';
<<<<<<< HEAD
import MyCloset from '@/components/closet/MyCloset';
import Join from '@/components/join/Join';
=======
>>>>>>> first commit

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
      path: '/join/',
      name: 'join',
      component: Join,
    },
    {
      path: '/mycloset/',
      name: 'myCloset',
      component: MyCloset,
    },
  ],
});
