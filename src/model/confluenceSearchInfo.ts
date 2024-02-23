import { SearchInfo } from './searchInfoModel';
import { ApiInfo, Headers, Method } from './apiInfo';
import { keywordsArrToStr } from '../util';
import { SearchInfoManager } from './searchInfoManager';
import { Buffer } from 'buffer';

/**
 * Confluence用
 */
export class ConfluenceSearchInfo implements SearchInfo, ApiInfo {
  readonly searchType:string = 'confluence'
  readonly searchTypeName: string  = 'confluence'

  keywords:string[] = []
  title:string | null  = null
  endpoint:string | null = null
  auth:string | null = null
  email:string | null = null
  projectKey: string | null | undefined = undefined
  method: Method = 'GET'

  token:string = ''

  constructor(searchinfo:SearchInfo){
    console.log(searchinfo)
    if (!searchinfo) return
    if (this.searchType != searchinfo.searchType) throw new Error('invalid search type')
    this.endpoint = searchinfo.endpoint
    this.auth = searchinfo.auth || null
    this.email = searchinfo.email as string
    this.title = searchinfo.title
  }

  load = async(target:string): Promise<SearchInfo> => {
    const searchInfoManager = await SearchInfoManager.init()
    const searchInfo:SearchInfo = searchInfoManager.getSearchInfo(target)
    return searchInfo
  }

  isError = () => {
    if (!this.endpoint) return true
    return false
  }

  getErrorMessages() {
    return {}
  }

  get uriWithParam(): string {
    const cql = `cql=text~"${keywordsArrToStr(this.keywords)}" and space=QWAWT`;
    return encodeURI(`https://${this.endpoint}/wiki/rest/api/search?${cql}`);
  }

  get headers(): Headers {
    return {
      Accept: 'application/json',
      Authorization: `Basic ${this.base64auth}`,
    }
  }

  protected get base64auth(): string {
    const tokenSeed = `${this.email}:${this.auth}`
    return Buffer.from(tokenSeed).toString('base64')
  }

}
