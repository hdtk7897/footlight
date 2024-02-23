import { useState, useLayoutEffect } from "react";
import { SearchInfoManager } from '../model/searchInfoManager';
import { SearchInfo, newSearchInfo } from '../model/searchInfoModel';
import { Link } from 'react-router-dom';

type searchInfoList = { [key: string]: SearchInfo; }

const UserSearchList = () => {
  const [userSearchList, setUserSearchList] = useState<searchInfoList>(
    {
    '0' : newSearchInfo
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
