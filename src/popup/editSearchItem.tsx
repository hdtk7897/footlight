import { useState, useLayoutEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { SearchInfoManager } from '../model/searchInfoManager';
import { SearchInfo,  FixedSearchInfo, newSearchInfo } from '../model/searchInfoModel';
import { BacklogSearchInfo } from '../model/backlogSearchInfo';
import { ConfluenceSearchInfo } from '../model/confluenceSearchInfo';
import { SearchType, searchInfoLists } from '../model/searchInfoListModel'
import { SearchTypeFields } from './SearchTypeFields';

const EditSearchItem = () => {
  const [searchInfoObj, setSearchInfoObj] = useState< BacklogSearchInfo | ConfluenceSearchInfo | SearchInfo >(
    newSearchInfo
  )
  const [searchInfoKey, setsearchInfoKey] = useState<string >(
    useLocation().state.key as string
  )
  const [changeFlag, setChangeFlag] = useState<boolean>(false);

  const getSearchInfoData = async () => {
    const searchInfoManager = await SearchInfoManager.init()
    const searchInfoItem = searchInfoManager.getSearchInfo(searchInfoKey) 
    if (!searchInfoItem) return null;
    setSearchInfoObj(searchInfoItem);
  }

  const upsertSearchInfo = (val:SearchInfo) => {
    if (searchInfoObj.isError()) return
    setChangeFlag(true)
    setSearchInfoObj(val)
  }
  
  const saveSearchInfo = () => {
    if(!changeFlag) return
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
    switch (e) {
      case 'backlog':
        setSearchInfoObj(new BacklogSearchInfo(searchInfoObj))
        break
      case 'confluence':
        setSearchInfoObj(new ConfluenceSearchInfo(searchInfoObj))
        break
      default:
        setSearchInfoObj(newSearchInfo)
    }
    const templateSearchInfo = searchInfoLists[e]
    templateSearchInfo.title = "新規作成"
    upsertSearchInfo(templateSearchInfo)
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
  
  const errorMessages : {[key:string]:string} = searchInfoObj.getErrorMessages()

  useLayoutEffect(() => {
    getSearchInfoData();
  }, []);  

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
          searchInfo={searchInfoObj as FixedSearchInfo}
          upsertSearchInfo={upsertSearchInfo}
          saveSearchInfo={saveSearchInfo}
        />
      </div>
    </>
  );
}
export { EditSearchItem };
