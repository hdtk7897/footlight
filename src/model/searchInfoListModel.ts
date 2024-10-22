import { SearchInfo, FixedSearchInfo } from './searchInfoModel';
import { BacklogSearchInfo} from './backlogSearchInfo';
import { QiitaSearchInfo} from './qiitaSearchInfo';
import { ConfluenceSearchInfo } from './confluenceSearchInfo';
import { BaseSearchInfo } from './baseSearchInfo';

type FixedSearchInfoList = {
  [value: string]: FixedSearchInfo;
}

type SearchInfoList = {
  [value: string]: SearchInfo;
}

type SearchType =  keyof typeof searchInfoLists;

const searchInfoLists:SearchInfoList = {
  backlog: new BacklogSearchInfo(),
  qiita: new QiitaSearchInfo(),
  confluence: new ConfluenceSearchInfo(),
  none: new BaseSearchInfo()
}

const initSearchInfoAsSearchType = (_searchInfo:SearchInfo, initSearchType?:SearchType) => {
  // initSearchTypeが入っている場合は新規作成
  const searchType = initSearchType ?? _searchInfo?.searchType as SearchType ?? 'base'
  const searchInfo = initSearchType ? undefined : _searchInfo
  switch (searchType) {
    case 'backlog':
      return new BacklogSearchInfo(searchInfo)
    case 'confluence':
      return new ConfluenceSearchInfo(searchInfo)
    case 'qiita':
      return new QiitaSearchInfo(searchInfo)
    default:
      return new BaseSearchInfo(searchInfo)
  }
}


export type { SearchInfo, FixedSearchInfo, SearchInfoList, FixedSearchInfoList, SearchType };
export { searchInfoLists, initSearchInfoAsSearchType };