import { SearchInfo } from './searchInfoModel';
import { keywordsArrToStr } from '../util';
import { SearchInfoManager } from './searchInfoManager';

/**
 * backlog用
 */
export class BacklogSearchInfo implements SearchInfo {
  readonly searchType: string = 'backlog'
  readonly searchTypeName: string  = 'backlog'

  keywords: string[] = []
  title: string | null = null
  endpoint: string | null = null
  auth: string | null = null
  email: undefined = undefined
  projectKey: string | null = null
  // headers:Headers = {}

  token: string = ''

  constructor(searchinfo: SearchInfo) {
    console.log(searchinfo)
    if (this.searchType != searchinfo.searchType ) throw new Error('invalid search type')
    this.endpoint = searchinfo.endpoint
    this.auth = searchinfo.auth || null
    this.title = searchinfo.title
  }

  load = async (target: string): Promise<SearchInfo> => {
    const searchInfoManager = await SearchInfoManager.init()
    const searchInfo: SearchInfo = searchInfoManager.getSearchInfo(target)
    return searchInfo
  }

  isError = () => {
    return false
  }

  getErrorMessages() {
    return {}
  }

  get uri(): string {
    return encodeURI(`https://${this.endpoint}/api/v2/wikis?apiKey=${this.auth}&projectIdOrKey=${this.projectKey}&keyword=${this.keywordParam}`);
  }

  protected get keywordParam(): string {
    return keywordsArrToStr(this.keywords)
  }
}
