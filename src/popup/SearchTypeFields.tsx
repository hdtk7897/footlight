import React  from "react";
import { SearchInfo, SearchInfoKey  } from '../model/searchInfoModel'


// 各検索先ごとの設定値の入力フォームを作成する
function SearchTypeFields(prop:{searchInfo:SearchInfo ,upsertSearchInfo:Function, saveSearchInfo:Function})  {


  const onChangeText = ( key:string, event:React.ChangeEvent<HTMLInputElement> ) => {
    prop.upsertSearchInfo({...prop.searchInfo, [key]:event.target.value})
  }
  

  const onFocusOut = async () => {
      prop.saveSearchInfo()
  }

  const createInputForm = (key:SearchInfoKey) => {
    if (!prop.searchInfo) return null
    let val = prop.searchInfo[key]
    if (val === undefined) return null
    const keyType = typeof val
    console.log(`key:${key}, keyType:${keyType}`)
    switch (keyType) {
      case 'string':
        val = val as string
        return (
          <>
            <div key={key}>
              {key}:
              <input 
                type="text" 
                // 変更した値をstateに反映させる
                onChange={(e) => onChangeText(key, e)} 
                // 変更した値をストレージに格納し、確定させる
                onBlur={() => onFocusOut()}
                name={key} 
                value={val??''}
              >
              </input>
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
        break;
      default:
        return null
    }
  }

  return (
    <>
      {createInputForm("title")}
      {createInputForm("endpoint")}
      {createInputForm("email") }
      {createInputForm("projectKey")}
      {createInputForm("auth")}
    </>
  )  
}

export { SearchTypeFields };
