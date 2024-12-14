import { getFileSource } from "./getFileSource";
import { renderFile } from "./renderFile";

export default function GetMedia({ file, isFullscreenable, isDesktop }) {
  const fileInfo = getFileSource(file);
  return renderFile(fileInfo, isFullscreenable, isDesktop);
}
