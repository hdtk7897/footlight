import { Article, RefArticles } from '../model/refInfo' 
import ReactDOM from 'react-dom';
import { getParam, bSubstr } from '../util';

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
  const rcntDom:HTMLElement|null = document.querySelector<HTMLElement>('#rcnt')
  const rhsDom:HTMLElement|null = document.querySelector<HTMLElement>('#rhs')
  const summaryObj:HTMLDivElement = document.createElement('div')
  const resultObj:HTMLDivElement = document.createElement('div')
  if(rhsDom){
    rhsDom.appendChild(summaryObj)
    rhsDom.appendChild(resultObj)

  }else if (rcntDom){
    const newRhsDom:HTMLDivElement = document.createElement('div')
    newRhsDom.setAttribute("id", "rhs");
    newRhsDom.prepend(summaryObj)
    newRhsDom.appendChild(resultObj)
    rcntDom.appendChild(newRhsDom)

  }

  const ResultSummary = () => {
    return (
      <div>
          {refarticles.title}に{articles.length}件の検索結果があります
      </div>
    );
  }
  ReactDOM.render(<ResultSummary />, summaryObj);

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
      <div>
        {items}
      </div>
    )
  }
  ReactDOM.render(<ResultObj />, resultObj);
}

execute()
