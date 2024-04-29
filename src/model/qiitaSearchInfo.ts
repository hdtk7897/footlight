import { SearchInfo } from './searchInfoModel';
import { Headers } from './apiInfo';
import { keywordsArrToStr } from '../util';
import { Buffer } from 'buffer';
import { BaseSearchInfo } from './baseSearchInfo';

/**
 * Qiita用
 */

export class QiitaSearchInfo extends BaseSearchInfo  {
  readonly searchType:string = 'qiita'

  projectKey = undefined

  constructor(searchInfo?:SearchInfo){
    super(searchInfo)
    if (searchInfo && this.searchType != searchInfo.searchType) throw new Error('invalid search type')
  }

  get uriWithParam(): string {
    const searchWords = keywordsArrToStr(this.keywords)
    return encodeURI(`https://qiita.com/api/v2/items?query=${searchWords}&per_page=${this.maxResults}`);
  }

  get headers(): Headers {
    return {
      Accept: 'application/json',
      Authorization: `Bearer ${this.auth}`,
    }
  }
}
