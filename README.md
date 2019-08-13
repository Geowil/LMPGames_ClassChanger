# Geowil_ClassChanger
Version: 1.3.8

Demo Available: Yes, [Geowil_ClassChangeDemo.rar](http://www.lmpgames.com/RMMV/Plugins/Geowil_ClassChangeDemo_V1.3.8.zip)

Project File: Yes, [Geowil_ClassChangeDemoProject.rar](http://www.lmpgames.com/downloads/Geowil_ClassChangeDemo_Project_V1.3.8.zip)

Conflicts: Maybe, see [Conflicts](https://github.com/Geowil/Geowil_ClassChanger#conflicts) section

Terms of Use: Free non-commercially or commercially; just give credit


<p align="center"> 
<img src="http://i15.photobucket.com/albums/a367/Geowil/Plugins/class%20changer%20v1.2_zpsi6h55kui.png" border="0" alt=" photo class%20changer%20v1.2_zpsi6h55kui.png"/></a>
</p>

## What is this?
This repository is for an RPG Maker MV JS plugin which allows the developer to create class level based restrictions for allowing
a player to change their classes.  In effect this allows the developer to create a class hierarchy without needing complicated event
scripting by using class note tags.


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
<Requirements>
Class:cId:lvl
</Requirements>
```

Class = Requirement type

cId = ID number of the class

lvl = required level in that class


Finally just add the following plugin command to an event

`StartClassChange`


For more on the usage of this plugin, please see the Current Features section below where each feature is covered in detail


## Current Features
### Class Level Requirements
As described in the last section, the main usage for this plugin is to assign requirements for class changing by using other class's levels.
To continue with the example posed in the last section, here is what the requirement note tag would like for the Captain class:

So to continue the example above using the Captain class tree, here is how the Captain class note box tag would look:

```
<Requirements>
Class:1:45
Class:2:35
Class:3:30
</Requirements>
```


### Gold Cost System
The Gold Cost system is one of two cost systems available for use in this plugin.  It works by taking the combined sum of a character's class levels
and using that sum in a formula to determine how much gold to charge to allow the character to change their class.  The more classes and the higher
the levels of those classes, the more gold it takes to change to a new class.

This system can be controlled in two ways.  First it can be turned on or off from the plugin parameter.  The second way is in-game by using the following
plugin commmand:

```
ClassChanger GoldCost On
```

Use 'Off' instead of 'On' to turn the system off.  The formula which determines the cost can be modified in the plugin parameters.


### Item Cost System
The Item Cost system is the second of the two cost systems.  Like the Gold Cost system, this system allows you to impose a cost on class changing but instead
of using gold this system uses an item which is defined in the plugin parameters.  The formula to determine the number of items to charge is also available
for modification in the plugin paramteres and like the Gold Cost system you can either enable or disable this system from the plugin parameters or use the
following plugin command:

```
ClassChanger ItemCost On
```

Use 'Off' instead of 'On' to disable the system.  There is also another plugin command for this system to change the cost item from in-game:

```
ClassChanger Change Item ItemId

Example: ClassChanger Change Item 1
```

You can have both of these systems, the Gold Cost and Item Cost systems, enabled at the same time.


### Item Requirements
The Item Requirements feature allows you to create a class change requirement based on possession of specific items.  Consider it akin to the Asterisk
system in Bravely Default.  In order to set up an item requirement all you need to do is the following:

```
<Requirements>
Item:ID
</Requirements>
```

That's it.


### Gender Requirements
The Gender Requirements feature allows you to allow changing based on gender of the character.  This feature requires a little extra setup to work.  First,
you must define the genders of any characters which you want to take advantage of this feature.  To do so, add the following tag to the Actor note box:

```
<Requirements>
Gender:M or F
</Requirements>
```

Use this same tag within a class note box to define if that class is a male or female only class.


### Weapon and Armor Requirements
The Weapon and Armor Requirements feature allows you to define a requirement based around equipped gear.  The maximum number of requirements you can create
for one class this way is either 2 weapon requirements and 2 armor requirements or 1 weapon requirement and 3 armor requirements.  To set up a weapon or armor
requirement use one of the following:

```
<Requirements>
Weapon:WeapId
Armor:ArmorId
</Requirements>
```

An important note: Make sure that all of your classes have the ability to use any weapons or armor you would allowed to used as a class requirement.  If you
do not then when you change to the class these requirements are for or change from that class to another the equipment will be removed.  While this does not
prevent the character from changing back to the class now, at some point in a future version it will and may take quite a bit of effort on your part to
correct depending on the number of classes in your game.


### Weapon and Armor Restrictions
The Weapon and Armor Restrictions feature is an advanced feature of the Weapon and Armor Requirements feature.  What this feature does is allow you to restrict
the classes to which a character can change by the following ways:

- Any class that character has been perviously
- Any class that has that weapon or armor as part of a restriction requirement (meaning that one weapon or armor can be used as a restriction for multiple classes)
- Any other class which has a different weapon or armor restriction requirement (meaning any other classes that have weapon/armor requirements with a Restricted attribute)

To create a restriction all you need to do is add an extra attribute to the weapon/armor requirement:

```
<Requirements>
Weapon:WeapId:Restricted
Armor:ArmorId:Restricted
</Requirements>
```

Again, please note that you can have at maximum one to two weapon restrictions/requirements and 2 to 3 armor restrictions/requirements per class but also you can only have
the same number of weapons/armor equipped to the character which have different class restrictions.  This means one character can have access to at maximum 4 restricted
classes at any one time until they change to those restricted classes.  At present, the weapons or armor are NOT required to change back to these restricted classes but
in the future a plugin command/parameter to enable such a feature may be added.


### Weapon and Armor Requirement Replacement
This feature is another advanced feature of the Weapon and Armor Requirements feature.  This feature allows you to define a requirement based on weapon(s) or armor which will
override all existing requirements for that class.  In short, it allows a character who does not meet any of the other requirements to change to that class should the weapon(s)
and/or armor requirements which have the Replace feature defined be equipped.  To use this feature change the weapon or armor requirement tag like so:

```
<Requirements>
Weapon:WeapId:Replace
Armor:ArmorId:Replace
</Requirements>
```

Some important things to consider.  First, the replace tag only removes class level requirements and item requirements.  If there are non-replace weapon/armor requirements or a
gender requirement, these requirements must still be met in order to allow the character to change to the class.  Please consider this when setting up multiple weapon/armor
requirements when using the Replace feature.

Second, once the character has changed to a class using this feature, the character will always be able to change to that class even when the weapon/armor replace requirement
are no longer equipped and the character does not meet the other requirements.

Third, if the weapon/armor that is part of the replace requirement is no equipped, the other requirements for that class need to be met to change to it.  This feature only has
an impact when the weapon/armor is equipped.


### Classes with no requirements
If you wish to create a class without any requirements, just leave the note box for that class blank.  In the future you may be required to change this to an empty Requirements tag such
as the following:

```
<Requirements>
</Requirements>
```


## Planned Features/Changes
-No new features at the moment

Planned Future Changes:

- Implementation of a parameter to control if Replace requirements should allow changing to that class if the weapon/armor is not equipped and the character does not meet the other requirements
- Implementation of a parameter to control is weapons and armor in Restricted requirements are required to return to that class
- Implementation of empty Requirements tag for no-requirement classes instead of an empty note box
- Extending Replace tag attribute to item requirements.


## Conflicts
Right know there are no known conflicts however anything that aliases the following functions may conflict with this plugin:

- DataManager.isDatabaseLoaded
- Game_Interpreter.prototype.pluginCommand
- Game_Actor.prototype.initialize
- Game_Actor.prototype.initMembers
- Game_Actor.prototype.refresh

If you use another plugin which has note tags for classes or actors but does not handle tags which are not apart of that plugin, this plugin will cause problems.  The same is true for
other plugins which use the class note box in relation to classes which you want no requirements for.  Currently the code for this plugin looks for an empty note box to define a
requirement-less class.  This will change in the future to mitigate this risk.


## Version Changelogs
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
