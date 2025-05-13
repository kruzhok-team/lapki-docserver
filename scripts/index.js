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

function autoNumeration(URI) {
  const decodedURI = decodeURI(URI);
  const fileName = getFileName(decodedURI);
  const parentName = getParentName(decodedURI);
  titleDisplay(fileName);
  headerDisplay(fileName);
  parentNameDisplay(parentName);
}
