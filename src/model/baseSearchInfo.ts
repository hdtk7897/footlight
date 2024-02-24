import { SearchInfo, SearchConfigKey, defaultSearchInfo } from './searchInfoModel';
import { ApiInfo, Headers, Method } from './apiInfo';
import { SearchInfoManager } from './searchInfoManager';

export class BaseSearchInfo implements ApiInfo, SearchInfo {
  readonly searchType:string = 'base'
  readonly searchTypeName: string  = 'base'

  keywords:string[] = []
  title:string | null  = null
  endpoint:string | null = null
  auth:string | null | undefined = null
  email:string | null | undefined = null
  projectKey: string | null | undefined = null
  method: Method = 'GET'

  private _errorMessages: {[key:string]:string} = {} 

  token:string = ''

  constructor(searchInfo?:SearchInfo){
    searchInfo = searchInfo ? searchInfo : defaultSearchInfo()
  }

  load = async(target:string): Promise<SearchInfo> => {
    const searchInfoManager = await SearchInfoManager.init()
    const searchInfo:SearchInfo = searchInfoManager.getSearchInfo(target)
    return searchInfo
  }

  get errorMessages(): {[key:string]:string} {
    return this._errorMessages
  }

  isError:boolean = this.errorMessages ? true : false


  checkValue = (key:SearchConfigKey, value:string|null|undefined):boolean => {
    // 値がundefinedの場合はチェックしない
    if (value === undefined) return true
    switch(key){
      case 'endpoint':
        return this.checkEndpoint(value)
      case 'email':
        return this.checkEmail(value)
      case 'title':
        return this.checkTitle(value)
      case 'auth':
        return this.checkAuth(value)
      case 'projectKey':
        return this.checkProjectKey(value)
      default:
        return true
    }
  }

  checkEndpoint = (value:string|null):boolean => {
    if (!value?.match(/^https:\/\/.+/)){
      this._errorMessages['endpoint'] = 'エンドポイントはhttps://から始まるURLを入力してください'
      return false
    }
    return true
  }

  checkEmail = (value:string|null):boolean => {
    if (!value?.match(/.+@.+\..+/)){
      this._errorMessages['email'] = 'メールアドレスを入力してください'
      return false
    } 
    return true
  }

  checkTitle = (value:string|null):boolean => {
    if (!this.hasValue(value)) {
      this._errorMessages['title'] = 'タイトルを入力してください'
      return false
    }
    return true
  }

  checkAuth = (value:string|null):boolean => {
    if (!this.hasValue(value)) {
      this._errorMessages['auth'] = '認証情報を入力してください'
      return false
    }
    return true
  }

  checkProjectKey = (value:string|null):boolean => {
    if (!this.hasValue(value)) {
      this._errorMessages['projectkey'] = 'プロジェクトキーを入力してください'
      return false
    }
    return true
  }

  hasValue = (value:string|null):boolean => {
    if (!value) return false
    return value.length > 0 ? true : false
  }


  get uriWithParam(): string {
    if (!this.endpoint) throw new Error('endpoint is not defined')
    return `https://${this.endpoint}/`;
  }

  get headers(): Headers {
    return {
    }
  }


}
