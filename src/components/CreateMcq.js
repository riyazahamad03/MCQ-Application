import { useRouter } from "next/router";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { create_mcq } from "../http";
function CreateMcq() {
  const router = useRouter();
  const { creatorId } = router.query;
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", "", ""]);
  const [questionData, setQuestionData] = useState([]);

  function handleQuestionChange(e) {
    setQuestion(e.target.value);
    // console.log(e.target.value);
  }

  function handleOptionChange(e, idx) {
    const prevOptions = [...options];
    prevOptions[idx] = e.target.value;
    setOptions(prevOptions);
    // console.log(prevOptions);
  }

  function handleNextChange() {
    if (
      question.length > 0 &&
      options[1].length > 0 &&
      options[2].length > 0 &&
      options[3].length > 0 &&
      options[4].length > 0
    ) {
      const data = {
        question: question,
        options: options.slice(0, 4),
        correctAnswer: options[4],
      };

      setQuestionData((prev) => [...prev, data]);

      setOptions(["", "", "", "", ""]);
      setQuestion("");
    }
  }
  function handleSubmitButton() {
    const resData = { questions: questionData };
    // console.log(resData);
    if (questionData.length > 0) {
      create_mcq(creatorId, resData);
      router.push("/start");
    }
    console.log(questionData);
  }
  return (
    <form class="bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="mb-5 ">
        <label
          for="large-input"
          class="block mb-2 text-sm font-medium text-white-900 dark:text-white"
        >
          Enter The Question Below
        </label>
        <input
          type="text"
          id="large-input"
          value={question}
          onChange={(e) => handleQuestionChange(e)}
          class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Option 1
          </label>
          <input
            type="text"
            id="small-input"
            value={options[0]}
            onChange={(e) => handleOptionChange(e, 0)}
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>

        <div>
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Option 2
          </label>
          <input
            type="text"
            id="small-input"
            value={options[1]}
            onChange={(e) => handleOptionChange(e, 1)}
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Option 3
          </label>
          <input
            type="text"
            id="small-input"
            value={options[2]}
            onChange={(e) => handleOptionChange(e, 2)}
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div>
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Option 4
          </label>
          <input
            type="text"
            id="small-input"
            value={options[3]}
            onChange={(e) => handleOptionChange(e, 3)}
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="grid mb-4">
          <label
            for="small-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Correct Answer
          </label>
          <input
            type="text"
            id="small-input"
            value={options[4]}
            onChange={(e) => handleOptionChange(e, 4)}
            class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-14 py-3 mb-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={handleNextChange}
          >
            Next
          </button>
          <button
            type="button"
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-14 py-3 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleSubmitButton}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateMcq;
