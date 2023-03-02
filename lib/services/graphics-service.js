define([],()=>{
    let graphicsService = {

        init:(document)=>{
            const dom = document;
            const element = graphicsService["element"] = {}
            element["commandLine"] = dom.getElementById('command-line');
            element["content"] = dom.getElementById('content');
            element["cursor"] = dom.getElementById('cursor');
            element["gameWindow"] = dom.getElementById('game-window');
            element["text"] = dom.getElementById('text-element');
            graphicsService["DOM"] = dom;
            graphicsService.prompt.flashPrompt();
        },

        text: {
            clear:()=>{
                graphicsService.element.text.innerText = null;
            },
            set:(content)=>{
                graphicsService.element.text.innerText = content;
            }
        },
        prompt:{
            killPrompt: ()=>{
                clearInterval(prompt.intervalId);
                cursorElement.style.visibility = "hidden";
            },
            flashPrompt: ()=>{
                if (graphicsService.prompt.intervalId) clearInterval(graphicsService.prompt.intervalId);
                graphicsService.prompt["intervalId"] = setInterval(()=>{
                    graphicsService.prompt["state"] = !graphicsService.prompt["state"];
                    graphicsService.element.cursor.style.visibility = graphicsService.prompt.state ? "visible" : "hidden";                   
                }, 175);
            },
        }
    }
    return graphicsService;
});