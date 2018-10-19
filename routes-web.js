import React from 'react';
import Bundle from './Bundle';
import { withRouter, Redirect } from 'react-router';
import { Switch, Route } from 'react-router-dom';
import { observer, Provider, inject } from 'mobx-react';
import loadPage1 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page1/page1.jsx';
import loadPage2 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page2/page2.jsx';
import loadFormExample from 'bundle-loader?lazy&name=[name]!./src/web/pages/formExample/formExample.jsx';
import loadSimpleExample from 'bundle-loader?lazy&name=[name]!./src/web/pages/simpleExample/simpleExample.jsx';
import loadPage3 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page3/page3.jsx';
import loadPage4 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page4/page4.jsx';
import loadPage5 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page5/page5.jsx';
import loadPage6 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page6/page6.jsx';
import loadPage7 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page7/page7.jsx';
import loadPage8 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page8/page8.jsx';
import loadPage9 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page9/page9.jsx';
import loadPage10 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page10/page10.jsx';
import loadPage11 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page11/page11.jsx';
import loadPage12 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page12/page12.jsx';
import loadPage13 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page13/page13.jsx';
import loadPage14 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page14/page14.jsx';
import loadPage15 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page15/page15.jsx';
import loadPage16 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page16/page16.jsx';
import loadPage17 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page17/page17.jsx';
import loadPage18 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page18/page18.jsx';
import loadPage19 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page19/page19.jsx';
import loadPage20 from 'bundle-loader?lazy&name=[name]!./src/web/pages/page20/page20.jsx';
//{importLoadPage}//

// prettier-ignore
const loadBundles = {
  loadPage1,
  loadPage2,
  loadFormExample,
  loadSimpleExample,
  loadPage3,
  loadPage4,
  loadPage5,
  loadPage6,
  loadPage7,
  loadPage8,
  loadPage9,
  loadPage10,
  loadPage11,
  loadPage12,
  loadPage13,
  loadPage14,
  loadPage15,
  loadPage16,
  loadPage17,
  loadPage18,
  loadPage19,
  loadPage20,
  //{loadPage}//
};

/**
 * 页面page1
 */
const Page1 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage1} store={store} isPc loadBundles={loadBundles}>
        {_Page1 => {
          const Page1 = withRouter(_Page1);
          return <Page1 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page2
 */
const Page2 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage2} store={store} isPc loadBundles={loadBundles}>
        {_Page2 => {
          const Page2 = withRouter(_Page2);
          return <Page2 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面formExample
 */
const FormExample = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadFormExample} store={store} isPc loadBundles={loadBundles}>
        {_FormExample => {
          const FormExample = withRouter(_FormExample);
          return <FormExample />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面simpleExample
 */
const SimpleExample = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadSimpleExample} store={store} isPc loadBundles={loadBundles}>
        {(_SimpleExample) => {
          const SimpleExample = withRouter(_SimpleExample);
          return <SimpleExample />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page3
 */
const Page3 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage3} store={store} isPc loadBundles={loadBundles}>
        {(_Page3) => {
          const Page3 = withRouter(_Page3);
          return <Page3 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page4
 */
const Page4 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage4} store={store} isPc loadBundles={loadBundles}>
        {(_Page4) => {
          const Page4 = withRouter(_Page4);
          return <Page4 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page5
 */
const Page5 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage5} store={store} isPc loadBundles={loadBundles}>
        {(_Page5) => {
          const Page5 = withRouter(_Page5);
          return <Page5 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page6
 */
const Page6 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage6} store={store} isPc loadBundles={loadBundles}>
        {(_Page6) => {
          const Page6 = withRouter(_Page6);
          return <Page6 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page7
 */
const Page7 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage7} store={store} isPc loadBundles={loadBundles}>
        {(_Page7) => {
          const Page7 = withRouter(_Page7);
          return <Page7 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page8
 */
const Page8 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage8} store={store} isPc loadBundles={loadBundles}>
        {(_Page8) => {
          const Page8 = withRouter(_Page8);
          return <Page8 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page9
 */
const Page9 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage9} store={store} isPc loadBundles={loadBundles}>
        {(_Page9) => {
          const Page9 = withRouter(_Page9);
          return <Page9 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page10
 */
const Page10 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage10} store={store} isPc loadBundles={loadBundles}>
        {(_Page10) => {
          const Page10 = withRouter(_Page10);
          return <Page10 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page11
 */
const Page11 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage11} store={store} isPc loadBundles={loadBundles}>
        {(_Page11) => {
          const Page11 = withRouter(_Page11);
          return <Page11 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page12
 */
const Page12 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage12} store={store} isPc loadBundles={loadBundles}>
        {(_Page12) => {
          const Page12 = withRouter(_Page12);
          return <Page12 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page13
 */
const Page13 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage13} store={store} isPc loadBundles={loadBundles}>
        {(_Page13) => {
          const Page13 = withRouter(_Page13);
          return <Page13 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page14
 */
const Page14 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage14} store={store} isPc loadBundles={loadBundles}>
        {(_Page14) => {
          const Page14 = withRouter(_Page14);
          return <Page14 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page15
 */
const Page15 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage15} store={store} isPc loadBundles={loadBundles}>
        {(_Page15) => {
          const Page15 = withRouter(_Page15);
          return <Page15 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page16
 */
const Page16 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage16} store={store} isPc loadBundles={loadBundles}>
        {(_Page16) => {
          const Page16 = withRouter(_Page16);
          return <Page16 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page17
 */
const Page17 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage17} store={store} isPc loadBundles={loadBundles}>
        {(_Page17) => {
          const Page17 = withRouter(_Page17);
          return <Page17 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page18
 */
const Page18 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage18} store={store} isPc loadBundles={loadBundles}>
        {(_Page18) => {
          const Page18 = withRouter(_Page18);
          return <Page18 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page19
 */
const Page19 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage19} store={store} isPc loadBundles={loadBundles}>
        {(_Page19) => {
          const Page19 = withRouter(_Page19);
          return <Page19 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

/**
 * 页面page20
 */
const Page20 = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={loadPage20} store={store} isPc loadBundles={loadBundles}>
        {(_Page20) => {
          const Page20 = withRouter(_Page20);
          return <Page20 />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

//{pageComponent}//

const PageWrap = inject('store')(
  observer(({ store, children }) => (
    <div id="page-wrap" className={store.sider.isOpen ? 'isMenuOpen' : ''}>
      {children}
    </div>
  ))
);

const routes = () => (
  <Switch>
    <Route exact path="/" component={Page1} />
    <Route exact path="/Page1" component={Page1} />
    <Route exact path="/Page2" component={Page2} />
    <Route exact path="/FormExample" component={FormExample} />
    <Route exact path="/SimpleExample" component={SimpleExample} />
    
    <Route exact path="/Page3" component={Page3} />
    
    <Route exact path="/Page4" component={Page4} />
    
    <Route exact path="/Page5" component={Page5} />
    
    <Route exact path="/Page6" component={Page6} />
    
    <Route exact path="/Page7" component={Page7} />
    
    <Route exact path="/Page8" component={Page8} />
    
    <Route exact path="/Page9" component={Page9} />
    
    <Route exact path="/Page10" component={Page10} />
    
    <Route exact path="/Page11" component={Page11} />
    
    <Route exact path="/Page12" component={Page12} />
    
    <Route exact path="/Page13" component={Page13} />
    
    <Route exact path="/Page14" component={Page14} />
    
    <Route exact path="/Page15" component={Page15} />
    
    <Route exact path="/Page16" component={Page16} />
    
    <Route exact path="/Page17" component={Page17} />
    
    <Route exact path="/Page18" component={Page18} />
    
    <Route exact path="/Page19" component={Page19} />
    
    <Route exact path="/Page20" component={Page20} />
    {/*//{route}//*/}
    <Redirect from="*" to="/" />
  </Switch>
);

export default routes;