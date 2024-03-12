import { RefArticles, RefInfo } from '../model/refInfo';
import { FixedSearchInfo } from '../model/searchInfoModel';
import { FixedSearchInfoList } from '../model/searchInfoListModel';
import { SearchInfoManager } from '../model/searchInfoManager';
import { ConfluenceRefInfo } from '../model/confluenceRefInfo';
import { shapeKeywords } from '../util';

chrome.runtime.onInstalled.addListener(async () => {
  console.log('installed');
  let config: FixedSearchInfoList = {}
  try {
    // ローカルに設定情報があれば読み込む
    const configlist = await (
      await fetch(chrome.runtime.getURL('local.config.json'))
    ).json()
    if (configlist && configlist['searchlist']){
      config = configlist['searchlist'] as FixedSearchInfoList
    }
  } catch (e:unknown) {
    console.log(`${typeof (e)} ${Object.prototype.toString.call(e)}`);
  }

  if (config) {
    const seachInfoManager = await SearchInfoManager.init()
    if (seachInfoManager.hasSearchInfo()){
      console.log(`already exists`)
      // return
    }
    await seachInfoManager.truncateStorage()
    await seachInfoManager.addSearchInfo(config)
    
  }
});

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    asyncCallApi(request, sender, sendResponse)
    return true;
  },
);

const asyncCallApi = 
 async (request:any, _sender: chrome.runtime.MessageSender, sendResponse: (response?: any) => void)  => {
  const keywords:string[] = shapeKeywords(request as string);
  const seachInfoManager = await SearchInfoManager.init()
  const searchlist:{[value:string]: FixedSearchInfo} = seachInfoManager.getSearchInfoList()

  if (searchlist) {
    // 参照先ごとにAPIを呼び出す
    for (let i in searchlist){
      const apitype = searchlist[i].searchType
      let ref:RefInfo
      switch(apitype){
        case 'confluence':
          console.log(`confluence`)
          ref = new ConfluenceRefInfo(searchlist[i])
          break
        default:
          return
      }

      const result:RefArticles = await ref.callApi(keywords)
      sendResponse(result)
    }
  }
}