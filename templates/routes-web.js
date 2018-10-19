<#-template name="importLoadPage">
import load#{pageName | pascal}# from 'bundle-loader?lazy&name=[name]!./src/web/pages/#{pageName}#/#{pageName}##{!exName ?: ('.jsx', exName)}#';
//{importLoadPage}//
</#-template>

<#-template name="loadPage">
load#{pageName | pascal}#,
  //{loadPage}//
</#-template>

<#-template name="pageComponent">
/**
 * 页面#{pageName}#
 */
const #{pageName | pascal}# = inject('store')(
  observer(({ store }) => (
    <PageWrap>
      <Bundle load={load#{pageName | pascal}#} store={store} isPc loadBundles={loadBundles}>
        {(_#{pageName | pascal}#) => {
          const #{pageName | pascal}# = withRouter(_#{pageName | pascal}#);
          return <#{pageName | pascal}# />;
        }}
      </Bundle>
    </PageWrap>
  ))
);

//{pageComponent}//
</#-template>

<#-template name="route">
__extraComment__*/}
    <Route exact path="/#{pageName | pascal}#" component={#{pageName | pascal}#} />
    {/*//{route}//
</#-template>

<#-template name="clearRegex">
\{\/\*__extraComment__\*\/\}
</#-template>