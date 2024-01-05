import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import userDashboard from "./userDashboard";
import "tailwindcss/tailwind.css";

import { get_allCreators } from "../http";
function StartPage() {
  const userName = useSelector((state) => state.user.userName);
  const router = useRouter();
  const [creators, setCreators] = useState([]);
  async function getData() {
    try {
      const resp = await get_allCreators();
      setCreators(resp);
    } catch (err) {
      console.log("Error", err);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function handleHostButton() {
    router.push(`/${userName}/create`);
  }
  function handleDashboardButton() {
    router.push(`/dashboard`);
  }
  return (
    <div className="my-10 container mx-auto px-6">
      <div className="flex">
        <h1 className="my-3 font-bold text-sky-400/100 font-weight: 2000 text-4xl">
          List of available creators
        </h1>
        <button
          type="button"
          className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleHostButton}
        >
          Host an MCQ
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleDashboardButton}
        >
          Dashboard
        </button>
      </div>

      <div class="grid grid-cols-4 gap-6">
        {creators.map((creator) => (
          <div
            key={creator[0]}
            class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {`Creator Name : ${creator[0]}`}
              </h5>
            </a>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {`This creator has total of ${creator[1]} tests , consider taking the test by clicking the below button`}
            </p>
            <button
              onClick={() => {
                router.push(`/${creator[0]}`);
              }}
              class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get Access
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

export default StartPage;
