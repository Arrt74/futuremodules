export const GroupGeom = "geom";
export const GroupMaterial = "material";
export const GroupImage = "image";
export const GroupProfile = "profile";
export const GroupScript = "script";
export const GroupFont = "font";
export const GroupUI = "ui";

export const checkCommonFileExtension = (group, ext) => {
  if (group === GroupGeom) {
    if (ext === "zip" || ext === "glb" || ext === "fbx") return true;
  } else if (group === GroupMaterial) {
    if (ext === "zip" || ext === "sbsar") return true;
  } else if (group === GroupImage) {
    if (
      ext === "jpeg" ||
      ext === "png" ||
      ext === "jpg" ||
      ext === "hdr" ||
      ext === "exr" ||
      ext === "tga" ||
      ext === "tiff" ||
      ext === "gif"
    ) {
      return true;
    }
  } else if (group === GroupFont) {
    if (ext === "ttf") return true;
  } else if (group === GroupUI) {
    if (ext === "json") return true;
  } else if (group === GroupProfile) {
    if (ext === "svg") return true;
  }

  return false;
};

export const getPossibleGroupFromFilename = (filename) => {
  const ext = filename
    .split(".")
    .pop()
    .toLowerCase();

  if (ext === "zip") return undefined;
  if (ext === "obj" || ext === "glb" || ext === "fbx") return GroupGeom;
  if (ext === "sbsar") return GroupMaterial;
  if (
    ext === "jpeg" ||
    ext === "png" ||
    ext === "jpg" ||
    ext === "hdr" ||
    ext === "exr" ||
    ext === "tga" ||
    ext === "tiff" ||
    ext === "gif"
  ) {
    return GroupImage;
  }
  if (ext === "ttf") return GroupFont;
  // if (ext === "json") return GroupUI;
  if (ext === "svg") return GroupProfile;

  return null;
};

export const checkFileExtensionsOnEntityGroup = (group, filename) => {
  const ext = filename
    .split(".")
    .pop()
    .toLowerCase();

  return checkCommonFileExtension(group, ext);
};
