# Geowil_ClassChanger
Version: 1.2.1

Demo Available: Yes, [Geowil_ClassChangeDemo.rar](http://lmpgames.com/RMMV/Plugins/Geowil_ClassChangeDemo.rar)

Conflicts: Maybe, see [Conflicts](https://github.com/Geowil/Geowil_ClassChanger#conflicts) section

Terms of Use: Free non-commercially or commercially; just give credit

<p align="center"> 
<img src="http://i15.photobucket.com/albums/a367/Geowil/Plugins/geowil_classchanger10_zpswmwaqsvf.png" border="0" alt=" photo geowil_classchanger10_zpswmwaqsvf.png"/></a>
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

<Requirements>
cId:lvl
</Requirements>

cId = ID number of the class
lvl = required level in that class

So to continue the example above using the Captain class tree, here is how the Captain class note box tag would look:

```
<Requirements>
1:45
2:35
3:30
</Requirements>
```

Finally just add the following plugin command to an event

`StartClassChange`



## Current Features
- Allows adding requirements to change classes through use of note tags.
- Will remove all skills from the character at the point of changing classes and assign the skills from the changed to class that the character is eligible to receive.
- Keeps track of each characters used classes and their levels with those classes and then displays that information within the scene for easy reference.
- Class requirements are color coded and changeable through parameters so that you can change the color code however you like. By default, character classes that meet a requirement are green and those that do not are red.
- Freely change between classes. Using existing functionality in MV along with some added bits to retain levels, exp, and removal of prior class skills.


## Planned Features
- Optional feature to enable a cost in gold to change to a class
- Optional feature to enable a cost in item(s) to change to a class (can be enabled at the same time as the gold cost option)
- Optional feature to restrict classes to genders
- Optional feature to create non-level based requirements and allow a requirement to be made using either an item or equipment.
- Supporting classes that do not have any requirements (this might already work but I have not tested this use case)
- Color coding the complete class list to show players what classes their character is eligible to change to without having to select that class to view the requirements.


## Conflicts
Right know there are no known conflicts however anything that aliases the following functions may conflict with this plugin:

- DataManager.isDatabaseLoaded
- Game_Interpreter.prototype.pluginCommand
- Game_Actor.prototype.initialize
- Game_Actor.prototype.initMembers
- Game_Actor.prototype.refresh


## Version Changelogs
- Version 1.1.2 Changelog:
  - Fixed a bug that was causing exceptions to be thrown when viewing the last class
  - Fixed a bug which caused the requirements from the previous class in the class list to show up as the requirements for the current class.
  - Fixed a bug where you were not allowed to change to certain classes due to an issue revealed by fixing the previous bug.?

- Version 1.1.0 Changelog:
  - Fixed issue where changing between classes was not setting skills in some circumstances.
  - Fixed issue where first Class List item was blank and the last class in the database was not loaded.?

- Version 1.0.0 Changelog:
  - Initial version of plugin uploaded?
