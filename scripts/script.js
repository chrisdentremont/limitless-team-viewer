let viewButton = document.createElement("button");
viewButton.setAttribute("id", "viewTeamButton");
viewButton.addEventListener("click", viewTeamSheet);
viewButton.textContent = "Export to PokePaste";
viewButton.style.marginLeft = "10px";

checkToAddButton();

const interval = setInterval(checkToAddButton, 500);

function checkToAddButton() {
  let teamlistDiv = document.querySelector(".teamlist");
  let buttonDiv = document.querySelector(".buttons > .export").parentElement;
  let viewButtonTest = document.querySelector("#viewTeamButton");

  //Only run if the button hasn't already been added
  if (teamlistDiv != null && viewButtonTest == null) {
    buttonDiv.appendChild(viewButton);
  }
}

function viewTeamSheet() {
  let pasteText = "";
  let teamlistDivChildren =
    document.querySelector(".teamlist-pokemon").childNodes;

  teamlistDivChildren.forEach((child) => {
    let currentMonText = "";
    let pokemonInfo = [...child.childNodes];

    let pokemonNameDiv = pokemonInfo.find((ele) => ele.className == "name");
    let pokemonName = [...pokemonNameDiv.childNodes].find(
      (ele) => ele.nodeName == "SPAN"
    );

    let pokemonDetailsDiv = pokemonInfo.find(
      (ele) => ele.className == "details"
    );
    let pokemonDetailsDivChildren = [...pokemonDetailsDiv.childNodes];

    let pokemonAttacksDiv = pokemonInfo.find(
      (ele) => ele.className == "attacks"
    );

    if (
      pokemonInfo == null ||
      pokemonNameDiv == null ||
      pokemonDetailsDiv == null ||
      pokemonAttacksDiv == null
    ) {
      alert(
        "Something went wrong when trying to collect the teamlist information. Exported paste might be malformed."
      );
    } else {
      //Name
      let monName = checkForSpecialName(
        pokemonName.innerText,
        pokemonDetailsDivChildren
      );
      currentMonText += monName;

      //Item
      let pokemonDetailsItem = pokemonDetailsDivChildren.find(
        (ele) => ele.className == "item"
      ).textContent;
      currentMonText += " @ " + pokemonDetailsItem;

      //Ability
      let pokemonDetailsAbility = pokemonDetailsDivChildren.find(
        (ele) => ele.className == "ability"
      ).textContent;
      currentMonText += "%0D%0A" + pokemonDetailsAbility;

      //Tera
      let pokemonDetailsTera = pokemonDetailsDivChildren.find(
        (ele) => ele.className == "tera"
      ).textContent;
      currentMonText += "%0D%0A" + pokemonDetailsTera;

      currentMonText += "%0D%0A";

      //Attacks
      pokemonAttacksDiv.childNodes.forEach((move) => {
        currentMonText += move.innerText + "%0D%0A";
      });

      pasteText += currentMonText + "%0D%0A";
    }
  });

  //Get opponent's name
  let playerNameDiv = document.querySelector(".opponent > .player > .name");
  let titleText = null;
  if (playerNameDiv != null) {
    titleText = playerNameDiv.textContent + "'s Limitless Teamlist";
  } else {
    playerNameDiv = document.querySelector(".infobox > .heading");
    if (playerNameDiv != null) {
      titleText = playerNameDiv.textContent + "'s Limitless Teamlist";
    } else {
      titleText = "Limitless Teamlist";
    }
  }

  window
    .open(
      "https://pokepast.es/create?paste=" +
        pasteText +
        "&title=" +
        titleText +
        "&notes=This team was exported from a Limitless Teamlist.",
      "_blank"
    )
    .focus();
}

/**
 * Converts Limitless Pokemon names to a PokePaste-friendly format,
 * since Limitless wants to name their Pokemon differently.
 *
 * @param {*} name The Pokemon name to check for special cases.
 * @param {*} items The div containing item information. This should already be set.
 * @returns The newly formatted name, or the same name if no special cases were found.
 */
function checkForSpecialName(name, items) {
  //Indeedee-F
  if (name.includes(" ♀")) {
    name = name.replaceAll(" ♀", "-F");
  }

  //Ogerpons
  if (name.includes("Ogerpon")) {
    let ogerponItem = items.find((ele) => ele.className == "item").textContent;

    if (ogerponItem.includes("Wellspring")) {
      name = "Ogerpon-Wellspring";
    } else if (
      ogerponItem.includes("Hearthflame") ||
      ogerponItem.includes("Heartflame")
    ) {
      name = "Ogerpon-Hearthflame";
    } else if (ogerponItem.includes("Cornerstone")) {
      name = "Ogerpon-Cornerstone";
    }
  }

  //Rapid Strike Urshifu
  if (name == "Rapid Strike Urshifu") {
    name = "Urshifu-Rapid-Strike";
  }

  //Bloodmoon Ursaluna
  if (name == "Bloodmoon Ursaluna") {
    name = "Ursaluna-Bloodmoon";
  }

  //Therian Genies
  if (name == "Landorus Therian") {
    name = "Landorus-Therian";
  }
  if (name == "Tornadus Therian") {
    name = "Tornadus-Therian";
  }
  if (name == "Thundurus Therian") {
    name = "Thundurus-Therian";
  }
  if (name == "Enamorus Therian") {
    name = "Enamorus-Therian";
  }

  //Hisuian Pokemon
  if (name.includes("Hisuian")) {
    name = name.replace("Hisuian ", "");
    name += "-Hisui";
  }

  //Alolan Pokemon
  if (name.includes("Alolan")) {
    name = name.replace("Alolan ", "");
    name += "-Alola";
  }

  //Galarian Pokemon
  if (name.includes("Galarian")) {
    name = name.replace("Galarian ", "");
    name += "-Galar";
  }

  return name;
}
