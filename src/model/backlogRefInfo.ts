import { RefInfo, Article, RefArticles } from './refInfo';
import { SearchInfo } from './searchInfoModel';
import { SearchType } from './searchInfoListModel';
import { CallApi } from './callApi';
import { ConfluenceSearchInfo } from './confluenceSearchInfo'

/**
 * backlog用
 */
export class BacklogRefInfo implements RefInfo {

  readonly searchType: SearchType = 'backlog';
  result: any = null;
 
  confluenceSearchInfo: ConfluenceSearchInfo;
  
  constructor() {
    this.confluenceSearchInfo = new ConfluenceSearchInfo()
  }

  get searchinfo(): SearchInfo{
    return this.confluenceSearchInfo
  }

  get refarticles(): RefArticles {
    return {
      searchType: this.searchType,
      title: this.searchinfo.title,
      articles: this.articles
    }
  }

  protected get articles(): Article[] {
    if (!this.result) return [];
    // 結果にエスケープされたタグのようなものがあるので除去する
    const result = this.result.results;
    const articles: Article[] = result.map((obj: any) => ({
      headline: obj.title.replace(/(@@@.*?@@@)/g, ''),
      url: `http://${this.searchinfo.endpoint}/wiki${obj.url}`,
      description: obj.excerpt.replace(/(@@@.*?@@@)/g, ''),
    }));
    return articles;
  }

  callApi = async(keywords:string[]): Promise<RefArticles> => {
    this.confluenceSearchInfo.keywords = keywords
    const callapi = new CallApi(this.confluenceSearchInfo, this.refarticles)
    this.result = await callapi.awaitCall()
    return this.refarticles
  }
}


