export default function log(str, type) {
  let logDiv = document.getElementById("log");
  logDiv.innerHTML += `<p class=log_${type}>${str}</p>`;
  logDiv.scrollTop = logDiv.scrollHeight;
}
