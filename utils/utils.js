const reservedWords = [
  "login",
  "register",
  "graphql",
  "gapi",
  "media",
  "webrtc",
  "dashboarduser",
  "dashboardproject"
];

export const alphaBool = flag => {
  return flag === true ? "true" : "false";
};

export const getFileName = pathname => {
  const firstSplit = pathname.split("\\");
  if (firstSplit.length) {
    const fname = firstSplit.pop();
    const secondSplit = fname.split("/");
    if (secondSplit.length) {
      return secondSplit.pop();
    }
  }

  return pathname;
};

export const getFileNameOnlyNoExt = pathname => {
  let ret = getFileName(pathname);
  return ret.substring(0, ret.lastIndexOf(".")) || ret;
};

export const getFileNameExt = filename => {
  return filename.split('.').pop().toLowerCase();
};

// This function will remove the possible / prefix on a path and convert it to lower case
// It's going to useful to things like getting a string ID from a URL params
export const sanitizePathRoot = name => {
  let ret = name[0] === "/" ? name.slice(1) : name;
  ret = ret.toLowerCase();
  return ret;
};

export const sanitizeAvoidReservedWords = words => {
  return reservedWords.includes(sanitizePathRoot(words)) ? "" : words;
};

export const sanitizeURLParams = urlParams => {
  const regex = /[{}\s|\\//]/;
  return regex.exec(urlParams) !== null ? null : urlParams;
};

export const isReservedWord = words => {
  return reservedWords.includes(words.toLowerCase());
};

export const isReservedWordSanitized = words => {
  return reservedWords.includes(sanitizePathRoot(words));
};

export const arrayExistsNotEmpty = data => {
  return data && data.length > 0;
};

export const arrayObjectExistsNotEmpty = data => {
  return data && Object.keys(data).length > 0;
};

export const arrayExistsNotEmptyOn = (obj, arrayName) => {
  return obj && obj[arrayName] && obj[arrayName].length > 0;
};

export const arrayExistsNotEmptyOnObject = (obj, arrayName) => {
  return obj && obj[arrayName] && Object.keys(obj[arrayName]).length > 0;
};

export const objectExistOnWithCallback = (obj, arrayName, callback) => {
  return (obj && obj[arrayName] && callback(obj[arrayName]));
};

// This functions generates a new array with [Key, Value] pairs, K being the actual index of the element into the array.
// Useful when you need to map an array but also need to access the index of that element to get a unique reference
// (IE in a JSX map function we need a unique key, this will be the Key)
export const mapEntries = (source, script) => {
  const ret = [];
  Object.entries(source).forEach( ([k, v]) => {
      ret.push(script(k,v))
    }
  )
  return ret;
}

export const checkURLValid = (url) => {
  const regex =  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/i;
  return regex.exec(url) !== null;
};

export const checkBoolDefinedAndTrue = (flag) => {
  return flag && flag === true;
};

export const checkAlphaBoolDefinedAndTrue = (flag) => {
  return flag && flag === "true";
};

export const log = (text) => {
  console.log("[Info] " + text);
};

export const logWarning = (text) => {
  console.log("[Warning] " + text);
};

export const logError = (text) => {
  console.trace("[Error] " + text);
};

