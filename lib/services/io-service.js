define(
    [
        "services/graphics-service", 
        "services/parser-service",
        "support/common"
    ],
    (
        graphicsService, 
        parserService,
        common
    )=>{

    const helpers = {

        createMessageElement: (msg)=>{
            let msgEl = graphicsService.DOM.createElement("div");
            msgEl.className = "message";
            msgEl.innerHTML = msg;
            msgEl.style.bottom = "60px";
            return msgEl;
        }

    }

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

                sayMany:(messages, useSameLine)=>{
                    for (var msg in messages || []) {
                        let message = messages[msg];
                        ioService.Response.say(message, useSameLine); 
                    }
                },
                    
                say:(message, useSameLine)=>{
                    let endLine = useSameLine ? "&nbsp;" : "<br>";
                    content.innerHTML = null;
                    message = message || "<span style='color:black;'>_</span>";
                    ioService.Response["queue"] = ioService.Response["queue"] || [];
                    if (ioService.Response.queue.length >= 17) ioService.Response.queue.shift();
                    ioService.Response.queue.push(message + endLine);
                    let messages = ioService.Response.queue.join('<br>');          
                    messages = messages.replace(/&nbsp;<br>/g, "&nbsp;");
                    let el = helpers.createMessageElement(messages);
                    content.appendChild(el);
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
