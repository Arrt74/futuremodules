const reservedWords = [
  "login",
  "register",
  "graphql",
  "gapi",
  "dashboarduser"
]

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
  return reservedWords.includes(words.toLowerCase()) ? "" : words;
};
