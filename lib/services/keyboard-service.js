define([
    "services/graphics-service", 
    "game", 
    "services/parser-service",
    "definitions/IO"
], (
    graphicsService, 
    game, 
    parserService,
    IO
)=>{
    let keyboardService = {
        eventKeys: [
            "Alt", 
            "CapsLock", 
            "Control",
            "Escape",
            "F1",
            "F10",
            "F11",
            "F12",
            "F2",
            "F3",
            "F4",
            "F5",
            "F5", 
            "F6",
            "F7",
            "F8",
            "F9",
            "Meta",
            "Shift", 
            "Tab",
        ],
        init:()=>{
           keyboardService["blacklist"] = {}; 
            keyboardService.eventKeys.forEach(key=>{
                keyboardService.blacklist[key] = true;
            });
        },
        handleKeyPress: (event)=>{ 
            if (keyboardService.blacklist[event.key]) return;
            let buffer = keyboardService["buffer"] || "";
            let words = buffer.split(" ");
            if (buffer.length + 1 >= 40 ) return;

            switch(event.key){
                case 'Backspace':
                    if (buffer.length == 0) return;
                    let temp = buffer.split('');
                    temp = temp.splice(-buffer.length, buffer.length-1);
                    buffer = temp.join('');
                    break;
                
                case 'Enter':
                    graphicsService.text.clear();
                    if (buffer=="") keyboardService.buffer = IO.Output.Unicode.CR;
                    game.Play.runCommand(keyboardService.buffer);
                    keyboardService.buffer = null;
                    return;

                default:
                    buffer += event.key;
            }
            words = buffer.split(" ");
            keyboardService.buffer = buffer;
            graphicsService.text.set(words.join(IO.Output.Unicode.Space));
        },
        listen:()=>{
            addEventListener("keydown", keyboardService.handleKeyPress);
        }
    };
    keyboardService.init();
    return keyboardService;
});
