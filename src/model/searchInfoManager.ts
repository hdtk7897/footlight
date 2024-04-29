import { FixedSearchInfo, SearchInfoConfig, isFixedSearchInfo } from './searchInfoModel';
import { FixedSearchInfoList } from './searchInfoListModel';

type StoredSearchInfo  = SearchInfoConfig & {
  auth: string;
  headers?:Headers
}

type SaveSearchInfo = {
  (searchInfo:FixedSearchInfo, key:string):void,
  (searchInfos:FixedSearchInfoList):void
}

export class SearchInfoManager {
  searchlists:FixedSearchInfoList = {}

  constructor() {
    // 非同期処理を使いたいのでinit()で初期化する
  }

  public static async init():Promise<SearchInfoManager> {
    const searchInfoManager = new SearchInfoManager()
    const storageResult = await this.getStorage('searchlist')
    searchInfoManager.searchlists = storageResult.searchlist
    return searchInfoManager
  }

  static getStorage = async(key?: string): Promise<any> => {
    return await chrome.storage.local.get(key)
  }

  truncateStorage = async() => {
    this.searchlists = {}
    await chrome.storage.local.clear()
  }

  hasSearchInfo = (key?:string):boolean => {
    if (!this.searchlists) return false
    if (!key) {
      return Object.keys(this.searchlists).length > 0
    }else {
      return this.searchlists[key] !== undefined
    }
  }
  
  getSearchInfo = (key:string):FixedSearchInfo => {
    return this.searchlists[key]
  }

  getSearchInfoList = ():{[value:string]: FixedSearchInfo} => {
    return this.searchlists
  }

  getSearchInfoKeys = ():string[] => {
    return Object.keys(this.searchlists)
  }

  payoutSearchInfoKey = ():string => {
    const searchInfoKeys = this.getSearchInfoKeys()
    if (searchInfoKeys.length === 0) return "1"
    const intSearchInfoKeys =  this.getSearchInfoKeys().map(str => parseInt(str, 10))
    const maxVal = Math.max(...intSearchInfoKeys) + 1
    console.log(`maxVal`, maxVal)
    return maxVal.toString()
  }

  addSearchInfo:SaveSearchInfo = async (searchInfo:FixedSearchInfo | FixedSearchInfoList) => {
    let searchInfos:FixedSearchInfoList = {}
    if (isFixedSearchInfo(searchInfo)){
      searchInfos["1"] = searchInfo
    }else {
      searchInfos = searchInfo
    }
    this.searchlists = {...this.searchlists, ...searchInfos}
    await chrome.storage.local.set({ searchlist: this.searchlists }, () => {
    });
  }

  updateSearchInfo = async (fixedSeachinfo:FixedSearchInfo, key:string) => {
    (async () => {
      this.searchlists[key] = fixedSeachinfo
      chrome.storage.local.set({ searchlist: this.searchlists }, () => {
      });
    })()
  }

  protected convertToStoreSearchInfo = (searchInfo:FixedSearchInfo):StoredSearchInfo => {
    return {
      title : searchInfo.title,
      searchType: searchInfo.searchType,
      searchTypeName: searchInfo.searchTypeName,
      endpoint: searchInfo.endpoint,
      email: searchInfo.email,
      projectKey: searchInfo.projectKey,
      auth: SearchInfoManager.convertStorageValue(searchInfo.auth), 
    }
  }

  protected static convertStorageValue = (value:any):string => {
    return value === undefined ? "undefined" : 
      value === null ? "null" : value
  }

  protected static convertSearchValue = (value:string):any => {
    return value === "undefined" ? undefined : 
      value === "null" ? null : value
  }
}


