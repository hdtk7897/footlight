import { SearchInfo } from './searchInfoModel';
import { keywordsArrToStr } from '../util';
import { BaseSearchInfo } from './baseSearchInfo';

/**
 * backlog用
 */
export class BacklogSearchInfo extends BaseSearchInfo  {
  readonly searchType: string = 'backlog'
  readonly searchTypeName: string  = 'backlog'

  email = undefined 

  constructor(searchInfo?:SearchInfo){
    super(searchInfo)
    if (searchInfo && this.searchType != searchInfo.searchType) throw new Error('invalid search type')
    console.log(searchInfo)
  }

  get uri(): string {
    return encodeURI(`https://${this.endpoint}/api/v2/wikis?apiKey=${this.auth}&projectIdOrKey=${this.projectKey}&keyword=${this.keywordParam}`);
  }

  protected get keywordParam(): string {
    return keywordsArrToStr(this.keywords)
  }
}
