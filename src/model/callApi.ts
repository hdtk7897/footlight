import { RefArticles } from './refInfo';
import { ApiInfo } from './apiInfo';

export class CallApi {
  apiInfo:ApiInfo
  refArticles:RefArticles

  constructor(apiInfo:ApiInfo, refarticles:RefArticles) {
    this.apiInfo = apiInfo
    this.refArticles = refarticles
  }

  awaitCall = async () : Promise<any> => {
    try {
      console.log(this.apiInfo.headers)
      if (!this.apiInfo.uriWithParam) throw new Error('no endpoint') 
      const res = await fetch(this.apiInfo.uriWithParam, {
        method: 'GET',
        mode: 'cors',
        headers: this.apiInfo.headers
      });
      if (!res.ok) {
        console.error('サーバーエラー');
        console.error(res);
        return false;
      }
      return await res.json();
    } catch (e) {
      console.log(e);
      return false;
    }
  };
}