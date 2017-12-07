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
*@param Class List Color
*@desc This param controls the background color of the gauge; use hex colors
*@default #FFF
*
*
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


(function(_) {

	"use strict";

	const params = PluginManager.parameters('Geowil_ClassChanger');

	var weaponFormStart = "<Requirements>";
	var weaponFormEnd = "<\/Requirements>";

	var classReqJSON = {};
	var sysClassList = {};

	var passCondColor = String(params['Pass Color']);
	var failCondColor = String(params['Fail Color']);
	var clsListColor = String(params['Class List Color']);



	/* Database Manager */
	var DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
	DataManager.isDatabaseLoaded = function(){
		if (!DataManager_isDatabaseLoaded.call(this)) { return false;}
		this.loadClassReqTags();
		return true;
	};

	DataManager.loadClassReqTags = function(){
		var group = $dataClasses;
		//alert(JSON.stringify(group));
		this.load_classtags(group);
	};

	DataManager.load_classtags = function(group){
		for (var n = 1; n < group.length; n++){
			var obj = group[n];
			var reqs = {};

			if (obj.note != "" && obj.note !== null) {
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
							//if (reqData[0] !== 0){
								reqs[parseInt(reqData[0])] = reqData[1];
							//}

							break;
					}
				});

				classReqJSON[obj.id] = reqs;

				var keys = Object.keys(classReqJSON);
				for (var i1 = 0; i1 < keys.length; i1++){
					sysClassList[i1] = keys[i1];
				}
			}
		}
	};


	/* Game Interpreter */
	var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args){
		Game_Interpreter_pluginCommand.call(this,command,args);

		if (command === 'StartClassChange'){
			SceneManager.push(Scene_ClassChange);
		}
	}


	/* Game Actor */
	//Setup class data for game actors
	var Game_Actor_initialize = Game_Actor.prototype.initialize;
	Game_Actor.prototype.initialize = function(actorId) {
	    Game_Actor_initialize.apply(this,arguments);
	};

	var Game_Actor_initMembers = Game_Actor.prototype.initMembers;
	Game_Actor.prototype.initMembers = function() {
		this._className = "";
	    this._actorClasses = undefined;
	    Game_Actor_initMembers.call(this);

	    this.setupActorClasses();
	};

	Game_Actor.prototype.getClassName = function(clsId){
		return $dataClasses[clsId].name;
	};

	Game_Actor.prototype.setupActorClasses = function(){
		this._actorClasses = {};
		//alert(this._classId);
		this._actorClasses[this._classId] = this._level;
	};

	Game_Actor.prototype.updateActorClasses = function(actor){
		this._actorClasses = actor._actorClasses;
	}

	var Game_Actor_levelUp = Game_Actor.prototype.levelUp;
	Game_Actor.prototype.levelUp = function(){
		Game_Actor_levelUp.call(this);

		this._actorClasses[this._classId] = this._level;
	};

	Game_Actor.prototype.getActorClasses = function(){
		return this._actorClasses;
	};

	Game_Actor.prototype.getActorClsLevel = function(index){
		return this._actorClasses[index] !== undefined ? this._actorClasses[index] : 'f';
	}

	Game_Actor.prototype.resetSkills = function(){
		this._skills = [];
    	this._lastMenuSkill = new Game_Item();
    	this._lastBattleSkill  = new Game_Item();
	};

	Game_Actor.prototype.classChange = function(classId){
		this._classId = classId;
		this.resetSkills();

	    this.chgExp(this._exp[this._classId] || 0);
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
};


	/* Scene Class Change */
	Scene_ClassChange.prototype = Object.create(Scene_MenuBase.prototype);
	Scene_ClassChange.prototype.constructor = Scene_ClassChange;

	Scene_ClassChange.prototype.initialize = function(){
		Scene_MenuBase.prototype.initialize.call(this);

		ImageManager.loadFace($gameParty.menuActor().faceName());
	};

	Scene_ClassChange.prototype.create = function(){
		Scene_MenuBase.prototype.create.call(this);

		this.createSelActorWindow();
		this.createClassListWindow();
		this.createStatusWindow();
		this.createActorClassWindow();
		this.createRequirementsWindow();
		this.createCommandWindow();
		this.refreshActor();
	};

	Scene_ClassChange.prototype.start = function(){
		this._clsLstWnd.refresh();
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
	};

	Scene_ClassChange.prototype.onSelActSelected = function(){
		this.setActor($gameParty.members()[this._selActWnd.index()]);

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

		this._clsLstWnd = new Window_ClassList(winX,winY,winW,Graphics.boxHeight);
		this._clsLstWnd.setHandler('ok', this.onClsWndSelected.bind(this));
		this._clsLstWnd.setHandler('cancel', this.onClsWndCancel.bind(this));
		this._clsLstWnd.deactivate();
		this._clsLstWnd.deselect();
		this._clsLstWnd.hide();
		this.addWindow(this._clsLstWnd);
	};

	Scene_ClassChange.prototype.onClsWndSelected = function(){
		this._reqWnd.setActClasses(this._actClsWnd.getActorClasses());
		this._comWnd.setActClasses(this._actClsWnd.getActorClasses());

		this._reqWnd.setSelectedClass(this._clsLstWnd.getSelClass());
		this._comWnd.setSelectedClass(this._clsLstWnd.getSelClass());

		this._statWnd.activate();
		this._actClsWnd.activate();
		this._reqWnd.activate();
		this._reqWnd.show();
		//this._comWnd.selectLast();
		this._comWnd.show();
		this._comWnd.activate();

		this._comWnd.setHandler('chngcls',this.changeClass.bind(this));
		this._comWnd.setHandler('cancel',this.cancel.bind(this));
		this._comWnd.refresh();
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
		const winW = (Graphics.width - this._clsLstWnd.getWidth()) * 0.65;
		const winH = Graphics.boxHeight / 1.8;

		this._statWnd = new Window_ClassChangeStatus(winX,winY,winW,winH);
		this._statWnd.hide();
		this.addWindow(this._statWnd);
	};

	Scene_ClassChange.prototype.createActorClassWindow = function(){
		const winX = this._clsLstWnd.getWidth() + this._statWnd.getWidth();
		const winY = 0;
		const winW = (Graphics.width - this._clsLstWnd.getWidth()) - this._statWnd.getWidth();
		const winH = this._statWnd.getHeight();

		this._actClsWnd = new Window_CCActorClasses(winX,winY,winW,winH);
		this._actClsWnd.hide();
		this.addWindow(this._actClsWnd);
	};

	Scene_ClassChange.prototype.createRequirementsWindow = function(){
		const winX = this._clsLstWnd.getWidth();
		const winY = this._statWnd.getHeight();
		const winW = Graphics.width - this._clsLstWnd.getWidth();
		const winH = (Graphics.boxHeight - this._statWnd.getHeight() - 2) * 0.75;

		this._reqWnd = new Window_ClassInformation(winX,winY,winW,winH);
		this._reqWnd.deactivate();
		this._reqWnd.hide();
		this.addWindow(this._reqWnd);
	};

	Scene_ClassChange.prototype.createCommandWindow = function(){
		const winY = this._reqWnd.getHeight() + this._statWnd.getHeight();
		const winX = this._clsLstWnd.getWidth();
		const winW = Graphics.boxWidth - this._clsLstWnd.getWidth();
		const winH = (Graphics.boxHeight - this._statWnd.getHeight()) - this._reqWnd.getHeight();

		this._comWnd = new Window_CCCommand(winX,winY,winW,winH);
		this._comWnd.deselect();
		this._comWnd.deactivate();
		this._comWnd.hide();
		this.addWindow(this._comWnd);
	};

	Scene_ClassChange.prototype.setActor = function(actor){
		if (actor !== undefined){
			this._actor = actor;

			this._comWnd.setActor(actor);
			this._statWnd.setActor(actor);
			this._actClsWnd.setActor(actor);
			this._statWnd.refresh();
			this._actClsWnd.refresh();
		}
	}

	Scene_ClassChange.prototype.refreshActor = function(){
		//const actor = this.actor();
		var actor = this._actor;

		if (actor !== undefined){
			this._comWnd.setActor(actor);
			this._statWnd.setActor(actor);
			this._actClsWnd.setActor(actor);
			this._statWnd.refresh();
			this._actClsWnd.refresh();
		}
	};

	Scene_ClassChange.prototype.changeClass = function(){
		this._actor.classChange(this._clsLstWnd.getSelClass(),false);

		this._comWnd.deselect();
		this._comWnd.hide();
		this._clsLstWnd.select();
		this._clsLstWnd.activate();
		this._reqWnd.clearContents();
		this._reqWnd.deactivate();
		this._reqWnd.hide();

		this._statWnd.setActor(this._actor);
		this._actClsWnd.setActor(this._actor);
		this._comWnd.setActor(this._actor);
	};

	Scene_ClassChange.prototype.cancel = function(){
		this._comWnd.deselect();
		this._comWnd.deactivate();
		this._comWnd.hide();
		this._reqWnd.clearContents();
		this._reqWnd.deactivate();
		this._reqWnd.hide();
		this._clsLstWnd.select();
		this._clsLstWnd.activate();
	};

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
};

Window_SelectActor.prototype.windowWidth = function() {
    return Graphics.boxWidth - 240;
};

Window_SelectActor.prototype.windowHeight = function() {
    return Graphics.boxHeight;
};

Window_SelectActor.prototype.maxItems = function() {
    return $gameParty.size();
};

Window_SelectActor.prototype.itemHeight = function() {
    var clientHeight = this.height - this.padding * 2;
    return Math.floor(clientHeight / this.numVisibleRows());
};

Window_SelectActor.prototype.numVisibleRows = function() {
    return 4;
};

Window_SelectActor.prototype.loadImages = function() {
    $gameParty.members().forEach(function(actor) {
        ImageManager.reserveFace(actor.faceName());
    }, this);
};

Window_SelectActor.prototype.drawItem = function(index) {
    this.drawItemBackground(index);
    this.drawItemImage(index);
    this.drawItemStatus(index);
};

Window_SelectActor.prototype.drawItemBackground = function(index) {
    if (index === this._pendingIndex) {
        var rect = this.itemRect(index);
        var color = this.pendingColor();
        this.changePaintOpacity(false);
        this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
        this.changePaintOpacity(true);
    }
};

Window_SelectActor.prototype.drawItemImage = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    this.changePaintOpacity(actor.isBattleMember());
    this.drawActorFace(actor, rect.x + 1, rect.y + 1, Window_Base._faceWidth, Window_Base._faceHeight);
    this.changePaintOpacity(true);
};

Window_SelectActor.prototype.drawItemStatus = function(index) {
    var actor = $gameParty.members()[index];
    var rect = this.itemRect(index);
    var x = rect.x + 162;
    var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
    var width = rect.width - x - this.textPadding();
    this.drawActorSimpleStatus(actor, x, y, width);
};

Window_SelectActor.prototype.processOk = function() {
    Window_Selectable.prototype.processOk.call(this);
};

Window_SelectActor.prototype.selectLast = function() {
    this.select($gameParty.menuActor().index() || 0);
};

Window_SelectActor.prototype.pendingIndex = function() {
    return this._pendingIndex;
};

Window_SelectActor.prototype.setPendingIndex = function(index) {
    var lastPendingIndex = this._pendingIndex;
    this._pendingIndex = index;
    this.redrawItem(this._pendingIndex);
    this.redrawItem(lastPendingIndex);
};


/* Window ClassList */

Window_ClassList.prototype = Object.create(Window_Selectable.prototype);
Window_ClassList.prototype.constructor = Window_ClassList;

Window_ClassList.prototype.initialize = function(x,y,w,h){
	Window_Selectable.prototype.initialize.call(this,x,y,w,h);
	this._actor = null;
	this._winWdth = w;
	this._winH = h;

	this._cIX = 0;
	this._cIY = 0;
	this._cIW = 45;

	this._pendingIndex = -1;
	this._classData = [];
	this._selClass = 0;
	this.refresh();
};

Window_ClassList.prototype.getWidth = function(){
	return this._winWdth;
};

Window_ClassList.prototype.getSelClass = function(){
	return this._selClass;
}

Window_ClassChangeStatus.prototype.getHeight = function(){
	return this._winH;
};

Window_ClassList.prototype.maxCols = function(){
	return 1;
};

Window_ClassList.prototype.maxItems = function(){
	return classReqJSON ? Object.keys(classReqJSON).length : 1;
};

Window_ClassList.prototype.itemHeight = function(){
	//var cliHight = this.height - this.padding * 1.25;
	//return Math.floor(cliHight/this.numVisibleRows());
	return 35;
};

Window_ClassList.prototype.numVisibleRows = function(){
	return 10;
};

Window_ClassList.prototype.spacing = function(){
	return 5;
}

Window_ClassList.prototype.isEnabled = function(item){
	return true;
}

Window_ClassList.prototype.drawItem = function(index){
	this.drawClassItem(index,this._cIX,this._cIY,this._cIW);
};

Window_ClassList.prototype.drawClassItem = function(index,x,y,w){
	var clsId = index;

	if (clsId !== -1 && $dataClasses[sysClassList[clsId]].name !== null && $dataClasses[sysClassList[clsId]].name !== undefined){
		var rect = this.itemRectForText(index);
		this.contents.fontSize = 22;
		x = rect.x;
		y += rect.y+rect.height/2 - this.lineHeight() * 0.5;
		w = rect.width -x - this.textPadding();
		this.drawText($dataClasses[sysClassList[clsId]].name,rect.x,rect.y,rect.width,'left');
	}

	this.contents.fontSize = 24;
}

Window_ClassList.prototype.setActor = function(actor){
	if (this._actor !== actor){
		this._actor= actor;
		this.refreshList();
		this.refresh();
	}
};

Window_ClassList.prototype.selectLast = function(){
	this.select(this.index() || 0);
}

Window_ClassList.prototype.processOk = function(){
	this._selClass = this.index()+1;
	Window_Selectable.prototype.processOk.call(this);
	//alert(this.index());
	this._classData = classReqJSON[this.index()];
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

Window_ClassChangeStatus.prototype.initialize = function(x,y,w,h){
	Window_Selectable.prototype.initialize.call(this,x,y,w,h);
	this._winX = x;
	this._winY = y;
	this._winW = w;
	this._winH = h;
	this._actor = null;
	this.refresh();
};

Window_ClassChangeStatus.prototype.getWidth = function(){
	return this._winW;
};

Window_ClassChangeStatus.prototype.getHeight = function(){
	return this._winH;
};

Window_ClassChangeStatus.prototype.setActor = function(actor){
	this._actor = actor;
	this.refresh();
};

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
		this.drawActorFace(this._actor,12,lineHgt+40);
		this.drawBasicInfo(180,lineHgt*2,this.contentsWidth()-180);
		//Line 7
		//this.drawHorzLine(lineHgt*6);
	}
};

Window_ClassChangeStatus.prototype.drawBasicInfo = function(x,y,width){
	const lineHgt = this.lineHeight();

	this.drawActorLevel(this._actor,x,y);
	this.drawActorIcons(this._actor,x,y+lineHgt);
	this.drawActorHp(this._actor,x,y+lineHgt*2,width);
	this.drawActorMp(this._actor,x,y+lineHgt*3,width);
};

Window_ClassChangeStatus.prototype.drawHorzLine = function(y){
	const lineY = y + this.lineHeight() / 2 - 1;

	this.contents.paintOpacity = 48;
	this.contents.fillRect(0,lineY,this.contentsWidth(),2,this.normalColor());
	this.contents.paintOpacity = 255;
};

/* Window_CCActorClasses */
Window_CCActorClasses.prototype = Object.create(Window_Base.prototype);
Window_CCActorClasses.prototype.constructor = Window_CCActorClasses;

Window_CCActorClasses.prototype.initialize = function(x,y,w,h){
	Window_Base.prototype.initialize.call(this,x,y,w,h);
	this._winX = x;
	this._winY = y;
	this._winW = w;
	this._winH = h;
	this._actor = null;
	this._actorClasses = {};
	this.refresh();
};

Window_CCActorClasses.prototype.getActorClasses = function(){
	return this._actorClasses;
}

Window_ClassChangeStatus.prototype.getWidth = function(){
	return this._winW;
};

Window_ClassChangeStatus.prototype.getHeight = function(){
	return this._winH;
};

Window_CCActorClasses.prototype.setActor = function(actor){
	this._actor = actor;
	this.refresh();
};

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
};

Window_CCActorClasses.prototype.drawClsListItem = function(name,lvl,y){
	this.contents.fontSize = 22;
	this.changeTextColor(clsListColor);
	this.drawText(name,0,y,60,0,'left');
	this.drawText("Lv." + String(lvl),name.length+65,y,75,'right');
};


/* Window_ClassInformation */
Window_ClassInformation.prototype = Object.create(Window_Base.prototype);
Window_ClassInformation.prototype.constructor = Window_ClassInformation;

Window_ClassInformation.prototype.initialize = function(x,y,w,h){
	Window_Base.prototype.initialize.call(this,x,y,w,h);
	this._winX = x;
	this._winY = y;
	this._winW = w;
	this._winH = h;
	this._selectedClass = null;
	this._actClasses = undefined;

	this.refresh();
};

Window_ClassInformation.prototype.setActClasses = function(actorClasses){
	this._actClasses = actorClasses;
}

Window_ClassInformation.prototype.getWidth = function(){
	return this._winW;
};

Window_ClassInformation.prototype.getHeight = function(){
	return this._winH;
};

Window_ClassInformation.prototype.refresh = function(){
	//this.contents.clear();
	var x = 0;
	var y = 35;

	var selClass = this._selectedClass;
	var aClss = this._actClasses;

	if (selClass != null || selClass != undefined){
		this.resetTextColor();
		this.drawReqs();

		Object.keys(classReqJSON).forEach(function(clsId){
			if (selClass === parseInt(clsId)){
				var reqs = classReqJSON[clsId];

				var reqClasses = [];

				Object.keys(reqs).forEach(function(cls){
					if (cls !== undefined && cls !== null && cls !== "NaN"){
						reqClasses.push(cls);
					}
				});

				var reqLvls = {};

				reqClasses.forEach(function(cls){ reqLvls[cls] = reqs[cls]; });

				var actClsKeys = Object.keys(aClss);

				for (var i1 = 0; i1 < reqClasses.length; i1++){
					for (var i2 = 0; i2 < actClsKeys.length; i2++){
						if (parseInt(actClsKeys[i2]) === parseInt(reqClasses[i1])){
							if (aClss[reqClasses[i1]] >= parseInt(reqLvls[reqClasses[i1]])){
								this.drawReqItem($dataClasses[reqClasses[i1]].name,reqLvls[reqClasses[i1]],x,y,true);
							} else{
								this.drawReqItem($dataClasses[reqClasses[i1]].name,reqLvls[reqClasses[i1]],x,y,false);
							}

							x += 202;

							if (x >= (this._winW / 1.35)){
								x = 0;
								y += 45;
							}

							break;
						}
					}
				}

				for (var i1 = 0; i1 < reqClasses.length; i1++){
					for (var i2 = 0; i2 < actClsKeys.length; i2++){
						if (parseInt(actClsKeys[i2]) === parseInt(reqClasses[i1]) && i2 !== actClsKeys.length-1){
							break;
						}
						else if (i2 !== 0 && i2 === actClsKeys.length-1){
							if (parseInt(actClsKeys[i2]) === parseInt(reqClasses[i1])){
								break;
							}else{
								this.drawReqItem($dataClasses[reqClasses[i1]].name,reqLvls[reqClasses[i1]],x,y,false);
								x += 202;

								if (x >= (this._winW / 1.35)){
									x = 0;
									y += 45;
								}
							}
						}
					}
				}
			}
		}, this);
	}
};

Window_ClassInformation.prototype.drawReqs = function(){
	this.contents.fontSize = 25;
	this.drawText($dataClasses[sysClassList[this._selectedClass-1]].name + " Requirements: ",0,0,260,'left');
};

Window_ClassInformation.prototype.drawReqItem = function(rClsNm, rClsLv,x,y,bReqIsMet){
	this.contents.fontSize = 18;
	var txt = rClsNm + " Lv." + String(rClsLv);
	if (!bReqIsMet){
		this.changeTextColor(failCondColor);
	} else{
		this.changeTextColor(passCondColor);
	}

	this.drawText(txt,x,y,txt.length + 160,'left');
};

Window_ClassInformation.prototype.setSelectedClass = function(selCls){
	if (this._selectedClass !== selCls){
		this._selectedClass = selCls;
		this.refresh();
	}
};

Window_ClassInformation.prototype.clearContents = function(){
	this.contents.clear();
}


/* Window_CCComand */
Window_CCCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_CCCommand.prototype.constructor = Window_CCCommand;

Window_CCCommand.prototype.initialize = function(x,y,w,h){
	this._winW = w;
	Window_HorzCommand.prototype.initialize.call(this,x,y);
	this._clsLstWnd = null;
	this._actor = null;
	this._selectedClass = null;
	this._actClasses = undefined;
	this._curACId = null;

	this.refresh();
};

Window_CCCommand.prototype.setActClasses = function(actorClasses){
	this._actClasses = actorClasses;
}

Window_CCCommand.prototype.windowWidth = function(){
	return this._winW;
}

Window_CCCommand.prototype.setClsLstWindow = function(window){
	this._clsLstWnd = window;
};

Window_CCCommand.prototype.setActor = function(actor){
		this._actor = actor;
		this._curACId = this._actor._classId;
};

Window_CCCommand.prototype.setSelectedClass = function(selCls){
	if (this._selectedClass !== selCls){
		this._selectedClass = selCls;
	}
};

Window_CCCommand.prototype.maxCols = function(){
	return 2;
}

Window_CCCommand.prototype.makeCommandList = function(){
	var bActorCanChange = false;

	var selClass = this._selectedClass;
	var aClss = this._actClasses;
	var curCID = this._curACId;

	if (selClass != null || selClass != undefined){
		Object.keys(classReqJSON).forEach(function(clsId){
			//If the key (class name) equals the class we want to change to, then continue
			if (parseInt(clsId) === selClass){
				//If the actor IS this class already, do not allow change
				if (curCID === selClass){
					bActorCanChange = false;
				}
				//If the actor has already been this class, don't do this processing
				else if (aClss[selClass]){
					bActorCanChange = true;
				}
				else{
					//clsId += 1; //Increment it since we are working on a 0-based index now for the json data
					var reqs = classReqJSON[clsId];

					var reqClasses = [];

					Object.keys(reqs).forEach(function(cls){
						if (cls !== undefined && cls !== null){
							reqClasses.push(cls);
						}
					});

					var reqLvls = {};

					reqClasses.forEach(function(cls){ reqLvls[cls] = reqs[cls]; });

					var actClsKeys = Object.keys(aClss);


					for (var i1 = 0; i1 < reqClasses.length; i1++){
						for (var i2 = 0; i2 <actClsKeys.length; i2++){
							if (parseInt(actClsKeys[i2]) === parseInt(reqClasses[i1])){
								if (aClss[reqClasses[i1]] >= parseInt(reqLvls[reqClasses[i1]])) { bActorCanChange = true; }
								else { bActorCanChange = false; }

								break;
							}
						}
					}

					for (var i1 = 0; i1 < reqClasses.length; i1++){
						for (var i2 = 0; i2 < actClsKeys.length; i2++){
							if (parseInt(actClsKeys[i2]) === parseInt(reqClasses[i1]) && i2 !== actClsKeys.length-1) { break; }
							else if (i2 !== 0 && i2 === actClsKeys.length-1){
								if (parseInt(actClsKeys[i2]) === parseInt(reqClasses[i1])) { break; }
								else{ bActorCanChange = false; }
							}
						}
					}
				}
			}
		});
	}

	this.addCommand("Change Class",'chngcls',bActorCanChange);
	this.addCommand("Cancel",'cancel');
};

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
};

Window_CCCommand.prototype.refresh = function(){
	this.clearCommandList();
    this.makeCommandList();
    Window_HorzCommand.prototype.refresh.call(this);
}
})();