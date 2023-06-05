export const stringShorten = function (data: any, strLenght: number = 100) {
  if (data === null) {
    return data;
  }

  // If it is a float, return 2 decimal places.
  if (!isNaN(data) && data.toString().indexOf(".") != -1) {
    return Number.parseFloat(data).toFixed(2);
  }

  if (data) {
    //convert data to a string and replace line breaks
    const string = data.toString().replace(/<br ?\/?>/g, " ");
    const length = strLenght;
    const trimmedString =
      string.length > length ? string.substring(0, length) + "..." : string;

    return trimmedString;
  }

  return data;
};
