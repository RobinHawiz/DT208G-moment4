export function alphabetize(a: string, b: string) {
  if (a > b) return 1;
  else if (a < b) return -1;
  else return 0;
}
