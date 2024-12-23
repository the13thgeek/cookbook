export const formatHTML = (strInput) => {
  let formatted = strInput.replace(/\n/g,'<br>');
  formatted = formatted.replace(/\r/g,'<br>');
  return formatted;
}