import { SearchInfo } from './searchInfoModel';
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
    super(searchInfo)
    if (searchInfo && this.searchType != searchInfo.searchType) throw new Error('invalid search type')
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
