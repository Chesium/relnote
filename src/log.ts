export default function log(str:string, type:string):void {
  let logDiv = document.getElementById("log") as HTMLElement;
  logDiv.innerHTML += `<p class=log_${type}>${str}</p>`;
  logDiv.scrollTop = logDiv.scrollHeight;
}
