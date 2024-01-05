const mongoose = require("mongoose");
const Mcq = require("../Models/mcq");
exports.get_all_creators = async (req, res, next) => {
  try {
    const get_all = await Mcq.find();
    res.status(200).json({
      data: get_all,
      message: "Successfully retreived all data",
    });
  } catch (err) {
    res.status(500).json({
      error: "There is an error",
    });
  }
};

exports.create_mcq = async (req, res, next) => {
  try {
    const mcqsData = req.body;
    console.log(mcqsData);

    if (mcqsData.length === 0) {
      console.log("im here");
      return res.status(400).json({
        error: "Invalid request body. An array of non-empty MCQs is required.",
      });
    }

    const savePromises = [];

    if (!mcqsData.creatorId || !mcqsData.tests || mcqsData.tests.length === 0) {
      console.log("Invalid MCQ format:", mcqsData);
      return; // Skip to the next iteration if the format is invalid
    }

    const existingMcq = await Mcq.findOne({ creatorId: mcqsData.creatorId });
    if (existingMcq) {
      existingMcq.tests.push({
        questions: mcqsData.tests.questions.map((question) => ({
          question: question.question,
          options: question.options,
          correctAnswer: question.correctAnswer,
        })),
      });
      try {
        await existingMcq.save();
        console.log("Document updated successfully");
        savePromises.push(existingMcq);
      } catch (error) {
        console.error("Error updating document:", error);
      }
    } else {
      // Creator ID does not exist, create a new document
      const newMcq = new Mcq({
        creatorId: mcqsData.creatorId,
        tests: [
          {
            questions: mcqsData.tests.questions.map((question) => ({
              question: question.question,
              options: question.options,
              correctAnswer: question.correctAnswer,
            })),
          },
        ],
      });

      try {
        await newMcq.save();
        console.log("Document saved successfully");
        savePromises.push(newMcq);
      } catch (error) {
        console.error("Error saving document:", error);
      }
    }

    const results = await Promise.all(savePromises);

    const successfulResults = results.filter((result) => result !== null);

    if (successfulResults.length > 0) {
      console.log("MCQs saved successfully:", successfulResults);
      res.status(201).json({
        message: "Created successfully",
        createdMcq: successfulResults,
      });
    } else {
      res.status(500).json({
        error: "No MCQs were successfully created or updated",
      });
    }
  } catch (err) {
    console.error("Error creating MCQs:", err);
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.get_creator = async (req, res, next) => {
  try {
    const creatorId = req.params.creatorId;
    const docs = await Mcq.findOne({ creatorId: creatorId }).exec();

    if (docs) {
      const resp = {
        count: docs.tests.length,
        tests: docs.tests.map((test) => {
          return {
            _id: test._id,
            questions: test.questions.map((question) => {
              return {
                // _id: question._id,
                question: question.question,
                options: question.options,
                correctAnswer: question.correctAnswer,
              };
            }),
          };
        }),
      };
      res.status(200).json(resp);
    } else {
      res.status(200).json({
        response: docs,
        message: "No tests found for the specified creatorId",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message || "Internal Server Error",
    });
  }
};

exports.get_test = async (req, res, next) => {
  try {
    console.log(req.userData);
    const creatorId = req.params.creatorId;
    const testId = req.params.testId;

    const test = await Mcq.findOne({
      creatorId: creatorId,
      "tests._id": testId,
    })
      .select("tests.$")
      .exec();

    if (test && test.tests.length > 0) {
      const resp = {
        test: {
          _id: test.tests[0].id,
          count: test.tests[0].questions.length,
          questions: test.tests[0].questions.map((ques) => {
            return {
              question: ques.question,
              options: ques.options,
              correctAnswer: ques.correctAnswer,
            };
          }),
        },
      };
      res.status(200).json(resp);
    } else {
      res.status(404).json({
        message: "Test Not Found",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
