const Candidate = require("../Models/candidate");

exports.post_user_data = async (req, res, next) => {
  const { userName, testId, score, total } = req.body;

  if (!userName) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    let user = await Candidate.findOne({ username: userName });

    if (user) {
      const updatedUser = await Candidate.findOneAndUpdate(
        { username: userName },
        {
          $push: {
            tests: { testId, score: (score / total) * 100 },
          },
        },
        { new: true }
      );
      console.log("Updated user:", updatedUser);
    } else {
      const newUser = new Candidate({
        username: userName,
        tests: [{ testId, score: (score / total) * 100 }],
      });

      const result = await newUser.save();
      console.log("New user:", result);
    }

    res.status(200).json({
      message: "success",
      data: { userName, testId, score, total },
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.get_user_data = async (req, res, next) => {
  const userName = req.params.userName
  console.log(userName);
  try {
    const userTestData = await Candidate.findOne({ username: userName });

    if (userTestData) {
      return res.status(200).json({
        message: "Data found",
        tests: userTestData.tests.map((test) => {
          return { testId: test.testId, score: test.score, id: test._id };
        }),
      });
    } else {
      return res.status(404).json({
        message: "Test not found",
      });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
