// import { ApiInfo, ApiType } from './apiinfo';
// import { Reference, Article, RefArticles } from './reference';
// import { shapeKeywords } from '../util';

// export class MediaWiki implements Reference {
//   keywords: string[] = [];

//   result: any = null;
//   protected apiinfo: ApiInfo;
//   apitype: ApiType = 'backlog';

//   get refarticles(): RefArticles {
//     return {
//       title: "temp",
//       articles: this.articles
//     }
//   }

//   constructor(apiinfo: ApiInfo, keywordStr: string) {
//     this.keywordStr = keywordStr;
//     this.apiinfo = apiinfo;
//   }

//   get title(): string {
//     return this.title
//   }

//   get reftype(): string { 
//     return this.apiinfo.type
//   }

//   get articles(): Article[] {
//     return this.shapeResult();
//   }

//   static get param(): any {
//     return {};
//   }

//   set keywordStr(keyword: string) {
//     this.keywords = shapeKeywords(keyword);
//   }

//   get param(): Param {
//     return {
//       uri:'uri',
//       Headers: {
//         Accept: 'application/json',
//         Authorization: `Basic ${this.apiinfo.auth}`,
//       },
//     };
//   }

//   shapeResult(): Article[] {
//     const result: Article[] = this.result.map((obj: any) => ({
//       title: obj.name,
//       // url: `${this.backlogWikiUrl}${this.targetProject}/${obj.name}`,
//       description: obj.content,
//     }));
//     return result;
//   }
// }
