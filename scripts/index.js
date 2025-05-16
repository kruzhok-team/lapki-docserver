function getFileName(decodedURI) {
  const filename = decodedURI.match(/[^\/]+$/)[0];
  const dotPosition = filename.indexOf(".");
  return filename.slice(0, dotPosition);
}

function getParentName(decodedURI) {
  const root = "/docs/";
  const startPosition = decodedURI.indexOf(root) + root.length;
  const endPosition = decodedURI.lastIndexOf("/");
  if (endPosition === startPosition) return "";
  const parentName = decodedURI.slice(startPosition, endPosition);
  return parentName.replaceAll("/", " → ");
}

function parentNameDisplay(parentName, id = "parentName") {
  document.getElementById(id).innerHTML = `
  <span class="badge text-wrap text-bg-primary mt-3">${parentName}</span>
  `;
}

function titleDisplay(title, id = "title") {
  document.getElementById(id).innerText = title;
}

function headerDisplay(header, id = "header") {
  document.getElementById(id).innerHTML = `
  <h1 class="display-6 mt-3">${header}</h1>
  `;
}

function autoNumeration() {
  const baseURI = new URL(document.baseURI);
  const URI = baseURI.pathname;
  const decodedURI = decodeURI(URI);
  const fileName = getFileName(decodedURI);
  const parentName = getParentName(decodedURI);
  titleDisplay(fileName);
  headerDisplay(fileName);
  parentNameDisplay(parentName);
}

function loadContent(url, target) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      target.innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

function injectHTML(id = "inject-me") {
  const elementsToInject = document.querySelectorAll(`[${id}]`);
  elementsToInject.forEach((element) => {
    const url = element.getAttribute(id);
    loadContent(url, element);
  });
}
