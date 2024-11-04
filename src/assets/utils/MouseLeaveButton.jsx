export function MouseLeaveButton(e) {
  let currentSource = e.currentTarget.querySelector("img").getAttribute("src");
  let splicedSource = currentSource.slice(0, -10) + ".svg";

  e.currentTarget.querySelector("img").setAttribute("src", splicedSource);
}
