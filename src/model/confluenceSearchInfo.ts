import { SearchInfo, defaultSearchInfo } from './searchInfoModel';
import { Headers } from './apiInfo';
import { keywordsArrToStr } from '../util';
import { Buffer } from 'buffer';
import { BaseSearchInfo } from './baseSearchInfo';

/**
 * Confluence用
 */

export class ConfluenceSearchInfo extends BaseSearchInfo  {
  readonly searchType:string = 'confluence'
  readonly searchTypeName: string  = 'confluence'

  projectKey = undefined

  constructor(searchInfo?:SearchInfo){
    searchInfo = searchInfo ? searchInfo : defaultSearchInfo('confluence')
    super(searchInfo)
    if (this.searchType != searchInfo.searchType) throw new Error('invalid search type')
    console.log(searchInfo)
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

  get errorMessages(): {[key:string]:string}  {
    return {}
  }

  protected get base64auth(): string {
    const tokenSeed = `${this.email}:${this.auth}`
    return Buffer.from(tokenSeed).toString('base64')
  }

}
