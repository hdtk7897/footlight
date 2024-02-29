import { SearchInfo, SearchConfigKey } from './searchInfoModel';
import { ApiInfo, Headers, Method } from './apiInfo';
import { SearchInfoManager } from './searchInfoManager';

export class BaseSearchInfo implements ApiInfo, SearchInfo {
  readonly searchType:string = 'none'
  readonly searchTypeName: string  = 'none'

  keywords:string[] = []
  title = '新規作成'
  endpoint = ''
  auth: string | undefined  = ''
  email: string | undefined  = ''
  projectKey: string | undefined = ''
  method: Method = 'GET'

  private _errorMessages: {[key:string]:string} = {}

  token:string = ''

  constructor(searchInfo?:SearchInfo){
    this.searchInfo = searchInfo ?? this
  }

  load = async(target:string): Promise<SearchInfo> => {
    const searchInfoManager = await SearchInfoManager.init()
    const searchInfo:SearchInfo = searchInfoManager.getSearchInfo(target)
    return searchInfo
  }

  get errorMessages(): {[key:string]:string} {
    return this._errorMessages
  }

  set searchInfo(val:SearchInfo){
    this.title = val.title
    this.endpoint = val.endpoint
    this.auth = val.auth
    this.email = val.email
    this.projectKey = val.projectKey
    this._errorMessages = val.errorMessages ?? {}
  }

  isError:boolean = Object.keys(this.errorMessages).length > 0 ? true : false


  checkValue = (key:SearchConfigKey, value:string|null|undefined):boolean => {
    // 値がundefinedの場合はチェックしない
    console.log(`check val`, key, value)
    if (value === undefined) return true
    let isError = false
    switch(key){
      case 'endpoint':
        isError = this.checkEndpoint(value)
        break
      case 'email':
        isError = this.checkEmail(value)
        break
      case 'title':
        isError = this.checkTitle(value)
        break
      case 'auth':
        isError = this.checkAuth(value)
        break
      case 'projectKey':
        isError = this.checkProjectKey(value)
        break
      default:
        isError = true
    }
    if (!isError) delete this._errorMessages[key]
    return isError
  }

  checkEndpoint = (value:string|null):boolean => {
    if (!value?.match(/^https:\/\/.+/)){
      this._errorMessages['endpoint'] = 'エンドポイントはhttps://から始まるURLを入力してください'
      return true
    }
    return false
  }

  checkEmail = (value:string|null):boolean => {
    if (!value?.match(/.+@.+\..+/)){
      this._errorMessages['email'] = 'メールアドレスを入力してください'
      return true
    } 
    return false
  }

  checkTitle = (value:string|null):boolean => {
    if (!this.hasValue(value)) {
      this._errorMessages['title'] = 'タイトルを入力してください'
      return true
    }
    return false
  }

  checkAuth = (value:string|null):boolean => {
    if (!this.hasValue(value)) {
      this._errorMessages['auth'] = '認証情報を入力してください'
      return true
    }
    return false
  }

  checkProjectKey = (value:string|null):boolean => {
    if (!this.hasValue(value)) {
      this._errorMessages['projectkey'] = 'プロジェクトキーを入力してください'
      return true
    }
    return false
  }

  hasValue = (value:string|null):boolean => {
    if (!value) return true
    return value.length > 0 ? false : true
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
