export async function userSignUp(email, password, userName) {
  const response = await fetch("http://localhost:8080/user/signup", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
      userName: userName,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });

  console.log(response);
  if (!response.ok) {
    return false;
  } else {
    return true;
  }
}

export async function userLogin(email, password) {
  const response = await fetch("http://localhost:8080/user/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    credentials: "include",
    headers: {
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    return "";
  } else {
    const responseData = await response.json();
    console.log("success", responseData.det.userName);
    return responseData.det.userName;
  }
}

export async function get_allCreators() {
  const creators = new Array();
  const response = await fetch("http://localhost:8080/creator");
  if (!response.ok) {
    throw new Error("Http Error ");
  }
  const data = await response.json();
  for (const creator of data.data) {
    const count = Object.keys(creator.tests).length;
    creators.push([creator.creatorId, count]);
  }

  return creators;
}

export async function get_creator_tests(creatorId) {
  try {
    const response = await fetch(`http://localhost:8080/creator/${creatorId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching creator tests:", error);
    throw error;
  }
}

export async function get_test(creatorId, testId) {
  try {
    const response = await fetch(
      `http://localhost:8080/creator/${creatorId}/${testId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Fetching test", error);
    throw error;
  }
}

export async function create_mcq(creatorId, tests) {
  try {
    const response = await fetch(`http://localhost:8080/creator/create`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ creatorId: creatorId, tests }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      console.log(response);
      return false;
    }
    return true;
  } catch (error) {
    console.log("error in fetching user tests", error);
    throw error;
  }
}

export async function post_user_data(userName, testId, score, total) {
  try {
    // console.log(userName , testId , score);
    const response = await fetch("http://localhost:8080/userdata/user", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        userName: userName,
        testId: testId,
        score: score,
        total: total,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      console.log("Failed to get data");
    }
    console.log(response);
  } catch (err) {
    console.log("There is some error ");
  }
}

export async function get_user_data(userName) {
  console.log(userName);
  try {
    const response = await fetch(
      `http://localhost:8080/userdata/usertest/${userName}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-type": "application/json" },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch the data");
    }

    const jsonData = await response.json();
    return jsonData;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
}
