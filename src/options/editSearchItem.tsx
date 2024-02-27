import { useState, useLayoutEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { SearchInfoManager } from '../model/searchInfoManager';
import { SearchInfo,  FixedSearchInfo, SearchConfigKey } from '../model/searchInfoModel';
import { BaseSearchInfo } from '../model/baseSearchInfo';
import { BacklogSearchInfo } from '../model/backlogSearchInfo';
import { ConfluenceSearchInfo } from '../model/confluenceSearchInfo';
import { SearchType, searchInfoLists } from '../model/searchInfoListModel'
import { SearchTypeFields } from './SearchTypeFields';

const EditSearchItem = () => {
  const [searchInfoObj, setSearchInfoObj] = useState< BacklogSearchInfo | ConfluenceSearchInfo | BaseSearchInfo >(
    new BaseSearchInfo()
  )
  const [searchInfoKey, setsearchInfoKey] = useState<string >(
    useLocation().state.key as string
  )
  const [changeFlag, setChangeFlag] = useState<boolean>(false);

  const getSearchInfoData = async () => {
    const searchInfoManager = await SearchInfoManager.init()
    const searchInfoItem = searchInfoManager.getSearchInfo(searchInfoKey) 
    if (!searchInfoItem) return null;
    setSearchInfoObj(initSearchInfoAsSearchType(searchInfoItem))
  }

  const upsertSearchInfo = (val:SearchInfo) => {
    setChangeFlag(true)
    const searchInfoObjClone = Object.assign(initSearchInfoAsSearchType(searchInfoObj)) 
    searchInfoObjClone.searchInfo = val
    console.log(`upsert`, searchInfoObj)
    setSearchInfoObj(searchInfoObjClone)
  }
  
  const saveSearchInfo = (target:SearchConfigKey, value:string) => {
    if (!changeFlag || searchInfoObj.isError) return
    searchInfoObj.checkValue(target, value)
    const awaitSaveSearchInfo = async () => {
      const searchInfoManager = await SearchInfoManager.init()
      if (isNew()){
        setsearchInfoKey(await searchInfoManager.payoutSearchInfoKey())
      }
      await searchInfoManager.updateSearchInfo(searchInfoObj as FixedSearchInfo, searchInfoKey)
    }
    awaitSaveSearchInfo();
  }

  const changeSearchType = (e:SearchType) => {
    let changeSearchInfoObjClone =  Object.assign(initSearchInfoAsSearchType(searchInfoObj, e))
    changeSearchInfoObjClone.title = "新規作成"
    setSearchInfoObj(changeSearchInfoObjClone)
  }
  
  const initSearchInfoAsSearchType = (val:SearchInfo, key?:SearchType) => {
    if (!key) key = val.searchType as SearchType ?? 'none'
    switch (key) {
      case 'backlog':
        return new BacklogSearchInfo(val)
      case 'confluence':
        return new ConfluenceSearchInfo(val)
      default:
        return new BaseSearchInfo(val)
    }
  }

  const searchTypeList = () => {
    return Object.keys(searchInfoLists)
      .filter(key => key !== 'none')
  }

  const createSearchTypeList = () => {

    if (isNew()) {
      if(searchInfoObj.searchType === 'none' ) {
        changeSearchType(searchTypeList()[0])
      }
      return (
        <select onChange={(e)=>changeSearchType(e.target.value)}>
          { searchTypeList().map(key => {
              return (
                  <option value={key} key={key}>{searchInfoLists[key].searchTypeName}</option>
              )
          })}
        </select>
      )
    }else{
      const searchType = searchInfoObj?.searchType || 'none'
      return (
        <select disabled>
          <option value={searchType} key="disabled">{searchType}</option>
        </select>
      )
    }
  }

  const isNew = () => {
    return searchInfoKey === '0'
  }
  

  useLayoutEffect(() => {
    getSearchInfoData();
  }, []);  

  const errorMessages : {[key:string]:string} = searchInfoObj.errorMessages

  return (
    <>
      <Link to={'/'} >&lt;</Link>
      <ul>
        {errorMessages && Object.keys(errorMessages).map((key) => {
          return <li key={key}>{key}:{errorMessages[key]}</li>
        })}
      </ul>
      <div>
        {createSearchTypeList()}
      </div>
      <div>
        <SearchTypeFields
          searchInfo={searchInfoObj as SearchInfo }
          upsertSearchInfo={upsertSearchInfo}
          saveSearchInfo={saveSearchInfo}
        />
      </div>
    </>
  );
}
export { EditSearchItem };
