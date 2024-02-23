import { SearchInfo } from './searchInfoModel';
import { SearchType } from './searchInfoListModel';

type RefInfo = {
  readonly searchType: SearchType
  searchinfo: SearchInfo
  callApi(keywords:string[]):Promise<RefArticles>
  refarticles:RefArticles
}

type RefArticles = {
  readonly searchType: SearchType
  title: string | null;
  readonly articles: Article[]
};

type Article = {
  headline: string;
  description: string;
  date?: Date;
  url: string;
};

export type { RefInfo, RefArticles, Article };
