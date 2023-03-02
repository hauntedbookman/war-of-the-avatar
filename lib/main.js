define(
    [
        "services/keyboard-service", 
        "services/graphics-service"
    ],
    (
        keyboardService, 
        graphicsService
    ) => {
    let main = {
        init:() => {
            removeEventListener("readystatechange", ()=>{});
            main["dirty"] = true;
            graphicsService.init(window.document);
            keyboardService.listen();
            graphicsService.prompt.flashPrompt();
        }        
    }
    if (window.document.readyState=="interactive" || window.document.readyState=="complete") main.init();
    addEventListener("readystatechange",()=>{
        if (!main.dirty) {
            if (window.document.readyState=="interactive" || window.document.readyState=="complete") main.init();            
        }
    });
});