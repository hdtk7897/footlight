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
        <table className="w-full text-left rtl:text-right" >
          <thead className="uppercase dark:text-gray-400">
            <th className="text-lg text-gray-700 uppercase">検索種別</th>
          </thead>
          <tbody id="border-b border-gray-200 dark:border-gray-700">
            {Object.keys(userSearchList).map((key) => {
                const searchInfo = userSearchList[key]
                const title = searchInfo.title
                return <tr className="border-b border-gray-200 dark:border-gray-700" id={key} key={key}>
                  <td className="text-lg">
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
