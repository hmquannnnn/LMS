"use client";

import { callGetTestByDocument, callSubmitTest } from "@/apis/testAPI";
import { testTypes } from "@/utils/constant";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentTest } from "@/redux/slices/testSlice";
// import "./test.scss";
import { NotionRenderer } from "react-notion";
import { callGetDocumentById } from "@/apis/documentsAPI";
import {
  formatVietnameseDateTime,
  topicMapping,
} from "@/app/library/[documentId]/page";
import { FaCheck } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { Breadcrumb } from "antd";

function formatTextToHTML(content) {
  const lines = content.split("\n");
  const filteredLines = lines.filter((line) => line.trim() !== "");
  const htmlContent = filteredLines.map((line) => `<p>${line}</p>`).join("\n");
  return htmlContent;
}

const Counselling = ({ params }) => {
  const documentId = params.documentId;
  const testType = params.testType;
  const dispatch = useDispatch();
  const postTime = useRef();
  const documentTitle = useRef();
  const contentRef = useRef(null);
  const [data, setData] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showTest, setShowTest] = useState(true);
  const [isRerendered, setIsRerendered] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [showAnswerHints, setShowAnswerHints] = useState(false);
  const [writingAnswerValues, setWritingAnswerValues] = useState([]);
  const [currentDocument, setCurrentDocument] = useState();
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [testId, setTestId] = useState(0);
  const [numberOfWritingQuestions, setNumberOfWritingQuestions] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const document: any = await callGetDocumentById(documentId);
        setCurrentDocument(document);
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

        // add delay to show loading spinner
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Error fetching data:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [documentId]);

  const questionCollection = useSelector(
    (state) => state?.test?.currentTest?.questions || [],
  );
  const sortedQuestionCollection = [...questionCollection].sort(
    (q1, q2) => q1.id - q2.id,
  );

  const initializeCorrectAnswer = (questions) => {
    const initialAnswers = questions.map((question) => ({
      questionId: question.id,
      choices: question.choices.map((choice) => ({
        choiceId: choice.id,
        isPicked: choice.isAnswer,
        content: "",
      })),
    }));
    setCorrectAnswer(initialAnswers);
  };

  const initializeUserAnswers = (questions) => {
    const initialAnswers = questions.map((question) => ({
      questionId: question.id,
      choices:
        question.type === "FILL_IN_THE_BLANK"
          ? [
            {
              choiceId: null,
              isPicked: null,
              content: "",
            },
          ]
          : question.choices.map((choice) => ({
            choiceId: choice.id,
            isPicked: false,
            content: "",
          })),
    }));
    setUserAnswers(initialAnswers);
  };

  const initializeReadingAnswers = (questions) => {
    initializeUserAnswers(questions);
    initializeCorrectAnswer(questions);
  };

  const initializeWritingAnswer = (questions) => {
    const initialValues = questions.map((question) => ({
      id: question.id,
      value: "",
    }));
    setWritingAnswerValues(initialValues);
  };

  const handleChangeWritingAnswer = (e, questionId) => {
    const { value } = e.target;
    console.log(documentTitle);
    setWritingAnswerValues((prevValues) =>
      prevValues.map((item) =>
        item.id === questionId ? { ...item, value: value } : item,
      ),
    );
  };
  console.log("writing: ", writingAnswerValues);
  console.log("reading: ", userAnswers);

  const handleAnswerSelection = (questionIndex, choiceIndex) => {
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((question, index) => {
        if (index === questionIndex) {
          const updatedChoices = question.choices.map((choice, index) => {
            if (index === choiceIndex) {
              return {
                ...choice,
                isPicked: !choice.isPicked,
              };
            }
            return choice;
          });
          return {
            ...question,
            choices: updatedChoices,
          };
        }
        return question;
      });
      return updatedAnswers;
    });
  };

  const updateUserAnswer = () => {
    const updatedUserAnswers = userAnswers.map((userAnswer) => {
      const writingAnswer = writingAnswerValues.find(
        (writingAnswer) => writingAnswer.id === userAnswer.questionId,
      );

      if (writingAnswer) {
        userAnswer.choices.forEach((choice) => {
          choice.content = writingAnswer.value;
        });
      }

      return userAnswer;
    });

    setUserAnswers(updatedUserAnswers);
  };

  const handleSubmit = async () => {
    updateUserAnswer();
    console.log("final answer: ", userAnswers);
    const res = await callSubmitTest(testId, userAnswers);
    console.log("check submit response: ", res);
    setShowTest(false);
    setIsSubmitted(true);
    setShowAnswerHints(true);
    setShowHints(false);
    window.scrollTo({
      top: contentRef.current ? contentRef.current.offsetTop - 80 : 0,
      behavior: "smooth",
    });
    if (testType === "READING") {
      let score = 0;
      userAnswers.forEach((userAnswer, index) => {
        const correctAnswer = questionCollection[index].choices.map(
          (choice) => choice.isAnswer,
        );
        if (
          JSON.stringify(
            userAnswer.choices.map((choice) => choice.isPicked),
          ) === JSON.stringify(correctAnswer)
        ) {
          score++;
        }
      });
      score -= numberOfWritingQuestions;
      setScore(score);
    }
  };

  const handleRefresh = () => {
    setShowTest(true);
    setIsRerendered(true);
    setIsSubmitted(false);
    setShowHints(true);
    setShowAnswerHints(false);
    initializeUserAnswers(questionCollection);
    initializeWritingAnswer(questionCollection);
    window.scrollTo({
      top: contentRef.current ? contentRef.current.offsetTop - 80 : 0,
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
    res.questions.sort((a, b) => {
      return a.id - b.id;
    });

    setTestId(res.id);
    const countFillInTheBlankQuestions = res.questions.filter(
      (question) => question.type === "FILL_IN_THE_BLANK",
    ).length;
    setNumberOfWritingQuestions(countFillInTheBlankQuestions);
    dispatch(getCurrentTest(res));
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
    initializeReadingAnswers(questionCollection);
    initializeWritingAnswer(questionCollection);
  }, [questionCollection, isRerendered]);

  const indexToAlphabet = (index) => {
    return String.fromCharCode(65 + index);
  };

  const compareCorrectAnswer = (questionIndex, choiceIndex) => {
    return (
      userAnswers[questionIndex].choices[choiceIndex].isPicked ===
      correctAnswer[questionIndex].choices[choiceIndex].isPicked
    );
  };

  return (
    <>
      <Breadcrumb
        className={"ml-5"}
        items={[
          {
            href: "/library",
            title: (
              <div className="flex group ">
                <svg
                  className="group-hover:fill-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#AAA"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M 12 2.0996094 L 1 12 L 4 12 L 4 21 L 11 21 L 11 15 L 13 15 L 13 21 L 20 21 L 20 12 L 23 12 L 12 2.0996094 z M 12 4.7910156 L 18 10.191406 L 18 11 L 18 19 L 15 19 L 15 13 L 9 13 L 9 19 L 6 19 L 6 10.191406 L 12 4.7910156 z"></path>
                </svg>
                &nbsp;
                <span>Thư viện</span>
              </div>
            ),
          },
          {
            href: "/library/topics/" + currentDocument?.topic,
            title: (
              <>
                {/* <UserOutlined /> */}
                <span>{topicMapping[currentDocument?.topic]}</span>
              </>
            ),
          },
          {
            href: `/library/${documentId}`,
            title: <p>{documentTitle.current}</p>,
          },
        ]}
      />
      <div className={"grid grid-cols-2 h-full test-page"}>
        <div
          className={
            "border-r-[1px] col-span-1 h-full border-blue_3 scrollable-column"
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
        <div className="px-10">
          <div className="font-bold">Tham khảo bộ nhiệm vụ trải nghiệm nghề nghiệp dưới dây và hãy chọn thực hiện một nhiệm vụ em cảm thấy phù hợp nhé!</div>
        </div>
      </div>
    </>
  );
};

export default Counselling;
