# Use this guide to add new and/or custom decklists. 
- Applies to Engine-V1
- Prerequisites:  This process assumes you have the following...
  - Card Image Files (typically in PNG, at a 3.5x2.5 ratio)
  - Card MetaData (some cards have links and notes)
  - Comfort editingJSON +  HTML + JavaScript

# Basics
Hello! If you are reading this guide, that means you are trying to add in a custom deck. Well, a bit has changed since the original tool.  Firstly, there are no longer multiple different folders for different versions of the game.  Every up to date game is played in the play.backdoorsandbreaches.com-Engine-V1 folder.  The expansion folder is old, and if you see it still, then it is just there because nobody has gotten around to removing it.  

The general structure of the engine is as follows:
  -index.html - the Landing page that allows players to visually select the deck they wish to play.
  -App folder
    -index.html - main game page.  This is where the entire game is played
    -img folder - used to hold special images
    -decks folder - used to hold the decks
    -source folder - don't touch that, it is not important for you to know what lies in that wretched place...

# Folder Structure
- At the moment, decks are isolated into the directory: `<root>/App/decks/<deckfolder>/`
- Within this folder, we add the RAW card files (e.g. `BNB_CARDS_CE-1.png`); the production numbering scheme is your preference, but it is easier to keep track of them if they are consecutive in nature.

# Create the carddb.json file
- Clone or create a carddb.json file that follows the template provided at `<root>/App/decks/carddb-template.json`
- Take note of the special key-value pairs that are used throughout the application:
```
{
  "title": "DECK NAME",
  "revdate": "08-01-2021",
  "link": "",
  "data": [
    {
      "name": "CARDNAME",
      "image": "decks/DECKNAME/CARDFILE.png",
      "type": "initial",
      "id": "001",
      "details": "<li><a target=\"_blank\" href=\"URL\"></a></li>"
    }
  ],
  "red": "img/bb-back-init.png",
  "yellow": "img/bb-back-pivot.png",
  "brown": "img/bb-back-c2.png",
  "purple": "img/bb-back-persist.png",
  "grey":   "img/bb-back-inject.png",
  "green":  "",  <--------- NOTE: Green is consultant. Make sure to include an image here, or the back of the card won't show
  "logo":   "",
  "addOnEnabled":   "true"
}
```
- NOTE: the `type` attribute, the following values are accepted here: `initial`,`pivot`,`persist`,`c2`,`procedure`,`consultant`,`inject`; these are used by the UI builder and card scripts to create the randomized pools which the random and draw functions operate. Engine-V1 now will scan for consultants and handle accordingly.
- NOTE: the `details` attribute must be VALID JSON, so things like double-quotes must be properly escaped. This is used by the light-box plugin to create links for cards when they are in "lighbox mode"--- it is relatively forgiving re: HTML, but try not to put anything too complicated here-- links `<a>` and lists `<li>`
- NOTE: `link` and `logo` are used to attribute any partner or sponsors involved with the creation of the deck edition. This will be used to create a banner at the bottom of the application when the deck is chosen.
- NOTE: `addOnEnabled` is used if there are codes that require the functionality of the add on scenario.  Either remove the value or change the value to "false" or anything else that is not true or True in order to disable the add-on scenario tools for the deck.

# Add Deck to UI:
To add a deck to the UI, once the carddb.json has been created:
- Modify `<root>/App/index.html/`:
- Look for a form element with `id="myForm` (usually at the top)
```
<div class="form-popup" id="myForm">
        <form class="form-container" onsubmit="updatedeck(deck.value);">
            Available Decks: <br>
            <input type="radio" id="corev1" name="deck" value="CoreV1" ><label for="corev1">CoreV1</label><br>
            <input type="radio" id="corev21" name="deck" value="CoreV21" ><label for="corev21">CoreV2.1</label><br>
            <input type="radio" id="icsotV1" name="deck" value="ICSOT" ><label for="icsotV1">ICS/OTv1</label><br>
            <br>
        <button type="submit" class="btn" >Submit</button>
        <button type="button" class="btn cancel" onclick="closedeckselector()">Close Deck Selector</button>
        </form>
</div>
```
- Add a line similar to: `<input type="radio" id="mydeck-id" name="deck" value="MYDECK-VALUE" ><label for="mydeck-ID">MY DECK NAME</label><br>`
- Replace "MYDECK", "mydeck-id", etc. with your deck.

As you can see, the form launches the `updatedeck()` function, so next, we must add our deck to this list.

# Add Deck to UPDATE function:
- Modify `<root>/App/deck-script.html/`
- NOTE: The secret here is `updatedeck()` takes the chosen deck from the HTML form and stores the value as a local (browser) variable, then calls the `loaddeck()` function to select the appropriate carddb.json file. 
- Look for the `loaddeck()` function (should be at the bottom)
- Look for a series of switch statements like so:
```
    if (selecteddeck == 'CoreV1'){
        cardlist = 'decks/CoreV1/carddb.json'
        }
    if (selecteddeck == 'CoreV21'){
        cardlist = 'decks/CoreV2.1/carddb.json'
        }
    if (selecteddeck == 'ICSOT'){
        cardlist = 'decks/ICS-OT/carddb.json'
        }
```
- Add your own switch akin to:
```
if (selecteddeck == 'MYDECK-VALUE'){
        cardlist = 'decks/DECKNAME/carddb.json'
        }
```

And that's it...