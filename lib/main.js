define(["keyboard", "graphics"],(keyboard, graphics)=>{
    let main = {
        init:() => {
            graphics.init(window.document);
            keyboard.listen();
            graphics.prompt.flashPrompt();
        }        
    }
    if (window.document.readyState=="interactive") {
        main.init();
    } else {
        addEventListener("DOMContentLoaded", main.init);
    }

});