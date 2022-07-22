exports.toArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  } else {
    return [value];
  }
}

exports.removeEmpty = (obj) => {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));
}
