import { SearchInfo, FixedSearchInfo } from './searchInfoModel';
import { BacklogSearchInfo} from './backlogSearchInfo';
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
  confluence: new ConfluenceSearchInfo(),
  none: new BaseSearchInfo()
}

export type { SearchInfo, FixedSearchInfo, SearchInfoList, FixedSearchInfoList, SearchType };
export { searchInfoLists };