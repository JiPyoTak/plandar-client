const compareObjects = <T extends { [key: string]: any }>(
  obj1: T,
  obj2: T,
): boolean => {
  const obj1Props = Object.keys(obj1);
  const obj2Props = Object.keys(obj2);

  if (obj1Props.length !== obj2Props.length) {
    return false;
  }

  for (let i = 0; i < obj1Props.length; i++) {
    const propName = obj1Props[i];
    if (
      !Object.prototype.hasOwnProperty.call(obj2, propName) ||
      obj1[propName] !== obj2[propName]
    ) {
      return false;
    }
  }

  return true;
};

export { compareObjects };
