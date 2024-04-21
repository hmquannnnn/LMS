"use client";

import { useEffect, useState } from "react";
import { indexToAlphabet } from "@/app/library/[documentId]/[testType]/page";

const CreateTestForm = () => {
  const [testData, setTestData] = useState({
    documentId: 0,
    title: "",
    questions: [],
  });

  const handleAddQuestion = () => {
    setTestData({
      ...testData,
      questions: [
        ...testData.questions,
        {
          question: "",
          type: "SINGLE_CHOICE",
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
    updatedQuestions[questionIndex].choices[choiceIndex].isAnswer =
      !updatedQuestions[questionIndex].choices[choiceIndex].isAnswer;
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

  useEffect(() => {
    console.log(testData);
  }, [testData]);

  const handleSubmit = () => {
    console.log(testData);
  };

  return (
    <div className="border border-gray-300 p-4 rounded-lg create-test">
      <input
        type="text"
        placeholder="Nhập tiêu đề..."
        value={testData.title}
        onChange={(e) => setTestData({ ...testData, title: e.target.value })}
        className="block mb-4 border border-black rounded px-3 py-2"
      />
      {testData.questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p className={"font-bold"}>Câu {index + 1}</p>
          <input
            type="text"
            placeholder="Nhập nội dung câu hỏi..."
            value={question.question}
            onChange={(e) =>
              handleChangeQuestion(index, "question", e.target.value)
            }
            className="block mb-2 border border-black rounded px-3 py-2"
          />
          <select
            value={question.type}
            onChange={(e) =>
              handleChangeQuestion(index, "type", e.target.value)
            }
            className="block mb-2 border border-black rounded px-3 py-2"
          >
            <option value="SINGLE_CHOICE">Trắc nghiệm có 1 đáp án đúng</option>
            <option value="MULTIPLE_CHOICE">
              Trắc nghiệm có nhiều đáp án đúng
            </option>
            <option value="FILL_IN_BLANK">Tự luận</option>
          </select>
          {question.type !== "FILL_IN_BLANK" && (
            <div>
              {question.choices.map((choice, choiceIndex) => (
                <div key={choiceIndex} className="flex items-center mb-2">
                  <p className={"font-bold"}>
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
                      question.type === "SINGLE_CHOICE" ? "radio" : "checkbox"
                    }
                    checked={choice.isAnswer}
                    onChange={() => handleToggleAnswer(index, choiceIndex)}
                    className="mr-2"
                  />
                  <button
                    onClick={() => handleDeleteChoice(index, choiceIndex)}
                    className="bg-purple-500 text-white rounded px-3 py-2"
                  >
                    Xóa
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddChoice(index)}
                className="bg-purple-500 text-white rounded px-3 py-2"
              >
                Thêm lựa chọn
              </button>
            </div>
          )}
          {question.type === "FILL_IN_BLANK" && (
            <div>
              {question.hints.map((hint, hintIndex) => (
                <div key={hintIndex} className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder={`Nhập gợi ý ${hintIndex + 1}...`}
                    value={hint.content}
                    onChange={(e) =>
                      handleChangeHint(
                        index,
                        hintIndex,
                        "content",
                        e.target.value,
                      )
                    }
                    className="mr-2 border border-black rounded px-3 py-2"
                  />
                  <button
                    onClick={() => handleDeleteHint(index, hintIndex)}
                    className="bg-purple-500 text-white rounded px-3 py-2"
                  >
                    Xóa
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddHint(index)}
                className="bg-purple-500 text-white rounded px-3 py-2"
              >
                Thêm gợi ý
              </button>
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
                        "content",
                        e.target.value,
                      )
                    }
                    className="mr-2 border border-black rounded px-3 py-2"
                  />
                  <button
                    onClick={() => handleDeleteAnswerHint(index, hintIndex)}
                    className="bg-purple-500 text-white rounded px-3 py-2"
                  >
                    Xóa
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddAnswerHint(index)}
                className="bg-purple-500 text-white rounded px-3 py-2"
              >
                Thêm đáp án gợi ý
              </button>
            </div>
          )}
          <button
            onClick={() => handleDeleteQuestion(index)}
            className="bg-purple-500 text-white rounded px-3 py-2"
          >
            Xóa câu hỏi
          </button>
        </div>
      ))}
      <button
        onClick={handleAddQuestion}
        className="bg-purple-500 text-white rounded px-3 py-2"
      >
        Thêm câu hỏi
      </button>
      <button
        onClick={handleSubmit}
        className="bg-purple-500 text-white rounded px-3 py-2"
      >
        Tạo bài kiểm tra
      </button>
    </div>
  );
};

export default CreateTestForm;
