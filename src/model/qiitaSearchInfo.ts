import { SearchInfo, urlInput } from './searchInfoModel';
import { Headers } from './apiInfo';
import { keywordsArrToStr } from '../util';
import { BaseSearchInfo } from './baseSearchInfo';

/**
 * Qiita用
 */

export class QiitaSearchInfo extends BaseSearchInfo  {
  readonly searchType:string = 'qiita'
  readonly searchTypeName: string  = 'qiita'

  endpoint:urlInput = {
    value: '',
    inputType: 'url',
    prefix: 'https://',
    postfix: '.qiita.com/'
  }
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
