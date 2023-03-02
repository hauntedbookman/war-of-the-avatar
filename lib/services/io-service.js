define(
    [
        "services/graphics-service", 
        "services/parser-service"
    ],
    (
        graphicsService, 
        parserService
    )=>{
    const ioService = {
            TextMode: {
                on: () => {
                    graphicsService.element.gameWindow.innerHTML = "";
                },
                off:() => {
                    graphicsService.element.gameWindow.innerHTML = "";
                }
            },
            Response: {
                attachImage:(pngName, el, timeout = null)=>{
                    let img = graphicsService.DOM.createElement("img");
                    img.src = `./assets/graphics/${pngName}.png`;
                    img.className="game-image";
                    el.appendChild(img);
                    if (timeout){
                        setTimeout(()=>{
                            el.removeChild(img);
                        }, timeout * 1000);
                    };
                },
                playSound:(audioFile, el)=>{
                    var audio = new Audio(`./assets/sounds/${ audioFile }.mp3`);
                    audio.play();                    
                },
                skipLine:()=>{
                    ioService.Response.say("<br>");
                },
                say:(message)=>{
                    content.innerHTML = null;
                    let createMessageElement = (index, msg)=>{
                        let msgEl = graphicsService.DOM.createElement("div");
                        msgEl.className="message";
                        msgEl.innerHTML = msg;
                        msgEl.style.bottom = `${60 * (parseInt(index) + 1)}px`;
                        return msgEl;
                    }
                    ioService.Response["queue"] = ioService.Response["queue"] || [];
                    if (ioService.Response.queue.length >= 21) ioService.Response.queue.shift();
                    ioService.Response.queue.push(message);
                    let count=1;
                    for(var i = ioService.Response.queue.length - 1; i >= 0; i--){
                        let message = ioService.Response.queue[i];
                        let el = createMessageElement(count, message);
                        content.appendChild(el);
                        count++;
                    }
                }
            },
            CommandLine: {
                clearText: ()=>{
                    graphicsService.element.textElement.innerHTML = "";
                }
            }
        };
    return ioService;
});
