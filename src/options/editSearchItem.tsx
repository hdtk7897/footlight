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
  const [searchInfoKey, setSearchInfoKey] = useState<string >(
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
    setSearchInfoObj(searchInfoObjClone)
  }
  
  const saveSearchInfo = (target:SearchConfigKey, value:string) => {
    const searchInfoObjClone = Object.assign(initSearchInfoAsSearchType(searchInfoObj)) 
    if (!changeFlag) return
    searchInfoObjClone.checkValue(target, value)
    setSearchInfoObj(searchInfoObjClone)
    if (searchInfoObj.isError) return

    const awaitSaveSearchInfo = async () => {
      let updateKey = searchInfoKey
      const searchInfoManager = await SearchInfoManager.init()
      if (isNew()){
        updateKey = await searchInfoManager.payoutSearchInfoKey()
      }
      setSearchInfoKey(updateKey)
      await searchInfoManager.updateSearchInfo(searchInfoObj as FixedSearchInfo, updateKey)
    }
    
    awaitSaveSearchInfo();
  }

  const changeSearchType = (e:SearchType) => {
    let changeSearchInfoObjClone =  Object.assign(initSearchInfoAsSearchType(searchInfoObj, e))
    changeSearchInfoObjClone.title = "新規作成"
    setSearchInfoObj(changeSearchInfoObjClone)
  }
  
  const initSearchInfoAsSearchType = (_searchInfo:SearchInfo, initSearchType?:SearchType) => {
    // initSearchTypeが入っている場合は新規作成
    const searchType = initSearchType ?? _searchInfo?.searchType as SearchType ?? 'base'
    const searchInfo = initSearchType ? undefined : _searchInfo
    switch (searchType) {
      case 'backlog':
        return new BacklogSearchInfo(searchInfo)
      case 'confluence':
        return new ConfluenceSearchInfo(searchInfo)
      default:
        return new BaseSearchInfo(searchInfo)
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

  return (
    <>
      <div className="m-2 p-4">
        <Link to={'/'} className="text-sm text-blue-800 hover:text-blue-600" >&lt;</Link>
        <div className="text-sm" >
          {createSearchTypeList()}
        </div>
        <div>
          <SearchTypeFields
            searchInfo={searchInfoObj as SearchInfo }
            upsertSearchInfo={upsertSearchInfo}
            saveSearchInfo={saveSearchInfo}
          />
        </div>
      </div>
    </>
  );
}
export { EditSearchItem };
