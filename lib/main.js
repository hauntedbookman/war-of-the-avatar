define(["services/keyboard", "services/graphics"],(keyboard, graphics)=>{
    let main = {
        init:() => {
            removeEventListener("readystatechange", ()=>{});
            main["dirty"] = true;
            graphics.init(window.document);
            keyboard.listen();
            graphics.prompt.flashPrompt();
        }        
    }
    if (window.document.readyState=="interactive" || window.document.readyState=="complete") main.init();
    addEventListener("readystatechange",()=>{
        if (!main.dirty) {
            if (window.document.readyState=="interactive" || window.document.readyState=="complete") main.init();            
        }
    });
});