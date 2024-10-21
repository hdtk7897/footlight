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
      <div className="m-2 p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" >
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <th className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">検索種別</th>
          </thead>
          <tbody id="border-b border-gray-200 dark:border-gray-700">
            {Object.keys(userSearchList).map((key) => {
                const searchInfo = userSearchList[key]
                const title = searchInfo.title
                return <tr className="border-b border-gray-200 dark:border-gray-700" id={key} key={key}>
                  <td >
                    <Link to={'/edit'} state={{key}} className="text-blue-800 hover:text-blue-600 hover:underline">{title}</Link>
                  </td></tr>;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export { UserSearchList };
