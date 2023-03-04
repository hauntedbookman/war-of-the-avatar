define([
        "services/io-service", 
        "services/player-service", 
        "services/map-service"
    ],(
        ioService, 
        playerService, 
        mapService
    )=>{
    let commandService = {
        CR:()=>{
            ioService.Response.say("");
            return;
        },
        get: (object)=>{
            if (!object) {
                ioService.Response.say("Get what?");
                return;
            } 
            mapService.verifyObjectLocation(objectName);
        },
        look: (object)=>{
            ioService.Response.say("");
            ioService.Response.say("- Look -");
            if (!object) {
                mapService.describeRoom(playerService.getLocation());
            } else {
                ioService.Response.say("to do...");
            }
        }
    }
    return commandService;
});
