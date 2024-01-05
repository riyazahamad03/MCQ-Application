import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { get_creator_tests } from "../../http";
export default function CreatorPage() {
  const router = useRouter();
  const { creatorId } = router.query;
  const [tests, setTests] = useState([]);
  const [testLength, setTestLength] = useState(0);
  async function get_tests() {
    try {
      const data = await get_creator_tests(creatorId);
      setTests(data.tests || []); 
      setTestLength((data.tests || []).length); 
    } catch (error) {
      console.error("Error fetching creator tests:", error);
    }
  }

  useEffect(() => {
    get_tests();
  }, []);

  return (
    <div className="my-10 container mx-auto px-6">
      <h1 className="my-2 font-style: italic font-weight: 900">
        There Are Totally {testLength} Test From This Creator
      </h1>
      <div class="grid grid-cols-4 gap-6">
        {tests &&
          tests.map((test) => (
            <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {`Test Id : ${test._id}`}
                </h5>
              </a>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {`This test has total of ${test.questions.length} questions , consider taking the test by clicking the below button`}
              </p>
              <button
                onClick={() => {
                  router.push(`/${creatorId}/${test._id}`);
                }}
                class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Take Test
                <svg
                  class="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
