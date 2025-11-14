import status from "http-status";
import sendResponse from "../utils/sendResponse.js";
import generateTextWithGemini from "../utils/generateTextWithGemini.js";

export const generateText = async (req, res, next) => {
  const { prompt } = req.body;
  try {
    const text = await generateTextWithGemini(prompt);
    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Text generated successfully!",
      data: text,
    });
  } catch (error) {
    next(error);
  }
};
