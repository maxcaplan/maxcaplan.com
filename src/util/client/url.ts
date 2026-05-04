/** Get the file extension for a url string */
export const getUrlExtension = (url: string) => {
  return url.split(/[#?]/)[0].split(".").pop()?.trim();
};

/** Get the filename for a url string */
export const getUrlFilename = (url: string) => {
  return url.split("/").pop()?.split(".")[0].trim();
};

/** Replace filename in a url string */
export const replaceUrlFilename = (url: string, filename: string) => {
  const url_parts = url.split("/");
  const file_parts = url_parts[Math.max(url_parts.length - 1, 0)].split(".");

  file_parts[0] = filename;
  url_parts[Math.max(url_parts.length - 1, 0)] = file_parts.join(".");

  return url_parts.join("/");
};
