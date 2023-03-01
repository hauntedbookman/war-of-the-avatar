define(["services/graphics", "services/parser"],(graphics, parser)=>{
    const io = {
            TextMode: {
                on: () => {
                    graphics.element.gameWindow.innerHTML = "";
                },
                off:() => {
                    graphics.element.gameWindow.innerHTML = "";
                }
            },
            Response: {
                attachImage:(pngName, el, timeout = null)=>{
                    let img = graphics.DOM.createElement("img");
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
                    var audio = new Audio(`./assets/sounds/${audioFile}.mp3`);
                    audio.play();                    
                },
                skipLine:()=>{
                    io.Response.say("<br>");
                },
                say:(message)=>{
                    content.innerHTML = null;
                    let createMessageElement = (index, msg)=>{
                        let msgEl = graphics.DOM.createElement("div");
                        msgEl.className="message";
                        msgEl.innerHTML = msg;
                        msgEl.style.bottom = `${60 * (parseInt(index) + 1)}px`;
                        return msgEl;
                    }
                    io.Response["queue"] = io.Response["queue"] || [];
                    if (io.Response.queue.length >= 21) io.Response.queue.shift();
                    io.Response.queue.push(message);
                    let count=1;
                    for(var i = io.Response.queue.length - 1; i >= 0; i--){
                        let message = io.Response.queue[i];
                        let el = createMessageElement(count, message);
                        content.appendChild(el);
                        count++;
                    }
                }
            },
            CommandLine: {
                clearText: ()=>{
                    graphics.element.textElement.innerHTML = "";
                }
            }
        };
    return io;
});
