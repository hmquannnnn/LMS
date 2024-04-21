"use client";

import { indexToAlphabet } from "@/app/library/[documentId]/[testType]/page";

const TestPreview = ({ testData }) => {
  const questionsList = testData.questions;
  return (
    <div className={"flex flex-col pl-10"}>
      <h1 className={"font-bold text-2xl"}>Xem trước</h1>
      {questionsList?.map((question, questionIndex: number) => (
        <>
          <b>Câu {questionIndex + 1}:</b>
          {question?.type === "FILL_IN_BLANK" ? (
            <div className={"flex flex-col italic text-gray-500 text-sm"}>
              <p>Gợi ý:</p>
              {question?.hints.map((hint, hintIndex) => (
                <p key={`question-${questionIndex}-${hintIndex}`}>
                  - {hint.content}
                </p>
              ))}
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className={
                  "border-[2px] border-black w-full rounded-xl px-2 py-2"
                }
                placeholder={"Nhập câu trả lời ..."}
              />
            </div>
          ) : (
            <div className={"flex flex-col"}>
              {question?.choices?.map((choice, choiceIndex: number) => (
                <p>
                  <b>{indexToAlphabet(choiceIndex)}.&nbsp;</b> {choice.content}
                </p>
              ))}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default TestPreview;
