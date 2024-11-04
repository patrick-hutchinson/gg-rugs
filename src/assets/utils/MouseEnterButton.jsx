export function MouseEnterButton(e) {
  let currentSource = e.currentTarget.querySelector("img").getAttribute("src");
  let splicedSource = currentSource.slice(0, -4) + "_focus.svg";

  e.currentTarget.querySelector("img").setAttribute("src", splicedSource);
}
