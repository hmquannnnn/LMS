"use client";

import React, { useEffect, useState } from "react";
import { Dropdown, MenuProps } from "antd";
import { callSearchDocumentByTitle } from "@/apis/documentsAPI";
import { MdOutlineCancel } from "react-icons/md";
import {
  updateAssignmentType,
  updateLinkedDocument,
} from "@/redux/slices/classSlice";
import { useDispatch } from "react-redux";
import { assignmentTypes } from "@/utils/constant";

const DocumentSelector: React.FC = ({ sendLinkedDocument }) => {
  const [isTypingSearch, setIsTypingSearch] = useState(false);
  const [searchItems, setSearchItems] = useState<MenuProps["items"]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [linkedDocument, setLinkedDocument] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      const response = await callSearchDocumentByTitle(searchValue);
      setSearchItems(
        response
          .map((item, index) => {
            return {
              key: item.id,
              label: (
                <p onClick={() => handleChooseLinkedDocument(item)}>
                  {item.title}
                </p>
              ),
            };
          })
          .filter((item, index) => index < 5),
      );
      setIsTypingSearch(false);
    }, 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue]);

  const handleChooseLinkedDocument = (document) => {
    setLinkedDocument(document);
    sendLinkedDocument(document);
    dispatch(updateLinkedDocument(document.id));
    dispatch(updateAssignmentType(assignmentTypes.FOR_COUNSELLING));
  };

  const handleOnChangeSearch = (event) => {
    setIsTypingSearch(true);
    setSearchValue(event.target.value);
  };

  const handleCancelSelection = () => {
    setLinkedDocument(null);
    sendLinkedDocument(null);
    dispatch(updateLinkedDocument(0));
  };
  return (
    <div className={"my-2"}>
      {linkedDocument ? (
        <div
          className={
            "flex flex-row items-center bg-gray-300 rounded px-3 py-2 w-fit"
          }
        >
          <p>{linkedDocument.title}</p>

          <MdOutlineCancel
            className={"text-red-600 cursor-pointer ml-5 text-lg"}
            onClick={handleCancelSelection}
          />
        </div>
      ) : (
        <Dropdown
          className={""}
          menu={{ items: searchItems }}
          trigger={["click"]}
          placement="top"
        >
          <div className="border-[1px] flex items-center px-2  rounded w-full">
            {isTypingSearch ? (
              <div className="">
                <svg
                  aria-hidden="true"
                  className="w-[24px] h-[24px] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="24"
                height="24"
                viewBox="0 0 30 30"
                fill="black"
              >
                <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z"></path>
              </svg>
            )}

            <input
              className={
                "flex-1 font-semibold h-8 rounded border-0    caret-white focus:outline-none border-gray-200 pl-2 my-auto ml-2 outline-none "
              }
              onChange={handleOnChangeSearch}
              value={searchValue}
              type={"text"}
              placeholder={""}
            />
          </div>
        </Dropdown>
      )}
    </div>
  );
};

export default DocumentSelector;
