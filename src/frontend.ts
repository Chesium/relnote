export class frontendEvent {

}

export default class frontend {
  log(str:string, type:string) {
    let logDiv = document.getElementById("log") as HTMLElement;
    logDiv.innerHTML += `<p class=log_${type}>${str}</p>`;
    logDiv.scrollTop = logDiv.scrollHeight;
  }
  err(str:string){
    alert(str);
  }
  handleEvent(ev:frontendEvent){
    
  }
}