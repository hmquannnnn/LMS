"use client";

import { callGetTestByDocument } from "@/apis/testAPI";
import { testTypes } from "@/utils/constant";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentReadingTest } from "@/redux/slices/testSlice";
import "./test.scss";
import { NotionRenderer } from "react-notion";
import { callGetDocumentById } from "@/apis/documentsAPI";
import { formatVietnameseDateTime } from "@/app/library/[documentId]/page";

const Test = ({ params }) => {
  const documentId = params.documentId;
  const testType = params.testType;
  const dispatch = useDispatch();
  const postTime = useRef();
  const documentTitle = useRef();
  const [data, setData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTest, setShowTest] = useState(true);
  const contentRef = useRef(null);
  const [isRerendered, setIsRerendered] = useState(false);

  const questionCollection = useSelector(
    (state) => state?.test?.currentReadingTest?.questions || [],
  );

  const indexToAlphabet = (index) => {
    return String.fromCharCode(65 + index);
  };

  const initializeCorrectAnswer = (questions) => {
    const initialAnswers = questions.map((question) => ({
      id: question.id,
      answers: question.choices.map((choice) => choice.isAnswer),
    }));
    setCorrectAnswer(initialAnswers);
  };

  const initializeUserAnswers = (questions) => {
    const initialAnswers = questions.map((question) => ({
      id: question.id,
      answers: question.choices.map((choice) => false),
    }));
    setUserAnswers(initialAnswers);
  };

  const handleAnswerSelection = (questionIndex, choiceIndex) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = {
        ...updatedAnswers[questionIndex],
        answers: updatedAnswers[questionIndex].answers.map((answer, index) =>
          index === choiceIndex ? !answer : answer,
        ),
      };
      return updatedAnswers;
    });
  };

  const compareCorrectAnswer = (questionIndex: number, choiceIndex: number) => {
    console.log(
      "question: ",
      questionIndex,
      "choice: ",
      choiceIndex,
      "result: ",
      userAnswers[questionIndex].answers[choiceIndex] ===
        correctAnswer[questionIndex].answers[choiceIndex],
    );
    return (
      userAnswers[questionIndex].answers[choiceIndex] ===
      correctAnswer[questionIndex].answers[choiceIndex]
    );
  };

  const handleSubmit = () => {
    setShowTest(false);
    setIsSubmitted(true);
    window.scrollTo({
      top: contentRef.current.offsetTop - 64,
      behavior: "smooth",
    });
    let score = 0;
    // console.log(userAnswers);
    userAnswers.forEach((userAnswer, index) => {
      const correctAnswer = questionCollection[index].choices.map(
        (choice) => choice.isAnswer,
      );
      // console.log("correct: ", correctAnswer);
      if (
        JSON.stringify(userAnswer.answers) === JSON.stringify(correctAnswer)
      ) {
        score++;
      }
    });
    setScore(score);
  };

  const handleRefresh = () => {
    setShowTest(true);
    setIsRerendered(true);
    setIsSubmitted(false);
    window.scrollTo({
      top: contentRef.current.offsetTop - 64,
      behavior: "smooth",
    });
  };

  const getTest = async () => {
    const type =
      testType === "READING" ? testTypes.MULTIPLE_CHOICE : testTypes.WRITING;
    const formData = new FormData();
    formData.append("documentId", documentId);
    formData.append("type", type);
    const res = await callGetTestByDocument(formData);
    dispatch(getCurrentReadingTest(res));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const document = await callGetDocumentById(documentId);
        const notionPageId = document.notionPageId;
        postTime.current = formatVietnameseDateTime(
          new Date(document.postTime),
        );
        documentTitle.current = document.title;
        const response = await fetch(
          `https://notion-api.splitbee.io/v1/page/${notionPageId}`,
        );
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [documentId]);

  useEffect(() => {
    getTest();
  }, []);

  useEffect(() => {
    if (questionCollection.length > 0) {
      initializeUserAnswers(questionCollection);
      initializeCorrectAnswer(questionCollection);
    }
    // console.log("correct list: ", correctAnswer[0]?.answers[0]);
  }, [questionCollection, isRerendered]);

  return (
    <>
      <div className={"grid grid-cols-2 min-h-[85vh] test-page"}>
        <div
          className={
            "border-r-[1px] col-span-1 border-blue_3 min-h-full scrollable-column"
          }
        >
          {/*<div className="flex justify-start mx-auto ml-[20vw] pr-[5vw] mr-[4vw] ">*/}
          <div className=" pl-10 pr-20">
            {data && (
              <div className="font-headingOpenSans font-[550] mx-auto my-0  text-[2.5rem] mb-[0.25em]">
                {documentTitle.current}
              </div>
            )}
            {postTime.current && (
              <p className="mx-auto my-0  text-sm text-gray-500">
                {postTime.current}
              </p>
            )}
            {data && <NotionRenderer blockMap={data} fullPage hideHeader />}
          </div>
          <div></div>
          {/*</div>*/}
        </div>
        <div className={"min-h-full pl-5 scrollable-column"} ref={contentRef}>
          {showTest && (
            <div>
              <h3 className={"mb-2 font-semibold"}>
                Đọc văn bản và thực hiện các yêu cầu bên dưới bằng cách chọn đáp
                án đúng:
              </h3>
              {questionCollection?.length > 0 &&
                questionCollection.map((question, questionIndex: number) => (
                  <div key={question.id}>
                    <h4>
                      Câu hỏi {questionIndex + 1}: {question.question}
                    </h4>
                    {question.choices.map((choice, choiceIndex: number) => (
                      <div
                        key={choice.id}
                        className={"my-1 px-2 py-1 rounded-2xl"}
                        style={
                          isSubmitted
                            ? userAnswers[questionIndex]?.answers[choiceIndex]
                              ? compareCorrectAnswer(questionIndex, choiceIndex)
                                ? { backgroundColor: "#99f090" }
                                : { backgroundColor: "#f09090" }
                              : correctAnswer[questionIndex]?.answers[
                                    choiceIndex
                                  ] === true
                                ? { backgroundColor: "#99f090" }
                                : null
                            : null
                        }
                      >
                        {" "}
                        {/* Added a wrapper div */}
                        {isSubmitted === false && (
                          <input
                            type="checkbox"
                            id={`${choice.id}`}
                            onChange={() =>
                              handleAnswerSelection(questionIndex, choiceIndex)
                            }
                          />
                        )}
                        <label
                          htmlFor={`${choice.id}`}
                          style={
                            isSubmitted
                              ? userAnswers[questionIndex]?.answers[choiceIndex]
                                ? { fontWeight: "bold" }
                                : null
                              : null
                          }
                        >
                          <span>
                            {indexToAlphabet(choiceIndex)}. {choice.content}
                          </span>
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          )}

          {showTest ? (
            isSubmitted === false ? (
              <button
                onClick={handleSubmit}
                className={
                  "bg-blue_9 text-white font-semibold px-4 py-1 rounded"
                }
              >
                Nộp bài
              </button>
            ) : (
              <button
                onClick={() => handleRefresh()}
                className={
                  "bg-blue_9 text-white font-semibold px-4 py-1 rounded"
                }
              >
                Làm lại
              </button>
            )
          ) : (
            <div>
              <p>
                <p className={"text-2xl font-bold"}>
                  BẠN ĐÃ HOÀN THÀNH BỘ ĐỀ ĐỌC HIỂU!
                </p>{" "}
                <br />
                Số câu đúng: {score}/{questionCollection?.length}
              </p>
              <button
                onClick={() => setShowTest(true)}
                className={
                  "bg-blue_9 text-white font-semibold px-4 py-1 rounded"
                }
              >
                Xem lại
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Test;
