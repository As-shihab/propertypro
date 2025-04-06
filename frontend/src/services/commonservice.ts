export class Common {
  constructor() {}
  CardPerPage = 4;

  textreducing(text: string, maxlength: number) {
    if (text.length > maxlength) {
      return text.substring(0, maxlength) + "...";
    }
    return text;
  }
}
