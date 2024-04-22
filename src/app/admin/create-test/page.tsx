"use client";

import { useEffect, useState } from "react";
import { indexToAlphabet } from "@/app/library/[documentId]/[testType]/page";
import DocumentSelector from "@/components/documentSelector";
import TestPreview from "@/components/testPreview";
import {
  colors,
  documentTypes,
  questionTypes,
  testTypes,
} from "@/utils/constant";
import { callCreateTest } from "@/apis/testAPI";
import { Modal } from "antd";
import { useRouter } from "next/navigation";

const initialTestData = {
  documentId: 0,
  title: "",
  questions: [],
  type: testTypes.MULTIPLE_CHOICE,
};

const CreateTestForm = () => {
  const [testData, setTestData] = useState({
    documentId: 0,
    title: "",
    questions: [],
    type: testTypes.MULTIPLE_CHOICE,
  });
  const [document, setDocument] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    router.push(
      `/library/${testData.documentId}/${testData.type === testTypes.MULTIPLE_CHOICE ? "READING" : "WRITING"}`,
    );
  };

  const handleCancel = () => {
    setTestData(initialTestData);
    setIsModalOpen(false);
  };

  const handleChangeLinkedDocument = (document) => {
    setDocument(document);
    console.log("check search: ", document);
    setTestData(
      document?.id ? { ...testData, documentId: document.id } : initialTestData,
    );
  };

  const handleChangeTestType = (e) => {
    const testType = e.target.value;
    setTestData({ ...testData, questions: [], type: testType });
  };

  const handleAddQuestion = () => {
    setTestData({
      ...testData,
      questions: [
        ...testData.questions,
        {
          question: "",
          type:
            testData.type === testTypes.MULTIPLE_CHOICE
              ? "SINGLE_CHOICE"
              : questionTypes.FILL_IN_THE_BLANK,
          choices: [{ content: "", isAnswer: false }],
          hints: [],
          answerHints: [],
        },
      ],
    });
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions.splice(index, 1);
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleChangeQuestion = (index, key, value) => {
    const updatedQuestions = [...testData.questions];

    updatedQuestions[index].choices = [{ content: "", isAnswer: false }];

    updatedQuestions[index][key] = value;
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleAddChoice = (questionIndex) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[questionIndex].choices.push({
      content: "",
      isAnswer: false,
    });
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleDeleteChoice = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[questionIndex].choices.splice(choiceIndex, 1);
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleChangeChoice = (questionIndex, choiceIndex, key, value) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[questionIndex].choices[choiceIndex][key] = value;
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleToggleAnswer = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...testData.questions];
    const currentChoices = updatedQuestions[questionIndex].choices;

    //handle there is only 1 choice is correct answer when input type is radio
    if (updatedQuestions[questionIndex].type === "SINGLE_CHOICE") {
      currentChoices.forEach((choice, index) => {
        choice.isAnswer = index === choiceIndex;
      });
    } else {
      currentChoices[choiceIndex].isAnswer =
        !currentChoices[choiceIndex].isAnswer;
    }

    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleAddHint = (questionIndex) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[questionIndex].hints.push({ content: "" });
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleDeleteHint = (questionIndex, hintIndex) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[questionIndex].hints.splice(hintIndex, 1);
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleAddAnswerHint = (questionIndex) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[questionIndex].answerHints.push({ content: "" });
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleDeleteAnswerHint = (questionIndex, answerHintIndex) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[questionIndex].answerHints.splice(answerHintIndex, 1);
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleChangeHint = (questionIndex, hintIndex, value) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[questionIndex].hints[hintIndex].content = value;
    setTestData({ ...testData, questions: updatedQuestions });
  };

  const handleChangeAnswerHint = (questionIndex, answerHintIndex, value) => {
    const updatedQuestions = [...testData.questions];
    updatedQuestions[questionIndex].answerHints[answerHintIndex].content =
      value;
    setTestData({ ...testData, questions: updatedQuestions });
  };

  useEffect(() => {
    console.log(testData);
  }, [testData]);

  const handleSubmit = async () => {
    const res = await callCreateTest(testData);
    console.log(res);

    showModal();
  };

  return (
    <div className={"grid grid-cols-2 min-h-[68vh]"}>
      <div className="border-r border-gray-300 pl-10 create-test col-span-1">
        <h1 className={"font-bold text-2xl"}>Tạo bài tập</h1>
        <div className={"w-[70%]"}>
          <label htmlFor="">
            {testData.documentId
              ? "Ngữ liệu liên kết "
              : "Chọn ngữ liệu liên kết "}
          </label>
          <DocumentSelector sendLinkedDocument={handleChangeLinkedDocument} />
        </div>

        {testData.documentId ? (
          <>
            <label htmlFor={"test-type"}>Chọn dạng bài tập</label>
            <select
              id={"test-type"}
              defaultValue={testTypes.MULTIPLE_CHOICE}
              onChange={handleChangeTestType}
              className="block mb-2 border border-black rounded px-3 py-2"
            >
              <option value={testTypes.MULTIPLE_CHOICE}>
                {document?.type === documentTypes.TEXT
                  ? "Đọc hiểu"
                  : "Nghe và nói"}
              </option>
              <option value={testTypes.WRITING}>Viết</option>
            </select>
            {testData.questions.map((question, index) => (
              <div key={index} className="mb-4">
                <p className={"font-bold"}>Câu {index + 1}</p>
                <label htmlFor={"question-input"}>Nhập nội dung câu hỏi</label>
                <input
                  type="text"
                  id={"question-input"}
                  placeholder="Nhập nội dung câu hỏi..."
                  value={question.question}
                  onChange={(e) =>
                    handleChangeQuestion(index, "question", e.target.value)
                  }
                  className="block mb-2 border border-black rounded px-3 py-2"
                />
                {testData.type === testTypes.MULTIPLE_CHOICE ? (
                  <>
                    <label htmlFor="">Chọn dạng câu hỏi</label>
                    <select
                      value={question.type}
                      onChange={(e) =>
                        handleChangeQuestion(index, "type", e.target.value)
                      }
                      className="block mb-2 border border-black rounded px-3 py-2"
                    >
                      <option value="SINGLE_CHOICE">
                        Trắc nghiệm có 1 đáp án đúng
                      </option>
                      <option value="MULTIPLE_CHOICE">
                        Trắc nghiệm có nhiều đáp án đúng
                      </option>
                      <option value="FILL_IN_THE_BLANK">Tự luận</option>
                    </select>
                  </>
                ) : null}

                {question.type !== "FILL_IN_THE_BLANK" && (
                  <div>
                    {question.choices.map((choice, choiceIndex) => (
                      <div key={choiceIndex} className="flex items-center mb-2">
                        <p className={"font-bold w-7"}>
                          {indexToAlphabet(choiceIndex)}.{" "}
                        </p>
                        <input
                          type="text"
                          placeholder={`Nhập nội dung đáp án ${indexToAlphabet(choiceIndex)}...`}
                          value={choice.content}
                          onChange={(e) =>
                            handleChangeChoice(
                              index,
                              choiceIndex,
                              "content",
                              e.target.value,
                            )
                          }
                          className="mr-2 border border-black rounded px-3 py-2"
                        />
                        <input
                          type={
                            question.type === "SINGLE_CHOICE"
                              ? "radio"
                              : "checkbox"
                          }
                          name={`question-${index}`}
                          checked={choice.isAnswer}
                          onChange={() =>
                            handleToggleAnswer(index, choiceIndex)
                          }
                          className="mr-2"
                        />
                        <button
                          onClick={() => handleDeleteChoice(index, choiceIndex)}
                          className="border-purple_3 border text-purple_3 rounded px-3 py-2"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddChoice(index)}
                      className="bg-purple_3 text-white rounded px-3 py-2 my-1.5"
                    >
                      Thêm lựa chọn
                    </button>
                  </div>
                )}
                {question.type === "FILL_IN_THE_BLANK" && (
                  <div>
                    {question.hints.length ? (
                      <p className={"font-bold"}>Gợi ý:</p>
                    ) : null}
                    {question.hints.map((hint, hintIndex) => (
                      <div key={hintIndex} className="flex items-center mb-2">
                        <input
                          type="text"
                          placeholder={`Nhập gợi ý ${hintIndex + 1}...`}
                          value={hint.content}
                          onChange={(e) =>
                            handleChangeHint(index, hintIndex, e.target.value)
                          }
                          className="mr-2 border border-black rounded px-3 py-2"
                        />
                        <button
                          onClick={() => handleDeleteHint(index, hintIndex)}
                          className="border-purple_3 border text-purple_3 rounded px-3 py-2"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddHint(index)}
                      className="bg-purple_3 text-white rounded px-3 py-2 my-1.5 mr-3"
                    >
                      Thêm gợi ý
                    </button>
                    {question.answerHints.length ? (
                      <p className={"font-bold"}>Đáp án gợi ý:</p>
                    ) : null}

                    {question.answerHints.map((hint, hintIndex) => (
                      <div key={hintIndex} className="flex items-center mb-2">
                        <input
                          type="text"
                          placeholder={`Nhập đáp án gợi ý ${hintIndex + 1}...`}
                          value={hint.content}
                          onChange={(e) =>
                            handleChangeAnswerHint(
                              index,
                              hintIndex,
                              e.target.value,
                            )
                          }
                          className="mr-2 border border-black rounded px-3 py-2"
                        />
                        <button
                          onClick={() =>
                            handleDeleteAnswerHint(index, hintIndex)
                          }
                          className="border-purple_3 border text-purple_3 rounded px-3 py-2"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddAnswerHint(index)}
                      className="bg-purple_3 text-white rounded px-3 py-2 my-1.5"
                    >
                      Thêm đáp án gợi ý
                    </button>
                  </div>
                )}
                <button
                  onClick={() => handleDeleteQuestion(index)}
                  className="border-purple_3 border text-purple_3 rounded px-3 py-2 my-1.5"
                >
                  Xóa câu hỏi
                </button>
              </div>
            ))}
            <div className={"flex flex-col"}>
              <button
                onClick={handleAddQuestion}
                className="bg-purple_3 text-white rounded px-3 py-2 my-1.5 w-fit"
              >
                Thêm câu hỏi
              </button>
              <button
                onClick={handleSubmit}
                className="bg-purple_3 text-white rounded px-3 py-2 my-1.5 w-fit mx-auto font-bold"
              >
                Tạo bài kiểm tra
              </button>
              <Modal
                title="Tạo bài tập thành công"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{
                  style: { backgroundColor: colors.purple_3, color: "white" },
                }}
                okText={"Xem bài tập"}
                cancelText={"Tiếp tục tạo bài tập"}
              >
                <br />
                <br />
                <br />
              </Modal>
            </div>
          </>
        ) : null}
      </div>
      <div className={"col-span-1"}>
        <TestPreview testData={testData} />
      </div>
    </div>
  );
};

export default CreateTestForm;
