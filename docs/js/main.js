const options = {
  isCaseSensitive: false,
  includeScore: true,
  shouldSort: true,
  includeMatches: false,
  findAllMatches: true,
  minMatchCharLength: 2,
  matchAllTokens: false,
  location: 0,
  threshold: 0.6,
  distance: 100,
  useExtendedSearch: true,
  ignoreLocation: true,
  ignoreFieldNorm: false,
  fieldNormWeight: 1,
  keys: [
    {name: "title", weight: 0.1},
    {name: "text", weight: 0.8},
    {name: "bonusText", weight: 0.2}
  ]
};

const fuse = new Fuse(list, options);

var prevsearch = '';

function updateSearchKeyboard(event) {
  if (event.keyCode == 13) {
    updateSearch();
  }
}

function updateSearch() {
  var searchbox = document.getElementById("searchbox");
  var resultsBox = document.getElementById("results");
  document.getElementById("advanced-checkbox").checked = false;
  if (searchbox.value.len < 3) {
    return
  }
  if (searchbox.value == prevsearch) {
    return;
  } else {
    prevsearch = searchbox.value;
  }
  console.log(searchbox.value);
  var fuseResults = fuse.search(searchbox.value);
  var maxlen = Math.min(10, fuseResults.length);
  resultsBox.innerHTML = "";
  for (var i = 0; i < maxlen; i++) {
    var fuseResult = fuseResults[i];
    var resultCard = document.createElement("div");
    var score = document.createElement("p");
    score.innerText = "Score: ".concat("", (1-fuseResult.score))
    var resultLink = document.createElement("a")
    resultLink.href = fuseResult.item.url;
    var image = document.createElement("img");
    image.src = fuseResult.item.imageURL;
    resultCard.classList.add("box-shadow");
    resultCard.id = "card";
    var resultTitle = document.createElement("h2");
    resultTitle.innerText=fuseResult.item.title;
    resultCard.appendChild(resultTitle);
    resultCard.appendChild(score);
    resultCard.appendChild(image);
    resultLink.appendChild(resultCard);
    resultsBox.appendChild(resultLink);
  }
}
