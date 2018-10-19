import { types } from 'mobx-state-tree';
import { CommonStore } from './commonStore';
import HeaderStore from './headerStore';
import SiderStore from './siderStore';
import Page1Store from './pages/page1Store';
import Page2Store from './pages/page2Store';
import FormExampleStore from './pages/formExampleStore';
import SimpleExampleStore from './pages/simpleExampleStore';
import Page3Store from './pages/page3Store';
import Page4Store from './pages/page4Store';
import Page5Store from './pages/page5Store';
import Page6Store from './pages/page6Store';
import Page7Store from './pages/page7Store';
import Page8Store from './pages/page8Store';
import Page9Store from './pages/page9Store';
import Page10Store from './pages/page10Store';
import Page11Store from './pages/page11Store';
import Page12Store from './pages/page12Store';
import Page13Store from './pages/page13Store';
import Page14Store from './pages/page14Store';
import Page15Store from './pages/page15Store';
import Page16Store from './pages/page16Store';
import Page17Store from './pages/page17Store';
import Page18Store from './pages/page18Store';
import Page19Store from './pages/page19Store';
import Page20Store from './pages/page20Store';
//{importStore}//

// prettier-ignore
const RootStore = types.model('RootStore', {
  common: types.optional(CommonStore, {}),

  header: types.optional(HeaderStore, {
    current: 0
  }),

  sider: types.optional(SiderStore, {
    isOpen: false,
    current: 'page1',
    menuData: [
      {
        type: 'group',
        index: 'Menu1_1',
        name: '一级菜单1',
        expanded: false,
        children: [
          {
            type: 'group',
            index: 'Menu2_1',
            name: '二级菜单1',
            expanded: false,
            children: [
              {
                type: 'item',
                level: 3,
                link: '/Page1',
                index: 'Page1',
                name: '页面1'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page2',
                index: 'Page2',
                name: '页面2'
              },
              {
                type: 'item',
                level: 3,
                link: '/FormExample',
                index: 'FormExample',
                name: '页面3'
              },
              {
                type: 'item',
                level: 3,
                link: '/SimpleExample',
                index: 'SimpleExample',
                name: '页面4'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page5',
                index: 'Page5',
                name: '页面5'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page6',
                index: 'Page6',
                name: '页面6'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page7',
                index: 'Page7',
                name: '页面7'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page8',
                index: 'Page8',
                name: '页面8'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page9',
                index: 'Page9',
                name: '页面9'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page10',
                index: 'Page10',
                name: '页面10'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page11',
                index: 'Page11',
                name: '页面11'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page12',
                index: 'Page12',
                name: '页面12'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page13',
                index: 'Page13',
                name: '页面13'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page14',
                index: 'Page14',
                name: '页面14'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page15',
                index: 'Page15',
                name: '页面15'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page16',
                index: 'Page16',
                name: '页面16'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page17',
                index: 'Page17',
                name: '页面17'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page18',
                index: 'Page18',
                name: '页面18'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page19',
                index: 'Page19',
                name: '页面19'
              },
              {
                type: 'item',
                level: 3,
                link: '/Page20',
                index: 'Page20',
                name: '页面20'
              }
            ]
          },
          // {
          //   type: 'group',
          //   index: 'Menu2_2',
          //   name: '二级菜单2',
          //   expanded: false,
          //   children: [
          //     {
          //       type: 'item',
          //       level: 3,
          //       link: '/FormExample',
          //       index: 'FormExample',
          //       name: '页面3'
          //     },
          //     {
          //       type: 'item',
          //       level: 3,
          //       link: '/SimpleExample',
          //       index: 'SimpleExample',
          //       name: '页面4'
          //     }
          //   ]
          // }
        ]
      },
      // {
      //   type: 'group',
      //   index: 'Menu1_2',
      //   name: '一级菜单2',
      //   expanded: false,
      //   children: [
      //     {
      //       type: 'group',
      //       index: 'Menu2_3',
      //       name: '二级菜单3',
      //       expanded: false,
      //       children: [
      //         {
      //           type: 'item',
      //           level: 3,
      //           link: '/Page5',
      //           index: 'Page5',
      //           name: '页面5'
      //         },
      //         {
      //           type: 'item',
      //           level: 3,
      //           link: '/Page6',
      //           index: 'Page6',
      //           name: '页面6'
      //         }
      //       ]
      //     },
      //     {
      //       type: 'group',
      //       index: 'Menu2_4',
      //       name: '二级菜单4',
      //       expanded: false,
      //       children: [
      //         {
      //           type: 'item',
      //           level: 3,
      //           link: '/Page7',
      //           index: 'Page7',
      //           name: '页面7'
      //         },
      //         {
      //           type: 'item',
      //           level: 3,
      //           link: '/Page8',
      //           index: 'Page8',
      //           name: '页面8'
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  }),

  page1: types.optional(Page1Store, {}),
  page2: types.optional(Page2Store, {}),
  formExample: types.optional(FormExampleStore, {}),
  simpleExample: types.optional(SimpleExampleStore, {}),
  page3: types.optional(Page3Store, {}),
  page4: types.optional(Page4Store, {}),
  page5: types.optional(Page5Store, {}),
  page6: types.optional(Page6Store, {}),
  page7: types.optional(Page7Store, {}),
  page8: types.optional(Page8Store, {}),
  page9: types.optional(Page9Store, {}),
  page10: types.optional(Page10Store, {}),
  page11: types.optional(Page11Store, {}),
  page12: types.optional(Page12Store, {}),
  page13: types.optional(Page13Store, {}),
  page14: types.optional(Page14Store, {}),
  page15: types.optional(Page15Store, {}),
  page16: types.optional(Page16Store, {}),
  page17: types.optional(Page17Store, {}),
  page18: types.optional(Page18Store, {}),
  page19: types.optional(Page19Store, {}),
  page20: types.optional(Page20Store, {}),
  //{pageStore}//
});

export default RootStore;