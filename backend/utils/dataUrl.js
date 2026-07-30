import DataURIParser from "datauri/parser.js";
import path from "path";

const parser = new DataURIParser();

const getDataUrl = (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const extName = path.extname(file.originalname).toString();

  return parser.format(extName, file.buffer);
};

export default getDataUrl;