const cageTransformer = cage => {
  const keys = Object.keys(cage);
  const _return = JSON.parse(JSON.stringify(cage));
  keys.forEach(key => {
    const item = _return[key];
    _return[key] = {
      ...item,
      group: item.group ? item.group : 'Recent'
    };
  });
  return _return;
};
