type ISearchFunc = (source: string, subString: string) => boolean;

let mySearch: ISearchFunc;
// way 1
mySearch = (source: string, subString: string) => {
  const result = source.search(subString);
  return result > -1;
};
// way 2
mySearch = (src: string, sub: string) => {
  const result = src.search(sub);
  return result > -1;
};
// way 3
mySearch = (src, sub) => {
  const result = src.search(sub);
  return result > -1;
};


