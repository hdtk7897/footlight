

type SearchInfoConfig =  {
  // keywords:string[];
  title: string ;
  searchType: string ;
  searchTypeName: string ;
  endpoint: string ;
  email: string | undefined;
  auth: string | undefined;
  projectKey: string | undefined;
}

type SearchInfo = 
SearchInfoConfig & {
    isError: boolean;
    errorMessages: {[key:string]:string};
    getTitle: (value:string) => string;
}

type SearchConfigKey = keyof SearchInfoConfig;

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

type Headers = {
  Accept?: string;
  Authorization?: string;
}

export type { SearchInfoConfig, SearchInfo, FixedSearchInfo, SearchConfigKey, urlInput, Headers}
export { isFixedSearchInfo };

