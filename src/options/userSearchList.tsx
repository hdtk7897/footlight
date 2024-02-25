import { useState, useLayoutEffect } from "react";
import { SearchInfoManager } from '../model/searchInfoManager';
import { SearchInfo } from '../model/searchInfoModel';
import { Link } from 'react-router-dom';
import { BaseSearchInfo } from "../model/baseSearchInfo";

type searchInfoList = { [key: string]: SearchInfo; }

const UserSearchList = () => {
  const [userSearchList, setUserSearchList] = useState<searchInfoList>(
    {
    '0' : new BaseSearchInfo()
  })


  const getSearchInfoData = async () => {
    const searchInfoManager = await SearchInfoManager.init()
    const searchInfoLists = searchInfoManager.getSearchInfoList() 
    if (!searchInfoLists) return null
    const searchInfoKeys = Object.keys(searchInfoLists)
    if (searchInfoKeys.length == 0) return null
    setUserSearchList({...userSearchList, ...searchInfoLists})
  }
  
  useLayoutEffect(() => {
    console.log(`use effect`)
    getSearchInfoData();
  }, []);  

  return (
    <>
      <table className="table-fixed" >
        <tbody id="sort-table">
        {Object.keys(userSearchList).map((key) => {
              const searchInfo = userSearchList[key]
              const title = searchInfo.title
              return <tr  id={key} key={key}><td ><Link to={'/edit'} state={{key}}>{title}</Link></td></tr>;
          })}
        </tbody>
      </table>
    </>
  );
}
export { UserSearchList };
