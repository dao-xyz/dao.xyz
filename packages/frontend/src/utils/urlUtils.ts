export const isValidHttpUrl = (string) => {
  let url = undefined;
  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};
