define([],()=>{
    let graphics = {

        init:(document)=>{
            const dom = document;
            const element = graphics["element"] = {}
            element["commandLine"] = dom.getElementById('command-line');
            element["content"] = dom.getElementById('content');
            element["cursor"] = dom.getElementById('cursor');
            element["gameWindow"] = dom.getElementById('game-window');
            element["text"] = dom.getElementById('text-element');
            graphics["DOM"] = dom;
            graphics.prompt.flashPrompt();
        },

        text: {
            clear:()=>{
                graphics.element.text.innerText = null;
            },
            set:(content)=>{
                graphics.element.text.innerText = content;
            }
        },
        prompt:{
            killPrompt: ()=>{
                clearInterval(prompt.intervalId);
                cursorElement.style.visibility = "hidden";
            },
            flashPrompt: ()=>{
                if (graphics.prompt.intervalId) clearInterval(graphics.prompt.intervalId);
                graphics.prompt["intervalId"] = setInterval(()=>{
                    graphics.prompt["state"] = !graphics.prompt["state"];
                    graphics.element.cursor.style.visibility = graphics.prompt.state ? "visible" : "hidden";                   
                }, 175);
            },
        }
    }
    return graphics;
});