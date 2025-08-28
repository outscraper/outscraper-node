const QUERY_DELIMITER = '    ';

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

exports.formatQueries = (q) => {
  if (Array.isArray(q)) {
    if (q.every(i => Array.isArray(i))) {
      return q.map(pair => pair.join(QUERY_DELIMITER));
    }
    return q;
  }
  return [q];
}
