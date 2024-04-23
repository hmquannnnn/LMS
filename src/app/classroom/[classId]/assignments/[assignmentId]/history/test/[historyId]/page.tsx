"use client";

import { callGetTestById, callGetTestHistoryByHistoryId } from "@/apis/testAPI";
import { useEffect, useState } from "react";
import { callFetchUserById } from "@/apis/userAPI";
import { indexToAlphabet } from "@/app/library/[documentId]/[testType]/page";
import { questionTypes, testTypes } from "@/utils/constant";
import { useRouter } from "next/navigation";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const initialTestHistory = {
  id: 0,
  title: "",
  questions: [
    {
      id: null,
      question: "",
      type: "",
      testId: null,
      choices: [
        {
          id: null,
          content: "",
          isAnswer: false,
          isPicked: false,
          questionId: null,
          testId: null,
        },
      ],
      hintAnswerHistories: null,
    },
  ],
  submitterId: 0,
  type: "",
  testId: 0,
  totalScore: 0,
  submitAt: "",
};

const TestHistory = ({ params }) => {
  const historyId = params.historyId;
  const [testHistory, setTestHistory] = useState(initialTestHistory);
  const [submitter, setSubmitter] = useState({});
  const router = useRouter();

  const getHistory = async () => {
    const history = await callGetTestHistoryByHistoryId(historyId);
    setTestHistory(history);
    if (history?.id) {
      const submitter = await callFetchUserById(history.submitterId);
      setSubmitter(submitter);
    }
  };

  const isCorrect = (question) => {
    return !question.choices.some(
      (choice) => choice.isPicked !== choice.isAnswer,
    );
  };

  const choiceStyle = (choice) => {
    if (choice.isAnswer) {
      if (choice.isPicked) {
        return { backgroundColor: "#99f090", fontWeight: "bold" };
      }
      return { backgroundColor: "#99f090" };
    }
    if (choice.isPicked === false) {
      return { backgroundColor: "white" };
    }
    return { backgroundColor: "#f09090", fontWeight: "bold" };
  };

  const handleRedoTest = async () => {
    const test = await callGetTestById(testHistory.testId);
    router.push(
      `/library/${test.documentId}/${testHistory.type === testTypes.WRITING ? testTypes.WRITING : "READING"}`,
    );
  };

  useEffect(() => {
    getHistory();
    console.log(submitter);
  }, []);

  return (
    <>
      <div className={"w-[50%] mx-auto"}>
        <p>
          <b>Người làm bài:&nbsp;</b>{" "}
          {submitter?.lastName + " " + submitter?.firstName}
        </p>
        <p>
          <b>Điểm:&nbsp;</b> {testHistory.totalScore}
        </p>

        {testHistory.questions.map((question, questionIndex: number) => (
          <div className={"flex flex-col"}>
            <p className={"flex flex-row items-center"}>
              <b>Câu {questionIndex + 1}:&nbsp;</b> {question.question} &nbsp;
              {question.type !== questionTypes.FILL_IN_THE_BLANK ? (
                isCorrect(question) ? (
                  <FaCheck className={"text-green-500 text-xl"} />
                ) : (
                  <MdCancel className={"text-red-600 text-xl"} />
                )
              ) : null}
            </p>
            {question.type === questionTypes.FILL_IN_THE_BLANK ? (
              <>
                <textarea
                  className={
                    "border-[2px] border-black w-full rounded-xl px-2 py-2"
                  }
                  value={question?.choices[0]?.content}
                  cols="30"
                  rows="10"
                />
              </>
            ) : (
              <div className={"flex flex-col"}>
                {question.choices.map((choice, choiceIndex) => (
                  <p
                    style={choiceStyle(choice)}
                    className={"my-0.5 px-2 py-1 rounded-2xl"}
                  >
                    <b className={"w-6"}>
                      {indexToAlphabet(choiceIndex)}.&nbsp;
                    </b>
                    {choice.content}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
        <button
          className={
            "bg-blue_9 text-white font-semibold px-4 py-1 rounded hover:bg-purple_1 duration-300 mx-auto block mt-3"
          }
          onClick={handleRedoTest}
        >
          Làm lại
        </button>
      </div>
    </>
  );
};

export default TestHistory;
