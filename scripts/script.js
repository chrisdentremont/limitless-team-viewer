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

    //Name
    let pokemonNameDiv = pokemonInfo.find((ele) => ele.className == "name");
    if (pokemonNameDiv != null) {
      let pokemonName = [...pokemonNameDiv.childNodes].find(
        (ele) => ele.nodeName == "SPAN"
      );
      let monName = pokemonName.innerText;

      //Check for special characters
      if (monName.includes(" ♀")) {
        monName = monName.replaceAll(" ♀", "-F");
      }

      currentMonText += monName;
    }

    //Details
    let pokemonDetailsDiv = pokemonInfo.find(
      (ele) => ele.className == "details"
    );
    if (pokemonDetailsDiv != null) {
      let pokemonDetailsDivChildren = [...pokemonDetailsDiv.childNodes];

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
    }

    currentMonText += "%0D%0A";

    //Attacks
    let pokemonAttacksDiv = pokemonInfo.find(
      (ele) => ele.className == "attacks"
    );
    if (pokemonAttacksDiv != null) {
      pokemonAttacksDiv.childNodes.forEach((move) => {
        currentMonText += move.innerText + "%0D%0A";
      });
    }

    pasteText += currentMonText + "%0D%0A";
  });

  window
    .open(
      "https://pokepast.es/create?paste=" +
        pasteText +
        "&title=Limitless OTS&notes=This team was exported from a Limitless Teamlist.",
      "_blank"
    )
    .focus();
}
