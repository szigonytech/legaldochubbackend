function createStringEnum<String>(o: Array<String>): {[K in string]: K} {
  return o.reduce((res, key: String) => {
    res[key] = key;
    return res;
  }, Object.create({}));
}