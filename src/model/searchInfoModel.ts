

type SearchInfoConfig =  {
  // keywords:string[];
  title: string | null;
  searchType: string | null;
  searchTypeName: string | null;
  endpoint: string | null;
  email: string | null | undefined;
  auth: string | null | undefined;
  projectKey: string | null | undefined;
}

type SearchInfo = 
SearchInfoConfig & {
    isError: () => boolean;
    getErrorMessages: () => {[key:string]:string};
}

type SearchInfoKey = keyof SearchInfo;

type FixedSearchInfo = SearchInfo & {
  // null許可をなくす
  title: string;
  endpoint: string;
}

const isFixedSearchInfo = (arg:any):arg is FixedSearchInfo => {
  return typeof arg === "object" &&
  arg !== null &&
  typeof (arg as FixedSearchInfo).title === "string"
}

type baseInput = {
  value: string
}

type urlInput = baseInput & {
  inputType: 'url'
  prefix:'https://'
}

const defaultSearchInfo = (searchType?:string):SearchInfo => {
    return {
    title : null, 
    searchType: searchType || "other",
    searchTypeName: "その他",
    endpoint: null,
    email: null,
    auth: null,
    projectKey: undefined,
    isError() {
      return false
    },
    getErrorMessages() {
      return {}
    }
  }
}

const newSearchInfo:SearchInfo = {
  title: '新規作成',
  searchType: 'none',
  searchTypeName: '未設定',
  endpoint: null,
  email:null,
  auth: null,
  projectKey: null,
  isError() {
    return false
  },
  getErrorMessages() {
    return {}
  }
}

type Headers = {
  Accept?: string;
  Authorization?: string;
}

export type { SearchInfoConfig, SearchInfo, FixedSearchInfo, SearchInfoKey, urlInput, Headers}
export { isFixedSearchInfo, defaultSearchInfo, newSearchInfo };

