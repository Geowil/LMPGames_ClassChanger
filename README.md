# LMPGames_ClassChanger
Version: 2.0

Demo Available: Yes, [LMPGames_ClassChangeDemo.zip](http://www.lmpgames.com/RMMV/Plugins/LMPGames_ClassChangerDemo_V2.0.zip)

Project File: Yes, [LMPGames_ClassChangeDemoProject.zip](http://www.lmpgames.com/RMMV/Plugins/LMPGames_ClassChangerDemo_Project_V2.0.zip)

Conflicts: Maybe, see [Conflicts](https://github.com/Geowil/LMPGames_ClassChanger#conflicts) section

Terms of Use: Free non-commercially or commercially; just give credit


<p align="center"> 
<img src="https://www.lmpgames.com/imgs/pbimgs/LMPCCV2.0.PNG" border="0" alt=""/></a>
</p>

## What is this?
This repository is for an RPG Maker MV JS plugin which allows the developer to create class level based restrictions for allowing
a player to change their classes.  In effect this allows the developer to create a class hierarchy without needing complicated event
scripting by using class note tags.  It also allows for other conditions and restrictions for class changing.


## Requirements
The only requirement at this time is YanFly's Message Core plugin, which is available for free as part of their Free Starter Pack Essentials on Itch.io.

For the Demo: Demo Folder -> www -> js -> plugins

For the Project: Project Folder -> js -> plugins

If you plan to use my Advanced Weapon Plugin with this, you will need to enable support for it in the plugin settings.  It is not required though.


## Installation
Simply download the project file linked above then copy and paste the LMPGames_ClassChanger.js file into your game's plugins folder.  Then do the same for YEP_MessageCore.  Then all you need to do is add the plugins into your game in the plugin manager in the editor.  MessageCore should be above this plugin.


## How does it work?
It is quite simple.  First, map out your class hierarchy; which classes will be a starting point for a class tree and what levels
should be required to unlock classes throughout the tree.  For example take this class tree:

Novice > Soldier > Veteran > Captain

Within this tree each class requires different levels of the previous classes to change to it:

```
Novice, starting class so there are no requirements
Solider, 10 levels in Novice
Veteran, 25 levels in Novice and 12 in Soldier
Captain, 45 levels in Novice, 35 in Soldier, and 30 in Veteran
```

This is a simple example of what you can do with this plugin.  You can also create hybrid classes which require classes from multiple
class trees.  For example requiring a Soldier and a Mage class to change to a class that can use physical attacks, magical ones, or
some kind of combination of the two.

What you can do with this plugin is limited only by your creativity and it allows you to exercise that creativity without worrying
about how to accomplish it through an event.

All that needs to be done is to place this tag into the note box on the class you want to create requirements for:

```
<LMPCC_Requirements>
Class:cId:lvl
</LMPCC_Requirements>
```

Class = Requirement type

cId = ID number of the class

lvl = required level in that class


Finally just add the following plugin command to an event


```
LMP.StartClassChange
```


For more on the usage of this plugin, please see the Current Features section below where each feature is covered in detail



## Current Features
### Class Level Requirements
As described in the last section, the main usage for this plugin is to assign requirements for class changing by using other class's levels.
To continue with the example posed in the last section, here is what the requirement note tag would like for the Captain class:

So to continue the example above using the Captain class tree, here is how the Captain class note box tag would look:

```
<LMPCC_Requirements>
Class:1:45
Class:2:35
Class:3:30
</LMPCC_Requirements>
```



### Currency Cost System
The Currency Cost system is one of two cost systems available for use in this plugin.  It works by taking the combined sum of a character's class levels
and using that sum in a formula to determine how much game currency to charge to allow the character to change their class.  The more classes and the higher
the levels of those classes, the more currency it takes to change to a new class.

This system can be controlled in two ways.  First it can be turned on or off from the plugin setting.  The second way is in-game by using the following
plugin commmand:

```
LMP.ClassChanger Enable/Disable CurrencyCost
```

The formula which determines the cost can be modified in the note tag for each class.



### Item Cost System
The Item Cost system is the second of the two cost systems.  Like the Currency Cost system, this system allows you to impose a cost on class changing but instead
of using gold this system uses an item which is defined in the plugin parameters.  The formula to determine the number of items to charge is also available
for modification in the plugin paramteres and like the Currency Cost system you can either enable or disable this system from the plugin parameters or use the
following plugin command:

```
LMP.ClassChanger Enable/Disable ItemCost
```

There is also another plugin command for this system to change the cost item from in-game:

```
LMP.ClassChanger ChangeCostItemId ItemID

Example: LMP.ClassChanger ChangeCostItemId 1
```

You can have both of these systems, the Currency Cost and Item Cost systems, enabled at the same time.



### Item Requirements
The Item Requirements feature allows you to create a class change requirement based on possession of specific items.  Consider it akin to the Asterisk
system in Bravely Default.  In order to set up an item requirement all you need to do is the following:

```
<LMPCC_Requirements>
Item:ID
</LMPCC_Requirements>
```

That's it.



### Gender Requirements
The Gender Requirements feature allows you to allow changing based on gender of the character.  This feature requires a little extra setup to work.  First,
you must define the genders of any characters which you want to take advantage of this feature.  To do so, add the following tag to the Actor note box:

```
<LMPCC_Gender>
Gender:GenderCode
</LMPCC_Gender>
```

The system allows you to create whatever gender designations you want to.  In the note tag for the actor, enter in a one letter code to represent the gender.  Once you have creaated all of the genders you wish to use, you will need to update a mapping in the plugin settings.  This can be found under the System Settings subsection, after Cost Item ID:

<p align="center"> 
<img src="https://www.lmpgames.com/imgs/pbimgs/LMPCC_GM.png" border="0" alt=""/></a>
</p>


The default value for this mapping is:

```
{"Male" : "M", "Female" : "F", "Other" : "O"}
```

The first value is your full gender name, the second is the code you put in your actor note tags for that gender.


Once these are in place, the only thing you need to do is add the gender requirements to any classes that need them using the note tag line below:



```
<LMPCC_Requirements>
Gender:M
</LMPCC_Requirements>
```



### Weapon and Armor Requirements
The Weapon and Armor Requirements feature allows you to define a requirement based around equipped gear.  The maximum number of requirements you can create
for one class this way is either 2 weapon requirements and 2 armor requirements or 1 weapon requirement and 3 armor requirements.  To set up a weapon or armor
requirement use one of the following:

```
<LMPCC_Requirements>
Weapon:WeapId
Armor:ArmorId
</LMPCC_Requirements>
```

An important note: Make sure that all of your classes have the ability to use any weapons or armor you would allowed to used as a class requirement.  If you
do not then when you change to the class these requirements are for or change from that class to another the equipment will be removed.  While this does not
prevent the character from changing back to the class now, at some point in a future version it will and may take quite a bit of effort on your part to
correct depending on the number of classes in your game.



### Restriction System
The Restriction System allows you to modify how or when a player can change to/from other classes.  There are two restriction modes: Restriction1 and Restriction2.

Restriction1 mode has the following properties:
- Players can change to any class they have already been
- If the player has a weapon or armor equipped with a Restriction1 attribute, they may change to the classes designated by the restriction tag


Restriction2 mode has the following properties:
- Players may NOT change to any other class than their current class even if they have been that class before.

Restrictions can be placed on weapons, armor, or items.  If the restriction is on an item, they are in effect so long as the item is in the party's inventory.

Examples of these used in other games:
Restriction1 is similar to the Asterisk system in Bravely Default where you cannot change to a class until you obtain the Asterisk item for that class.

Restriction2 is similar to a cursed weapon that prevents you from changing classes.  You can set it up so that these are not unequippable by normal means like Golden Sun.



To create a restriction all you need to do is add an extra attribute to the weapon/armor requirement:

```
<LMPCC_Settings>
Restriction1:ClassID
Restriction2
</LMPCC_Settings>
```

Again, please note that you can have at maximum one to two weapon restrictions/requirements and 2 to 3 armor restrictions/requirements per class but also you can only have
the same number of weapons/armor equipped to the character which have different class restrictions.  This means one character can have access to at maximum 4 restricted
classes at any one time until they change to those restricted classes.  At present, the weapons or armor are NOT required to change back to these restricted classes but
in the future a plugin command/parameter to enable such a feature may be added.



### Bypass System
The Bypass System allows you to define weapons, armor, or items that will allow the player to change to a designated class WITHOUT meeting the requirements for that class.  There is also an optional plugin setting to re-enable the cost system requirement on bypass.

To defined a bypass, add the following line to a weapon, armor, or item note tag:

```
<LMPCC_Settings>
Bypass:ClassID
</LMPCC_Settings>
```

An important note to mention is that once a character has changed to a class using this feature, the character will always be able to change to that class even when the bypass condition is no longer in effect on the character (Armor/Weapons were unequipped or the item was sold).



### Classes with no requirements
If you wish to create a class without any requirements, just leave the note box for that class blank.  In the future you may be required to change this to an empty Requirements tag such
as the following:

```
<LMPCC_Requirements>
</LMPCC_Requirements>
```




## Plugin Settings
Version 2 has a number of new settings and many of the old ones were overhauled.  Here is a comprehensive list of what these settings are and what they do.


### System Settings
These are settings that alter the operation of the plugin or are responsible for the proper functioning of the plugin.

- Is LMPGames_AWP Installed - If you are using the AWP, turn this on.  If you do not, you will have issues with weapon requirements.  If you don't use the AWP plugin, leave this turned off.

- Enable Currency Cost - Turns on the Currency Cost System.  If this is turned on, all classes MUST have a CurrencyFormula note tag attribute.  See the Note Tag section for more information.  In addition, if you wish to show an icon with the currency cost, be sure to set the Currency Icon setting.

- Enable Item Cost - Turns on the Item Cost System.  If this is turned on, all classes MUST have an ItemFormula note tag attribute.  Additionally, you will need to set the Cost Item ID setting if your cost item is not Item 1 in your database.

- Enable Gender Requirements - Turns on gender requirements for classes.  See Gender Requirements Feature section for more informaiton.

- Enable Existing Class Requirement Bypass - Turn on to allow players to change to classes they have been without meeting requirements.

- Use Class Description - Turn on to enable support for Desc note tag attribute to add descriptions to classes.

- Show Extended Parameters - Turn on to show ExParams and SpParams in Class Information window.

- Only Show Non-Zero Parameters - Turn on to hide all parameters with a value of 0.

- Enable Element Trait Icons - Turn on to show element icons in Class Information window.  Make sure you set up Element Trait Icon Mapping for your game.

- Use Aliases - Turn on to enable support afor the Alias note tag attribute to shorten long class names in the plugin windows.

- Use Cost on Bypass - Turn on to re-enable cost requirements when either of the cost systems are turned on when changing to a class using the Bypass Feature.  See the Bypass Feature section for more information.

- Element Resist Display Mode - Setting 1 shows elemental resistances and weaknesses combined.  Setting 2 shows elemental resistances and weaknesses separated.

<p align="center">
  Mode 1<br><img src="https://www.lmpgames.com/imgs/pbimgs/LMPCC_El1.png" border="0" alt=""/></a>
</p>

<p align="center"> 
  Mode 2<br/><img src="https://www.lmpgames.com/imgs/pbimgs/LMPCC_El2.png" border="0" alt=""/></a>
</p>



- Currency Icon ID - Set this to display an icon with currency in the currency and cost windows.  Set to 0 to disable this feature.  Only applies with Currency Cost System is enabled.

- Gender Mapping - This is a mapping connecting gender codes used in the note tags for actors and classes to their actual names.  If you add or change the genders used, be sure to update this setting.

- Element Trait Icon Mapping - This setting connects icons to elements to display them with weaknesses and resistances.  If you turn on the Enable Elemental Trait Icons setting, be sure this setting has the appropriate icon ids.

- Ignore Skill List - This setting defined the skills that should be ignored when showing class skills in the Class Information window.




### Font Settings
These setting groups handle how things are displayed within the plugin


### Font Color Settings
These settings allow you to customize the colors used in various windows.

- Cost Requirement Pass Color - Sets the color of the text when the player meets an item or currency cost requirement.
- Cost Requirement Fail Color - Sets the color of the text when the player doesn't meet an item or currency cost requirement.
- Class Requirement Pass Text Code - The text code value for the color of the text when the player meets a class requirement.
- Class Requirement Fail Text Code - The text code value for the color of the text when the player fails to meet a class requirement.
- Class List Can Change Color - Sets the color of the text in the Class List window when a player can change to a class.
- Class List Cannot Change Color - Sets the color of the text in the Class List window when a player cannot change to a class.
- Default Class List Color - Sets the default color of the text in the Class List window.  Used for classes the player has already changed to.



### Font Size Settings
These settings allow you to control the font size in various windows.

- Class List Font size - Sets the font size for the Class List window.
- Actor Class Content Font Size - Sets the font size for the list of classes in the Actor Class List window.
- Actor Class Header Font Size - Sets the font size for the header of the Actor Class List window.
- Class Requirements Heading Font Size - Sets the font size for the header of the Class Requirements window.
- Class Requirements Group Heading Font Size - Sets the font size for each data group's header in the Class Requirements window.
- Class Requirements Content Font Size - Sets the font size for the list items in the Class Requirements window.
- Class Information Heading Font Size - Sets the font size for the header of Class Information window.
- Class Information Group Heading Font Size - Sets the font size for the group headers in the Class Information window.
- Class Information Sub-Group Heading Font Size - Sets the font size for the subgroup headers in the Class Information window.
- Class Information Item Font Size - Sets the font size for list items in the Class Information window.




### Text Settings
These settings control text settings in various windows.


### Text Position Settings
These settings change the x-position of text within various windows

- Actor Class List Heading Position - Sets the x position of the Actor Class List window header.
- Actor Class List Item Position - Sets the x position of the Actor Class List window list items.
- Class Requirements Heading Position - Sets the x position of the Class Requirement window header.
- Class Requirements Group Heading Position - Sets the x position of the Class Requirement window group headers.
- Class Requirements Item Position - Sets the x position of the Class Requirement window list items.
- Class Information Group Heading Position - Sets the x position of the group headings in the Class Information window
- Class Information Sub-Group Heading Position - Sets the x position of the sub group headings in the Class Information window.
- Class Information Item Position - Sets the x position for list items in the Class Information window.
- Class Information Sub-Item Position - Sets the x position for the list items in the Class Information window.



### Heading Settings
This sets the text for the headers in the Actor Class List and Class Requirements windows

- Actor Classes Header Text
- Class Requirements Header Text




## Plugin Commands
Here are the plugin commands and how they are used

```
LMP.ClassChanger Start
```

Starts the Class Changer scene



```
LMP.ClassChanger Enable/Disable CurrencyCost
```

Allows you to enable or disable the Currency Cost System from in-game.



```
LMP.ClassChanger Enable/Disable ItemCost
```

Allows you to enable or disable the Item Cost System from in-game.



```
LMP.ClassChanger ChangeCostItemID ItemID
```

Replace ItemID with the item id from the database.  Allows you to change the cost item id for the Currency Cost System from in-game.



```
LMP.ClassChanger Enable/Disable GenderRequirements
```

Allows you to enable or disable the Gender Requirements System from in-game.



```
LMP.ClassChanger Enable/Disable ExistingClassBypass
```

Allows you to enable or disable the Existing Class Requirements Bypass feature from in-game.  See the Plugin Settings section for more information.



```
LMP.ClassChanger Enable/Disable UseCostOnBypass
```

Allows you to enable or disable the User Cost on Bypass feature from in-game.  See the Plugin Settings section for more information.




## Note Tags
There are three note tags used across several database objects.


### Class Note Tag
Example:

```
<LMPCC_Requirements>
Class:1:60
Class:6:45
Class:13:35
Class:12:25
Weapon:5
Armor:5
Desc:A Hero that has fallen into darkness.  They equipped the flame helm to try and light their way.  They also no longer have any hair.
CurrencyFormula:(avgClassLevels + (10 * 4) / 1.25)
ItemFormula:((avgClassLevels + (10 * 4) / 1.25) / 10)
Alias:S. F. Knight
</LMPCC_Requirements>
```

Class:ID:Level
Weapon:WeaponID
Armor:ArmorID
Acc:ArmorID - This is for an accessory requirement
Item:ItemID
Gender:GenderCode
Desc:Text
CurrencyFormula:Formula - Must include avgClassLevels
ItemFormula:Formula - Must include avgClassLevels
Alias:Text



### Actor Note Tag
Example:

```
<LMPCC_Gender>
Gender:M
</LMPCC_Gender>
```

Gender:GenderCode



### Item/Weapon/Actor Note Tag
Example:

```
<LMPCC_Settings>
Restriction1:14
Restriction1:17
</LMPCC_Settings>
```

Restriction1:ClassID
Restriction2 - Just this, see Restriction 2 feature description for more information
Bypass:ClassID




## Planned Features/Changes
-No new features at the moment

Planned Future Changes:
- None at this time




## Existing Bugs
There are two bugs that exist in this build to be wary of, both stem from the same problem.  When clikcking in the class list on the left side of the class changer scene, you can sometimes unsync the selected row from where the plugin thinks you are causing the list to change prematurely to another page if you have a lot of classes.

Selecting a class then cancelling from the "Change Class" command window will also have a similar effect.

A fix is in the works.




## Conflicts
Right know there are no known conflicts however YanFly's Equipment Core plugin may conflict if you create custom eqipment slots.  This plugin has not yet been tested with YEP_EquipCore so use these together at your own risk.  If you do run into issues, please let us know by creating an issue above in the Issues tab and a compatibility patch or fix will be investigated.




## Version Changelogs
- Version 2.0 Changelog:
  - Complete recode of the plugin
  - Performance enhancements
  - Implementation of scrolling windows for several windows
  - Implementation of customization features
  - Fixed several bugs around Weapon/Armor/Item Restriction systems
  - Fixed seveal bugs around gender requirements
  - Fixed several bugs related to cost systems not properly functioning
  - Cleaned up the demo
  - Added in Mr. Demon
  - Added in small story notes
  - Added several new plugin settings
  - Added over 20 new plugin settings
  - Reworked existing plugin settings
  - Fixed several issues with plugin commands
  - Restructured function alias and plugin command names for more uniqueness

- Version 1.3.8 Changelog:
  - Fixed a small bug that was preventing non-mouse users from using the plugin. (omeg)
  - Fixed the project file link and updated demo.

- Version 1.3.1 Changelog:
  - Removed usage of RegExp.$1-9 and replaced with exec() function.
  
- Version 1.3.0 Changelog:
  - Added new feature to allow the use of items as requirements for class changing
  - Added new feature to allow equipped weapons and/or armor as requirements for class changing
  - Added new sub-feature to allow restricting class changing based on equipped weapon/armor
  - Added new sub-feature to allow equipped weapons/armor to bypass other requirements.  This feature will be extended to item requirements in the future.

- Version 1.2.0 Changelog:
  - Added new feature to allow a cost in gold to be applied and required when changing classes.  Also included plugin command to turn this system on or off.
  - Added new feature to allow a cost in a set item to be applied and required when changing classes.  Also included plugin commands to turn this system on or off and to change the required item.
  - Added a new feature to color code the full class list depending on if the player can change to that class or not.  Only considers the class requirements.  Plugin parameters added to change the colors.
  - Fixed a bug which resulted in sometimes not being able to change to an class that has been activated before right after changing to a new class.

- Version 1.1.2 Changelog:
  - Fixed a bug that was causing exceptions to be thrown when viewing the last class
  - Fixed a bug which caused the requirements from the previous class in the class list to show up as the requirements for the current class.
  - Fixed a bug where you were not allowed to change to certain classes due to an issue revealed by fixing the previous bug.?

- Version 1.1.0 Changelog:
  - Fixed issue where changing between classes was not setting skills in some circumstances.
  - Fixed issue where first Class List item was blank and the last class in the database was not loaded.?

- Version 1.0.0 Changelog:
  - Initial version of plugin uploaded?
