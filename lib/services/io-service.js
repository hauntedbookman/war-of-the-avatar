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
        createMessageElement: (index, msg)=>{
            debugger;
            let msgEl = graphicsService.DOM.createElement("div");
            msgEl.className = "message";
            msgEl.innerHTML = msg;
            msgEl.style.bottom = `${ 60 * (parseInt(index+ 1)) }px`;
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

                sayMany:(messages)=>{
                    for (var msg in messages || []) {
                        let message = messages[msg];
                        ioService.Response.say(message); 
                    }
                },
                    
                say:(message)=>{

                    content.innerHTML = null;

                    // get current phrase queue
                    ioService.Response["queue"] = ioService.Response["queue"] || [];

                    //  move queue 
                    if (ioService.Response.queue.length >= 21) ioService.Response.queue.shift();
                    ioService.Response.queue.push(message);

                    // process message loop
                    let messageQueueCopy =  common.getCopy(ioService.Response.queue);
                    while (messageQueueCopy.length) {
                        let message = messageQueueCopy.shift();
                        let el = helpers.createMessageElement(messageQueueCopy.length, message);
                        content.appendChild(el);
                    }
                    // for(var i = ioService.Response.queue.length - 1; i >= 0; i--){
                    //     let message = ioService.Response.queue[i];
                    //     console.log(message);
                    //     let el = helpers.createMessageElement(count, message);
                    //     content.appendChild(el);
                    //     count++;
                    // }
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
