export default class frontend {
  log(str, type) {
    let logDiv = document.getElementById("log");
    logDiv.innerHTML += `<p class=log_${type}>${str}</p>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  }
  err(str){
    alert(str);
  }
  handleEvent(ev){
    
  }
}