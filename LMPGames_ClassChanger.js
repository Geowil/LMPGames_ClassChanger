/*:
* @plugindesc Allows class changing using note tags w/ custom menu called by plugin command.
* @title Class Changer
* @author LMPGames
* @date 12/17/2021
* @version 2.0
* @filename LMPGames_ClassChanger.js
* @url https://github.com/Geowil/LMPGames_ClassChanger
*
*
* @param System Settings
* @desc Settings that enable or disable to change the plugin behavior.
*
*
* @param Is LMPGames_AWP Installed
* @parent System Settings
* @desc If turned on, enables support for LMPGames_AWP plugin.   !~Currently not implemented~!
* @type boolean
* @default false
*
*
* @param Enable Currency Cost
* @parent System Settings
* @desc When enabled, turns on Currency Cost System.  If enabled, cost formula required to be in note tags.
* @type boolean
* @default false
*
*
* @param Enable Item Cost
* @parent System Settings
* @desc When enabled, turns on  Item Cost System.  If enabled, cost formula and item id is required to be in the note tags.
* @type boolean
* @default false
*
*
* @param Enable Gender Requirements
* @parent System Settings
* @desc When enabled, turns on character gender requirements for changing classes.
* @type boolean
* @default false
*
*
* @param Enable Existing Class Requirement Bypass
* @parent System Settings
* @desc When enabled, if a character has been a class before, they don't have to meet the requirements to change to it again.  See help for more info.
* @type boolean
* @default false
*
*
* @param Use Class Description
* @parent System Settings
* @desc When enabled, allows you to add a description for each class to them note tag for this plugin.
* @type boolean
* @default false
*
*
* @param Show Extended Parameters
* @parent System Settings
* @desc When enabled, will display SP and EX params in the class information window.
* @type boolean
* @default false
*
*
* @param Only Show Non-Zero Parameters
* @parent System Settings
* @desc When enabled, will hide parameters with a value of 0
* @type boolean
* @default false
*
*
* @param Enable Element Trait Icons
* @parent System Settings
* @desc When enabled, shows an icon with traits.  You MUST set this up manually in the Element Trait Icon Mapping setting.
* @type boolean
* @default false
*
*
* @param Use Aliases
* @parent System Settings
* @desc When enabled, will automatically use alias placed in class note tag instead of the full class name.
* @type boolean
* @default false
*
*
* @param Use Cost on Bypass
* @parent System Settings
* @desc When enabled, bypass conditions will not bypass cost Requirements as well.
* @type boolean
* @default true
*
*
* @param Element Resist Display Mode
* @parent System Settings
* @desc Allows you to select the display mode for resistances and weaknesses.  Mode 1: 150%/50%  Mode 2: +50%/-50%
* @type number
* @min 1
* @max 2
* @default 1
*
*
* @param Currency Icon ID
* @parent System Settings
* @desc This setting sets the icon id to use with currency in the cost and currency windows.
* @type text
* @default 0
*
*
* @param Cost Item ID
* @parent System Settings
* @desc The ID for the item used by the item cost system.  Required if item cost is enabled.
* @type Item
* @default 1
*
*
* @param Gender Mapping
* @parent System Settings
* @desc This setting allows you to create genders for gender class requirements.  See Help for more information.
* @type note
* @default "{\"Male\" : \"M\", \"Female\" : \"F\", \"Other\" : \"O\"}"
*
*
* @param Element Trait Icon Mapping
* @parent System Settings
* @desc Maps the icon id to the element.  Icon ids should be in the same order as the elements in your Type tab Elements list.
* @type note
* @default "[0, 76, 64, 65, 66, 67, 68, 69, 70, 71]"
*
*
* @param Element Attribute Order Mode
* @parent System Settings
* @desc This setting allows you to set element attribute order by. 1: desc 2: asc
* @type number
* @min 1
* @max 2
* @default 1
*
*
* @param Ignore Skill List
* @parent System Settings
* @desc Skill ids in this list will not be displayed in the class info by the plugin.
* @type note
* @default "[1, 2, 6, 7]"
*
*
* @param Font Settings
* @desc These settings control font size in various parts of the plugin.
*
*
* @param Font Color Settings
* @parent Font Settings
* @desc These settings allow you to change the font colors used in the plugin.
*
*
* @param Cost Requirement Pass Color
* @parent Font Color Settings
* @desc This sets the color for cost requirements that the player passes.
* @default #00CC00
*
*
* @param Cost Requirement Fail Color
* @parent Font Color Settings
* @desc This sets the color for the cost requirments that the player fails.
* @default #FF0000
*
*
* @param Class Requirement Pass Text Code value
* @parent Font Color Settings
* @desc This sets the text code to color the text in the requirements window when an item is passing.  See help text for more info.
* @type text
* @default 0
*
*
* @param Class Requirement Fail Text Code value
* @parent Font Color Settings
* @desc This sets the text code to color the text in the requirements window when an item is failing.  See help text for more info.
* @type text
* @default 10
*
*
* @param Class List Can Change Color
* @parent Font Color Settings
* @desc This sets the color of the list items in the class selection list if the player is able to change to that class.
* @default #FFFFFF
*
*
* @param Class List Cannot Change Color
* @parent Font Color Settings
* @desc This sets the color of the list items in the class selection list if the player is not able to change to that class.
* @default #787878
*
*
* @param Default Class List Color
* @parent Font Color Settings
* @desc This sets the color for classes in the class list that the player has already unlocked.
* @default #FFF
*
*
* @param Font Size Settings
* @parent Font Settings
*
*
* @param Class List Font Size
* @parent Font Size Settings
* @desc Sets the font size for class names in the Class List window.
* @type Text
* @default 26
*
*
* @param Actor Class List Content Font Size
* @parent Font Size Settings
* @desc Sets the font size for class listings in the 'Previous Classes' window.
* @type Text
* @default 22
*
*
* @param Actor Class List Heading Font Size
* @parent Font Size Settings
* @desc Sets the font size of the heading for the "Previous Classes" window.
* @type text
* @default 24
*
*
* @param Class Requirements Heading Font Size
* @parent Font Size Settings
* @desc Sets the font size of the heading for the "Class Reqs" window.
* @type text
* @default 24
*
*
* @param Class Requirements Group Heading Font Size
* @parent Font Size Settings
* @desc Sets the font size of the group headings (IE: Level Requirement) in the "Class Reqs" window.
* @type text
* @default 22
*
*
* @param Class Requirements Content Font Size
* @parent Font Size Settings
* @desc Sets the font size for the requirement line items in the "Class Reqs" window.
* @type text
* @default 20
*
*
* @param Class Information Heading Font Size
* @parent Font Size Settings
* @desc Sets the font size of the heading for the Class Information window.
* @type text
* @default 32
*
*
* @param Class Information Group Heading Font Size
* @parent Font Size Settings
* @desc Sets the font size of the group heading for the Class Information window.
* @type text
* @default 28
*
*
* @param Class Information Sub-Group Heading Font Size
* @parent Font Size Settings
* @desc Sets the font size of the sub-group heading for the Class Information window.
* @type text
* @default 26
*
*
* @param Class Information Item Font Size
* @parent Font Size Settings
* @desc Sets the font size for the items in the Class Information window.
* @type text
* @default 24
*
*
* @param Text Settings
* @desc These settings allow you to control various aspects of text
* used in the plugin.
*
*
* @param Text Position Settings
* @parent Text Settings
* @desc These settings allow you move various heads and other text around in their respective windows
*
*
* @param Actor Class List Heading Position
* @parent Text Position Settings
* @desc Sets the X offset for the "Previous Classes" window heading.
* @type text
* @default 8
*
*
* @param Actor Class List Item Position
* @parent Text Position Settings
* @desc Sets the X offset for content in the "Previous Classes" window.
* @type text
* @default 18
*
*
* @param Class Requirements Heading Position
* @parent Text Position Settings
* @desc Sets the X offset for the "Class Reqs" window heading.
* @type text
* @default 45
*
*
* @param Class Requirements Group Heading Position
* @parent Text Position Settings
* @desc Sets the X offset for group headings in the "Class Reqs" window.
* @type text
* @default 5
*
*
* @param Class Requirements Item Position
* @parent Text Position Settings
* @desc Sets the X offset for the content in the "Class Reqs" window.
* @type text
* @default 15
*
*
* @param Class Information Group Heading Position
* @parent Text Position Settings
* @desc Sets the X offset of the group headings for the class
* Information window.
* @type text
* @default 5
*
*
* @param Class Information Sub-Group Heading Position
* @parent Text Position Settings
* @desc Sets the X offset of the sub-group headings for the Class Information window.
* @type text
* @default 25
*
*
* @param Class Information Item Position
* @parent Text Position Settings
* @desc Sets the X offset for list items in the Class Information window.
* @type text
* @default 25
*
*
* @param Class Information Sub-Item Position
* @parent Text Position Settings
* @desc Sets the X offset for the sub-list items in the Class Information window.
* @type text
* @default 35
*
*
* @param Text Heading Settings
* @parent Text Settings
*
*
* @param Actor Classes Header Text
* @parent Text Heading Settings
* @desc This setting allows you to set the header text for the Actor Previous Classes Window
* @type text
* @default Previous Classes
*
*
* @param Class Requirements Header Text
* @parent Text Heading Settings
* @desc This setting allows you to set the header text for the Class Requirements window.
* @type text
* @default Class Reqs
*
*
* @help
* Thanks for using my class changer plugin!  For usage information,
* please visit the GitHub page linked below or check the project file:
*
* https://github.com/Geowil/LMPGames_ClassChanger
*
* Credits:
* SephirothSpawn - original RMXP script creator
*/

//Window/Scene Function Defines
function Scene_ClassChange() { this.initialize.apply(this, arguments); };
function Window_CCSelectActor() { this.initialize.apply(this, arguments); }
function Window_CCClassList() { this.initialize.apply(this, arguments); }
function Window_CCStatus() { this.initialize.apply(this, arguments); }
function Window_CCActorClasses() { this.initialize.apply(this, arguments); }
function Window_CCClassInfo() { this.initialize.apply(this, arguments); }
function Window_CCRequirementsInfo() { this.initialize.apply(this, arguments); }
function Window_CCCommand() { this.initialize.apply(this, arguments); }
function Window_CCCost() { this.initialize.apply(this, arguments); }

const lmpgamesCCParams = PluginManager.parameters('LMPGames_ClassChanger');

//Param Plugin Vars
var passReqColor = String(lmpgamesCCParams['Cost Requirement Pass Color']);
var failReqColor = String(lmpgamesCCParams['Cost Requirement Fail Color']);
var clsListDefaultColor = String(lmpgamesCCParams['Default Class List Color']);
var clsListChangeColor = String(lmpgamesCCParams['Class List Can Change Color']);
var clsListBlockedColor = String(lmpgamesCCParams['Class List Cannot Change Color']);
var actClsNameFntSize = parseInt(lmpgamesCCParams['Actor Class List Name Font Size']);
var actClsLevelFntSize = parseInt(lmpgamesCCParams['Actor Class List Level Font Size']);
var bIsCurrencyCostEnabled = (lmpgamesCCParams['Enable Currency Cost'] === 'true');
var bIsItemCostEnabled = (lmpgamesCCParams['Enable Item Cost'] === 'true');
var bAreGenderReqsEnabled = (lmpgamesCCParams['Enable Gender Requirements'] === 'true');
var genderNameMap = JSON.parse(JSON.parse(lmpgamesCCParams['Gender Mapping']));
var bUsingLMPAWP = (lmpgamesCCParams['Is LMPGames_AWP Installed'] === 'true');
var bAllowReqBypassOnOldClass = (lmpgamesCCParams['Enable Existing Class Requirement Bypass'] == 'true');
var currencyIconId = parseInt(lmpgamesCCParams['Currency Icon ID']);
var costItemId = parseInt(lmpgamesCCParams['Cost Item ID']);
var bIsCostSystemEnabled = (bIsCurrencyCostEnabled || bIsItemCostEnabled ? true : false);
var bUseClassDesc = (lmpgamesCCParams['Use Class Description'] === 'true');
var bShowExtParams = (lmpgamesCCParams['Show Extended Parameters'] === 'true');
var bOnlyShowNon0Params = (lmpgamesCCParams['Only Show Non-Zero Parameters'] === 'true');
var eleDispMode = parseInt(lmpgamesCCParams['Element Resist Display Mode']);
var eleOrderMode = parseInt(lmpgamesCCParams['Element Attribute Order Mode']);
var sklOrderMode = parseInt(lmpgamesCCParams['Skill Order Mode']);
var extParmDispMode = parseInt(lmpgamesCCParams['Extended Parameter Display Mode']);
var bElementIconsEnabled = (lmpgamesCCParams['Enable Element Trait Icons'] === 'true');
var elementIconMapping = JSON.parse(JSON.parse(lmpgamesCCParams['Element Trait Icon Mapping']));
var ignoreSkills = JSON.parse(JSON.parse(lmpgamesCCParams['Ignore Skill List']));
var bUseClsAlias = (lmpgamesCCParams['Use Aliases'] === 'true');
var bUseCostOnBypass = (lmpgamesCCParams['Use Cost on Bypass'] === 'true');
var clsReqPassTCode = lmpgamesCCParams['Class Requirement Pass Text Code value'];
var clsReqFailTCode = lmpgamesCCParams['Class Requirement Fail Text Code value'];
var clsListFontSize = parseInt(lmpgamesCCParams['Class List Font Size']);
var actClsLstHeadingFontSize = lmpgamesCCParams['Actor Class List Heading Font Size'];
var actClsLstItemFontSize = lmpgamesCCParams['Actor Class List Content Font Size'];
var clsReqHeadingFontSize = lmpgamesCCParams['Class Requirements Heading Font Size'];
var clsReqGrpHeadingFontSize = lmpgamesCCParams['Class Requirements Group Heading Font Size'];
var clsReqItemFontSize = lmpgamesCCParams['Class Requirements Content Font Size'];
var clsInfoHeadingFontSize = lmpgamesCCParams['Class Information Heading Font Size'];
var clsInfoGrpHeadingFontSize = lmpgamesCCParams['Class Information Group Heading Font Size'];
var clsInfoSGrpHeadingFontSize = lmpgamesCCParams['Class Information Sub-Group Heading Font Size'];
var clsInfoItemFontSize = lmpgamesCCParams['Class Information Item Font Size'];
var actClsLstHeadingXOffset = lmpgamesCCParams['Actor Class List Heading Position'];
var actClsLstItemXOffset = lmpgamesCCParams['Actor Class List Item Position'];
var clsReqHeadingXOffset = lmpgamesCCParams['Class Requirements Heading Position'];
var clsReqGrpHeadingXOffset = lmpgamesCCParams['Class Requirements Group Heading Position'];
var clsReqItemXOffset = lmpgamesCCParams['Class Requirements Item Position'];
var clsInfoGrpHeadingXOffset = lmpgamesCCParams['Class Information Group Heading Position'];
var clsInfoSGrpHeadingXOffset = lmpgamesCCParams['Class Information Sub-Group Heading Position'];
var clsInfoItemXOffset = lmpgamesCCParams['Class Information Item Position'];
var clsInfoSItemXOffset = lmpgamesCCParams['Class Information Sub-Item Position'];
var actClsHeaderText = lmpgamesCCParams['Actor Classes Header Text'];
var clsReqsHeaderText = lmpgamesCCParams['Class Requirements Header Text'];
var genderCodeMap = {};

if (Object.keys(genderNameMap).length > 0){
	for (let key of Object.keys(genderNameMap)){
		let val = genderNameMap[key].toLowerCase();

		genderCodeMap[val] = key;
	}
}

//Static Trait JSON List
var staticTraits = {
	"21" : ["Max HP","Max MP","Atk","Def","MAtk","MDef","Agl","Luk"],
	"22" : ["Hit Rate","Eva Rate","Crit Rate","Crit Eva Rate","Mg Eva Rate",
	        "Mg Reflect Rate","Counter Rate","HP Regen Rate","MP Regen Rate",
	        "TP Regen Rate"],
	"23" : ["Targ Rate","Guard Eff Rate","Recv Eff Rate","Pharma Rate","MP Cost Rate",
	        "TP Chrg Rate","Phys Dmg Rate","Mg Dmg Rate","Floor Dmg Rate","Exp Rate"],
	"55" : ["Normal","Duel Wield"],
	"62" : ["Auto Battle (Berserk)","Guard","Substitute (Cover)","Preserve TP"],
	"63" : ["Normal","Boss","Instant","No Dissolve"],
	"64" : ["Enc. Rate Half","No Enc","No Ambushes","Inc Pre-Emptive","2x Gold","Double Item Drop"]
};

//TODO: Consider if AWP should merge note tag data, and if so does that include
//TODO: weapon note tag data for class changing.

//=============================================================================
// TouchInput
//=============================================================================
var lmpGamesClassChangeTouchInput_onMouseMove = TouchInput._onMouseMove;
TouchInput._onMouseMove = function(event) {
  lmpGamesClassChangeTouchInput_onMouseMove.call(this, event);
  this._mouseOverX = Graphics.pageToCanvasX(event.pageX);
  this._mouseOverY = Graphics.pageToCanvasY(event.pageY);
};

//DataManager Functions
var lmpGamesClassChangerDataManager_databaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function(){
	if (!lmpGamesClassChangerDataManager_databaseLoaded.call(this)) { return false;}
	this.loadClassChangerData();
	return true;
}

DataManager.loadClassChangerData = function(){
	this.setupClassData();
	this.setupActorData();
	this.setupIWAData($dataItems);
	this.setupIWAData($dataWeapons);
	this.setupIWAData($dataArmors);
}

DataManager.setupClassData = function(){
	for (let cls of $dataClasses){
		if (cls){
			if (cls.note != undefined){
				let noteData = cls.note.split(/[\r\n]+/);
				let tagStart = "<LMPCC_Requirements>";
				let tagEnd = "</LMPCC_Requirements>";
				let bInNoteTag = null;
				let bNoCurrencyFormAdded = false;
				let bNoItemFormAdded = false;

				cls.changeRequirements = {
					"classes" : {},
					"gender" : "",
					"weapons" : [],
					"armor" : [],
					"accs" : [],
					"items" : []
				};

				cls.currencyCostFormula = "";
				cls.itemCostFormula = "";
				cls.desc = "";
				cls.alias = "";

				if (noteData.length > 0){
					for (let line of noteData){
						let lineData = line.split(":");
						bInNoteTag = this.areInNoteTag(tagStart, tagEnd, lineData[0], bInNoteTag);

						if (bInNoteTag) {
							switch(lineData[0]){
								case "<LMPCC_Requirements>":
									break;

								case "Class":
									if (lineData.length == 3 && lineData[2].length > 0 &&
											!cls.changeRequirements.classes.hasOwnProperty(lineData[1])){
										cls.changeRequirements.classes[lineData[1]] = parseInt(lineData[2]);
									}

									break;

								case "Gender":
									if (lineData[1].length > 0){
										cls.changeRequirements.gender = lineData[1].toLowerCase();
									}
									break;

								case "Weapon":
									if (lineData[1].length > 0 && !cls.changeRequirements.weapons.includes(lineData[1])){
										cls.changeRequirements.weapons.push(parseInt(lineData[1]));
									}

									break;

								case "Armor":
									if (lineData[1].length > 0 && !cls.changeRequirements.armor.includes(lineData[1])){
										cls.changeRequirements.armor.push(parseInt(lineData[1]));
									}

									break;

								case "Acc":
									if (lineData[1].length > 0 && !cls.changeRequirements.accs.includes(lineData[1])){
										cls.changeRequirements.accs.push(parseInt(lineData[1]));
									}

									break;

								case "Item":
									if (lineData[1].length > 0 && !cls.changeRequirements.items.includes(lineData[1])){
										cls.changeRequirements.items.push(parseInt(lineData[1]));
									}

									break;

								case "CurrencyFormula":
									if (bIsCurrencyCostEnabled){
										if (lineData[1].length > 0){
											cls.currencyCostFormula = lineData[1];
										} else {
											bNoCurrencyFormAdded = true;
										}
									}

									break;

								case "ItemFormula":
									if (bIsItemCostEnabled){
										if (lineData[1].length > 0){
											cls.itemCostFormula = lineData[1];
										} else {
											bNoItemFormAdded = true;
										}
									}

									break;

								case "Desc":
									if (lineData[1].length > 0){
										cls.desc = lineData[1];
									}
									break;

								case "Alias":
									if (lineData[1].length > 0){
										cls.alias = lineData[1];
									}
									break;

								default:
									break;
							}
						} else if (bInNoteTag === false){
							break;
						}
					}

					if (cls.currencyCostFormula == ""){
						cls.currencyCostFormula = "parseInt(((avgClassLevels + 40) / 1.25).toFixed(0))";
					}

					if (cls.itemCostFormula == ""){
						cls.itemCostFormula = "parseInt(((avgClassLevels + 40) / 1.25).toFixed(0))";
					}
				}
			}
		}
	}
}

DataManager.setupActorData = function(){
	for (let act of $dataActors){
		if (act){
			if (act.note != undefined){
				let noteData = act.note.split(/[\r\n]+/);
				let tagStart = "<LMPCC_Gender>";
				let tagEnd = "</LMPCC_Gender>";
				let bInNoteTag = null;

				act.gender = '';

				if (noteData.length > 0){
					for (let line of noteData){
						let lineData = line.split(":");
						bInNoteTag = this.areInNoteTag(tagStart, tagEnd, lineData[0], bInNoteTag);

						if (bInNoteTag){
							switch (lineData[0]){
								case "<LMPCC_Gender>":
									break;

								case "Gender":
									if (lineData[1].length > 0 && Object.keys(genderCodeMap).length > 0){
										if (genderCodeMap.hasOwnProperty(lineData[1].toLowerCase())){
											act.gender = genderCodeMap[lineData[1].toLowerCase()];
										}
									}
									break;

								default:
								break;
							}
						} else if (bInNoteTag === false){
							break;
						}
					}
				}
			}
		}
	}
}

DataManager.setupIWAData = function(group){
	for (let grp of group){
		if (grp){
			if (grp.note != undefined){
				let noteData = grp.note.split(/[\r\n]+/);
				let startTag = "<LMPCC_Settings>";
				let endTag = "</LMPCC_Settings>";
				let bInNoteTag = null;

				grp.changeRequirements = {
					"restrictions" : {
						"canChangeTo" : [],
						"cantChange" : false
					},
					"bypass" : []
				};

				if (noteData.length > 0){
					for (let line of noteData){
						let lineData = line.split(':');
						if (bInNoteTag == null || lineData[0] == endTag){
							bInNoteTag = this.areInNoteTag(startTag, endTag, lineData[0], bInNoteTag);
						}

						if (bInNoteTag){
							switch (lineData[0]){
								case "<LMPCC_Settings>":
									break;

								case "Restriction1":
									if (lineData[1].length > 0){
										grp.changeRequirements.restrictions.canChangeTo.push(parseInt(lineData[1]));
									}
									break;

								case "Restriction2":
									grp.changeRequirements.restrictions.cantChange = true;
									break;

								case "Bypass":
									if (lineData[1].length > 0){
										grp.changeRequirements.bypass.push(parseInt(lineData[1]));
									}
									break;

								default:
									break;
							}
						} else if (bInNoteTag === false){
							break;
						}
					}
				}
			}
		}
	}
}

DataManager.areInNoteTag = function (startTag, endTag, line, bInNoteTag){
	if (bInNoteTag == null && startTag == line) { return true; }
	else if (bInNoteTag == true && endTag == line) { return false; }
	else if (bInNoteTag == null && startTag != line) { return null; }
	else if (bInNoteTag == true && endTag != line) { return true; }
	else { return false; }
}


// Game_Interpreter Functions
var lmpGamesClassChangerGameInterpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args){
	if (command == "LMP.ClassChanger"){
		let pluginCommand = command;

		for(let arg of args){
			pluginCommand += " " + arg;
		}

		if (pluginCommand.match(/LMP.ClassChanger[ ]Start/)){
			let matches = ((/LMP.ClassChanger[ ]Start/).exec(pluginCommand) || undefined);
			if (matches){
				SceneManager.push(Scene_ClassChange);
			}
		} else if (pluginCommand.match(/LMP.ClassChanger[ ]Disable[ ]CurrencyCost/)){
			let matches = ((/LMP.ClassChanger[ ]Disable[ ]CurrencyCost/).exec(pluginCommand) || undefined);
			if (matches){
				this.currencyCostSystemState(false);
			}
		} else if (pluginCommand.match(/LMP.ClassChanger[ ]Enable[ ]CurrencyCost/)){
			let matches = ((/LMP.ClassChanger[ ]Enable[ ]CurrencyCost/).exec(pluginCommand) || undefined);
			if (matches){
				this.currencyCostSystemState(true);
			}
		} else if (pluginCommand.match(/LMP.ClassChanger[ ]Disable[ ]ItemCost/)){
			let matches = ((/LMP.ClassChanger[ ]Disable[ ]ItemCost/).exec(pluginCommand) || undefined);
			if (matches){
				this.itemCostSystemState(false);
			}
		} else if (pluginCommand.match(/LMP.ClassChanger[ ]Enable[ ]ItemCost/)){
			let matches = ((/LMP.ClassChanger[ ]Enable[ ]ItemCost/).exec(pluginCommand) || undefined);
			if (matches){
				this.itemCostSystemState(true);
			}
		} else if (pluginCommand.match(/LMP.ClassChanger[ ]ChangeCostItemID[ ](\d+)/)){
			let matches = ((/LMP.ClassChanger[ ]ChangeCostItemID[ ](\d+)/).exec(pluginCommand) || undefined);
			if (matches){
				this.changeItemCostId(matches[1]);
			}
		} else if (pluginCommand.match(/LMP.ClassChanger[ ]Disable[ ]GenderRequirements/)){
			let matches = ((/LMP.ClassChanger[ ]Disable[ ]GenderRequirements/).exec(pluginCommand) || undefined);
			if (matches){
				this.genderRequirementsState(false);
			}
		} else if (pluginCommand.match(/LMP.ClassChanger[ ]Enable[ ]GenderRequirements/)){
			let matches = ((/LMP.ClassChanger[ ]Enable[ ]GenderRequirements/).exec(pluginCommand) || undefined);
			if (matches){
				this.genderRequirementsState(true);
			}
		} else if (pluginCommand.match(/LMP.ClassChanger[ ]Disable[ ]ExistingClassBypass/)){
			let matches = ((/LMP.ClassChanger[ ]Disable[ ]ExistingClassBypass/).exec(pluginCommand) || undefined);
			if (matches){
				this.existingClassBypassState(false)
			}
		} else if (pluginCommand.match(/LMP.ClassChanger[ ]Enable[ ]ExistingClassBypass/)){
			let matches = ((/LMP.ClassChanger[ ]Enable[ ]ExistingClassBypass/).exec(pluginCommand) || undefined);
			if (matches){
				this.existingClassBypassState(true);
			}
		} else if (pluginCommand.match(/LMP.ClassChanger[ ]Enable[ ]UseCostOnBypass/)){
			let matches = ((/LMP.ClassChanger[ ]Enable[ ]UseCostOnBypass/).exec(pluginCommand) || undefined);
			if (matches){
				this.costOnBypassState(true);
			}
		} else if (pluginCommand.match(/LMP.ClassChanger[ ]Disable[ ]UseCostOnBypass/)){
			let matches = ((/LMP.ClassChanger[ ]Disable[ ]UseCostOnBypass/).exec(pluginCommand) || undefined);
			if (matches){
				this.costOnBypassState(false);
			}
		} else {
			lmpGamesClassChangerGameInterpreter_pluginCommand.call(this, command, args);
		}
	}
}

Game_Interpreter.prototype.currencyCostSystemState = function(isEnabled){
	bIsCurrencyCostEnabled = isEnabled;
	this.checkCostSystemStates();
}

Game_Interpreter.prototype.itemCostSystemState = function(isEnabled){
	bIsItemCostEnabled = isEnabled;
	this.checkCostSystemStates();
}

Game_Interpreter.prototype.checkCostSystemStates = function(){
	if (bIsItemCostEnabled || bIsCurrencyCostEnabled){
		bIsCostSystemEnabled = true;
	} else {
		bIsCostSystemEnabled = false;
	}
}

Game_Interpreter.prototype.genderRequirementsState = function(isEnabled) { bAreGenderReqsEnabled = isEnabled; }
Game_Interpreter.prototype.existingClassBypassState = function(isEnabled) { bAllowReqBypassOnOldClass = isEnabled; }
Game_Interpreter.prototype.costOnBypassState = function(isEnabled) { bUseCostOnBypass = isEnabled; }
Game_Interpreter.prototype.changeItemCostId = function(iId) { costItemId = iId; }

//Game_Actor Functions
var lmpGamesGameActor_InitMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function(){
	lmpGamesGameActor_InitMembers.call(this);

	this._actorClasses = {};
	this._actorClasses[this._classId] = this._level;
}

var lmpGamesGameActor_LevelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function(){
	lmpGamesGameActor_LevelUp.call(this);
	this._actorClasses[this._classId] = this._level;
}

var lmpGamesGameActor_ChangeClass = Game_Actor.prototype.changeClass;
Game_Actor.prototype.changeClass = function(classId, keepExp){
	lmpGamesGameActor_ChangeClass.apply(this, arguments);
	this.initSkills();
}

Game_Actor.prototype.getActorClasses = function() { return this._actorClasses; }
Game_Actor.prototype.getActorClassName = function(clsId) { return $dataClasses[clsId].name; }
Game_Actor.prototype.getActorClassLevel = function(clsId){
	if (this._actorClasses.hasOwnProperty(clsId)){
		return this._actorClasses[clsId];
	} else {
		return -1;
	}
}


/* Scene_ClassChange Functions */
Scene_ClassChange.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ClassChange.prototype.constructor = Scene_ClassChange;

Scene_ClassChange.prototype.initialize = function(){
	Scene_MenuBase.prototype.initialize.call(this);
	ImageManager.loadFace($gameParty.menuActor().faceName());

	//Window Vars
	this._actorSelectWnd = undefined;
	this._classListWnd = undefined;
	this._requirementsInfoWnd = undefined;
	this._statusWnd = undefined;
	this._actorClassesWnd = undefined;
	this._classInfoWnd = undefined;
	this._costWnd = undefined;
	this._cmdWnd = undefined;

	this._newClassId = 0;
	this._selectedClassId = 0;
	this._goldCost = 0;
	this._itemCost = 0;
	this._selectedActorId = 0;
	this._selectedActor = undefined;
}

Scene_ClassChange.prototype.create = function(){
	Scene_MenuBase.prototype.create.call(this);
	this.createWindows();

	this._actorSelectWnd.show();
	this._actorSelectWnd.activate();
	this._actorSelectWnd.select(0);
}

Scene_ClassChange.prototype.createWindows = function(){
	this.createHelpWindow();
	this.createGoldWindow();
	this.createActorSelectWnd();
	this.createClassListWindow();
	this.createStatusWindow();
	this.createActorClassesWindow();
	this.createCostWindow();
	this.createRequirementsWindow();
	this.createClassInfoWindow();
	this.createCommandWindow();
}

Scene_ClassChange.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(0, this._helpWindow.height);
    this._goldWindow.y = Graphics.boxHeight - this._goldWindow.height;
	this._goldWindow.x = 0;
	this._goldWindow.hide();
    this.addWindow(this._goldWindow);
};

Scene_ClassChange.prototype.createActorSelectWnd = function(){
	let x = 0;
	let y = this._helpWindow.getHeight() + 10;
	let w = Math.ceil(Graphics.width / 2.50);
	let h = Graphics.height - y;

	this._actorSelectWnd = new Window_CCSelectActor(x, y, w, h);
	this._actorSelectWnd.setHandler('ok', this.onActorSelected.bind(this));
	this._actorSelectWnd.setHandler('cancel', this.onActorSelectCancelled.bind(this));
	this._actorSelectWnd.hide();
	this.addWindow(this._actorSelectWnd);
}

Scene_ClassChange.prototype.onActorSelected = function(){
	this._selectedActorId = this._actorSelectWnd.getSelectedActorId();
	this._selectedActor = $gameParty.members().find(m => m && m._actorId == this._selectedActorId);

	this._actorSelectWnd.hide();
	this._actorSelectWnd.deactivate();

	this._classListWnd.setSelectedActorId(this._selectedActorId);
	this._classListWnd.setSubWindows(this._costWnd, this._requirementsInfoWnd);
	this._classListWnd.refresh();
	this._classListWnd.show();
	this._classListWnd.activate();
	this._classListWnd.select(0);

	if (bIsCostSystemEnabled){
		if (bIsCurrencyCostEnabled){
			this._goldWindow.show();
		}

		this._costWnd.setSelectedActor(this._selectedActor);
		this._costWnd.show();
	}

	this._statusWnd.setSelectedActor(this._selectedActor);
	this._statusWnd.show();
	this._requirementsInfoWnd.setSelectedActor(this._selectedActor);
	this._requirementsInfoWnd.show();
	this._actorClassesWnd.setSelectedActor(this._selectedActor);
	this._actorClassesWnd.show();
}

Scene_ClassChange.prototype.onActorSelectCancelled = function() { SceneManager.pop(); }
Scene_ClassChange.prototype.createClassListWindow = function() {
	let x = 0;
	let y = this._helpWindow.getHeight() + 10;
	let w = 235;
	let h = Graphics.boxHeight - y - this._goldWindow.getHeight() - 10;

	this._classListWnd = new Window_CCClassList(x, y, w, h, this._helpWindow);
	this._classListWnd.setHandler('ok', this.onClassSelected.bind(this));
	this._classListWnd.setHandler('cancel', this.onClassListCancelled.bind(this));
	this._classListWnd.hide();
	this.addWindow(this._classListWnd);
}

Scene_ClassChange.prototype.onClassSelected = function(){
	this._selectedClassId = this._classListWnd.getSelectedClassId();

	this._classListWnd.deactivate();

	this._statusWnd.hide();
	this._actorClassesWnd.hide();

	this._classInfoWnd.setSelectedActor(this._selectedActor);
	this._classInfoWnd.setSelectedClassId(this._selectedClassId);
	this._classInfoWnd.refresh();
	this._classInfoWnd.show();

	this._cmdWnd.setSelectedActor(this._selectedActor);
	this._cmdWnd.setSelectedClassId(this._selectedClassId);
	this._cmdWnd.show();
	this._cmdWnd.activate();
	this._cmdWnd.select(0);
}

Scene_ClassChange.prototype.onClassListCancelled = function(){
	this._classListWnd.deactivate();
	this._classListWnd.hide();

	this._statusWnd.hide();
	this._goldWindow.hide();
	this._actorClassesWnd.hide();
	this._requirementsInfoWnd.hide();
	this._costWnd.hide();

	this._actorSelectWnd.refresh();
	this._actorSelectWnd.show();
	this._actorSelectWnd.activate();
	this._actorSelectWnd.select(0);
}

Scene_ClassChange.prototype.createStatusWindow = function(){
	let x = this._classListWnd.getWidth() + 10;
	let y = this._helpWindow.getHeight() + 10;
	let w = Math.ceil((Graphics.width - x) / 2) - 10;
	let h = 215;

	this._statusWnd = new Window_CCStatus(x, y, w, h);
	this._statusWnd.hide();
	this.addWindow(this._statusWnd);
}

Scene_ClassChange.prototype.createActorClassesWindow = function(){
	let x = this._statusWnd.getX() + this._statusWnd.getWidth() + 10;
	let y = this._helpWindow.getHeight() + 10;
	let w = Graphics.boxWidth - this._statusWnd.getWidth() - this._classListWnd.getWidth() - 50;
	let h = this._statusWnd.getHeight();

	this._actorClassesWnd = new Window_CCActorClasses(x, y, w, h);
	this._actorClassesWnd.hide();
	this.addWindow(this._actorClassesWnd);
}

Scene_ClassChange.prototype.createCostWindow = function(){
	let x = this._classListWnd.getWidth() + 10;
	let y = this._statusWnd.getHeight() + this._helpWindow.getHeight() + 20;
	let w = this._statusWnd.getWidth();
	let h = 125;

	this._costWnd = new Window_CCCost(x, y, w, h);
	this._costWnd.hide();
	this.addWindow(this._costWnd);
}

Scene_ClassChange.prototype.createRequirementsWindow = function(){
	let x = this._actorClassesWnd.getX();
	let y = this._actorClassesWnd.getY() + this._actorClassesWnd.getHeight() + 10;
	let w = this._actorClassesWnd.getWidth();
	let h = this._classListWnd.getHeight() - (this._statusWnd.getHeight() + 10);

	this._requirementsInfoWnd = new Window_CCRequirementsInfo(x, y, w, h);
	this._requirementsInfoWnd.hide();
	this.addWindow(this._requirementsInfoWnd);
}

Scene_ClassChange.prototype.createClassInfoWindow = function(){
	let x = this._statusWnd.getX();
	let y = this._statusWnd.getY();
	let w = Graphics.boxWidth - x; //this._statusWnd.getWidth();
	let h = this._statusWnd.getHeight();

	this._classInfoWnd = new Window_CCClassInfo(x, y, w, h);
	this._classInfoWnd.hide();
	this.addWindow(this._classInfoWnd);
}

Scene_ClassChange.prototype.createCommandWindow = function(){
	let x = this._classListWnd.getWidth() + 10;
	let y = this._requirementsInfoWnd.getHeight() + this._requirementsInfoWnd.getY() + 10;
	let w = Graphics.width - x;
	let h = 100;

	this._cmdWnd = new Window_CCCommand(x, y, w, h);
	this._cmdWnd.setHandler('ok', this.onCmdOk.bind(this));
	this._cmdWnd.setHandler('cancel', this.onCmdCancelled.bind(this));
	this._cmdWnd.hide();
	this.addWindow(this._cmdWnd);
}

Scene_ClassChange.prototype.onCmdOk = function(){
	//Remove costs (gold and/or items)
	//Change the actor's class
	if (this._selectedActor && this._selectedClassId != 0){
		if (bIsCostSystemEnabled){
			if (bIsCurrencyCostEnabled) { this._goldCost = this._costWnd.getGoldCost(); }
			if (bIsItemCostEnabled) { this._itemCost = this._costWnd.getItemCost(); }
		}

		if (!this._selectedActor._exp.hasOwnProperty(this._selectedClassId)){
			if (this._goldCost > 0) { $gameParty.loseGold(this._goldCost); }
			if (this._itemCost > 0) { $gameParty.loseItem($dataItems[costItemId], this._itemCost, false); }
		}

		let actor = $gameParty.members().find(act => act._actorId = this._selectedActorId);
		actor.changeClass(this._selectedClassId, false);
		this.onCmdCancelled();
	}
}

Scene_ClassChange.prototype.onCmdCancelled = function(){
	this._cmdWnd.deactivate();
	this._cmdWnd.hide();

	this._classListWnd.refresh();
	this._actorClassesWnd.refresh();
	this._statusWnd.refresh();
	this._goldWindow.refresh();

	this._classInfoWnd.hide();
	this._statusWnd.show();
	this._actorClassesWnd.show();

	this._classListWnd.activate();
	this._classListWnd.select(0);
}



/* Window SelectActor */

function Window_CCSelectActor() {
	this.initialize.apply(this, arguments);
}

Window_CCSelectActor.prototype = Object.create(Window_Selectable.prototype);
Window_CCSelectActor.prototype.constructor = Window_CCSelectActor;

Window_CCSelectActor.prototype.initialize = function(x, y, w, h) {
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	this._pendingIndex = -1;
	this._selectedActorId = 0;

	Window_Selectable.prototype.initialize.call(this, x, y, w, h);
	this.refresh();
}

Window_CCSelectActor.prototype.windowWidth = function() { return this._width; }
Window_CCSelectActor.prototype.windowHeight = function() { return this._height; }
Window_CCSelectActor.prototype.maxItems = function() { return $gameParty.size(); }
Window_CCSelectActor.prototype.getSelectedActorId = function() { return this._selectedActorId; }
Window_CCSelectActor.prototype.itemHeight = function() {
	var clientHeight = this._height - this.padding * 2;
	return Math.floor(clientHeight / this.numVisibleRows());
}

Window_CCSelectActor.prototype.numVisibleRows = function() { return 4; }
Window_CCSelectActor.prototype.loadImages = function() {
	$gameParty.members().forEach(function(actor) {
		ImageManager.reserveFace(actor.faceName());
	}, this);
}

Window_CCSelectActor.prototype.drawItem = function(index) {
	this.drawItemBackground(index);
	this.drawItemImage(index);
	this.drawItemStatus(index);
}

Window_CCSelectActor.prototype.drawItemBackground = function(index) {
	if (index === this._pendingIndex) {
		var rect = this.itemRect(index);
		var color = this.pendingColor();
		this.changePaintOpacity(false);
		this.contents.fillRect(rect.x, rect.y, rect.width, rect.height, color);
		this.changePaintOpacity(true);
	}
}

Window_CCSelectActor.prototype.drawItemImage = function(index) {
	var actor = $gameParty.members()[index];
	var rect = this.itemRect(index);
	this.changePaintOpacity(actor.isBattleMember());
	this.drawActorFace(actor, rect.x + 1, rect.y + 1, Window_Base._faceWidth, Window_Base._faceHeight);
	this.changePaintOpacity(true);
}

Window_CCSelectActor.prototype.drawItemStatus = function(index) {
	var actor = $gameParty.members()[index];
	var rect = this.itemRect(index);
	var x = rect.x + 135;
	var y = rect.y + rect.height / 2 - this.lineHeight() * 1.5;
	var width = rect.width - x - this.textPadding();
	this.drawActorSimpleStatus(actor, x, y, width, index);
}

Window_CCSelectActor.prototype.drawActorSimpleStatus = function(actor, x, y, width, index) {
    this.drawActorName(actor, x, y);
    this.drawActorClass(actor, x, y+this.lineHeight(), index);
};

Window_CCSelectActor.prototype.drawActorClass = function(actor, x, y, index) {
    this.resetTextColor();
	let className = "";
	if (index > -1){
		let actorId = $gameParty.members()[index]._actorId;
		let currClass = $gameParty.members().find(m => m && m._actorId == actorId).currentClass();

		if (bUseClsAlias && currClass.alias != ""){
			className = currClass.alias;
		} else {
			className = currClass.name;
		}

		let textWidth = this.contents.measureTextWidth(className);
	    this.drawText(className, x, y, textWidth);
	}
};

Window_CCSelectActor.prototype.processOk = function() {
	this._selectedActorId = $gameParty.members()[this._index]._actorId;
	Window_Selectable.prototype.processOk.call(this);
}

Window_CCSelectActor.prototype.selectLast = function() {
	this.select($gameParty.menuActor().index() || 0);
}

Window_CCSelectActor.prototype.pendingIndex = function() {
	return this._pendingIndex;
}

Window_CCSelectActor.prototype.setPendingIndex = function(index) {
	var lastPendingIndex = this._pendingIndex;
	this._pendingIndex = index;
	this.redrawItem(this._pendingIndex);
	this.redrawItem(lastPendingIndex);
}

Window_CCSelectActor.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
	width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    var bitmap = ImageManager.loadFace(faceName);
    var pw = Window_Base._faceWidth;
    var ph = Window_Base._faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = faceIndex % 4 * pw + (pw - sw) / 2;
    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, sw * 0.807 , sh * 0.807);
};


/* Window ClassList */

Window_CCClassList.prototype = Object.create(Window_Selectable.prototype);
Window_CCClassList.prototype.constructor = Window_CCClassList;

Window_CCClassList.prototype.initialize = function(x, y, w, h, helpWnd){
	this._comList = [];
	this._x = x;
	this._y = y;
	this._width = w;
	this._height = h;
	this._intComList = [];
	this._pageIndex = 0;
	this._totalIndex = 1;
	this._totalItems = 0;
	this._classIdList = [];
	this._intClassIdList = [];
	this._costWnd = undefined;
	this._reqWnd = undefined;
	this._selectedClassId = 0;
	this._selectedActorId = 0;

	Window_Selectable.prototype.initialize.call(this, x, y, w, h);

	this._helpWindow = helpWnd;
	this._helpTextList = [];
	this._intHelpTextList = [];
	this.refresh();
}

Window_CCClassList.prototype.getWidth = function() { return this._width; }
Window_CCClassList.prototype.getHeight = function() { return this._height; }
Window_CCClassList.prototype.getSelectedClassId = function() { return this._selectedClassId; }
Window_CCClassList.prototype.getX = function() { return this._x; }
Window_CCClassList.prototype.getY = function() { return this._y; }
Window_CCClassList.prototype.setSelectedActorId = function(actId) {
	this._selectedActorId = actId;
	this.refresh();
}

Window_CCClassList.prototype.setSubWindows = function(costWnd, reqWnd) {
	this._costWnd = costWnd;
	this._reqWnd = reqWnd;
	this.refresh();
}

var cantChangeHelpText = "This class is locked due to ";
Window_CCClassList.prototype.buildComList = function(){
	this._comList = [];
	this._intComList = [];
	this._totalItems = 0;
	this._classIdList = [];
	this._inteClassIdList = [];
	this._helpTextList = [];
	this._intHelpTextList = [];

	let classes = $dataClasses.filter(cls => cls);

	if (this._selectedActorId != 0){
		for (let i1 = 0; i1 < classes.length; i1++){
			let hlpTxt = "";
			let cls = classes[i1];
			let canChangeHelpText = "Change to " + cls.name;
			cantChangeHelpText = "This class is locked due to "
			if (canChangeToClass(this._selectedActorId, cls.id)){
				hlpTxt = canChangeHelpText;
			} else{
				hlpTxt = cantChangeHelpText;
			}

			let className = "";

			if (bUseClsAlias && cls.alias != ""){
				className = cls.alias;
			} else {
				className = cls.name;
			}

			if (this._intComList.length < this.numVisibleRows()){
				this._intComList.push(className);
				this._intClassIdList.push(cls.id);
				this._intHelpTextList.push(hlpTxt);
				this._totalItems++;
			} else {
				this._comList.push(this._intComList);
				this._classIdList.push(this._intClassIdList);
				this._helpTextList.push(this._intHelpTextList);

				this._intComList = [];
				this._intClassIdList = [];
				this._intHelpTextList = [];

				this._intComList.push(className);
				this._intClassIdList.push(cls.id);
				this._intHelpTextList.push(hlpTxt);
				this._totalItems++;
			}
		}
	}

	for (let i1 = 0; i1 < 1; i1++){
		if (this._intComList.length < this.numVisibleRows()){
			this._intComList.push("Cancel");
			this._intClassIdList.push(-1);
			this._intHelpTextList.push("");
			this._totalItems++;
		} else {
			this._comList.push(this._intComList);
			this._classIdList.push(this._intClassIdList);
			this._helpTextList.push(this._intHelpTextList);

			this._intComList = [];
			this._intClassIdList = [];
			this._intHelpTextList = [];

			this._intComList.push("Cancel");
			this._intClassIdList.push(-1);
			this._intHelpTextList.push("");
			this._totalItems++;
		}
	}

	if (this._intComList.length > 0){
		this._comList.push(this._intComList);
		this._classIdList.push(this._intClassIdList);
		this._helpTextList.push(this._intHelpTextList);

		this._intComList = [];
		this._intClassIdList = [];
		this._intHelpTextList = [];
	}
}

Window_CCClassList.prototype.processCursorMove = function() {
	let bResetSelect = false;
    if (this.isCursorMovable()) {
        var lastIndex = this.index();

        if (Input.isRepeated('down')) {
			if (this._totalIndex + 1 > this._totalItems){
				this._totalIndex = 0;
			}

			this._totalIndex++;

			bResetSelect = this.setIndexPage();
            this.cursorDown(Input.isTriggered('down'));
			if (bResetSelect){
				this.resetSelect("down");
				bResetSelect = false;
			}
        } else if (Input.isRepeated('up')) {
			if (this._totalIndex - 1 < 1){
				this._totalIndex = this._totalItems;
			} else {
					this._totalIndex--;
			}

			bResetSelect = this.setIndexPage();
            this.cursorUp(Input.isTriggered('up'));

			if (bResetSelect){
				this.resetSelect("up");
				bResetSelect = false;
			}
        } else if (Input.isRepeated('right')) {
            this.cursorRight(Input.isTriggered('right'));
        } else if (Input.isRepeated('left')) {
            this.cursorLeft(Input.isTriggered('left'));
        } else if (!this.isHandled('pagedown') && Input.isTriggered('pagedown')) {
            this.cursorPagedown();
        } else if (!this.isHandled('pageup') && Input.isTriggered('pageup')) {
            this.cursorPageup();
        }

        if (this.index() !== lastIndex) {
            SoundManager.playCursor();
        }
    }
};

Window_CCClassList.prototype.setIndexPage = function(lastIndex, direction){
	if (this._totalIndex >= 1){
		let calcPageIndex = Math.ceil(this._totalIndex / this.numVisibleRows())-1;

		if (calcPageIndex != this._pageIndex){
			this._pageIndex = calcPageIndex;
			this.contents.clear();
			this.drawAllItems();
			return true;
		}
	} else {
		this._pageIndex = 0;
		this.contents.clear();
		this.drawAllItems();
		return true;
	}

	return false;
}

Window_CCClassList.prototype.resetSelect = function(direction){
	if (direction == "down") {
		this._index = 0;
		this.updateCursor();
		this.select(0);
	} else if (direction == "up") {
		let nextIndex = this._comList[this._pageIndex].length-1;
		this._index = nextIndex;
		this.updateCursor();
		this.select(nextIndex);
	}
}

Window_CCClassList.prototype.maxItems = function() { return (this._comList ? this._comList[this._pageIndex].length : 1); }
Window_CCClassList.prototype.numVisibleRows = function() { return 8; }
Window_CCClassList.prototype.itemHeight = function() {
	let clientHeight = this._height - this.padding * 2;
	return Math.floor(clientHeight / this.numVisibleRows());
}

Window_CCClassList.prototype.itemWidth = function() {
    return Math.floor((this._width - this.padding * 2 +
                   this.spacing()) / this.maxCols() - this.spacing());
}

var lmpgamesClassChangerWindowSelectable_drawAllItems = Window_Selectable.prototype.drawAllItems;
Window_CCClassList.prototype.drawAllItems = function(){
	this.contents.fontSize = clsListFontSize;
	lmpgamesClassChangerWindowSelectable_drawAllItems.call(this);
}

Window_CCClassList.prototype.drawItem = function(index){
	let rect = this.itemRectForText(index);
	let x = rect.width/2;
	let y = rect.y + (rect.height/2) - this.lineHeight() * 0.5;
	let w = rect.width - this.textPadding();

	if (this._selectedActorId != 0 && this._comList[this._pageIndex][index] != "Cancel"){
		if (canChangeToClass(this._selectedActorId, this._classIdList[this._pageIndex][index])){
			this.changePaintOpacity(true);
		} else {
			this.changePaintOpacity(false);
		}

		this.drawText(this._comList[this._pageIndex][index], rect.x, y, w , 'center');
	} else if (this._comList[this._pageIndex][index] == "Cancel") {
		this.changePaintOpacity(true);
		this.drawText(this._comList[this._pageIndex][index], rect.x, y, w , 'center');
	}
}

Window_CCClassList.prototype.updateHelp = function() {
};

Window_CCClassList.prototype.select = function(index){
	this._index = index;
	if (this._comList.length > 0 && this._comList[this._pageIndex].length > 0){
		if (index > -1 && index != this._comList[this._pageIndex].length && this._comList[this._pageIndex][index] != "Cancel"){
			this._selectedClassId = this._classIdList[this._pageIndex][index];
			this._helpWindow.setText(this._helpTextList[this._pageIndex][index]);

			if (this._costWnd !== undefined && bIsCostSystemEnabled){
				this._costWnd.setSelectedClassId(this._selectedClassId);
			}

			if (this._reqWnd !== undefined){
				this._reqWnd.setSelectedClassId(this._selectedClassId);
			}
		} else {
			if (this._costWnd !== undefined && bIsCostSystemEnabled){
				this._costWnd.setSelectedClassId(-1);
			}

			if (this._reqWnd !== undefined){
				this._reqWnd.setSelectedClassId(-1);
			}
		}

		this._stayCount = 0;
		this.ensureCursorVisible();
		this.updateCursor();
		this.callUpdateHelp();
	}
}

Window_CCClassList.prototype.processOk = function(){
	if (this._index > -1 && this._index < this._comList[this._pageIndex].length){
		if (this._comList[this._pageIndex][this._index] !== "Cancel"){
			if (canChangeToClass(this._selectedActorId, this._classIdList[this._pageIndex][this._index])){
				this._selectedClassId = this._classIdList[this._pageIndex][this._index];
				Window_Selectable.prototype.processOk.apply(this);
			} else {
				SoundManager.playCancel();
			}
		} else {
			Window_Selectable.prototype.processCancel.apply(this);
		}
	} else {
		Window_Selectable.prototype.processCancel.apply(this);
	}
}

Window_CCClassList.prototype.refresh = function(){
	if (this.contents){
		this.contents.clear();
		this.buildComList();
		this.drawAllItems();
	}
}



/* Window_CCStatus */
Window_CCStatus.prototype = Object.create(Window_Selectable.prototype);
Window_CCStatus.prototype.constructor = Window_CCStatus;

Window_CCStatus.prototype.initialize = function(x,y,w,h){
	this._x = x;
	this._y = y;
	this._width = w;
	this._height = h;
	this._actor = undefined;
	this._scrollSpeed = 0;

	Window_Selectable.prototype.initialize.call(this,x,y,w,h);
	this.refresh();
}

Window_CCStatus.prototype.getWidth = function() { return this._width; }
Window_CCStatus.prototype.getHeight = function() { return this._height; }
Window_CCStatus.prototype.getX = function() { return this._x; }
Window_CCStatus.prototype.getY = function() { return this._y; }
Window_CCStatus.prototype.setSelectedActor = function(actor){
	this._actor = actor;
	this.refresh();
}

Window_CCStatus.prototype.refresh = function(){
	this.contents.clear();

	if (this._actor){
		this.contents.fontSize = 22;
		const lineHgt = this.lineHeight();
		//Line 1
		this.drawActorName(this._actor,6,0);
		if (bAreGenderReqsEnabled){
			let actGen = $dataActors.find(a => a && a.id == this._actor._actorId).gender;
			let textWidth = this.contents.measureTextWidth(actGen);
			this.drawText(actGen, 120, 0, textWidth, 'left');
			this.drawActorClass(this._actor,120,lineHgt);
		} else {
			this.drawActorClass(this._actor,120,0);
		}
		//Line 2
		//this.drawHorzLine(lineHgt);
		//Line 3
		this.drawActorFace(this._actor,5,lineHgt*2);
		this.drawBasicInfo(120,lineHgt*2,this.contentsWidth() * 0.50);
		//Line 7
		//this.drawHorzLine(lineHgt*6);
	}
}

Window_CCStatus.prototype.drawActorClass = function(actor, x, y, width) {
	this.resetTextColor();
	let className = "";
	if (this._actor != undefined){
		let currClass = this._actor.currentClass();

		if (bUseClsAlias && currClass.alias != ""){
			className = currClass.alias;
		} else {
			className = currClass.name;
		}

		let textWidth = this.contents.measureTextWidth(className);
	    this.drawText(className, x, y, textWidth);
	}
};

Window_CCStatus.prototype.drawFace = function(faceName, faceIndex, x, y, width, height) {
	width = width || Window_Base._faceWidth;
    height = height || Window_Base._faceHeight;
    var bitmap = ImageManager.loadFace(faceName);
    var pw = Window_Base._faceWidth;
    var ph = Window_Base._faceHeight;
    var sw = Math.min(width, pw);
    var sh = Math.min(height, ph);
    var dx = Math.floor(x + Math.max(width - pw, 0) / 2);
    var dy = Math.floor(y + Math.max(height - ph, 0) / 2);
    var sx = faceIndex % 4 * pw + (pw - sw) / 2;
    var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, sw * 0.75 , sh * 0.75);
};

Window_CCStatus.prototype.drawBasicInfo = function(x,y,width){
	const lineHgt = this.lineHeight();

	this.drawActorLevel(this._actor,x,y);
	this.drawActorHp(this._actor,x,y+lineHgt*1,width);
	this.drawActorMp(this._actor,x,y+lineHgt*2,width);
}

Window_CCStatus.prototype.drawActorLevel = function(actor, x, y) {
    this.changeTextColor(this.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(actor.level, x + 30, y, 36, 'right');
};
Window_CCStatus.prototype.drawHorzLine = function(y){
	const lineY = y + this.lineHeight() / 2 - 1;

	this.contents.paintOpacity = 48;
	this.contents.fillRect(0,lineY,this.contentsWidth(),2,this.normalColor());
	this.contents.paintOpacity = 255;
}


/* Window_CCActorClasses */
Window_CCActorClasses.prototype = Object.create(Window_Selectable.prototype);
Window_CCActorClasses.prototype.constructor = Window_CCActorClasses;

Window_CCActorClasses.prototype.initialize = function(x,y,w,h){
	this._x = x;
	this._y = y;
	this._width = w;
	this._height = h;
	this._actor = undefined;
	this._actorClasses = undefined;
	this._countdown = 0;
	this._arrowBlinkTimer = 0;

	Window_Selectable.prototype.initialize.call(this,x,y,w,h);
	this.refresh();
}

Window_CCActorClasses.prototype.getWidth = function() { return this._width; }
Window_CCActorClasses.prototype.getHeight = function() { return this._height; }
Window_CCActorClasses.prototype.getX = function() { return this._x; }
Window_CCActorClasses.prototype.getY = function() { return this._y; }
Window_CCActorClasses.prototype.setSelectedActor = function(actor){
	this._actor = actor;
	this._actorClasses = actor._exp;
	this.refresh();
}

Window_CCActorClasses.prototype.buildClassList = function(){
	let i1 = 1;
	let y = 5;
	let format = "<Wordwrap>%1%2";

	let wndTitle = "\\px[" + actClsLstHeadingXOffset + "]\\fs[" + actClsLstHeadingFontSize + "]" + actClsHeaderText + "\\fr<br>";
	let clssLst = "";

	for (let clsId of Object.keys(this._actorClasses)){
		let clsName = "";

		if (bUseClsAlias && $dataClasses[clsId].alias != ""){
			clsName = $dataClasses[clsId].alias;
		} else{
			clsName = $dataClasses[clsId].name;
		}

		let clsLevel = String(calcLevel($dataClasses[clsId], this._actorClasses[clsId], this._actor.maxLevel()));

		clssLst += "\\px[" + actClsLstItemXOffset + "]\\fs[" + actClsLstItemFontSize + "]" + clsName + " Lv. " + clsLevel + "<br>";
	}

	let totalText = "".concat(wndTitle, clssLst);
	let text = format.format(wndTitle, clssLst);

	let textState = { index: 0 };
	textState.originalText = text;
	textState.text = this.convertEscapeCharacters(text);
	let convertedTextHeight = this.calcTextHeight(textState, true);
	this._allTextHeight = (convertedTextHeight > 600 ? convertedTextHeight / 2 : convertedTextHeight);

	var txtLen = (this._allTextHeight == 0 ? 300 : this._allTextHeight);
	var multi2 =  5;
	let multi3 = (txtLen >= 600 ? 4 : 10);
	var multi = Math.ceil((txtLen * multi2) / (Graphics.width - (this._width + multi3)));

	this._allTextHeight *= multi/2;
	this._allTextHeight = Math.pow(2, Math.round(Math.log(this._allTextHeight) / Math.log(2)));

	this.createContents();
	this.drawTextEx(text, 0, 0);
}

Window_CCActorClasses.prototype.drawTextEx = function(txt, x, y) {
	if (txt) {
		var textState = { index: 0, x: x, y: y, left: x};
		textState.text = this.convertEscapeCharacters(txt);
		textState.height = this.calcTextHeight(textState, false);
		this.resetFontSettings();

		while (textState.index < textState.text.length) {
		  this.processCharacter(textState);
		}

		this._allTextHeight = textState.y - y + this.lineHeight();
		return textState.x - x;
	} else {
		return 0;
	}
};

Window_CCActorClasses.prototype.refresh = function(){
	if (this._countdown > 0) return;
	var y = 0;

	this.contents.clear();
	this._lastOriginY = -200;
    this.origin.y = 0;
    this._allTextHeight = 0;

	if (this._actor){
		this.buildClassList();
	}
}

Window_CCActorClasses.prototype.drawClsListItem = function(name, lvl, y){
	this.contents.fontSize = 22;
	//this.changeTextColor(clsListColor);
	this.drawText(name, 5, y, 60, 'left');
	this.drawText("Lv." + String(lvl), name.length + 65, y, 75, 'right');
}

//For window scrolling
Window_CCActorClasses.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  this.updateCountdown();
  if (this.isOpenAndActive()) this.updateKeyScrolling();
};

Window_CCActorClasses.prototype.updateCountdown = function() {
  if (this._countdown > 0) {
    this._countdown -= 1;
    if (this._countdown <= 0) this.refresh();
  }
};

Window_CCActorClasses.prototype.updateArrows = function() {
  if (this._lastOriginY === this.origin.y) return;
  this.showArrows();
};

Window_CCActorClasses.prototype.showArrows = function() {
  this._lastOriginY = this.origin.y;
  this.upArrowVisible = this.origin.y !== 0;
  this.downArrowVisible = this.origin.y !== this.contentsHeight() -
    this.height + this.standardPadding() * 2;
};

Window_CCActorClasses.prototype.hideArrows = function() {
  this.upArrowVisible = false;
  this.downArrowVisible = false;
};

Window_CCActorClasses.prototype.isInsideFrame = function() {
  var x = this.canvasToLocalX(TouchInput._mouseOverX);
  var y = this.canvasToLocalY(TouchInput._mouseOverY);
  return x >= 0 && y >= 0 && x < this._width && y < this._height;
};

Window_CCActorClasses.prototype.processWheel = function() {
  if (!this.isInsideFrame()) return;
  var threshold = 20;
  if (TouchInput.wheelY >= threshold) {
    this.scrollOriginDown(this.scrollSpeed() * 4);
  }
  if (TouchInput.wheelY <= -threshold) {
    this.scrollOriginUp(this.scrollSpeed() * 4);
  }
};

Window_CCActorClasses.prototype.contentsHeight = function() {
  var standard = this._height - this.standardPadding() * 2;
  return Math.max(standard, this._allTextHeight);
};

Window_CCActorClasses.prototype.scrollSpeed = function() {
  if (this._scrollSpeed === undefined) {
    this._scrollSpeed = 5;
  }
  return this._scrollSpeed;
};

Window_CCActorClasses.prototype.scrollOriginDown = function(speed) {
  var value = this.contentsHeight() - this._height +
    this.standardPadding() * 2;
  this.origin.y = Math.min(value, this.origin.y + speed);
};

Window_CCActorClasses.prototype.scrollOriginUp = function(speed) {
  this.origin.y = Math.max(0, this.origin.y - speed);
};

Window_CCActorClasses.prototype.updateKeyScrolling = function() {
  if (Input.isPressed('up')) {
    this.scrollOriginUp(this.scrollSpeed());
  } else if (Input.isPressed('down')) {
    this.scrollOriginDown(this.scrollSpeed());
  } else if (Input.isPressed('pageup')) {
    this.scrollOriginUp(this.scrollSpeed() * 4);
  } else if (Input.isPressed('pagedown')) {
    this.scrollOriginDown(this.scrollSpeed() * 4);
  }
};


/* Window Cost */
Window_CCCost.prototype = Object.create(Window_Selectable.prototype);
Window_CCCost.prototype.constructor = Window_CCCost;

Window_CCCost.prototype.initialize = function(x,y,w,h){
	this._width = w;
	this._height = h;
	this._x = x;
	this._y = y;
	this._currCost = 0;
	this._itmCost = 0;
	this._actor = undefined;
	this._selectedClassId = 0;

	Window_Selectable.prototype.initialize.call(this,x,y,w,h);
	this.refresh();
}

Window_CCCost.prototype.getHeight = function() { return this._height; }
Window_CCCost.prototype.getWidth = function() { return this._width; }
Window_CCCost.prototype.getGoldCost = function() { return this._currCost; }
Window_CCCost.prototype.getItemCost = function() { return this._itmCost; }
Window_CCCost.prototype.getX = function() { return this._x; }
Window_CCCost.prototype.getY = function() { return this._y; }
Window_CCCost.prototype.setSelectedActor = function(actor) {
	this._actor = actor;
	this.refresh();
}

Window_CCCost.prototype.setSelectedClassId = function(selClsId) {
	this._selectedClassId = selClsId;
	this.refresh();
}

Window_CCCost.prototype.refresh = function(){
	if (this._actor){
		this.drawItems();
	}
}

Window_CCCost.prototype.drawItems = function(){
	this.contents.clear();
	this.contents.fontSize = 20;
	let y = 5;
	let x = 5;
	let h = this.contents.fontSize + 5;
	let avgClassLevels = 0;
	let itmCostText = " Cost: ";
	let itmIconIdx = 0;
	let currCostText = TextManager.currencyUnit + " Cost: ";

	if (bIsCurrencyCostEnabled){
		if (this._actor != undefined && this._selectedClassId > 0){
			if (!this._actor._exp.hasOwnProperty(this._selectedClassId)){
				let actorClasses = Object.keys(this._actor._exp).length;
				avgClassLevels = getAvgLevel(this._actor._exp, this._actor.maxLevel());
				avgClassLevels = Math.floor(((avgClassLevels + 4) * 3.45) / 1.75);
				avgClassLevels = Math.floor(avgClassLevels * (actorClasses + (actorClasses * 0.75)));

				let currCostFormula = $dataClasses[this._selectedClassId].currencyCostFormula;
				this._currCost = Math.floor(eval(currCostFormula));

				let currGold = clamp($gameParty.gold(), 0, this._currCost);
				currCostText += String(currGold) + "/" + String(this._currCost);
				this.resetTextColor();
				if ($gameParty.gold() < this._currCost){
					this.changeTextColor(failReqColor);
				} else {
					this.changeTextColor(passReqColor);
				}
			} else {
				this.changeTextColor(passReqColor);
				currCostText += "0/0";
			}

			let gCostLen = this.contents.measureTextWidth(currCostText);
			this.drawText(currCostText, x, y, gCostLen, "left");
			x += gCostLen + 10;

			if (currencyIconId != 0){
				this.drawIcon(currencyIconId, x, y);
			}
		}
	}

	if (bIsItemCostEnabled){
		x = 5;
		y = this.lineHeight();
		if (this._actor != undefined && this._selectedClassId > 0){
			if (!this._actor._exp.hasOwnProperty(this._selectedClassId)){
				let actorClasses = Object.keys(this._actor._exp).length;
				avgClassLevels = getAvgLevel(this._actor._exp, this._actor.maxLevel());
				avgClassLevels = Math.floor(avgClassLevels == 1 ? 1 : (((avgClassLevels)*2)/3)*0.75);
				avgClassLevels = Math.floor(avgClassLevels * (actorClasses + (actorClasses * 0.75)));

				let itmCostFormula = $dataClasses[this._selectedClassId].itemCostFormula;
				this._itmCost = Math.floor(eval(itmCostFormula));
				this._itmCost = clamp(this._itmCost, 0, 99);

				let currItems = clamp($gameParty.numItems($dataItems[costItemId]), 0, this._itmCost);
				itmIconIdx = $dataItems[costItemId].iconIndex;
				itmCostText = $dataItems[costItemId].name + itmCostText + String(currItems) + "/" + String(this._itmCost);
				this.resetTextColor();
				if ($gameParty.numItems($dataItems[costItemId]) < this._currCost){
					this.changeTextColor(failReqColor);
				} else {
					this.changeTextColor(passReqColor);
				}
			} else {
				this.changeTextColor(passReqColor);
				let currItems = clamp($gameParty.numItems($dataItems[costItemId]), 0, this._itmCost);
				itmIconIdx = $dataItems[costItemId].iconIndex;
				itmCostText = $dataItems[costItemId].name + "Cost: 0/0";
			}

			this.drawIcon(itmIconIdx, x, y+10);
			x += 40;
			this.drawText(itmCostText, x, y+10, itmCostText.length + 200, "left");
		}
	}
}


/* Window_CCRequirementsInfo Functions */
Window_CCRequirementsInfo.prototype = Object.create(Window_Selectable.prototype);
Window_CCRequirementsInfo.prototype.constructor = Window_CCRequirementsInfo;

Window_CCRequirementsInfo.prototype.initialize = function(x,y,w,h){
	this._x = x;
	this._y = y;
	this._currentDrawX = 0;
	this._currentDrawY = 0;
	this._width = w;
	this._height = h;
	this._selectedClassId = 0;
	this._selectedActor = undefined;
	this._countdown = 0;
	this._arrowBlinkTimer = 0;

	Window_Selectable.prototype.initialize.call(this,x,y,w,h);
	this.refresh();
}

Window_CCRequirementsInfo.prototype.getWidth = function() { return this._width; }
Window_CCRequirementsInfo.prototype.getHeight = function() { return this._height; }
Window_CCRequirementsInfo.prototype.getX = function() { return this._x; }
Window_CCRequirementsInfo.prototype.getY = function() { return this._y; }
Window_CCRequirementsInfo.prototype.setSelectedActor = function(actor) {
	this._selectedActor = actor;
	this.refresh();
 }
Window_CCRequirementsInfo.prototype.setSelectedClassId = function (clsId){
	this._selectedClassId = clsId;
	this.refresh();
}

Window_CCRequirementsInfo.prototype.refresh = function(){
	if (this._countdown > 0) return;
	var y = 0;

	this.contents.clear();
	this._lastOriginY = -200;
    this.origin.y = 0;
    this._allTextHeight = 0;

	if (this._selectedActor){
		this.contents.clear();
		this.drawRequirements();
	}
}

Window_CCRequirementsInfo.prototype.drawRequirements = function(){
	if (this._selectedClassId > 0 && this._selectedActor != undefined){
		let actorData = $dataActors.find(act => act && act.id == this._selectedActor._actorId);
		let actor = $gameParty.members().find(m => m && m._actorId == actorData.id);
		let classReqs = $dataClasses[this._selectedClassId].changeRequirements;
		let classLvReqs = classReqs.classes;
		let reqClassIds = Object.keys(classLvReqs);
		let genderReq = classReqs.gender;
		let weaponReqs = classReqs.weapons;
		let armorReqs = classReqs.armor;
		let accReqs = classReqs.accs;
		let combinedArmReqs = armorReqs.concat(accReqs);
		let itemReqs = classReqs.items;
		let clsLvReqStrs = [];
		let wepNameStrs = [];
		let armNameStrs = [];
		let itmNameStrs = [];

		let i1 = 1;
		let y = 5;
		let format = "<Wordwrap>%1%2";

		let wndTitle = "\\px[" + clsReqHeadingXOffset + "]\\fs[" + clsReqHeadingFontSize + "]" + clsReqsHeaderText + "\\fr<br>";
		let genReq = "";
		let clsLvReqs = "";
		let wepReqs = "";
		let armReqs = "";
		let itmReqs = "";
		let reqs = "";
		let spacer = "     ";

		if (reqClassIds.length > 0){
			for (let clsId of reqClassIds){
				let cls = $dataClasses[clsId];
				let clsName = "";

				if (bUseClsAlias && cls.alias != ""){
					clsName = cls.alias;
				} else{
					clsName = cls.name;
				}

				clsLvReqStrs.push(clsName + " Lv. " + String(classLvReqs[clsId]));
			}
		}

		for (let wepId of weaponReqs){
			wepNameStrs.push($dataWeapons[wepId].name);
		}

		for (let armId of combinedArmReqs){
			armNameStrs.push($dataArmors[armId].name);
		}

		for (let itmId of itemReqs){
			itmNameStrs.push($dataItems[itmId].name);
		}

		//Add in handling for bypass on existing class and/or WAI as well as equip restrictions
		if (bAreGenderReqsEnabled && genderReq != ""){
			if (genderRequirementCheck(this._selectedActor._actorId, $dataClasses[this._selectedClassId])){
				genReq = "\\px[" + clsReqGrpHeadingXOffset + "]\\fs[" + clsReqGrpHeadingFontSize + "]Gender: \\c["+ clsReqPassTCode + "]" + genderCodeMap[genderReq.toLowerCase()] + "\\fr<br>";
			} else {
				genReq = "\\px[" + clsReqGrpHeadingXOffset + "]\\fs[" + clsReqGrpHeadingFontSize + "]Gender: \\c["+ clsReqFailTCode + "]" + genderCodeMap[genderReq.toLowerCase()] + "\\fr<br>";
			}
		}

		if (clsLvReqStrs.length > 0){
			clsLvReqs = "<br>\\px[" + clsReqGrpHeadingXOffset + "]\\fs[" + clsReqGrpHeadingFontSize + "]Level Reqs:\\fr"

			for (let i1 = 0; i1 < clsLvReqStrs.length; i1++){
				if (classLevelRequirementCheck(classLvReqs, actor, reqClassIds[i1])){
					clsLvReqs += "<br>\\px[" + clsReqItemXOffset + "]\\fs[" + clsReqItemFontSize + "]\\c["+ clsReqPassTCode + "]" + clsLvReqStrs[i1];
				} else {
					clsLvReqs += "<br>\\px[" + clsReqItemXOffset + "]\\fs[" + clsReqItemFontSize + "]\\c["+ clsReqFailTCode + "]" + clsLvReqStrs[i1] + "\\c[0]";
				}
			}

			clsLvReqs += "<br>";
		}

		if (wepNameStrs.length > 0){
			wepReqs = "<br>\\px[" + clsReqGrpHeadingXOffset + "]\\fs[" + clsReqGrpHeadingFontSize + "]Weapon Reqs:\\fr"

			for (let i1 = 0; i1 < wepNameStrs.length; i1++){
				if (weaponRequirementCheck(weaponReqs[i1], actor)){
					wepReqs += "<br>\\px[" + clsReqItemXOffset + "]\\fs[" + clsReqItemFontSize + "]\\c["+ clsReqPassTCode + "]" + wepNameStrs[i1] + "\\fr";
				} else {
					wepReqs += "<br>\\px[" + clsReqItemXOffset + "]\\fs[" + clsReqItemFontSize + "]\\c["+ clsReqFailTCode + "]" + wepNameStrs[i1] + "\\fr";
				}
			}

			wepReqs += "<br>";
		}

		if (armNameStrs.length > 0){
			armReqs = "<br>\\px[" + clsReqGrpHeadingXOffset + "]\\fs[" + clsReqGrpHeadingFontSize + "]Armor Reqs:\\fr"

			for (let i1 = 0; i1 < armNameStrs.length; i1++){
				if (armorRequirementCheck(combinedArmReqs[i1], actor)){
					armReqs += "<br>\\px[" + clsReqItemXOffset + "]\\fs[" + clsReqItemFontSize + "]\\c["+ clsReqPassTCode + "]" + armNameStrs[i1] + "\\fr";
				} else {
					armReqs += "<br>\\px[" + clsReqItemXOffset + "]\\fs[" + clsReqItemFontSize + "]\\c["+ clsReqFailTCode + "]" + armNameStrs[i1] + "\\fr";
				}
			}

			armReqs += "<br>";
		}

		if (itmNameStrs.length > 0){
			itmReqs = "<br>\\px[" + clsReqGrpHeadingXOffset + "]\\fs[" + clsReqGrpHeadingFontSize + "]Item Reqs:\\fr";

			for (let i1 = 0; i1 < itmNameStrs.length; i1++){
				if (itemRequirementCheck(itemReqs[i1], actor)){
					itmReqs += "<br>\\px[" + clsReqItemXOffset + "]\\fs[" + clsReqItemFontSize + "]\\c["+ clsReqPassTCode + "]" + itmNameStrs[i1] + "\\fr";
				} else {
					itmReqs += "<br>\\px[" + clsReqItemXOffset + "]\\fs[" + clsReqItemFontSize + "]\\c["+ clsReqFailTCode + "]" + itmNameStrs[i1] + "\\fr";
				}
			}

			itmReqs += "<br>";
		}

		if (genReq.length > 0) { reqs += genReq; }
		if (clsLvReqs.length > 0) { reqs += clsLvReqs; }
		if (wepReqs.length > 0) { reqs += wepReqs; }
		if (armReqs.length > 0) { reqs += armReqs; }
		if (itmReqs.length > 0) { reqs += itmReqs; }

		let totalText = "".concat(wndTitle, reqs);
		let text = format.format(wndTitle, reqs);

		let textState = { index: 0 };
		textState.originalText = text;
		textState.text = this.convertEscapeCharacters(text);
		let convertedTextHeight = this.calcTextHeight(textState, true);
		this._allTextHeight = (convertedTextHeight > 600 ? convertedTextHeight / 2 : convertedTextHeight);

		var txtLen = (this._allTextHeight == 0 ? 300 : this._allTextHeight);
		var multi2 =  7;
		let multi3 = (txtLen >= 600 ? 4 : 10);
		var multi = Math.ceil((txtLen * multi2) / (Graphics.width - (this._width + multi3)));

		this._allTextHeight *= multi/2;
		this._allTextHeight = Math.pow(2, Math.round(Math.log(this._allTextHeight) / Math.log(2)));

		this.createContents();
		this.drawTextEx(text, 0, 0);
	}
}

Window_CCRequirementsInfo.prototype.setSelectedClassId = function(selCls){
	if (this._selectedClassId !== selCls){
		this._selectedClassId = selCls;
		this.refresh();
	}
}

//For window scrolling
Window_CCRequirementsInfo.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  this.updateCountdown();
  if (this.isOpenAndActive()) this.updateKeyScrolling();
};

Window_CCRequirementsInfo.prototype.updateCountdown = function() {
  if (this._countdown > 0) {
    this._countdown -= 1;
    if (this._countdown <= 0) this.refresh();
  }
};

Window_CCRequirementsInfo.prototype.updateArrows = function() {
  if (this._lastOriginY === this.origin.y) return;
  this.showArrows();
};

Window_CCRequirementsInfo.prototype.showArrows = function() {
  this._lastOriginY = this.origin.y;
  this.upArrowVisible = this.origin.y !== 0;
  this.downArrowVisible = this.origin.y !== this.contentsHeight() -
    this.height + this.standardPadding() * 2;
};

Window_CCRequirementsInfo.prototype.hideArrows = function() {
  this.upArrowVisible = false;
  this.downArrowVisible = false;
};

Window_CCRequirementsInfo.prototype.isInsideFrame = function() {
  var x = this.canvasToLocalX(TouchInput._mouseOverX);
  var y = this.canvasToLocalY(TouchInput._mouseOverY);
  return x >= 0 && y >= 0 && x < this._width && y < this._height;
};

Window_CCRequirementsInfo.prototype.processWheel = function() {
  if (!this.isInsideFrame()) return;
  var threshold = 20;
  if (TouchInput.wheelY >= threshold) {
    this.scrollOriginDown(this.scrollSpeed() * 4);
  }
  if (TouchInput.wheelY <= -threshold) {
    this.scrollOriginUp(this.scrollSpeed() * 4);
  }
};

Window_CCRequirementsInfo.prototype.contentsHeight = function() {
  var standard = this._height - this.standardPadding() * 2;
  return Math.max(standard, this._allTextHeight);
};

Window_CCRequirementsInfo.prototype.scrollSpeed = function() {
  if (this._scrollSpeed === undefined) {
    this._scrollSpeed = 5;
  }
  return this._scrollSpeed;
};

Window_CCRequirementsInfo.prototype.scrollOriginDown = function(speed) {
  var value = this.contentsHeight() - this._height +
    this.standardPadding() * 2;
  this.origin.y = Math.min(value, this.origin.y + speed);
};

Window_CCRequirementsInfo.prototype.scrollOriginUp = function(speed) {
  this.origin.y = Math.max(0, this.origin.y - speed);
};

Window_CCRequirementsInfo.prototype.updateKeyScrolling = function() {
  if (Input.isPressed('up')) {
    this.scrollOriginUp(this.scrollSpeed());
  } else if (Input.isPressed('down')) {
    this.scrollOriginDown(this.scrollSpeed());
  } else if (Input.isPressed('pageup')) {
    this.scrollOriginUp(this.scrollSpeed() * 4);
  } else if (Input.isPressed('pagedown')) {
    this.scrollOriginDown(this.scrollSpeed() * 4);
  }
};

/*Window_CCActorClasses.prototype.delayLoadFrames = function() {
	if (this._delayedLoad === undefined) { this._delayedLoad = 30; }
	return this._delayedLoad;
};*/


/* Window_CCClassInfo Functions */
Window_CCClassInfo.prototype = Object.create(Window_Selectable.prototype);
Window_CCClassInfo.prototype.constructor = Window_CCClassInfo;

Window_CCClassInfo.prototype.initialize = function(x,y,w,h){
	this._x = x;
	this._y = y;
	this._currentDrawX = 0;
	this._currentDrawY = 0;
	this._width = w;
	this._height = h;
	this._selectedClassId = 0;
	this._selectedActor = undefined;
	this._countdown = 0;
	this._arrowBlinkTimer = 0;

	Window_Selectable.prototype.initialize.call(this,x,y,w,h);
	this.refresh();
}

Window_CCClassInfo.prototype.getWidth = function() { return this._width; }
Window_CCClassInfo.prototype.getHeight = function() { return this._heigth; }
Window_CCClassInfo.prototype.getX = function() { return this._x; }
Window_CCClassInfo.prototype.getY = function() { return this._y; }
Window_CCClassInfo.prototype.setSelectedActor = function(actor) {
	this._selectedActor = actor;
	this.refresh();
 }
Window_CCClassInfo.prototype.setSelectedClassId = function (clsId){
	this._selectedClassId = clsId;
	this.refresh();
}

Window_CCClassInfo.prototype.refresh = function(){
	if (this._countdown > 0) return;
	var y = 0;

	this.contents.clear();
	this._lastOriginY = -200;
    this.origin.y = 0;
    this._allTextHeight = 0;

	if (this._selectedActor){
		this.contents.clear();
		this.drawClassInfo();
	}
}

Window_CCClassInfo.prototype.drawClassInfo = function(){
	if (this._selectedClassId > 0 && this._selectedActor != undefined){
		let clsData = $dataClasses[this._selectedClassId];
		let actorData = $gameActors._data.find(act => act && act._actorId == this._selectedActor._actorId);
		let i1 = 1;
		let y = 5;
		let format = "<Wordwrap>%1%2%3";
		let nameXOffset = 0;

		this.contents.fontSize = parseInt(clsInfoHeadingFontSize);
		nameXOffset = Math.floor((this._width / 2) - (this.contents.measureTextWidth(clsData.name) / 1.75));
		this.resetFontSettings();

		let clsName = "\\px[" + nameXOffset + "]\\fs[" + clsInfoHeadingFontSize + "]" + clsData.name + "\\fr<br>";
		let desc = (bUseClassDesc ? "<br>\\px[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]" + clsData.desc + "\\fr<br>" : "");
		let classInfo = "";
		let traitData = {};
		let parmInfo = "<br>\\px[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]Parameters [Avg Growth/Level]\\fr";
		let baseParmInfo = "";
		let exParmInfo = "";
		let spParmInfo = "";
		let usableWepInfo = "";
		let usableArmInfo = "";
		let skillInfo = "";
		let elementInfo = "";
		let stResistInfo = "";
		let noAtkInfo = "";
		let noActInfo = "";
		let specFlagInfo = "";
		let partyAbilInfo = "";
		let parmAvgs = getAvgParams(clsData);

		traitData = buildTraitList(clsData.traits);

		for (let i1 = 0; i1 < clsData.params.length; i1++){
			let parms = clsData.params[i1];
			baseParmInfo += "<br>\\px[" + clsInfoItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]" + staticTraits["21"][i1] + ": " + parms[1] + " [+" + parmAvgs[i1] + "]";
		}

		baseParmInfo += "<br>";

		if (bShowExtParams){
			if (Object.keys(traitData.eparms).length > 0){
				exParmInfo = "<br>\\px[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]Extra Parameters\\fr"
				for (let eParmId of Object.keys(traitData.eparms)){
					let parmName = staticTraits["22"][eParmId];
					let parmVal = traitData.eparms[eParmId];

					if ((bOnlyShowNon0Params && parmVal != 0) ||
							!bOnlyShowNon0Params){
						exParmInfo += "<br>\\px[" + clsInfoItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]" + parmName + " " + String(parmVal) + "%";
					}
				}

				exParmInfo += "<br>";
			}

			if (Object.keys(traitData.sparms).length > 0){
				spParmInfo = "<br>\\px[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]Special Parameters\\fr"
				for (let sParmId of Object.keys(traitData.sparms)){
					let parmName = staticTraits["23"][sParmId];
					let parmVal = traitData.sparms[sParmId];

					if ((bOnlyShowNon0Params && parmVal != 0) ||
							!bOnlyShowNon0Params){
						spParmInfo += "<br>\\px[" + clsInfoItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]" + parmName + " " + String(parmVal) + "%";
					}
				}

				spParmInfo += "<br>";
			}
		}

		if (baseParmInfo.length > 0) { parmInfo += baseParmInfo; }
		if (exParmInfo.length > 0) { parmInfo += exParmInfo; }
		if (spParmInfo.length > 0) { parmInfo += spParmInfo; }

		if (traitData.wtypes.length > 0){
			usableWepInfo = "<br>\\px[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]Equippable Weapons\\fr";
			for (let wep of traitData.wtypes){
				usableWepInfo += "<br>\\px[" + clsInfoItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]" + wep;
			}

			usableWepInfo += "<br>";
		}

		if (traitData.atypes.length > 0){
			usableArmInfo = "<br>\\px[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]Equippable Armor\\fr";
			for (let arm of traitData.atypes){
				usableArmInfo += "<br>\\px[" + clsInfoItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]" + arm;
			}

			usableArmInfo += "<br>";
		}

		if (clsData.learnings.length > 0){
			let skillStrs = processSkills(clsData.learnings);
			if (skillStrs.length > 0){
				skillInfo = "<br>\\px[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]Skills\\fr";

				for (let name of skillStrs){
					skillInfo += "<br>\\px[" + clsInfoItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]" + name;
				}

				skillInfo += "<br>";
			}
		}

		let resistSize = Object.keys(traitData.resist).length;
		let weakSize = Object.keys(traitData.weak).length;
		if (resistSize > 0 || weakSize > 0){
			elementInfo = "<br>\\px[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]Elemental Attributes\\fr"

			if (eleDispMode == 1){
				let elementList = getAllElements(traitData.resist, traitData.weak);

				for (let i1 = 0; i1 < elementList.ElementVals.length; i1++){
					let eleId = elementList.ElementIds[i1];
					let eleVal = elementList.ElementVals[i1];
					let eleName = $dataSystem.elements[eleId];
					let eleIconId = elementIconMapping[eleId];

					elementInfo += "<br>\\px[" + clsInfoItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]\\i["+ eleIconId +"] " + eleName + " " + String(eleVal) + "%";
				}
			} else {
				if (resistSize > 0){
					elementInfo += "<br>\\px[" + clsInfoSGrpHeadingXOffset + "]\\fs[" + clsInfoSGrpHeadingFontSize + "]Resistances\\fr";

					for (let eleId of Object.keys(traitData.resist)){
						let ele = traitData.resist[eleId];
						let eleName = $dataSystem.elements[eleId];
						let eleIconId = elementIconMapping[eleId];

						elementInfo += "<br>\\px[" + clsInfoSItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]\\i["+ eleIconId +"] " + eleName + " " + String(ele) + "%";
					}

					elementInfo += "<br>";
				}

				if (weakSize > 0){
					elementInfo += "<br>\\px[" + clsInfoSGrpHeadingXOffset + "]\\fs[" + clsInfoSGrpHeadingFontSize + "]Weakenesses\\fr";

					for (let eleId of Object.keys(traitData.weak)){
						let ele = traitData.weak[eleId];
						let eleName = $dataSystem.elements[eleId];
						let eleIconId = elementIconMapping[eleId];

						elementInfo += "<br>\\px[" + clsInfoSItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]\\i["+ eleIconId +"] " + eleName + " " + String(ele) + "%";
					}

					elementInfo += "<br>";
				}
			}
		}

		if (traitData.rstates.length > 0){
			stResistInfo = "<br>\\px[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]Invulnerable To\\fr";
			for (let st of traitData.rstates){
				stResistInfo += "<br>\\px[" + clsInfoItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]" + st
			}

			stResistInfo += "<br>";
		}

		noAtkInfo = (traitData.noatks != "" ? "<br>[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]Can attack " + String(traitData.noatks) + " times per attack\\fr<br>" : "");

		if (traitData.acttimes.length > 0){
			noActInfo = "<br>\\px[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]Number of actions per turn\\fr";

			for (let act of traitData.acttimes){
				noActInfo += "<br>\\px[" + clsInfoItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]" + act;
			}

			noActInfo += "<br>";
		}

		if (traitData.specflag.length > 0){
			specFlagInfo = "<br>\\px[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]Special Flags\\fr";

			for (let specFlg of traitData.specflag){
				specFlagInfo += "<br>\\px[" + clsInfoItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]" + specFlg;
			}

			specFlagInfo += "<br>";
		}

		if (traitData.partyabl.length > 0){
			partyAbilInfo = "<br>\\px[" + clsInfoGrpHeadingXOffset + "]\\fs[" + clsInfoGrpHeadingFontSize + "]Party Abilities\\fr";

			for(let pAbil of traitData.partyabl){
				partyAbilInfo += "<br>\\px[" + clsInfoItemXOffset + "]\\fs[" + clsInfoItemFontSize + "]" + pAbil;
			}
		}

		if (parmInfo.length > 0) { classInfo += parmInfo; }
		if (usableWepInfo.length > 0) { classInfo += usableWepInfo; }
		if (usableArmInfo.length > 0) { classInfo += usableArmInfo; }
		if (skillInfo.length > 0) { classInfo += skillInfo; }
		if (elementInfo.length > 0) { classInfo += elementInfo; }
		if (stResistInfo.length > 0) { classInfo += stResistInfo; }
		if (noAtkInfo.length > 0) { classInfo += noAtkInfo; }
		if (noActInfo.length > 0) { classInfo += noActInfo; }
		if (specFlagInfo.length > 0) { classInfo += specFlagInfo; }
		if (partyAbilInfo.length > 0) { classInfo += partyAbilInfo; }

		let totalText = "".concat(clsName, desc, classInfo);
		let text = format.format(clsName, desc, classInfo);

		let textState = { index: 0 };
		textState.originalText = text;
		textState.text = this.convertEscapeCharacters(text);
		let convertedTextHeight = this.calcTextHeight(textState, true);
		this._allTextHeight = (convertedTextHeight > 600 ? convertedTextHeight / 2 : convertedTextHeight);

		var txtLen = (this._allTextHeight == 0 ? 300 : this._allTextHeight);
		var multi2 =  7.1;
		let multi3 = (txtLen >= 600 ? 4 : 10);
		var multi = Math.ceil((txtLen * multi2) / (Graphics.width - (this._width + multi3)));

		this._allTextHeight *= multi/2;
		this._allTextHeight = Math.pow(2, Math.round(Math.log(this._allTextHeight) / Math.log(2)));

		this.createContents();
		this.drawTextEx(text, 0, 0);
	}
}

Window_CCClassInfo.prototype.setSelectedActor = function(selAct){
	if (this._selectedActor != selAct){
		this._selectedActor = selAct;
		this.refresh();
	}
}

Window_CCClassInfo.prototype.setSelectedClassId = function(selCls){
	if (this._selectedClassId !== selCls){
		this._selectedClassId = selCls;
		this.refresh();
	}
}

//For window scrolling
Window_CCClassInfo.prototype.update = function() {
  Window_Selectable.prototype.update.call(this);
  this.updateCountdown();
  if (this.isOpenAndActive()) this.updateKeyScrolling();
};

Window_CCClassInfo.prototype.updateCountdown = function() {
  if (this._countdown > 0) {
    this._countdown -= 1;
    if (this._countdown <= 0) this.refresh();
  }
};

Window_CCClassInfo.prototype.updateArrows = function() {
  if (this._lastOriginY === this.origin.y) return;
  this.showArrows();
};

Window_CCClassInfo.prototype.showArrows = function() {
  this._lastOriginY = this.origin.y;
  this.upArrowVisible = this.origin.y !== 0;
  this.downArrowVisible = this.origin.y !== this.contentsHeight() -
    this.height + this.standardPadding() * 2;
};

Window_CCClassInfo.prototype.hideArrows = function() {
  this.upArrowVisible = false;
  this.downArrowVisible = false;
};

Window_CCClassInfo.prototype.isInsideFrame = function() {
  var x = this.canvasToLocalX(TouchInput._mouseOverX);
  var y = this.canvasToLocalY(TouchInput._mouseOverY);
  return x >= 0 && y >= 0 && x < this._width && y < this._height;
};

Window_CCClassInfo.prototype.processWheel = function() {
  if (!this.isInsideFrame()) return;
  var threshold = 20;
  if (TouchInput.wheelY >= threshold) {
    this.scrollOriginDown(this.scrollSpeed() * 4);
  }
  if (TouchInput.wheelY <= -threshold) {
    this.scrollOriginUp(this.scrollSpeed() * 4);
  }
};

Window_CCClassInfo.prototype.contentsHeight = function() {
  var standard = this._height - this.standardPadding() * 2;
  return Math.max(standard, this._allTextHeight);
};

Window_CCClassInfo.prototype.scrollSpeed = function() {
  if (this._scrollSpeed === undefined) {
    this._scrollSpeed = 5;
  }
  return this._scrollSpeed;
};

Window_CCClassInfo.prototype.scrollOriginDown = function(speed) {
  var value = this.contentsHeight() - this._height +
    this.standardPadding() * 2;
  this.origin.y = Math.min(value, this.origin.y + speed);
};

Window_CCClassInfo.prototype.scrollOriginUp = function(speed) {
  this.origin.y = Math.max(0, this.origin.y - speed);
};

Window_CCClassInfo.prototype.updateKeyScrolling = function() {
  if (Input.isPressed('up')) {
    this.scrollOriginUp(this.scrollSpeed());
  } else if (Input.isPressed('down')) {
    this.scrollOriginDown(this.scrollSpeed());
  } else if (Input.isPressed('pageup')) {
    this.scrollOriginUp(this.scrollSpeed() * 4);
  } else if (Input.isPressed('pagedown')) {
    this.scrollOriginDown(this.scrollSpeed() * 4);
  }
};


/* Window_CCComand */
Window_CCCommand.prototype = Object.create(Window_HorzCommand.prototype);
Window_CCCommand.prototype.constructor = Window_CCCommand;

Window_CCCommand.prototype.initialize = function(x,y,w,h){
	this._width = w;
	this._height = h;
	Window_HorzCommand.prototype.initialize.call(this,x,y);

	this._x = x;
	this._y = y;
	this._actor = undefined;
	this._selectedClassId = undefined;
	this._actClasses = undefined;
	this.refresh();
}

Window_CCCommand.prototype.windowWidth = function() { return this._width; }
Window_CCCommand.prototype.getHeight = function() { return this._height; }
Window_CCCommand.prototype.getX = function() { return this._x; }
Window_CCCommand.prototype.getY = function() { return this._y; }
Window_CCCommand.prototype.setSelectedActor = function(actor){
		this._actor = actor;
		this._actClasses = this._actor._exp;

		this.refresh();
}

Window_CCCommand.prototype.setSelectedClassId = function(selClsId){
	if (this._selectedClassId !== selClsId){
		this._selectedClassId = selClsId;
		this.refresh();
	}
}

Window_CCCommand.prototype.maxCols = function() { return 2; }
Window_CCCommand.prototype.makeCommandList = function(){
	this.addCommand("Change Class",'ok');
	this.addCommand("Cancel",'cancel');
}

Window_CCCommand.prototype.refresh = function(){
	if (this._actor && this._selectedClassId){
		this.clearCommandList();
		this.makeCommandList();
		Window_HorzCommand.prototype.refresh.call(this);
	}
}


Window_Help.prototype.getHeight = function() { return this._height;}
Window_Help.prototype.getWidth = function() { return this._width;}
Window_Gold.prototype.getHeight = function() { return this._height;}
Window_Gold.prototype.getWidth = function() { return this._width;}


/* Utility Functions */
function canChangeToClass(actorId, classId){
	let actor = $gameParty.members().find(act => act._actorId == actorId);
	let actorEquips = actor.equips();
	let partyItems = $gameParty.items();
	let actorClsData = actor._exp;
	let cls = $dataClasses.find(cls => cls && cls.id == classId);
	let bCanChange = false;
	let actorWeapons = actorEquips.filter(w => w && w.etypeId == 1);
	let actorArmor = actorEquips.filter(a => a && (a.etypeId == 2 || a.etypeId == 3 ||
		a.etypeId == 4 || a.etypeId == 5 || a.etypeId == 6));

	//Req Overrides
	//Bypass On Old Class
	if (bAllowReqBypassOnOldClass){
		if (actorClsData.hasOwnProperty(classId)){
			return true;
		}
	}

	//Restrictions
	//Restriction 1; can change to
	if (actorWeapons.length > 0){
		let wepRestriction1CheckPasses = false;
		let foundWepRestrictions = false;
		let wepName = '';
		for (let wep of actorWeapons){
			let wepRes = wep.changeRequirements.restrictions.canChangeTo;
			wepName = wep.name;
			if (wepRes.length > 0){
				foundWepRestrictions = true;
				if (wepRes.contains(classId)){
					wepRestriction1CheckPasses = true;
					break;
				}
			}
		}

		if (!wepRestriction1CheckPasses && foundWepRestrictions) {
			cantChangeHelpText += wepName;
			return false; }
	}

	if (actorArmor.length > 0){
		let armRestriction1CheckPasses = false;
		let foundArmRestrictions = false;
		let armName = '';
		for (let arm of actorArmor){
			let armRes = arm.changeRequirements.restrictions.canChangeTo;
			armName = arm.name;
			if (armRes.length > 0){
				foundArmRestrictions = true;
				if (armRes.contains(classId)){
					armRestriction1CheckPasses = true;
					break;
				}
			}
		}

		if (!armRestriction1CheckPasses && foundArmRestrictions) {
			cantChangeHelpText += armName;
			return false; }
	}

	if (partyItems.length > 0){
		let itmRestriction1CheckPasses = false;
		let foundItmRestrictions = false;
		let itmName = '';
		for (let itm of partyItems){
			let itmRes = itm.changeRequirements.restrictions.canChangeTo;
			itmName = itm.name;
			if(itmRes.length > 0){
				foundItmRestrictions = true;
				if (itmRes.contains(classId)){
					itmRestriction1CheckPasses = true;
					break;
				}
			}
		}

		if (!itmRestriction1CheckPasses && foundItmRestrictions) {
			CantChangeHelpText += itmName;
			return false;
		}
	}

	//Restriction 2; cant change to; IDs in the list are classes you can change to; this option prevents
	//players from changing to a different class id if they have not been that class before.
	if (actorWeapons.length > 0){
		let wepRestriction2CheckPasses = true;
		for (let wep of actorWeapons){
			if (wep.changeRequirements.restrictions.cantChange){
				cantChangeHelpText += wep.name;
				wepRestriction2CheckPasses = false;
				break;
			}
		}

		if (!wepRestriction2CheckPasses) { return false; }
	}

	if (actorArmor.length > 0){
		let armRestriction2CheckPasses = true;
		for (let arm of actorArmor){
			if (arm.changeRequirements.restrictions.cantChange){
				cantChangeHelpText += arm.name;
				armRestriction2CheckPasses = false;
				break;
			}
		}

		if (!armRestriction2CheckPasses) { return false; }
	}

	if (partyItems.length > 0){
		let itmRestriction2CheckPasses = true;
		for (let itm of partyItems){
			if (itm.changeRequirements.restrictions.cantChange){
				cantChangeHelpText += itm.name;
				itmRestriction2CheckPasses = false;
				break;
			}
		}

		if (!itmRestriction2CheckPasses) { return false; }
	}

	//Bypass on WAI
	let canBypass = canBypassRequirements(partyItems, actorWeapons,
		actorArmor, actorClsData, actor, cls);

	if (canBypass != undefined){
		if (canBypass) { return true; }
		else { return false; }
	}

	//Gender Requirements
	if (cls.changeRequirements.gender != ""){
		if (!genderRequirementCheck(actorId, cls)){
			cantChangeHelpText += "incorrect gender.";
			return false;
		}
	}

	//WAI Requirements
	if (!weaponRequirementsCheck(cls, actorWeapons)){
		return false;
	}

	if (!armorRequirementsCheck(cls, actorArmor)){
		return false;
	}

	if (!itemRequirementsCheck(cls, partyItems)){
		return false;
	}

	//Level requirements
	if (!classLevelRequirementsCheck(cls, actor)){
		return false;
	}

	//Cost Requirements
	if (!meetsCostConditions(actorClsData, actor.maxLevel(), cls)){
		return false;
	}

	return true;
}

function canBypassRequirements(partyItems, actorWeapons, actorArmor,
		actorClsData, actor, cls){
	let classId = cls.id;
	if (partyItems.length > 0){
		let itmIds = [];
		for (let itm of partyItems){
			itmIds.push(itm.id);
		}

		let itemData = $dataItems.filter(itm => itm && itmIds.contains(itm.id));
		if (itemData.length > 0){
			for (let itm of itemData){
				if (itm.changeRequirements.bypass.contains(classId)){
					if (bUseCostOnBypass){
						if (meetsCostConditions(actorClsData, actor.maxLevel(), cls)){
							return true;
						} else { return false; }
					} else { return true; }
				}
			}
		}
	}

	if (actorWeapons.length > 0){
		let wepIds = [];
		for (let wep of actorWeapons){
			wepIds.push(wep.id);
		}

		let wepData = $dataWeapons.filter(w => w && wepIds.contains(w.id));
		if (wepData.length > 0){
			for (let wep of wepData){
				if (wep.changeRequirements.bypass.contains(classId)){
					if (bUseCostOnBypass){
						if (meetsCostConditions(actorClsData, actor.maxLevel(), cls)){
							return true;
						} else { return false; }
					} else { return true; }
				}
			}
		}
	}

	if (actorArmor.length > 0){
		let armIds = [];
		for (let arm of actorArmor){
			armIds.push(arm.id);
		}

		let armData = $dataArmors.filter(a => a && armIds.contains(a.id));
		if (armData.length > 0){
			for (let arm of armData){
				if (arm.changeRequirements.bypass.contains(classId)){
					if (bUseCostOnBypass){
						if (meetsCostConditions(actorClsData, actor.maxLevel(), cls)){
							return true;
						} else { return false; }
					} else { return true; }
				}
			}
		}
	}

	return undefined;
}

function genderRequirementCheck(actorId, cls){
	if (bAreGenderReqsEnabled){
		let actorGender = $dataActors.find(act => act && act.id == actorId).gender;
		if (cls.changeRequirements.gender != ""){
			if (genderNameMap[actorGender].toLowerCase() == cls.changeRequirements.gender.toLowerCase()){
				return true;
			} else { return false; }
		} else { return true; }
	} else { return true; }
}

function weaponRequirementsCheck(cls, actorWeapons){
	let requiredWeps = cls.changeRequirements.weapons;
	if (requiredWeps.length > 0){
		let bWeaponCheckPasses = false;
		let actWepIds = [];
		for (let wep of actorWeapons){
			actWepIds.push(wep.id);
		}

		for (let wepId of requiredWeps){
			if (actWepIds.contains(wepId)){
				bWeaponCheckPasses = true;
			} else {
				cantChangeHelpText += $dataWeapons[wepId].name;
				bWeaponCheckPasses = false;
				break;
			}
		}

		if (!bWeaponCheckPasses) { return false; }
		else { return true; }
	} else { return true; }
}

function weaponRequirementCheck(requiredWepId, actor){
	let actorWeapons = actor.equips().filter(wep => wep && wep.etypeId == 1);
	let actWepIds = [];
	for (let arm of actorWeapons){
		actWepIds.push(arm.id);
	}

	if (actWepIds.contains(requiredWepId)){
		return true;
	} else { return false; }
}

function armorRequirementsCheck(cls, actorArmor){
	let requiredArms = cls.changeRequirements.armor;
	requiredArms = requiredArms.concat(cls.changeRequirements.accs);
	if (requiredArms.length > 0){
		let bArmorCheckPasses = false;
		let actArmIds = [];
		for (let arm of actorArmor){
			actArmIds.push(arm.id);
		}

		for (let armId of requiredArms){
			if (actArmIds.contains(armId)){
				bArmorCheckPasses = true;
			} else {
				cantChangeHelpText += $dataArmors[armId].name;
				bArmorCheckPasses = false;
				break;
			}
		}

		if (!bArmorCheckPasses) { return false; }
		else { return true; }
	} else { return true; }
}

function armorRequirementCheck(requiredArmId, actor){
	let actorArmor = actor.equips().filter(arm => arm && (arm.etypeId == 2 || arm.etypeId == 3 ||
		arm.etypeId == 4 || arm.etypeId == 5 || arm.etypeId == 6));

	let actArmIds = [];
	for (let arm of actorArmor){
		actArmIds.push(arm.id);
	}

	if (actArmIds.contains(requiredArmId)){
		return true;
	} else { return false; }
}

function itemRequirementsCheck(cls, partyItems){
	let requiredItems = cls.changeRequirements.items;
	if (requiredItems.length > 0){
		let bItemCheckPasses = false;
		let prtyItmIds = [];
		for (let itm of partyItems){
			prtyItmIds.push(itm.id);
		}

		for (let itmId of requiredItems){
			if (prtyItmIds.contains(itmId)){
				bItemCheckPasses = true;
			} else {
				cantChangeHelpText += $dataItems[itmId].name;
				bItemCheckPasses = false;
				break;
			}
		}

		if (!bItemCheckPasses) { return false; }
		else { return true; }
	} else { return true; }
}

function itemRequirementCheck(requiredItemId){
	let partyItems = $gameParty.items();
	let partyItmIds = [];
	for (let itm of partyItems){
		partyItmIds.push(itm.id);
	}

	if (partyItmIds.contains(requiredItemId)){
		return true;
	} else { return false; }
}

function classLevelRequirementsCheck(cls, actor){
	let requiredClasses = cls.changeRequirements.classes;
	if (Object.keys(requiredClasses).length > 0){
		let currentActorClassLevels = getActorClsLevels(actor);

		for (let clsId of Object.keys(requiredClasses)){
			if (currentActorClassLevels.hasOwnProperty(clsId)){
				if (requiredClasses[clsId] > currentActorClassLevels[clsId]){
					cantChangeHelpText += "level requirement not met";
					return false;
				}
			} else {
				cantChangeHelpText += "required class missing";
				return false;
			}
		}
	}

	return true;
}

function classLevelRequirementCheck(reqClasses, actor, reqClassId){
	let currentActorClassLevels = getActorClsLevels(actor);
	if (currentActorClassLevels.hasOwnProperty(reqClassId)){
		if (reqClasses[reqClassId] > currentActorClassLevels[reqClassId]){
			return false;
		}
	} else { return false; }

	return true;
}

function meetsCostConditions(actorClassData, maxLevel, clsData){
	let meetsConditions = true;
	if (!actorClassData.hasOwnProperty(clsData.id)){
		let goldFormula = clsData.currencyCostFormula;
		let itmFormula = clsData.itemCostFormula;

		if (bIsCurrencyCostEnabled) {
			let actorClasses = Object.keys(actorClassData).length;
			let avgClassLevels = getAvgLevel(actorClassData, maxLevel);

			avgClassLevels = Math.floor(((avgClassLevels + 4) * 3.45) / 1.75);
			avgClassLevels = Math.floor(avgClassLevels * (actorClasses + (actorClasses * 0.75)));
			let goldCost = Math.floor(eval(goldFormula));
			if ($gameParty.gold() >= goldCost){
				meetsConditions = true;
			} else {
				cantChangeHelpText += "not enough " + TextManager.currencyUnit;
				return false;
			}
		}

		if (bIsItemCostEnabled){
			let actorClasses = Object.keys(actorClassData).length;
			let avgClassLevels = getAvgLevel(actorClassData, maxLevel);

			avgClassLevels = Math.floor(avgClassLevels == 1 ? 1 : (((avgClassLevels)*2)/3)*0.75);
			avgClassLevels = Math.floor(avgClassLevels * (actorClasses + (actorClasses * 0.75)));

			let itemCost = Math.floor(eval(itmFormula));
			itemCost = clamp(itemCost, 0, 99);
			if ($gameParty.numItems($dataItems[costItemId]) >= itemCost){
				meetsConditions = true;
			} else {
				cantChangeHelpText += "not enough " + $dataItems[costItemId].name;
				return false;
			}
		}
	}

	return meetsConditions;
}

function getAvgLevel(actorClassData, maxLevel){
	let numOfClasses = Object.keys(actorClassData).length;
	let totalLevels = 0;

	for (let clsId of Object.keys(actorClassData)){
		totalLevels += calcLevel($dataClasses[clsId], actorClassData[clsId], maxLevel);
	}

	return Math.floor(totalLevels / numOfClasses);
}

function getActorClsLevels(actor){
	let actorMaxLvl = actor.maxLevel();
	let actorClsData = actor._exp;
	let actorClsLevels = {};

	if (Object.keys(actorClsData).length > 0){
		for (let clsId of Object.keys(actorClsData)){
			let clsExp = actorClsData[clsId];
			actorClsLevels[clsId] = calcLevel($dataClasses[clsId], clsExp, actorMaxLvl);
		}
	}

	return actorClsLevels;
}

function calcLevel(classData, currExp, maxLevel){
    var level = 0;

    while ((level != maxLevel) && currExp >= nextLevelExp(level, classData)) {
        level++;
    }

    while (currExp < currentLevelExp(level, classData)) {
    	level = (level-- >= 0 ? level-- : 0);
    }

	return level;
}

function currentLevelExp(level, classData) {
    return expForLevel(level, classData);
};

function nextLevelExp(level, classData) {
    return expForLevel(level + 1, classData);
};

function nextRequiredExp(level, classData) {
    return nextLevelExp(level, classData) - currentExp(level, classData);
};

function expForLevel(level, classData) {
    var c = classData;
    var basis = c.expParams[0];
    var extra = c.expParams[1];
    var acc_a = c.expParams[2];
    var acc_b = c.expParams[3];
    return Math.round(basis*(Math.pow(level-1, 0.9+acc_a/250))*level*
            (level+1)/(6+Math.pow(level,2)/50/acc_b)+(level-1)*extra);
};

function getAvgParams(clsData){
	let paramAvgs = [];
	let paramGrowthVals = [];
	let baseParams = clsData.params;

	for (let currParamArr of baseParams){
		let currParamVal = 0;
		let lastParamVal = -1;
		let currParmGrowthArr = [];

		for (let parmVal of currParamArr){
			if (lastParamVal != -1){
				currParamVal = parmVal - lastParamVal;
				lastParamVal = parmVal;
			} else {
				currParamVal = parmVal;
				lastParamVal = parmVal;
			}

			currParmGrowthArr.push(currParamVal);
		}

		paramGrowthVals.push(currParmGrowthArr);
	}

	for (let parmGrowthArr of paramGrowthVals){
		let totalGrowth = 0;
		let maxLevel = parmGrowthArr.length;
		let parmAvg = 0;

		for (let parmVal of parmGrowthArr){
			totalGrowth += parmVal;
		}

		parmAvg = getRoundedVal(totalGrowth / maxLevel, 0);
		paramAvgs.push(parmAvg);
	}

	return paramAvgs;
}

function clamp(val, min, max){
	return Math.max(min, Math.min(val, max));
}

function getRoundedVal(val, decPlcs) {
    var multi = Math.pow(10, decPlcs);
    return Math.round(val * multi) / multi;
}

function buildTraitList(traits){
	var tempObj = {
		"resist" : {},
		"weak" : {},
		"rstates": [],
		"wtypes" : [],
		"atypes" : [],
		"eparms" : {},
		"sparms" : {},
		"noatks" : "",
		"turnspd" : "",
		"acttimes" : [],
		"specflag" : [],
		"partyabl" : []
	};

	var eleRates = [];
	var resSts = [];
	var exParms = [];
	var spParms = [];
	var turnSpd = [];
	var numOfAtks = [];
	var wepTyps = [];
	var armTyps = [];
	var lkSlts = [];
	var sldSlts = [];
	var actTimes = [];
	var spcEffs = [];
	var partyAbls = [];

	//if (traits.length > 0) { traits = orderTraits(traits); }

	for (var i1 = 0; i1 < traits.length; i1++){
		if (traits[i1].code == 11){ //Element Rate
			eleRates.push(traits[i1]);
		} else if (traits[i1].code  == 14){ //Resist State
			resSts.push(traits[i1]);
		}else if (traits[i1].code == 22){ //Ex-Parm
			exParms.push(traits[i1]);
		} else if (traits[i1].code == 23){ //Sp-Parm
			spParms.push(traits[i1]);
		} else if (traits[i1].code == 33){ //Atk Spd
			turnSpd.push(traits[i1]);
		} else if (traits[i1].code == 34){ //Atk Times
			numOfAtks.push(traits[i1]);
		} else if (traits[i1].code == 51){ //Wep Typ
			wepTyps.push(traits[i1]);
		} else if (traits[i1].code == 52){ //Arm Typ
			armTyps.push(traits[i1]);
		} else if (traits[i1].code == 61){ //Act Times
			actTimes.push(traits[i1]);
		} else if (traits[i1].code == 62){ //Spec Eff
			spcEffs.push(traits[i1]);
		} else if (traits[i1].code == 64){ //Prty Ability
			partyAbls.push(traits[i1]);
		}
	}

	if (eleRates.length > 0) { tempObj = processEleRates(eleRates, tempObj); }
	if (wepTyps.length > 0 || armTyps.length > 0) { tempObj = processEquipTyps(wepTyps, armTyps, tempObj); }
	if (exParms.length > 0 || spParms.length > 0) { tempObj = processParms(exParms, spParms, tempObj); }
	if (resSts.length > 0) { tempObj = processTStates(resSts, tempObj); }
	if (turnSpd.length > 0) { tempObj = processTrnSpd(turnSpd, tempObj); }
	if (numOfAtks.length > 0) { tempObj = processNumOfAtks(numOfAtks, tempObj); }
	if (actTimes.length > 0) { tempObj = processActTimes(actTimes, tempObj); }
	if (spcEffs.length > 0) { tempObj = processTrtSpecEffs(spcEffs, tempObj); }
	if (partyAbls.length > 0) { tempObj = processPartyAbils(partyAbls, tempObj); }

	return tempObj;
}

function processEleRates(traits, tempObj){
	let eleWeak = [];
	let eleReist = [];
	let resistances = {};
	let weaknesses = {};
	let tCode = 0;
	let tID = -1;
	let tVal = -1;
	let tStr = "";

	for (var i1 = 0; i1 < traits.length; i1++){
		tVal = traits[i1].value;
		if (tVal < 1.0){ //Resistance
			eleReist.push(traits[i1]);
		} else if (tVal > 1.0) { //Weakness
			eleWeak.push(traits[i1]);
		}
	}

	eleWeak = orderElementalTraits(eleWeak);
	for (var i1 = 0; i1 < eleWeak.length; i1++){
		tId = eleWeak[i1].dataId;
		tVal = eleWeak[i1].value;

		weaknesses[tId] = getElRate(tVal);
	}

	eleReist = orderElementalTraits(eleReist);
	for (let i1 = 0; i1 < eleReist.length; i1++){
		tId = eleReist[i1].dataId;
		tVal = eleReist[i1].value;

		resistances[tId] = getElRate(tVal);
	}

	tempObj.weak = weaknesses;
	tempObj.resist = resistances;
	return tempObj;
}

function getElRate(value){
	let dispVal = 0;
	if (value != 1.0) {
		if (value * 100 > 100){
			if (eleDispMode == 1){
				dispVal = Math.round(value*100);
			} else {
				dispVal = Math.round((value*100) - 100);
			}
		} else if (value * 100 < 100){
			if (eleDispMode == 1){
				dispVal = Math.round(value*100);
			} else {
				dispVal = Math.round(100 - (value*100));
			}
		}
	}

	return dispVal;
}

function processEquipTyps(weps, armor, tempObj){
	let wepNames = [];
	let armNames = [];

	for (let i1 = 0; i1 < weps.length; i1++){
		let wepTID = weps[i1].dataId;

		wepNames.push($dataSystem.weaponTypes[wepTID]);
	}

	for (let i1 = 0; i1 < armor.length; i1++){
		let armTID = armor[i1].dataId;

		armNames.push($dataSystem.armorTypes[armTID]);
	}

	tempObj.wtypes = wepNames;
	tempObj.atypes = armNames;

	return tempObj;
}

function processParms(exParms, spParms, tempObj){
	let exParmTraits = {};
	let spParmTraits = {};

	for (let i1 = 0; i1 < exParms.length; i1++){
		let value = exParms[i1].value;
		exParmTraits[exParms[i1].dataId] = Math.round(value*100);
	}

	for (let i1 = 0; i1 < spParms.length; i1++){
		let value = spParms[i1].value;
		spParmTraits[spParms[i1].dataId] = Math.round(value*100);
	}

	tempObj.eparms = exParmTraits;
	tempObj.sparms = spParmTraits;
	return tempObj;
}

function processTStates(resSts, tempObj){
	let resStates = [];
	for (var i1 = 0; i1 < resSts.length; i1++){
		let resStStr = "";
		let stId = resSts[i1].dataId;
		let icn = "\\i[" + $dataStates[stId].iconIndex + "]";
		let stName = $dataStates[stId].name;

		resStStr = icn + " " + stName;
		resStates.push(resStStr);
	}

	tempObj.rstates = resStates;
	return tempObj;
}

function processTrnSpd(trnSpdLst, tempObj){
	let trnSpd = 0;

	for (var spd of trnSpdLst){
		let spdUp = spd.value;

		trnSpd += spdUp;
	}

	tempObj.turnspd = trnSpd;
	return tempObj;
}

function processNumOfAtks(numOfAtks, tempObj){
	let ttlAtks = 1;

	for (var nAtks of numOfAtks){
		ttlAtks += nAtks.value;
	}

	tempObj.noatks = ttlAtks;
	return tempObj;
}

function processActTimes(actTimes, tempObj){
	let actionTimes = [];
	let numOfActs = 2;

	for (var i1 = 0; i1 < actTimes.length; i1++){
		let actTmStr = "";
		let tVal = actTimes[i1].value * 100;
		let fVal = tVal;
		let percChance = 0;

		for (var i2 = 0; i2 < i1; i2++){
			fVal *= 0.5;
		}

		actTmStr = fVal + "% chance of " + numOfActs + " actions";
		actionTimes.push(actTmStr);
		numOfActs++;
	}

	tempObj.acttimes = actionTimes;
	return tempObj;
}

function processTrtSpecEffs(traits, tempObj){
	var specFlagLst = [];

	for (var i1 = 0; i1 < traits.length; i1++){
		var dataId = traits[i1].dataId;
		var flgName = staticTraits['62'][dataId];

		if (!specFlagLst.includes(flgName)){
			specFlagLst.push(flgName);
		}
	}

	tempObj.specFlag = specFlagLst;
	return tempObj;
}

function processPartyAbils(partAbls, tempObj){
	var prtyAbs = [];

	for (var i1 = 0; i1 < partAbls.length; i1++){
		var dataId = partAbls[i1].dataId;
		var prtAbName = staticTraits['64'][dataId];

		if (!prtyAbs.includes(prtAbName)){
			prtyAbs.push(prtAbName);
		}
	}

	tempObj.partyabl = prtyAbs;
	return tempObj;
}

function orderElementalTraits(traits){
	for (let i1 = 0; i1 < traits.length; i1++){
		for (let i2 = 0; i2 < traits.length; i2++){
			let e2 = traits[i2];
			let e1 = traits[i1];
			let storage;

			if (eleOrderMode == 1){
				if (e1.value > e2.value){
					storage = e1;
					traits[i1] = e2;
					traits[i2] = storage;
				}
			} else {
				if (e1.value < e2.value){
					storage = e1;
					traits[i1] = e2;
					traits[i2] = storage;
				}
			}
		}
	}

	return traits;
}

function orderSkillsByLevel(skillLst){
	for (let i1 = 0; i1 < skillLst.length; i1++){
		for (let i2 = 0; i2 < skillLst.length; i2++){
			let storage = {};
			let e1 = skillLst[i1];
			let e2 = skillLst[i2];

			if (sklOrderMode == 1){
				if (e1.level > e2.level){
					storage = e1;
					skillLst[i1]= e2;
					skillLst[i2] = storage;
				}
			} else {
				if (e1.level < e2.level){
					storage = e1;
					skillLst[i1]= e2;
					skillLst[i2] = storage;
				}
			}
		}
	}

	return skillLst;
}

function processSkills(skilList){
	let skillData = $dataSkills;
	let skList = {};
	let sklListData = [];

	skilList = orderSkillsByLevel(skilList);
	for (var skl in Object.keys(skilList)){
		let sklObj = {};
		let sk = skilList[skl];

		sklObj = skillData.filter(k => k && k.id == sk.skillId  && !ignoreSkills.contains(sk.skillId))
				 .reduce((obj, k) => {
					obj = {
						"name": k.name,
						"icon": k.iconIndex,
						"level": sk.level
					};

					return obj;
				 }, {});

		if (Object.keys(sklObj).length > 0) {
			skList[sk.skillId] = sklObj;
		}
	}

	if (Object.keys(skList).length > 0){
		for (var k in skList){
			sklListData.push("\\i[" + skList[k].icon.toString() + "]" + skList[k].name + " Lv. " + skList[k].level);
		}
	}

	return sklListData;
}

function getAllElements(resist, weak){
	let elementList = {
		ElementVals: [],
		ElementIds: []
	};
	let existingElements = Object.assign({}, resist, weak);
	let normalElements = {};
	let keys = Object.keys(existingElements);

	for (let i1 = 1; i1 < $dataSystem.elements.length; i1++){
		let key = keys[i1];
		if (key){
			let val = existingElements[key];

			elementList.ElementVals.push(val);
			elementList.ElementIds.push(key);
		}
	}

	for (let i1 = 1; i1 < $dataSystem.elements.length; i1++){
		if (!existingElements.hasOwnProperty(i1)){
			elementList.ElementVals.push(100);
			elementList.ElementIds.push(i1);
		}
	}

	for (let i1 = 0; i1 < elementList.ElementVals.length; i1++){
		for (let i2 = 0; i2 < elementList.ElementVals.length; i2++){
			let storage1 = 0;
			let storage2 = 0;
			let e1 = elementList.ElementVals[i1];
			let e2 = elementList.ElementVals[i2];
			let e3 = elementList.ElementIds[i1];
			let e4 = elementList.ElementIds[i2];

			if (eleOrderMode == 1){
				if (e1 > e2){
					storage1 = e1;
					storage2 = e3;
					elementList.ElementVals[i1]= e2;
					elementList.ElementVals[i2] = storage1;

					elementList.ElementIds[i1] = e4;
					elementList.ElementIds[i2] = storage2
				}
			} else {
				if (e1 < e2){
					storage1 = e1;
					storage2 = e3;
					elementList.ElementVals[i1]= e2;
					elementList.ElementVals[i2] = storage1;

					elementList.ElementIds[i1] = e4;
					elementList.ElementIds[i2] = storage2
				}
			}
		}
	}

	return elementList;
}
