// VERSION*/
// B&B - Engine.DSa.1.0
//

// UI Elements / Globals
var cardData;
var cardlist = null;     // <-- global so card-script.js can read it
var selecteddeck;

function opendeckselector() {
  document.getElementById("myForm").style.display = "block";
  document.getElementById("deckselectoropen").style.display = "none";
}

function closedeckselector() {
  document.getElementById("myForm").style.display = "none";
  document.getElementById("deckselectoropen").style.display = "block";
}

function updatedeck(choice) {
  deck = choice;
  if (localStorage.getItem("deckKey") === null) {
    console.log("first time?");
    localStorage.setItem("deckKey", "CoreV22");
  }
  localStorage.setItem("deckKey", deck);

  // If we are loading the same deck, we don't need to reload
  if (choice != localStorage.getItem("deckKey"))
    loaddeck();
}

// DECK LOADER
async function loaddeck() {

  selecteddeck = localStorage.getItem("deckKey");
  // if it is null, first visit: default to CoreV3
  if (selecteddeck === null) {
    selecteddeck = 'CoreV3';
  }

  // Map selected deck -> JSON path (assign to GLOBAL cardlist)
  if (selecteddeck == 'CoreV1')             cardlist = 'decks/CoreV1/carddb.json';
  if (selecteddeck == 'CoreV3')             cardlist = 'decks/CoreV3/carddb.json';
  if (selecteddeck == 'DataDog')            cardlist = 'decks/DataDog/carddb.json';
  if (selecteddeck == 'Expansion1-2')       cardlist = 'decks/CoreV2.2-Expansion/carddb.json';
  if (selecteddeck == 'ICSOT')              cardlist = 'decks/ICS-OT/carddb.json';
  if (selecteddeck == 'CoreV22')            cardlist = 'decks/CoreV2.2/carddb.json';
  if (selecteddeck == 'Huntress')           cardlist = 'decks/Huntress/carddb.json';
  if (selecteddeck == 'Cloud Security')     cardlist = 'decks/CloudSecurity/carddb.json';
  if (selecteddeck == 'Red Canary')         cardlist = 'decks/RedCanary/carddb.json';
  if (selecteddeck == 'Spanish 1.0')        cardlist = 'decks/CoreV2.2_Spanish/carddb.json';
  if (selecteddeck == 'DenSecure')          cardlist = 'decks/DenSecure/carddb.json';
  if (selecteddeck == 'Trimarc')            cardlist = 'decks/Trimarc/carddb.json';
  if (selecteddeck == 'Everything Deck')    cardlist = 'decks/EverythingDeck/carddb.json';

  try {
    let result = $.getJSON(cardlist, function (h) {
      // Scenario images
      $(a).html("<img class='full' src='" + h.red + "'>");
      $(b).html("<img class='full' src='" + h.yellow + "'>");
      $(c).html("<img class='full' src='" + h.brown + "'>");
      $(d).html("<img class='full' src='" + h.purple + "'>");

      $(inita).html("<img src='" + h.red + "'>");
      $(initb).html("<img src='" + h.yellow + "'>");
      $(initc).html("<img src='" + h.brown + "'>");
      $(initd).html("<img src='" + h.purple + "'>");

      // Inject image
      $(e).html("<img style='width:200px;' src='" + h.grey + "'>");

      // Consultant image
      $(f).html('<img style="width:200px;" src="' + h.green + '">');

      // Attribution / logos (original)
      $(copyright).html(
        "<a target='_blank' href='https://www.blackhillsinfosec.com/projects/backdoorsandbreaches'><div id='bb'></div></a>" +
        "<a target='_blank' href='https://www.blackhillsinfosec.com/'><div id='bh'></div></a>" +
        "<a target='_blank' href='" + h.link + "'><div class='sponsor' style=' background-image: url(" + h.logo + ");'></div></a>"
      );

      // Append Check Point logo (expects PNG in App/ folder)
      $(copyright).append(
        "<a target='_blank' href='https://www.checkpoint.com'>" +
          "<div class='sponsor' style='background-image: url(Check-Point-logo-color.png);'></div>" +
        "</a>"
      );

      // Cache JSON for the rest of the engine (and the filter)
      cardData = h;
    });
    await result;
  } catch (error) {
    console.log(error);
  }
}

async function initDeck() {
  await loaddeck();
  initCardList();
  rando();

  // After the deck renders, refresh the (optional) Procedure Filter
  if (window.__procFilter) {
    if (window.__procFilter.loadForDeck) window.__procFilter.loadForDeck(); // session-only per-deck memory (optional)
    if (window.__procFilter.rebuild) window.__procFilter.rebuild();         // rebuild checklist for the new deck
    if (window.__procFilter.apply) setTimeout(() => window.__procFilter.apply(), 0); // apply after DOM paints
  }
}
