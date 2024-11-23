import { Article, RefArticles } from '../model/refInfo' 
import { getParam, bSubstr } from '../util';
import { createRoot } from 'react-dom/client';
import { Tabs, Tab } from "./tabs";
import '../../tailwind.min.js'
import '../css/content.css'

const descriptionLength = 100

const execute = async () => {
  const searchKeyword : string | null = getParam('q', location.search)
  if (!searchKeyword) return
  let refarticles:RefArticles = await awaitSendMessage(searchKeyword);
  attachResult(refarticles)
};

// バックグラウンド呼び出し
const awaitSendMessage = (payLoad:any): Promise<RefArticles> => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(payLoad, function(response:RefArticles) {
      resolve(response)
    });
  });
};

// 検索結果を表示する
const attachResult = (refarticles:RefArticles) => {
  if (!refarticles) return
  const articles:Article[] = refarticles.articles
  if (articles.length < 1) return
  
  const centerColumnDom:HTMLElement|null = document.querySelector<HTMLElement>('#center_col')
  const resultObj:HTMLDivElement = document.createElement('div')
  // console.log('centerColumnDom', centerColumnDom)
  centerColumnDom?.parentElement?.insertBefore(resultObj, centerColumnDom.nextSibling)

  const ResultObj = () => {
    const items : JSX.Element[]  = []
    articles.forEach(element => {
      items.push(
        <div>
          <div>
            <a href={element.url}>
            <br/>
              <h3><span>{element.headline}</span></h3>
            </a>
          </div>
          <div>
            {bSubstr(element.description, descriptionLength, '...')}
          </div>
        </div>
      )
    })



    return (
      <>
        <div id="rhs" className='temp-box'>
          <div>
            {refarticles.title}に{articles.length}件の検索結果があります

            <Tabs>
              <Tab label="Tab 1">
                <div>
                  {items}
                </div>
              </Tab>
              <Tab label="Tab 2">
                <div>
                  {items}
                </div>
              </Tab>
              <Tab label="Tab 3">
                <div>
                  {items}
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </>
    );
  };
  

  const result = createRoot(resultObj);
  result.render(<ResultObj />);
}


execute()
