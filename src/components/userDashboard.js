import { useEffect, useState } from "react";
import { get_user_data } from "../http";
import { useSelector } from "react-redux";

function UserDashboard() {
  const [uName, setuName] = useState("");
  const [test, setTest] = useState([]);
  const userName = useSelector((state) => state.user.userName);

  useEffect(() => {
    const storedUName = localStorage.getItem("uName");
    if (storedUName) {
      setuName(storedUName);
    }
  }, []);

  useEffect(() => {
    if (userName.length > 0) {
      setuName(userName);
      localStorage.setItem("uName", userName);
    }
  }, [userName]);

  async function getdashboard() {
    console.log(uName);
    if (uName.length > 0) {
      try {
        const data = await get_user_data(uName);
        setTest(data.tests);
        console.log(test);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  }

  useEffect(() => {
    getdashboard();
  }, [uName]);

  return (
    <div className="my-10 container mx-auto px-6">
      <h1 className="my-3 font-bold text-sky-400/100 font-weight: 2000 text-4xl">
         {uName}'s Dashboard
      </h1>
      <div className="grid grid-cols-4 gap-4">
        {test &&
          test.map((t) => (
            <a
              key={t.id}
              className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Test Id : {t.testId}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Test Score : {t.score}%
              </p>
            </a>
          ))}
      </div>
    </div>
  );
}

export default UserDashboard;
