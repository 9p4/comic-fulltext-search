const options = {
  isCaseSensitive: false,
  includeScore: false,
  shouldSort: true,
  includeMatches: false,
  findAllMatches: false,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.6,
  distance: 100,
  useExtendedSearch: false,
  ignoreLocation: false,
  ignoreFieldNorm: false,
  fieldNormWeight: 1,
  keys: [
    "title",
    "alt",
    "comic",
    "bonus"
  ]
};

const fuse = new Fuse(list, options);

function updateSearch() {
  var searchbox = document.getElementById("searchbox");
  var resultsBox = document.getElementById("results");
  resultsBox.innerHTML = "";
  console.log(searchbox.value);
  var fuseResults = fuse.search(searchbox.value);
  var maxlen = Math.min(100, fuseResults.length);
  for (var i = 0; i < maxlen; i++) {
    var fuseResult = fuseResults[i];
    var resultItemLink = document.createElement("a");
    var resultCard = document.createElement("div");
    resultCard.classList.add("box-shadow")
    resultItemLink.appendChild(resultCard);
    resultItemLink.href = "https://smbc-comics.com/comic/" + fuseResult.item.title;
    resultCard.id = "card";
    var resultTitle = document.createElement("h2");
    var resultAlt = document.createElement("h3");
    resultTitle.innerText=fuseResult.item.title;
    resultAlt.innerText=fuseResult.item.alt;
    resultCard.appendChild(resultTitle);
    resultCard.appendChild(resultAlt);
    resultsBox.appendChild(resultItemLink);
  }
}
