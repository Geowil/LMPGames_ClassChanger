/*:
* @plugindesc Allows class changing using note tags w/ custom menu called by plugin command.
* @author Geowil
*
*@param Pass Color
*@desc This represents the x,y coords and the width and height for the starting point of the encounter window.  No spaces.
*@default #00CC00
*
*@param Fail Color
*@desc This param controls the foreground color of the gauge; use hex colors
*@default #F00
*
*@param Can Change Color
*@desc This parameter controls the color of the list items in the class selection list if the player is able to change to that class.
*@default #FFFFFF
*
*@param Cannot Change Color
*@desc This parameter controls the color of the list items in the class selection list if the player is not able to change to that class.
*@default #787878
*
*@param Class List Color
*@desc This param controls the background color of the gauge; use hex colors
*@default #FFF
*
*@param Enable Gold Cost
*@desc Turn this on to enable gold payment for class changes.  To modify the cost, change the cost forumla in the next parameter.
*@type boolean
*@default false
*
*@param Gold Cost Formula
*@desc This formula determines the cost, in gold, to change to a neww class.  avgClassLevels is REQUIRED for this option to work.
*@default (avgClassLevels + (10 * 4) / 1.25)
*
*@param Gold Cost Text
*@desc This parameter will set the text used to describe the gold cost.  So if you are not using gold as your, change this to your currency (IE: GP Cost).
*@type text
*@default Gold Cost
*
*@param Enable Item Cost
*@desc Turn this on to enable payment for class changes using an item.  This can be used alongside the gold cost.  Designate the item to use in the parameter below.
*@type boolean
*@default false
*
*@param Update Item
*@desc The item required for class upgrading.  Please use the ID of the item here.
*@default 1
*
*@param Item Cost Formula
*@desc This formula determines the number of items required to upgrade to a new class.  avgClassLevels if REQUIRED for this option to work.
*@default avgClassLevels + (10 * 4) / 1.25
*
* @help
* Thanks for using my class changer script.  Some notes on how this should be used.
*
* Possible Conflicts:
* Any script that aliases the following functions might conflict with this script:
* DataManager.isDatabaseLoaded
* Game_Interpreter.prototype.pluginCommand
* Game_Actor.prototype.initialize
* Game_Actor.prototype.initMembers
* Game_Actor.prototype.levelUp
* Game_Actor.prototype.refresh
*
* Usage Instructions:
* To use this script simple add a note tag to the classes you have created similar to the below example:
* <Requirements>
* x:y
* </Requirements>
*
* Use a new line for each new class requirement.  'X' signified the class ID while 'Y' signifies the required level.  Assume we have a Novice class as the first class,
* a Swordsman class as the second, and Knight class as the third.  If you want to make it so that changing to the Knight class requires levels in Novice and Swordsman first
* use something like the following in the note box of the Knight class:
* <Requirements>
* 1:30
* 2:25
* </Requirements>
*
* This would indicate that the character must be level 30 in Novice and level 25 in Swordsman before they could change to Knight.
*
*
*
*
* Credits:
* SephirothSpawn - original RMXP script creator
*/

var Geowil = Geowil || {};

//Scene for class change
function Scene_ClassChange(){
	this.initialize.apply(this,arguments);
}

//Window which will display class requirements
function Window_ClassInformation(){
	this.initialize.apply(this,arguments);
}

//Window which will contain a list of all classes formatted based on ability to change to them
function Window_ClassList(){
	this.initialize.apply(this,arguments);
}

//Window which will show currently selected actors status
function Window_ClassChangeStatus(){
	this.initialize.apply(this,arguments);
}

//Window that contains the commands
function Window_CCCommand(){
	this.initialize.apply(this,arguments);
}

//Window which will display actor's current classes and levels
function Window_CCActorClasses(){
	this.initialize.apply(this,arguments);
}

//Windw which will display item and or gold cost for changing classes if options on.
function Window_CCCost(){
	this.initialize.apply(this,arguments);
}

(function(_) {
	"use strict";

	const params = PluginManager.parameters('Geowil_ClassChanger');

	//Param Plugin Var
	var passCondColor = String(params['Pass Color']);
	var failCondColor = String(params['Fail Color']);
	var clsListColor = String(params['Class List Color']);
	var canChangeColor = String(params['Can Change Color']);
	var cannotChangeColor = String(params['Cannot Change Color']);

	var bIsGldCstEnabled = String(params['Enable Gold Cost']).trim().toLowerCase() === 'true';
	var bIsItmCstEnabled = String(params['Enable Item Cost']).trim().toLowerCase() === 'true';
	var gCFormula = String(params['Gold Cost Formula']);
	var iCIId = parseInt(params['Update Item']);
	var iCFormula = String(params['Item Cost Formula']);

	var gCText = String(params['Gold Cost Text']);

	//Global Plugin Vars
	//This will control alteration of the scene window sizes so that we can display the gold and or item cost.
	var bCostModeEnabled = bIsGldCstEnabled === true || bIsItmCstEnabled === true ? true:false; 
	var weaponFormStart = "<Requirements>";
	var weaponFormEnd = "<\/Requirements>";
	var classReqsJSON = [];
	var actorGenders = {};
	var sysClassList = {};
	var goldCost = 0;
	var itemCost = 0;
	var bHasBeenThisClass = false;
	var bIsAlreadyThisClass = false;

	var reqClasses = [];
	var reqGender = [];
	var reqItems = [];
	var reqWeaps = [];
	var reqArmor = [];
	var reqLvls = {};
	var actClsKeys = [];
	var bActorCanChange = false;

	var rstcClssList = {};

	/* Database Manager */
	var DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
	DataManager.isDatabaseLoaded = function(){
		if (!DataManager_isDatabaseLoaded.call(this)) { return false;}
		this.loadClassReqTags();
		return true;
	}

	DataManager.loadClassReqTags = function(){
		var clsGroup = $dataClasses;
		var actGroup = $dataActors;
		//alert(JSON.stringify(group));
		this.loadClassTags(clsGroup);
		this.loadActorTags(actGroup);

	}

	DataManager.loadClassTags = function(group){
		for (var n = 1; n < group.length; n++){
			var obj = group[n];
			var tempReqs = {};
			var reqs = [];

			if (obj.note !== null && obj.note !== "") {
				if (obj.note !== "\r" && obj.note !== "\n"){
					//alert(obj.note);
					var noteData = obj.note.split(/[\r\n]+/);
					//alert(JSON.stringify(noteData));

					noteData.forEach(function(str){
						//alert(str);
						switch (str){
							case weaponFormStart:
								break;
							case weaponFormEnd:
								break;
							default:
								var reqData = str.split(':');
			                    if (reqData[0] === "Gender"){
			                    	tempReqs["Type"] = reqData[0];
			                      	tempReqs["Gender"] = reqData[1];			                      
			                    }
			                    else if (reqData[0] === "Item"){
			                    	tempReqs["Type"] = reqData[0];
			                    	tempReqs["ItemId"] = reqData[1];
			                    }
			                    else if (reqData[0] === "Weapon"){
			                    	tempReqs["Type"] = reqData[0];
			                    	tempReqs["WeapId"] = reqData[1];

			                    	if (reqData.length === 3){			                    		
			                    		tempReqs[reqData[2]] = true;			                    		
			                    	}

			                    	else if (reqData.length === 4){
			                    		tempReqs[reqData[2]] = true;			                    		
			                    		tempReqs[reqData[3]] = true;			                    		
			                    	}
			                    }
			                    else if (reqData[0] === "Armor"){
			                    	tempReqs["Type"] = reqData[0];
			                    	tempReqs["ArmorId"] = reqData[1];

			                    	if (reqData.length === 3){			                    		
			                    		tempReqs[reqData[2]] = true;			                    		
			                    	}

			                    	else if (reqData.length === 4){
			                    		tempReqs[reqData[2]] = true;			                    		
			                    		tempReqs[reqData[3]] = true;			                    		
			                    	}
			                    }
			                    else if (reqData[0] === "Class"){
			                    	tempReqs["Type"] = reqData[0]; //Setup the object type; class
			                    	tempReqs[parseInt(reqData[1])] = reqData[2]; //Parse the class id to an int and set val the lvl
			                    }

			                    reqs.push(tempReqs);
								tempReqs = {};

								break;
						}
					});
				}
				else{
					reqs.push(tempReqs);
				}

				classReqsJSON[obj.id] = reqs;

				var keys = Object.keys(classReqsJSON);
				for (var i1 = 0; i1 < keys.length; i1++){
					sysClassList[i1] = keys[i1];
				}
			}
			else{
				if (obj.id !== null){
					classReqsJSON[obj.id] = "No Reqs";
				}
			}
		}
	}

	DataManager.loadActorTags = function(group){
		for (var n = 1; n < group.length; n++){
			var obj = group[n];
			var tempGender = {};
			var tempObj = {};
			
			if (obj.note !== null) {
				if (obj.note !== ""){
					//alert(obj.note);
					var noteData = obj.note.split(/[\r\n]+/);
					//alert(JSON.stringify(noteData));

					noteData.forEach(function(str){
						//alert(str);
						switch (str){
							case weaponFormStart:
								break;
							
							case weaponFormEnd:
								break;
							
							default:
								var genData = str.split(':');

								tempObj[genData[0]] = genData[1];

								tempGender = tempObj;
								tempObj = {};
								break;
						}
					});
				}
			}

			actorGenders[obj.id] = tempGender;
		}
	}


	/* Game Interpreter */
	var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args){
		Game_Interpreter_pluginCommand.call(this,command,args);

		if (command === 'ClassChanger'){
			for (var i1 = 0; i1 < args.length; i1++){
				command += " " + args[i1];
			}
		}

		if (command === 'StartClassChange'){
			SceneManager.push(Scene_ClassChange);
		} else if (command === 'ClassChanger ItemCost On'){
			toggleItemCost(true);
		} else if (command === 'ClassChanger ItemCost Off'){
			toggleItemCost(false);
		} else if (command === 'ClassChanger GoldCost On'){
			toggleGoldCost(true);
		} else if (command === 'ClassChanger GoldCost Off'){
			toggleGoldCost(false);
		} else if (command.match(/ClassChanger Change Item[ ](\d+)/)){
			changeCostItem(parseInt(RegExp.$1));
		}
	}

	function toggleGoldCost(bEnable){
		if (bEnable) { bIsGldCstEnabled = true; }
		else { bIsGldCstEnabled = false; }

		toggleCostMode();
	}

	function toggleItemCost(bEnable){
		if (bEnable) { bIsItmCstEnabled = true; }
		else { bIsItmCstEnabled = false; }

		toggleCostMode();
	}

	function toggleCostMode(){
		bCostModeEnabled = bIsGldCstEnabled === true || bIsItmCstEnabled === true ? true:false;
	}

	function changeCostItem(itemId){
		iCIId = itemId;
	}


	/* Game Actor */
	//Setup class data for game actors
	var Game_Actor_initialize = Game_Actor.prototype.initialize;
	Game_Actor.prototype.initialize = function(actorId) {
	    Game_Actor_initialize.apply(this,arguments);
	}

	var Game_Actor_initMembers = Game_Actor.prototype.initMembers;
	Game_Actor.prototype.initMembers = function() {
		this._className = "";
	    this._actorClasses = undefined;
	    Game_Actor_initMembers.call(this);

	    this.setupActorClasses();
	}

	Game_Actor.prototype.getClassName = function(clsId){
		return $dataClasses[clsId].name;
	}

	Game_Actor.prototype.setupActorClasses = function(){
		this._actorClasses = {};
		//alert(this._classId);
		this._actorClasses[this._classId] = this._level;
	}

	Game_Actor.prototype.updateActorClasses = function(actor){
		this._actorClasses = actor._actorClasses;
	}

	var Game_Actor_levelUp = Game_Actor.prototype.levelUp;
	Game_Actor.prototype.levelUp = function(){
		Game_Actor_levelUp.call(this);

		this._actorClasses[this._classId] = this._level;
	}

	Game_Actor.prototype.getActorClasses = function(){
		return this._actorClasses;
	}

	Game_Actor.prototype.getActorClsLevel = function(index){
		return this._actorClasses[index] !== undefined ? this._actorClasses[index] : 'f';
	}

	Game_Actor.prototype.resetSkills = function(){
		this._skills = [];
    	this._lastMenuSkill = new Game_Item();
    	this._lastBattleSkill  = new Game_Item();
	}

	Game_Actor.prototype.classChange = function(classId){
		this._classId = classId;
		this.resetSkills();

	    this.chgExp(this._exp[this._classId] || 0);

	    //Extract cost
	    if (bCostModeEnabled){
	    	if (bIsGldCstEnabled){
	    		$gameParty.loseGold(goldCost);
	    	}

	    	if (bIsItmCstEnabled){
	    		$gameParty.loseItem($dataItems[iCIId],itemCost,false);
	    	}
	    }

	    this.refresh();
	}

	var Game_Actor_refresh = Game_Actor.prototype.refresh;
	Game_Actor.prototype.refresh = function(){
		Game_Actor_refresh.call(this);

		if (!this._actorClasses[this._classId]){
	     	this._actorClasses[this._classId] = this._level;
	    }
	}

	Game_Actor.prototype.chgExp = function(exp) {
	    this._exp[this._classId] = Math.max(exp, 0);
	    var lastLevel = this._level;
	    while (!this.isMaxLevel() && this.currentExp() >= this.nextLevelExp()) {
	        this.levelUp();
	    }
	    while (this.currentExp() < this.currentLevelExp()) {
	        this.levelDown();
	    }

	    this.initSkills();

	    this.refresh();
	}


	/* Scene Class Change */
	Scene_ClassChange.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_ClassChange.prototype.constructor = Scene_ClassChange;

	Scene_ClassChange.prototype.initialize = function(){
		Scene_MenuBase.prototype.initialize.call(this);

		ImageManager.loadFace($gameParty.menuActor().faceName());
	}

	Scene_ClassChange.prototype.create = function(){
		Scene_MenuBase.prototype.create.call(this);

		this.createSelActorWindow();
	}

	Scene_ClassChange.prototype.createCostWindow = function(){
		var winX = this._clsLstWnd.getWidth();
		var winY = this._statWnd.getHeight(); 
		var winW = this._statWnd.getWidth();
		var winH = this._actClsWnd.getHeight() - this._statWnd.getHeight();

		this._cosWnd = new Window_CCCost(winX,winY,winW,winH,this._actor);
		this._cosWnd.activate();
		this._cosWnd.hide();
		this._cosWnd.deselect()

		this.addWindow(this._cosWnd);
	}

	Scene_ClassChange.prototype.createSelActorWindow = function(){
		const winX = 0;
		const winY = 0;

		this._selActWnd = new Window_SelectActor(winX,winY);
		this._selActWnd.setHandler('ok',this.onSelActSelected.bind(this));
		this._selActWnd.setHandler('cancel', this.popScene.bind(this));
		this._selActWnd.activate();
		this._selActWnd.select();
		this.addWindow(this._selActWnd);
	}

	Scene_ClassChange.prototype.onSelActSelected = function(){
		this.setActor($gameParty.members()[this._selActWnd.index()]);

		this.createClassListWindow();
		this.createStatusWindow();
		this.createActorClassWindow();
		if (bCostModeEnabled) { this.createCostWindow(); }
		this.createRequirementsWindow();
		this.createCommandWindow();

		this._selActWnd.deactivate();
		this._selActWnd.deselect();
		this._selActWnd.hide();
		this._clsLstWnd.select();
		this._clsLstWnd.activate();
		this._clsLstWnd.show();
		this._statWnd.activate();
		this._statWnd.show();
		this._actClsWnd.activate();
		this._actClsWnd.show();
	}

	Scene_ClassChange.prototype.createClassListWindow = function(){
		const winX = 0;
		const winY = 0;
		const winW = 200;

		this._clsLstWnd = new Window_ClassList(winX,winY,winW,Graphics.boxHeight,this._actor);
		this._clsLstWnd.setHandler('ok', this.onClsWndSelected.bind(this));
		this._clsLstWnd.setHandler('cancel', this.onClsWndCancel.bind(this));
		this._clsLstWnd.deactivate();
		this._clsLstWnd.deselect();
		this._clsLstWnd.hide();
		this.addWindow(this._clsLstWnd);
	}

	Scene_ClassChange.prototype.onClsWndSelected = function(){
		this._reqWnd.setActClasses(this._actClsWnd.getActorClasses());
		this._comWnd.setActClasses(this._actClsWnd.getActorClasses());

		this._reqWnd.setSelectedClass(this._clsLstWnd.getSelClass());
		this._comWnd.setSelectedClass(this._clsLstWnd.getSelClass());

		this._statWnd.activate();
		this._actClsWnd.activate();

		this._reqWnd.activate();
		this._reqWnd.show();
		this._reqWnd.setActor(this._actor);
		this._reqWnd.refresh();

		//this._comWnd.selectLast();
		this._comWnd.show();
		this._comWnd.activate();

		this._comWnd.setHandler('chngcls',this.changeClass.bind(this));
		this._comWnd.setHandler('cancel',this.cancel.bind(this));
		this._comWnd.setActor(this._actor);
		this._comWnd.refresh();

		if (bCostModeEnabled) {
			this._cosWnd.show();
			this._cosWnd.refresh();
		}
	}

	Scene_ClassChange.prototype.onClsWndCancel = function(){
		this._clsLstWnd.deselect();
		this._clsLstWnd.deactivate();
		this._clsLstWnd.hide();
		this._statWnd.deactivate();
		this._statWnd.hide();
		this._actClsWnd.deactivate();
		this._actClsWnd.hide();

		this._selActWnd.activate();
		this._selActWnd.select();
		this._selActWnd.show();
		this._selActWnd.refresh();
	}

	Scene_ClassChange.prototype.createStatusWindow = function(){
		const winX = this._clsLstWnd.getWidth();
		const winY = 0;
		var winW = 0;
		var winH = 0;

		if (bCostModeEnabled){
			winW = (Graphics.width - this._clsLstWnd.getWidth()) * 0.65;
			winH = Graphics.boxHeight / 2.8;
		}
		else{
			winW = (Graphics.width - this._clsLstWnd.getWidth()) * 0.65;
			winH = Graphics.boxHeight / 1.8;
		}

		this._statWnd = new Window_ClassChangeStatus(winX,winY,winW,winH,this._actor);
		this._statWnd.hide();
		this.addWindow(this._statWnd);
	}

	Scene_ClassChange.prototype.createActorClassWindow = function(){
		const winX = this._clsLstWnd.getWidth() + this._statWnd.getWidth();
		const winY = 0;
		var winW = 0;
		var winH = 0;

		winW = (Graphics.width - this._clsLstWnd.getWidth()) - this._statWnd.getWidth();

		if (bCostModeEnabled) { winH = Graphics.boxHeight / 1.8; }
		else { winH = this._statWnd.getHeight(); }
		

		this._actClsWnd = new Window_CCActorClasses(winX,winY,winW,winH,this._actor);
		this._actClsWnd.hide();
		this.addWindow(this._actClsWnd);
	}

	Scene_ClassChange.prototype.createRequirementsWindow = function(){
		const winX = this._clsLstWnd.getWidth();
		var winY = 0;
		var winH = 0;

		if (bCostModeEnabled) {
			winY = this._actClsWnd.getHeight();
			winH = (Graphics.boxHeight - (this._cosWnd.getHeight() + this._statWnd.getHeight() + 4)) * 0.75;
		}
		else {
			winY = this._statWnd.getHeight();
			winH = (Graphics.boxHeight - (this._statWnd.getHeight()  + 4)) * 0.75;
		}

		const winW = Graphics.width - this._clsLstWnd.getWidth();
		

		this._reqWnd = new Window_ClassInformation(winX,winY,winW,winH,this._actor);
		this._reqWnd.deactivate();
		this._reqWnd.hide();
		this.addWindow(this._reqWnd);
	}

	Scene_ClassChange.prototype.createCommandWindow = function(){
		var winY = 0;
		const winX = this._clsLstWnd.getWidth();
		const winW = Graphics.boxWidth - this._clsLstWnd.getWidth();
		var winH = 0;
		
		if (bCostModeEnabled) {
			winY = this._reqWnd.getHeight() + this._statWnd.getHeight() + this._cosWnd.getHeight();
			winH = (Graphics.boxHeight - (this._statWnd.getHeight()) + this._reqWnd.getHeight() + this._cosWnd.getHeight());
		}
		else {
			winY = this._reqWnd.getHeight() + this._statWnd.getHeight();
			winH = (Graphics.boxHeight - this._statWnd.getHeight()) - this._reqWnd.getHeight();
		}
		
		this._comWnd = new Window_CCCommand(winX,winY,winW,winH,this._actor);
		this._comWnd.deselect();
		this._comWnd.deactivate();
		this._comWnd.hide();
		this.addWindow(this._comWnd);
	}

	Scene_ClassChange.prototype.setActor = function(actor){
		if (actor !== undefined){
			this._actor = actor;
		}
	}

	Scene_ClassChange.prototype.refreshActor = function(){
		this.setActor($gameParty.members()[this._selActWnd.index()]);
		var actor = this._actor;

		if (actor !== undefined){
			this._comWnd.setActor(actor);
			this._statWnd.setActor(actor);
			this._actClsWnd.setActor(actor);
			this._clsLstWnd.setActor(actor);
			this._reqWnd.setActor(actor);
			this._statWnd.refresh();
			this._reqWnd.refresh();
			this._actClsWnd.refresh();
			this._comWnd.refresh();

			if (bCostModeEnabled) {
				this._cosWnd.setActor(actor);
				this._cosWnd.refresh();
			}
		}
	}

	Scene_ClassChange.prototype.changeClass = function(){
		this._actor.classChange(this._clsLstWnd.getSelClass(),false);

		this._comWnd.deselect();
		this._comWnd.hide();
		this._clsLstWnd.select();
		this._clsLstWnd.activate();
		this._reqWnd.clearContents();
		this._reqWnd.deactivate();
		this._reqWnd.hide();
		
		this.refreshActor();
		this._clsLstWnd.refresh();

		if (bCostModeEnabled) { this._cosWnd.hide(); }
	}

	Scene_ClassChange.prototype.cancel = function(){
		this._comWnd.deselect();
		this._comWnd.deactivate();
		this._comWnd.hide();
		this._reqWnd.clearContents();
		this._reqWnd.deactivate();
		this._reqWnd.hide();
		this._clsLstWnd.select();
		this._clsLstWnd.activate();
		this._clsLstWnd.refresh();

		if (bCostModeEnabled) { this._cosWnd.hide(); }
	}

	/* Window SelectActor */

	function Window_SelectActor() {
	    this.initialize.apply(this, arguments);
	}

	Window_SelectActor.prototype = Object.create(Window_Selectable.prototype);
	Window_SelectActor.prototype.constructor = Window_SelectActor;

	Window_SelectActor.prototype.initialize = function(x, y) {
	    var width = this.windowWidth();
	    var height = this.windowHeight();
	    Window_Selectable.prototype.initialize.call(this, x, y, width, height);
	    this._pendingIndex = -1;
	    this.refresh();
	}

	Window_SelectActor.prototype.windowWidth = function() {
	    return Graphics.boxWidth - 240;
	}

	Window_SelectActor.prototype.windowHeight = function() {
	    return Graphics.boxHeight;
	}

	Window_SelectActor.prototype.maxItems = function() {
	    return $gameParty.size();
	}

	Window_SelectActor.prototype.itemHeight = function() {
	    var clientHeight = this.height - this.padding * 2;
	    return Math.floor(clientHeight / this.numVisibleRows());
	}

	Window_SelectActor.prototype.numVisibleRows = function() {
	    return 4;
	}

	Window_SelectActor.prototype.loadImages = function() {
	    $gameParty.members().forEach(function(actor) {
	        ImageManager.reserveFace(actor.faceName());
	    }, this);
	}

	Window_SelectActor.prototype.drawItem = function(index) {
	    this.drawItemBackground(index);
	    this.drawItemImage(index);
	    this.drawItemStatus(index);
	}

	Window_SelectActor.prototype.drawItemBackground = function(index) {
	    if (index === this._pendingIndex) {
	        var rect = this.itemRect(index);
	        var color = this.pendingColor();
	        this.changePaintOpacity(false);
	        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
	        this.changePaintOpacity(true);
	    }
	}

	Window_SelectActor.prototype.drawItemImage = function(index) {
	    var actor = $gameParty.members()[index];
	    var rect = this.itemRect(index);
	    this.changePaintOpacity(actor.isBattleMember());
	    this.drawActorFace(actor, rect.x + 1, rect.y + 1, Window_Base._faceWidth, Window_Base._faceHeight);
	    this.changePaintOpacity(true);
	}

	Window_SelectActor.prototype.drawItemStatus = function(index) {
	    var actor = $gameParty.members()[index];
	    var rect = this.itemRect(index);
	    var x = rect.x + 162;
	    var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
	    var width = rect.width - x - this.textPadding();
	    this.drawActorSimpleStatus(actor, x, y, width);
	}

	Window_SelectActor.prototype.processOk = function() {
	    Window_Selectable.prototype.processOk.call(this);
	}

	Window_SelectActor.prototype.selectLast = function() {
	    this.select($gameParty.menuActor().index() || 0);
	}

	Window_SelectActor.prototype.pendingIndex = function() {
	    return this._pendingIndex;
	}

	Window_SelectActor.prototype.setPendingIndex = function(index) {
	    var lastPendingIndex = this._pendingIndex;
	    this._pendingIndex = index;
	    this.redrawItem(this._pendingIndex);
	    this.redrawItem(lastPendingIndex);
	}


	/* Window ClassList */

	Window_ClassList.prototype = Object.create(Window_Selectable.prototype);
	Window_ClassList.prototype.constructor = Window_ClassList;

	Window_ClassList.prototype.initialize = function(x,y,w,h,actor){
		Window_Selectable.prototype.initialize.call(this,x,y,w,h);
		this._actor = actor;
		this._winWdth = w;
		this._winH = h;

		this._cIX = 0;
		this._cIY = 0;
		this._cIW = 45;

		this._pendingIndex = -1;
		this._classData = [];
		this._actClasses = actor._actorClasses;
		this._selClass = 0;
		this.refresh();
	}

	Window_ClassList.prototype.getWidth = function(){
		return this._winWdth;
	}

	Window_ClassList.prototype.getSelClass = function(){
		return this._selClass;
	}

	Window_ClassChangeStatus.prototype.getHeight = function(){
		return this._winH;
	}

	Window_ClassList.prototype.maxCols = function(){
		return 1;
	}

	Window_ClassList.prototype.maxItems = function(){
		return classReqsJSON ? Object.keys(classReqsJSON).length : 1;
	}

	Window_ClassList.prototype.itemHeight = function(){
		//var cliHight = this.height - this.padding * 1.25;
		//return Math.floor(cliHight/this.numVisibleRows());
		return 35;
	}

	Window_ClassList.prototype.numVisibleRows = function(){
		return 10;
	}

	Window_ClassList.prototype.spacing = function(){
		return 5;
	}

	Window_ClassList.prototype.isEnabled = function(item){
		return true;
	}

	Window_ClassList.prototype.drawItem = function(index){
		this.drawClassItem(index,this._cIX,this._cIY,this._cIW);
	}

	Window_ClassList.prototype.drawClassItem = function(index,x,y,w){
		var clsId = index;

		if (clsId !== -1 && $dataClasses[sysClassList[clsId]].name !== null && $dataClasses[sysClassList[clsId]].name !== undefined){
			var rect = this.itemRectForText(index);
			this.contents.fontSize = 22;
			x = rect.x;
			y += rect.y+rect.height/2 - this.lineHeight() * 0.5;
			w = rect.width -x - this.textPadding();

			playerCanClassChange(sysClassList[clsId],this._actor)

			if (!bActorCanChange){
				this.changeTextColor(cannotChangeColor);
			} else{
				this.changeTextColor(canChangeColor);
			}

			this.drawText($dataClasses[sysClassList[clsId]].name,rect.x,rect.y,rect.width,'left');
		}

		this.contents.fontSize = 24;
		this.resetTextColor();
	}

	Window_ClassList.prototype.setActor = function(actor){
		if (this._actor !== actor){
			this._actor= actor;
			this._actClasses = this._actor._actorClasses;
			this.refreshList();
			this.refresh();
		}
	}

	Window_ClassList.prototype.selectLast = function(){
		this.select(this.index() || 0);
	}

	Window_ClassList.prototype.processOk = function(){
		this._selClass = this.index()+1;
		Window_Selectable.prototype.processOk.call(this);
		//alert(this.index());
		this._classData = classReqsJSON[this.index()];
	}

	Window_ClassList.prototype.pendingIndex = function(){
		return this._pendingIndex;
	}

	Window_ClassList.prototype.setPendingIndex = function(index){
		var lstPendIndex = this._pendingIndex;
		this._pendingIndex = index;
		this.redrawItem(this._pendingIndex);
		this.redrawItem(lstPendIndex);
	}




	/* Window_ClassChangeStatus */
	Window_ClassChangeStatus.prototype = Object.create(Window_Selectable.prototype);
	Window_ClassChangeStatus.prototype.constructor = Window_ClassChangeStatus;

	Window_ClassChangeStatus.prototype.initialize = function(x,y,w,h,actor){
		Window_Selectable.prototype.initialize.call(this,x,y,w,h);
		this._winX = x;
		this._winY = y;
		this._winW = w;
		this._winH = h;
		this._actor = actor;
		this.refresh();
	}

	Window_ClassChangeStatus.prototype.getWidth = function(){
		return this._winW;
	}

	Window_ClassChangeStatus.prototype.getHeight = function(){
		return this._winH;
	}

	Window_ClassChangeStatus.prototype.setActor = function(actor){
		this._actor = actor;
		this.refresh();
	}

	Window_ClassChangeStatus.prototype.refresh = function(){
		this.contents.clear();

		if (this._actor){
			const lineHgt = this.lineHeight();
			//Line 1
			this.drawActorName(this._actor,6,0);
			this.drawActorClass(this._actor,192,0);
			//Line 2
			//this.drawHorzLine(lineHgt);
			//Line 3
			if (bCostModeEnabled){
				this.drawActorFace(this._actor,12,lineHgt);
				this.drawBasicInfo(180,lineHgt,this.contentsWidth()-180);
			} else{
				this.drawActorFace(this._actor,12,lineHgt+40);
				this.drawBasicInfo(180,lineHgt*2,this.contentsWidth()-180);
			}
			//Line 7
			//this.drawHorzLine(lineHgt*6);
		}
	}

	Window_ClassChangeStatus.prototype.drawBasicInfo = function(x,y,width){
		const lineHgt = this.lineHeight();

		this.drawActorLevel(this._actor,x,y);
		this.drawActorIcons(this._actor,x,y+lineHgt);
		this.drawActorHp(this._actor,x,y+lineHgt*2,width);
		this.drawActorMp(this._actor,x,y+lineHgt*3,width);
	}

	Window_ClassChangeStatus.prototype.drawHorzLine = function(y){
		const lineY = y + this.lineHeight() / 2 - 1;

		this.contents.paintOpacity = 48;
		this.contents.fillRect(0,lineY,this.contentsWidth(),2,this.normalColor());
		this.contents.paintOpacity = 255;
	}

	/* Window_CCActorClasses */
	Window_CCActorClasses.prototype = Object.create(Window_Base.prototype);
	Window_CCActorClasses.prototype.constructor = Window_CCActorClasses;

	Window_CCActorClasses.prototype.initialize = function(x,y,w,h,actor){
		Window_Base.prototype.initialize.call(this,x,y,w,h);
		this._winX = x;
		this._winY = y;
		this._winW = w;
		this._winH = h;
		this._actor = actor;
		this._actorClasses = actor._actorClasses;
		this.refresh();
	}

	Window_CCActorClasses.prototype.getActorClasses = function(){
		return this._actorClasses;
	}

	Window_CCActorClasses.prototype.getWidth = function(){
		return this._winW;
	}

	Window_CCActorClasses.prototype.getHeight = function(){
		return this._winH;
	}

	Window_CCActorClasses.prototype.setActor = function(actor){
		this._actor = actor;
		this.refresh();
	}

	Window_CCActorClasses.prototype.refresh = function(){
		var y = 0;
		this.contents.clear();

		if (this._actor !== null && this._actor !== undefined){
			this._actorClasses = this._actor.getActorClasses();

			Object.keys(this._actorClasses).forEach(function(clsId){
				if (clsId > 0){
					this.drawClsListItem(this._actor.getClassName(clsId),this._actor.getActorClsLevel(clsId),y);
					y += 25;
				}
			}, this);
		}
	}

	Window_CCActorClasses.prototype.drawClsListItem = function(name,lvl,y){
		this.contents.fontSize = 22;
		this.changeTextColor(clsListColor);
		this.drawText(name,0,y,60,0,'left');
		this.drawText("Lv." + String(lvl),name.length+65,y,75,'right');
	}


	/* Window_ClassInformation */
	Window_ClassInformation.prototype = Object.create(Window_Base.prototype);
	Window_ClassInformation.prototype.constructor = Window_ClassInformation;

	Window_ClassInformation.prototype.initialize = function(x,y,w,h,actor){
		Window_Base.prototype.initialize.call(this,x,y,w,h);
		this._winX = x;
		this._winY = y;
		this._winW = w;
		this._winH = h;
		this._selectedClass = null;
		this._actClasses = undefined;
		this._actor = actor;

		this.refresh();
	}

	Window_ClassInformation.prototype.setActClasses = function(actorClasses){
		this._actClasses = actorClasses;
	}

	Window_ClassInformation.prototype.getActClasses = function(){
		return this._actClasses;
	}

	Window_ClassInformation.prototype.getActor = function(){
		return this._actor;
	}

	Window_ClassInformation.prototype.setActor = function(actor){
		this._actor = actor;
	}

	Window_ClassInformation.prototype.getWidth = function(){
		return this._winW;
	}

	Window_ClassInformation.prototype.getHeight = function(){
		return this._winH;
	}

	Window_ClassInformation.prototype.refresh = function(){
		this.contents.clear();
		processRequirements(this);
	}

	Window_ClassInformation.prototype.drawReqs = function(){
		this.contents.fontSize = 25;
		this.drawText($dataClasses[sysClassList[this._selectedClass-1]].name + " Requirements: ",0,0,260,'left');
	}

	Window_ClassInformation.prototype.drawReqItem = function(type,reqNm, reqVal,x,y,bReqIsMet){
		this.contents.fontSize = 18;

		var txt = "";
		
		if (type === "Class"){ txt = reqNm + " Lv." + String(reqVal); }
		else if (type === "Gender") {
			if (reqNm === "F") { txt = "Female"; }
			else{ txt = "Male"; } 
		}
		else if (type === "Item") { txt = reqNm; }
		else if (type === "Weap") { txt = reqNm; }
		else if (type === "Armor") { txt = reqNm; }

		if (!bReqIsMet){
			this.changeTextColor(failCondColor);
		} else{
			this.changeTextColor(passCondColor);
		}

		this.drawText(txt,x,y,txt.length + 160,'left');
	}

	Window_ClassInformation.prototype.setSelectedClass = function(selCls){
		if (this._selectedClass !== selCls){
			this._selectedClass = selCls;
			this.refresh();
		}
	}

	Window_ClassInformation.prototype.getSelectedClass = function(selCls){
		return this._selectedClass;
	}

	Window_ClassInformation.prototype.clearContents = function(){
		this.contents.clear();
	}


	/* Window_CCComand */
	Window_CCCommand.prototype = Object.create(Window_HorzCommand.prototype);
	Window_CCCommand.prototype.constructor = Window_CCCommand;

	Window_CCCommand.prototype.initialize = function(x,y,w,h,actor){
		this._winW = w;
		this._winH = h;
		Window_HorzCommand.prototype.initialize.call(this,x,y);
		this._clsLstWnd = null;
		this._actor = actor;
		this._selectedClass = null;
		this._actClasses = actor._actorClasses;
		this._curACId = actor._classId;

		this.refresh();
	}

	Window_CCCommand.prototype.setActClasses = function(actorClasses){
		this._actClasses = actorClasses;
	}

	Window_CCCommand.prototype.windowWidth = function(){
		return this._winW;
	}

	Window_CCCommand.prototype.getHeight = function(){
		return this._winH;
	}

	Window_CCCommand.prototype.setClsLstWindow = function(window){
		this._clsLstWnd = window;
	}

	Window_CCCommand.prototype.setActor = function(actor){
			this._actor = actor;
			this._curACId = this._actor._classId;
	}

	Window_CCCommand.prototype.setSelectedClass = function(selCls){
		if (this._selectedClass !== selCls){
			this._selectedClass = selCls;
		}
	}

	Window_CCCommand.prototype.maxCols = function(){
		return 2;
	}

	Window_CCCommand.prototype.makeCommandList = function(){
		bActorCanChange = false;

		var selClass = this._selectedClass;
		var aClss = [];

		if (this._actor != undefined){ aClss = this._actor._actorClasses; }
		
		//var curCID = this._curACId;

		playerCanClassChange(selClass, this._actor);

		if (bActorCanChange){
			if (bCostModeEnabled){
				if (bIsGldCstEnabled){
					if (goldCost > $gameParty.gold()){
						bActorCanChange = false;
					}
				}

				if (bIsItmCstEnabled){
					if (itemCost > $gameParty.numItems($dataItems[iCIId])){
						bActorCanChange = false;
					}
				}
			}
		}

		this.addCommand("Change Class",'chngcls',bActorCanChange);
		this.addCommand("Cancel",'cancel');
	}

	Window_CCCommand.prototype.select = function(index){
		Window_HorzCommand.prototype.select.apply(this,arguments);

		if (this._list.length > 0 && index !== -1){
			const sym = this.commandSymbol(index);
			if (sym === 'changcls'){
				if (this._actor !== null && this._actor !== undefined){
					this._actor.changeClass(this._selectedClass,false);
				}
			}
		}
	}

	Window_CCCommand.prototype.refresh = function(){
		this.clearCommandList();
	    this.makeCommandList();
	    Window_HorzCommand.prototype.refresh.call(this);
	}

	/* Window Cost */
	Window_CCCost.prototype = Object.create(Window_Selectable.prototype);
	Window_CCCost.prototype.constructor = Window_CCCost;

	Window_CCCost.prototype.initialize = function(x,y,w,h,actor){
		this._winW = w;
		this._winH = h;
		Window_Selectable.prototype.initialize.call(this,x,y,w,h);

		this._gCost;
		this._numOfItms;

		this._actor = actor;
		this.refresh();
	}

	Window_CCCost.prototype.getHeight = function(){
		return this._winH;
	}

	Window_CCCost.prototype.setActor = function(actor){
		this._actor = actor;
	}

	Window_CCCost.prototype.calculateGCost = function(){
		var cost = eval
	}

	Window_CCCost.prototype.refresh = function(){
		this.drawItems();
	}

	Window_CCCost.prototype.drawItems = function(){
		this.contents.clear();
		this.contents.fontSize = 16;
		var y = 0;
		var x = 0;
		var h = this.contents.fontSize + 5;

		if (bIsGldCstEnabled){
			var curGoldText = "Current Gold: ";
			var gCW = gCText.length + 80;
			var cGW = curGoldText.length + 85; 
			var avgClassLevels = 0;
			var actClsLvls = 0;

			if (this._actor != undefined){
				for (var lvl in this._actor._actorClasses){
					actClsLvls += parseInt(this._actor._actorClasses[lvl]);
				}

				avgClassLevels = Math.floor((((actClsLvls)+4)*3.54)/1.75);
				//Determine the cost
				//gCFormula;

				goldCost = eval(gCFormula);

				if (bHasBeenThisClass || bIsAlreadyThisClass) { goldCost = 0; }

				this.drawText(gCText,x,y,gCW,'left');
				this.drawText(String(goldCost),x+gCW,y,gCW+100,'left');

				if (goldCost > $gameParty.gold()) { this.changeTextColor("#F00"); }

				this.drawText(curGoldText,x,y+h,cGW,'left');
				this.drawText(String($gameParty.gold()),x+cGW,y+h,cGW+100,'left');	

				this.resetTextColor();
			}
		}

		if (bIsItmCstEnabled){
			var itemText = $dataItems[iCIId].name + " Cost:";
			var curItmText = "Current " + $dataItems[iCIId].name + ":";
			var iCW = itemText.length + 90;
			var cIW = curItmText.length + 110;
			var avgClassLevels = 0;
			var actClsLvls = 0;

			if (this._actor != undefined){
				for (var lvl in this._actor._actorClasses){
					actClsLvls += parseInt(this._actor._actorClasses[lvl]);
				}

				avgClassLevels = Math.floor((((actClsLvls)*2)/3)*0.75) == 0 ? actClsLvls : Math.floor((((actClsLvls)*2)/3)*0.75);
				//Determine the cost
				//gCFormula;

				itemCost = eval(iCFormula);

				if (bHasBeenThisClass || bIsAlreadyThisClass) { itemCost = 0; }

				if (bIsGldCstEnabled){
					this.drawText(itemText,x,y+(h*2),iCW,'left');
					this.drawText(String(itemCost),x+iCW,y+(h*2),iCW+100,'left');

					if (itemCost > $gameParty.numItems($dataItems[iCIId])) { this.changeTextColor("#F00"); }

					this.drawText(curItmText,x,y+(h*3),cIW,'left');
					this.drawText(String($gameParty.numItems($dataItems[iCIId])),x+cIW,y+(h*3),cIW+100,'left');

					this.resetTextColor();					
				}
				else{
					this.drawText(itemText,x,y,iCW,'left');
					this.drawText(String(itemCost),x+iCW,y,iCW+100,'left');
					
					if (itemCost > $gameParty.numItems($dataItems[iCIId])) { this.changeTextColor("#F00"); }
					
					this.drawText(curItmText,x,y+h,cIW,'left');
					this.drawText(String($gameParty.numItems($dataItems[iCIId])),x+cIW,y+h,cIW+100,'left');

					this.resetTextColor();
				}
			}
		}
	}

	function processRequirements(clsInfoWnd){
		var bIsRedItem = false;

		var selClass = clsInfoWnd.getSelectedClass();
		var aClss = clsInfoWnd.getActClasses();

		if (selClass != null || selClass != undefined){
			clsInfoWnd.resetTextColor();
			clsInfoWnd.drawReqs();

			rstcClssList = {};

			fillRClssLst();

			Object.keys(classReqsJSON).forEach(function(clsId){
				if (selClass === parseInt(clsId)){
					var reqs = classReqsJSON[clsId];

					if (reqs !== "No Reqs"){
						fillReqVars(reqs,aClss,clsId);					
						checkRequirements(clsInfoWnd,true,aClss,clsInfoWnd.getActor(),selClass);						
					}
					else{
						bActorCanChange = true;
					}					
				}
			}, clsInfoWnd);
		}
	}

	function playerCanClassChange(selClass,actor){
		bActorCanChange = false;

		var aClss = [];
		var curCID = 0;

		selClass = parseInt(selClass);

		if (actor != undefined){
			aClss = actor._actorClasses;
			curCID = actor._classId;
		}

		if (selClass != null || selClass != undefined){
			rstcClssList = {};

			fillRClssLst();

			Object.keys(classReqsJSON).every(function(clsId){
				//If the key (class name) equals the class we want to change to, then continue
				if (parseInt(clsId) === selClass){
					//If the actor IS this class already, do not allow change
					if (curCID === selClass){
						bActorCanChange = false;
						bIsAlreadyThisClass = true;
						return false;
					}
					//If the actor has already been this class, don't do this processing
					else if (aClss[selClass]){
						bActorCanChange = true;
						bHasBeenThisClass = true;
						return false;
					}
					else{
						bIsAlreadyThisClass = false;
						bHasBeenThisClass = false;
						//clsId += 1; //Increment it since we are working on a 0-based index now for the json data
						var reqs = classReqsJSON[clsId];

						if (reqs !== "No Reqs"){
							fillReqVars(reqs,aClss,clsId);
							checkRequirements(null,false,aClss,actor,selClass);



							return false;
						}
						
						else{
							bActorCanChange = true;
							return false;
						}
					}
				}else{
					return true;
				}
			});
		}
	}

	function fillReqVars(reqs,aClss,clssId){
		var tempObj = {};

		reqClasses = [];
		reqGender = [];
		reqItems = [];
		reqWeaps = {};
		reqArmor = {};
		reqLvls = {};
		actClsKeys = [];

		var rClasses = {}; //Internal use for building the levels array

		for (var i1 = 0; i1 < reqs.length; i1++){
			//alert(JSON.stringify(tArr));
			var tArr = reqs[i1];
			switch(tArr["Type"]){
				case "Class":
					Object.keys(tArr).forEach(function(ele){
						if (ele !== undefined && ele !== null && ele !== "NaN" && ele !== "Type"){	
							reqClasses.push(ele);
							rClasses[ele] = tArr[ele];
						}
					});

					break;	
				case "Item":
					Object.keys(tArr).forEach(function(ele){
						if (ele !== undefined && ele !== null && ele !== "NaN" && ele !== "Type"){
							reqItems.push(tArr["ItemId"]);
						}
					});

					break;
				case "Weapon":
					Object.keys(tArr).forEach(function(ele){
						if (ele !== undefined && ele !== null && ele !== "NaN" && ele !== "Type"){
							tempObj[ele] = tArr[ele];							
						}

						reqWeaps[tArr["WeapId"]] = tempObj;
						tempObj = {};
					});

					break;

				case "Armor":
					Object.keys(tArr).forEach(function(ele){
						if (ele !== undefined && ele !== null && ele !== "NaN" && ele !== "Type"){
							tempObj[ele] = tArr[ele];							
						}

						reqArmor[tArr["ArmorId"]] = tempObj;
						tempObj = {};
					});

					break;

				case "Gender":
					Object.keys(tArr).forEach(function(ele){
						if (ele !== undefined && ele !== null && ele !== "NaN" && ele !== "Type"){
							tempObj["Gender"] = tArr["Gender"];
							reqGender.push(tempObj);
							tempObj = {};
						}
					});

					break;

				default:
					break;
			}
		}

		Object.keys(rClasses).forEach(function(cls){ reqLvls[cls] = rClasses[cls]; });
		actClsKeys = Object.keys(aClss);
	}

	function fillRClssLst(){
		var reqs;

		Object.keys(classReqsJSON).forEach(function(clsId){
			reqs = classReqsJSON[clsId];
			var tempArr1 = []; //Weapons
			var tempArr2 = []; //Armor

			for (var i1 = 0; i1 < reqs.length; i1++){
				//alert(JSON.stringify(tArr));
				var tArr = reqs[i1];
				switch(tArr["Type"]){					
					case "Weapon":
						Object.keys(tArr).forEach(function(ele){
							var tempObj = {};

							if (ele !== undefined && ele !== null && ele !== "NaN" && ele !== "Type"){
								tempObj[ele] = tArr[ele];							
							}

							if ((tempObj["Restricted"] !== null && tempObj["Restricted"] !== undefined) &&
								tempObj["Restricted"] === true){
								tempArr1.push(tArr["WeapId"]);
							}
						});

						break;

					case "Armor":
						Object.keys(tArr).forEach(function(ele){
							var tempObj = {};

							if (ele !== undefined && ele !== null && ele !== "NaN" && ele !== "Type"){
								tempObj[ele] = tArr[ele];							
							}

							if ((tempObj["Restricted"] !== null && tempObj["Restricted"] !== undefined) &&
								tempObj["Restricted"] === true){
								tempArr2.push(tArr["ArmorId"]);
							}
						});

						break;

					default:
						break;
				}
			}

			if (tempArr1.length > 0) { 
				rstcClssList[clsId] = {"Weapons":[]};
				rstcClssList[clsId]["Weapons"] = tempArr1; 

			}

			if (tempArr2.length > 0) {
				rstcClssList[clsId] = {"Armor":[]};
				rstcClssList[clsId]["Armor"] = tempArr2;
			}


		});
	}

	function checkRequirements(clsIWnd,bIsInfoWindow,aClss,actor,selClass){
		var x = 0;
		var y = 35;

		var bWeapArmClssReqOverride = false;
		var bClassCheckPassed = false;
		var bGenderCheckPassed = false;
		var bItemCheckPassed = false;
		var bWeapCheckPassed = false;
		var bArmorCheckPassed = false;
		var bClassesRestricted = false;
		var rClssId = -1;

		//Required Weapon Processing
		if (Object.keys(reqWeaps).length > 0){
			Object.keys(reqWeaps).forEach(function(wId){			
				if ((reqWeaps[wId]["Replace"] !== null && reqWeaps[wId]["Replace"] !== undefined) &&
						reqWeaps[wId]["Replace"] === true){
						bWeapArmClssReqOverride = true;
				}				
				
				if (actor.isEquipped($dataWeapons[wId])){
					if (bWeapArmClssReqOverride) {
						bClassCheckPassed = true;
						bItemCheckPassed = true;
					}

					if(!bIsInfoWindow){ bWeapCheckPassed = true; }
					else{ clsIWnd.drawReqItem("Weap",$dataWeapons[wId].name,0,x,y,true); }
				}

				else{
					if (bWeapArmClssReqOverride) {
						bWeapArmClssReqOverride = false;
						bWeapCheckPassed = true;
						bClassCheckPassed = false;
						bItemCheckPassed = false;
					}
					else{
						if(!bIsInfoWindow){ bWeapCheckPassed = false; }
						else{ clsIWnd.drawReqItem("Weap",$dataWeapons[wId].name,0,x,y,false); }			
					}
				}

				if(bIsInfoWindow && !bWeapArmClssReqOverride){
					x += 202;

					if (x >= (clsIWnd._winW / 1.35)){
						x = 0;
						y += 45;
					}
				}
			});
		} else { bWeapCheckPassed = true }


		//Required Armor Processing
		if (Object.keys(reqArmor).length > 0){
			Object.keys(reqArmor).forEach(function(aId){			
				if ((reqArmor[aId]["Replace"] !== null && reqArmor[aId]["Replace"] !== undefined) &&
						reqArmor[aId]["Replace"] === true){
						bWeapArmClssReqOverride = true;
				}				
				
				if (actor.isEquipped($dataArmors[aId])){
					if (bWeapArmClssReqOverride) {
						bClassCheckPassed = true;
						bItemCheckPassed = true;
					}

					if(!bIsInfoWindow){ bArmorCheckPassed = true; }
					else{ clsIWnd.drawReqItem("Armor",$dataArmors[aId].name,0,x,y,true); }
				}

				else{
					if (bWeapArmClssReqOverride) {
						bWeapArmClssReqOverride = false;
						bArmorCheckPassed = true;
						bClassCheckPassed = false;
						bItemCheckPassed = false;
					} else{
						if(!bIsInfoWindow){ bArmorCheckPassed = false; }
						else{ clsIWnd.drawReqItem("Armor",$dataArmors[aId].name,0,x,y,false); }
					}
				}

				if(bIsInfoWindow && !bWeapArmClssReqOverride){
					x += 202;

					if (x >= (clsIWnd._winW / 1.35)){
						x = 0;
						y += 45;
					}
				}
			});
		} else { bArmorCheckPassed = true }

		//Required Gender Check
		if (reqGender.length > 0){
			for (var genId in reqGender){
				if ((actorGenders[actor.actorId()] !== undefined || actorGenders[actor.actorId()] !== null || Object.keys(actorGenders[actor.actorId()]).length !== 0) && actorGenders[actor.actorId()]["Gender"] === reqGender[0]["Gender"]){
					if(!bIsInfoWindow){ bGenderCheckPassed = true; }
					else{ clsIWnd.drawReqItem("Gender",reqGender[0]["Gender"],0,x,y,true); }
				}

				else{
					if(!bIsInfoWindow){ bGenderCheckPassed = false; }
					else{ clsIWnd.drawReqItem("Gender",reqGender[0]["Gender"],0,x,y,false); }
				}

				if(bIsInfoWindow){
					x += 202;

					if (x >= (clsIWnd._winW / 1.35)){
						x = 0;
						y += 45;
					}
				}
			}
		} else { bGenderCheckPassed = true }

		if (!bWeapArmClssReqOverride){
			//Required Class Processing
			for (var i1 = 0; i1 < reqClasses.length; i1++){
				for (var i2 = 0; i2 <actClsKeys.length; i2++){
					var bHasArmorRestriction = false;
					var bHasWeaponRestriction = false;
					if (parseInt(actClsKeys[i2]) === parseInt(reqClasses[i1])){
						if (aClss[reqClasses[i1]] >= parseInt(reqLvls[reqClasses[i1]])) {
							if (Object.keys(rstcClssList).length == 0){
								if(!bIsInfoWindow){ bClassCheckPassed = true; }
								else{ clsIWnd.drawReqItem("Class",$dataClasses[reqClasses[i1]].name,reqLvls[reqClasses[i1]],x,y,true); }
							} else{
								//Class restrictions exist, check if the player has a weapon or armor that is part of a class restriction
								checkForRestrictions(actor);
								if (bActorHasClassRestriction){
									//Player has a restriction from an equipped item, check if the current selected class has an item restriction
									if (rstcClssList[selClass] !== undefined && rstcClssList[selClass] !== null){
										//Current class does have a restriction now determine the item and if the player has it equipped

										if (rstcClssList[selClass]["Weapons"] !== undefined && rstcClssList[selClass]["Weapons"] !== null){
											var clssWeapons = rstcClssList[selClass]["Weapons"];

											for (var weap in clssWeapons){
												if (actor.isEquipped($dataWeapons[clssWeapons[weap]])){								
													bHasWeaponRestriction = true;
												}
												else{
													bHasWeaponRestriction = false;
												}
											}
										}

										if (rstcClssList[selClass]["Armor"] !== undefined && rstcClssList[selClass]["Armor"] !== null){
											var clssArmor = rstcClssList[selClass]["Armor"];

											for (var armr in clssArmor){
												if (actor.isEquipped($dataArmors[clssArmor[armr]])){
													bHasArmorRestriction = true;
												}
												else{									
													bHasArmorRestriction = false;
												}
											}
										}


										if ((rstcClssList[selClass]["Armor"] !== undefined && rstcClssList[selClass]["Armor"] !== null) &&
											(rstcClssList[selClass]["Weapons"] !== undefined && rstcClssList[selClass]["Weapons"] !== null) &&
											bHasArmorRestriction && bHasWeaponRestriction){
											if(!bIsInfoWindow){ bClassCheckPassed = true; }
											else{ clsIWnd.drawReqItem("Class",$dataClasses[reqClasses[i1]].name,reqLvls[reqClasses[i1]],x,y,true); }

										} else if ((rstcClssList[selClass]["Armor"] !== undefined || rstcClssList[selClass]["Armor"] !== null) && bHasArmorRestriction ){
											if(!bIsInfoWindow){ bClassCheckPassed = true; }
											else{ clsIWnd.drawReqItem("Class",$dataClasses[reqClasses[i1]].name,reqLvls[reqClasses[i1]],x,y,true); }

										} else if ((rstcClssList[selClass]["Weapons"] !== undefined && rstcClssList[selClass]["Weapons"] !== null) && bHasWeaponRestriction ){
											if(!bIsInfoWindow){ bClassCheckPassed = true; }
											else{ clsIWnd.drawReqItem("Class",$dataClasses[reqClasses[i1]].name,reqLvls[reqClasses[i1]],x,y,true); }

										} else{
											if(!bIsInfoWindow){ bClassCheckPassed = false; }
											else{ clsIWnd.drawReqItem("Class",$dataClasses[reqClasses[i1]].name,reqLvls[reqClasses[i1]],x,y,false); }
										}
									} else {
										if(!bIsInfoWindow){ bClassCheckPassed = false; }
										else{ clsIWnd.drawReqItem("Class",$dataClasses[reqClasses[i1]].name,reqLvls[reqClasses[i1]],x,y,false); }
									}
								} else{
									if(!bIsInfoWindow){ bClassCheckPassed = true; }
									else{ clsIWnd.drawReqItem("Class",$dataClasses[reqClasses[i1]].name,reqLvls[reqClasses[i1]],x,y,true); }
								}
							}							
						} 
						else {
							if(!bIsInfoWindow){ bClassCheckPassed = false; }
							else{ clsIWnd.drawReqItem("Class",$dataClasses[reqClasses[i1]].name,reqLvls[reqClasses[i1]],x,y,false); }
						}

						if(bIsInfoWindow){
							x += 202;

							if (x >= (clsIWnd._winW / 1.35)){
								x = 0;
								y += 45;
							}
						}

						break;
					}				
				}
			}
			

			for (var i1 = 0; i1 < reqClasses.length; i1++){
				for (var i2 = 0; i2 < actClsKeys.length; i2++){
					if (parseInt(actClsKeys[i2]) === parseInt(reqClasses[i1]) && i2 !== actClsKeys.length-1) { break; }
					else if (i2 !== 0 && i2 === actClsKeys.length-1){					
						if (parseInt(actClsKeys[i2]) === parseInt(reqClasses[i1])) { break; }
						else{
							if(!bIsInfoWindow){ bClassCheckPassed = false; }
							else{
								clsIWnd.drawReqItem("Class",$dataClasses[reqClasses[i1]].name,reqLvls[reqClasses[i1]],x,y,false);
								x += 202;

								if (x >= (clsIWnd._winW / 1.35)){
									x = 0;
									y += 45;
								}
							}
						}
					}				
				}
			}
			

			//Required Item Processing
			if (reqItems.length > 0){
				for (var itmId in reqItems){
					if ($gameParty.numItems($dataItems[reqItems[itmId]]) > 0){
						if(!bIsInfoWindow){ bItemCheckPassed = true; }
						else{ clsIWnd.drawReqItem("Item",$dataItems[reqItems[itmId]].name,0,x,y,true); }
					}
					else{
						if(!bIsInfoWindow){ bItemCheckPassed = false; }
						else{ clsIWnd.drawReqItem("Item",$dataItems[reqItems[itmId]].name,0,x,y,false); }
					}

					if(bIsInfoWindow){
						x += 202;

						if (x >= (clsIWnd._winW / 1.35)){
							x = 0;
							y += 45;
						}
					}
				}
			} else { bItemCheckPassed = true }
		}

		if (bClassCheckPassed && bGenderCheckPassed && bItemCheckPassed && bWeapCheckPassed && bArmorCheckPassed){
			bActorCanChange = true;
		} else { bActorCanChange = false; }
	}

	var bActorHasClassRestriction;
	function checkForRestrictions(actor){
		var tempObj = {};
		var tempArr = [];
		bActorHasClassRestriction = false;

		if (Object.keys(rstcClssList).length > 0){
			var rClssKeys = Object.keys(rstcClssList);

			for (var i1 = 0; i1 < rClssKeys.length; i1++){
				if(rstcClssList[rClssKeys[i1]] !== undefined && rstcClssList[rClssKeys[i1]] !== null){
					if ((rstcClssList[rClssKeys[i1]]["Weapons"] !== undefined &&  rstcClssList[rClssKeys[i1]]["Weapons"] !== null) && rstcClssList[rClssKeys[i1]]["Weapons"].length > 0){
						var clssWeapons = rstcClssList[rClssKeys[i1]]["Weapons"];

						for (var weap in clssWeapons){
							if (actor.isEquipped($dataWeapons[clssWeapons[weap]])){								
								bActorHasClassRestriction = true;
								break;
							}
							else{
								bActorHasClassRestriction = false;
							}
						}

						if (bActorHasClassRestriction){ break; }
					}

					if ((rstcClssList[rClssKeys[i1]]["Armor"] !== undefined &&  rstcClssList[rClssKeys[i1]]["Armor"] !== null) && rstcClssList[rClssKeys[i1]]["Armor"].length > 0){
						var clssArmor = rstcClssList[rClssKeys[i1]]["Armor"];

						for (var armr in clssArmor){
							if (actor.isEquipped($dataArmors[clssArmor[armr]])){
								bActorHasClassRestriction = true;
								break;
							}
							else{									
								bActorHasClassRestriction = false;
							}
						}

						if (bActorHasClassRestriction){ break; }
					}
				}
			}
		}
	}
})();