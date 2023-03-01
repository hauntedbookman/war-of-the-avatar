define([
    "services/graphics", 
    "game", 
    "services/parser"
], (
    graphics, 
    game, 
    parser
)=>{
    let keyboard={
        unicodes:{
            Space: "\u00A0",
            CR: "\u2386"
        },
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
           keyboard["blacklist"] = {}; 
            keyboard.eventKeys.forEach(key=>{
                keyboard.blacklist[key] = true;
            });
        },
        handleKeyPress: (event)=>{ 
            if (keyboard.blacklist[event.key]) return;
            let buffer = keyboard["buffer"] || "";
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
                    graphics.text.clear();
                    if (buffer=="") keyboard.buffer = keyboard.unicodes.CR;
                    game.Play.runCommand(keyboard.buffer);
                    keyboard.buffer = null;
                    return;

                default:
                    buffer += event.key;
            }
            words = buffer.split(" ");
            keyboard.buffer = buffer;
            graphics.text.set(words.join(keyboard.unicodes.Space));
        },
        listen:()=>{
            addEventListener("keydown", keyboard.handleKeyPress);
        }
    };
    keyboard.init();
    return keyboard;
});
