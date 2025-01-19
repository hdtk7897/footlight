import React  from "react";
import { SearchInfo, SearchConfigKey, urlInput  } from '../model/searchInfoModel'


// 各検索先ごとの設定値の入力フォームを作成する
function SearchTypeFields(prop:{searchInfo:SearchInfo ,upsertSearchInfo:Function, saveSearchInfo:Function})  {


  const onChangeText = ( key:string, event:React.ChangeEvent<HTMLInputElement> ) => {
    prop.upsertSearchInfo({...prop.searchInfo, [key]:event.target.value})
  }
  

  const onFocusOut = async (e:React.ChangeEvent<HTMLInputElement>  ) => {
    prop.saveSearchInfo(e.target.name as SearchConfigKey, e.target.value)
  }

  const createInputForm = (key:SearchConfigKey) => {
    if (!prop.searchInfo) return null
    let val = prop.searchInfo[key]
    console.log(val)
    type L = typeof val
    if (val === undefined) return null

    let title = prop.searchInfo.getTitle(key);
    // title = 'title' in val ? (val as SearchInfoItem).title : '';
 
    const isUrlInput = (val: L): val is urlInput => {
      return val != undefined
    }
    const isString = (val: L): val is string => {
      return val != undefined
    }

    if (isUrlInput(val)) {
      let inputString = val.value
      const prefix = val.prefix
      const postfix = val.postfix
      return (
        <>
          <div className="" key={key}>
            <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {title}:
            </label>
            {prefix}
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text" 
              // 変更した値をstateに反映させる
              onChange={(e) => onChangeText(key, e)} 
              // 変更した値をストレージに格納し、確定させる
              onBlur={(e) => onFocusOut(e)}
              name={key} 
              value={inputString??''}
            >
            {postfix}
            </input>
          </div>
          <div className="text-red-500">
            {prop.searchInfo.errorMessages[key]}
          </div>
        </>
      )
    }
    if (isString(val)) {
      val = val as string
      return (
        <>
          <div className="" key={key}>
            <label htmlFor={key} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              {title}:
            </label>
            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text" 
              // 変更した値をstateに反映させる
              onChange={(e) => onChangeText(key, e)} 
              // 変更した値をストレージに格納し、確定させる
              onBlur={(e) => onFocusOut(e)}
              name={key} 
              value={val??''}
            >
            </input>
          </div>
          <div className="text-red-500">
            {prop.searchInfo.errorMessages[key]}
          </div>
        </>
      ) 
      // case 'boolean':
      //   val = val as boolean
      //   return (
      //     <>
      //       <div>
      //         <input type="radio" 
      //           id="true" 
      //           name={key} 
      //           value="true" 
      //           checked={val === true}
      //           onChange={(e) => onChangeText(key, e)} 
      //           onBlur={() => onFocusOut()}
      //         />
      //         <label htmlFor="true">true</label>
      //       </div>

      //       <div>
      //         <input type="radio" 
      //           id="false" 
      //           name={key} 
      //           value="false" 
      //           checked={val === false}
      //           onChange={(e) => onChangeText(key, e)} 
      //           onBlur={() => onFocusOut()}
      //         />
      //         <label htmlFor="false">false</label>
      //       </div>
      //     </>
      //   ) 
        return null
    }
  }

  return (
    <>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {createInputForm("title")}
        {createInputForm("endpoint")}
        {createInputForm("email") }
        {createInputForm("projectKey")}
        {createInputForm("auth")}
        <div className="text-red-500">
          {prop.searchInfo.errorMessages['mandatory']}
        </div>
      </div>
    </>
  )  
}

export { SearchTypeFields };
