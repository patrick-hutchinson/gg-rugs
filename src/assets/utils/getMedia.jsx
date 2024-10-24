import { getFileSource } from "./getFileSource";
import { renderFile } from "./renderFile";

export default function GetMedia({ file }) {
  const fileInfo = getFileSource(file);
  return renderFile(fileInfo);
}
