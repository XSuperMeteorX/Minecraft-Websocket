const Websocket = require("ws");

const wss = new Websocket.Server({port:8080});

const fs = require("fs");

console.log("Please connect to 127.0.0.1:8080");

var exec = require("child_process").exec

var xyz = []

get = false;

wss.on("connection" , function connection(ws) {

 //客户端与服务器连接时执行的代码块
var events = new Array( "AdditionalContentLoaded","AgentCommand","AgentCreated","ApiInit","AppPaused","AppResumed","AppSuspended","AwardAchievement","BlockBroken","BlockPlaced","BoardTextUpdated","BossKilled","CameraUsed","CauldronUsed","ChunkChanged","ChunkLoaded","ChunkUnloaded","ConfigurationChanged","ConnectionFailed","CraftingSessionCompleted","EndOfDay","EntitySpawned","FileTransmissionCancelled","FileTransmissionCompleted","FileTransmissionStarted","FirstTimeClientOpen","FocusGained","FocusLost","GameSessionComplete","GameSessionStart","HardwareInfo","HasNewContent","ItemAcquired","ItemCrafted","ItemDestroyed","ItemDropped","ItemEnchanted","ItemSmelted","ItemUsed","JoinCanceled","JukeboxUsed","LicenseCensus","MascotCreated","MenuShown","MobInteracted","MobKilled","MultiplayerConnectionStateChanged","MultiplayerRoundEnd","MultiplayerRoundStart","NpcPropertiesUpdated","OptionsUpdated","performanceMetrics","PackImportStage","PlayerBounced","PlayerDied","PlayerJoin","PlayerLeave","PlayerMessage","PlayerTeleported","PlayerTransform","PlayerTravelled","PortalBuilt","PortalUsed","PortfolioExported","PotionBrewed","PurchaseAttempt","PurchaseResolved","RegionalPopup","RespondedToAcceptContent","ScreenChanged","ScreenHeartbeat","SignInToEdu","SignInToXboxLive","SignOutOfXboxLive","SpecialMobBuilt","StartClient","StartWorld","TextToSpeechToggled","UgcDownloadCompleted","UgcDownloadStarted","UploadSkin","VehicleExited","WorldExported","WorldFilesListed","WorldGenerated","WorldLoaded","WorldUnloaded" );


 for ( c = 0 ; c < events.length ; c++ ){

 ws.send(JSON.stringify({

 "body": {

 "eventName": events[c]

 },

 "header": {

 "requestId": "0ffae098-00ff-ffff-abbbbbbbbbdf3344",

 "messagePurpose": "subscribe",

 "version": 1,

 "messageType": "commandRequest"

 }

 }));

}


 function command(cmd){

 ws.send(JSON.stringify({

 "body": {

 "origin": {

 "type": "player"

 },

 "commandLine": cmd,

 "version": 1

 },

 "header": {

 "requestId": "add538f2-94c1-422b-8334-41fa5e8778c9",

 "messagePurpose": "commandRequest",

 "version": 1,

 "messageType": "commandRequest"

 }

 }));

}

command("say me Connected!!");
 ws.on("message" , function coming(message) {

 //客户端发送 JSON 到服务器时执行的代码块
 console.log(message);
 
 if (JSON.parse(message).body.eventName == "PlayerMessage") {

 var agent_command = JSON.parse(message).body.properties.Message;

 if (agent_command.substring(0, 1) == "-") {

 command(agent_command.substring(1, agent_command.length));}}

 if (JSON.parse(message).body.eventName == "PlayerMessage") {

 let chatCmd = JSON.parse(message).body.properties.Message;

 if (chatCmd.substring(0,5) == "eval ") {

	exec(chatCmd.substring(5,chatCmd.length),function (err,stdout,stderr){
		if (err) {
			command("say §cEval Error: §e" + stderr);
		} else {
			command("say §eEval: " + stdout)
		}
	})
 }}
 
 
 if (JSON.parse(message).body.eventName == "PlayerMessage") {
 
 let chatCmd = JSON.parse(message).body.properties.Message;
 
 if (chatCmd.substring(0,4) == "arf ") {

	fs.readFile(chatCmd.substring(4),'utf-8',function (err,data){
		if (err) {
			console.log('arf: readErr: ' + err)
			command('§earf: readErr: ' + err)
		} else {
			command("say §eParsing file...")
			command(setblock(data))
		}
		})
	};
 }
 function setblock(d){
	d = d.split("\n")
	for ( k = 0; k < d.length; k++ ){
		command(d[k])
	}
 }
 
 
 if (JSON.parse(message).body.eventName == "PlayerMessage") {
 
 let chatCmd = JSON.parse(message).body.properties.Message;
 
 if (chatCmd.substring(0,3) == "get") {
			command("testforblock ~ ~ ~ air ")
			command("testforblock ~ ~ ~ air ")
			command("testforblock ~ ~ ~ air ")
			command("testforblock ~ ~ ~ air ")
			command("testforblock ~ ~ ~ air ")
			command("testforblock ~ ~ ~ air ")
			get = true
	}
 }
 
 if (get == true) {
	if (JSON.parse(message).body.matches == true) {
		xyz[0] = JSON.parse(message).body.position.x
		xyz[1] = JSON.parse(message).body.position.y
		xyz[2] = JSON.parse(message).body.position.z
		command("title @s actionbar Position: " + xyz + "")
		command("say Position: " + xyz + "")
		get=false
		
	}
 }
 
 
 });

});
