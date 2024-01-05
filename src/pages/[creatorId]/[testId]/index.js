import { useState, useEffect } from "react";
import Modal from "../../../components/Modal";
import { useRouter } from "next/router";
import { get_test, post_user_data } from "../../../http";
import Timer from "../../../components/Timer";
import { useSelector } from "react-redux";
export default function TestPage({ params }) {
  const router = useRouter();
  const userName = useSelector((state) => state.user.userName);
  const { creatorId, testId } = router.query;
  const [test_data, setTestData] = useState([]);
  const [test_count, setTestCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [test_result, setTestResult] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const isLastQuestion = currentQuestion === test_count - 1;

  async function getTestDetails() {
    try {
      const resp = await get_test(creatorId, testId);
      const data = await resp;
      setTestData(data.test);
      setTestCount(data.test.count);
    } catch (error) {
      console.error("Error fetching test details:", error);
    }
  }

  useEffect(() => {
    getTestDetails();
  }, []);

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) =>
      prevQuestion < test_count - 1 ? prevQuestion + 1 : prevQuestion
    );
    setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, null]);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.slice(0, prevSelectedOptions.length - 1)
    );
  };

  const handleOptionClick = (option) => {
    setSelectedOptions((prevSelectedOptions) => [
      ...prevSelectedOptions.slice(0, currentQuestion),
      option,
      ...prevSelectedOptions.slice(currentQuestion + 1),
    ]);
  };
  async function update_user_data(userName, testId, test_result) {
    const resp_1 = await post_user_data(userName, testId, test_result);
    // const data = await resp_1.json();
    // console.log(data);
  }
  async function getFinalResult() {
    let result = 0;
    // console.log(test_data);
    test_data.questions.map((ans, idx) => {
      // console.log(ans.correctAnswer === selectedOptions[idx]);
      if (ans.correctAnswer === selectedOptions[idx]) {
        result++;
      }
    });
    console.log(result);
    // setTestResult(result);
    return result;
  }

  const handleSubmit = () => {
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  const handleTimeUp = () => {
    setTimeUp(true);
    // getFinalResult();
    setTestResult(final());
    router.push("/start");
    console.log(test_result);
  };

  async function final() {
    const res = await getFinalResult();
    setTestResult(res);
    return res

  }

  const currentQuestionData = test_data?.questions?.[currentQuestion];
  const hasPrevQuestion = currentQuestion > 0;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-sky-400/100 text-2xl mb-4">
        <Timer timeLimit={60} onTimeUp={handleTimeUp} />
      </div>
      <div className="flex items-center justify-center">
        {currentQuestionData && (
          <div className="max-w-2xl p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {currentQuestionData.question}
            </h5>
            <div className="flex-auto space-x-3">
              {currentQuestionData.options.map((option, optionIndex) => (
                <button
                  key={optionIndex}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white active:bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-2000 "
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-4 space-x-4">
              {hasPrevQuestion && (
                <button
                  onClick={handlePrevQuestion}
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Previous Question
                </button>
              )}
              {isLastQuestion ? (
                <button
                  onClick={handleSubmit}
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Next Question
                </button>
              )}
            </div>
            <div className="mt-4 text-sky-400">
              <p>Selected Options: {selectedOptions.join(" | ")}</p>
            </div>
            {isModalVisible && (
              <Modal
                openModal={isModalVisible}
                onClose={handleModalClose}
                onProceed={getFinalResult}
                // updateData={update_user_data}
                userName={userName}
                testId={testId}
                final={final}
                total = {test_count}

              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
