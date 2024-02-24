import { SearchInfo, FixedSearchInfo, defaultSearchInfo, newSearchInfo } from './searchInfoModel';
import { BacklogSearchInfo} from './backlogSearchInfo';
import { ConfluenceSearchInfo } from './confluenceSearchInfo';

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
  other: defaultSearchInfo(),
  none: newSearchInfo
}

export type { SearchInfo, FixedSearchInfo, SearchInfoList, FixedSearchInfoList, SearchType };
export { searchInfoLists };