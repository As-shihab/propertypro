const paramsquery = async (req, res, next) => {
  req.count = req.query.count === "true";
  req.skip = parseInt(req.query.skip, 10) || 0;
  req.take = parseInt(req.query.take, 10) || 10;
  req.where = {};

  if (req.query.$filter) {
    const filterString = req.query.$filter;

    const filters = filterString.split(",").map((pair) => pair.trim());

    filters.forEach((filter) => {
      const match = filter.match(/^(\w+)\s*=\s*['"]?([^'"]+)['"]?$/);
      if (match) {
        const key = match[1];
        const value = match[2];
        req.where[key] = {
          startsWith: value,
        };
      }
    });
  }

  if (req.query.$expand) {
    const expandString = req.query.$expand;
    const expands = expandString.split(",").map((item) => item.trim());
    req.$expand = {};
    expands.forEach((expand) => {
      req.$expand[expand] = true;
    });
  }
  
console.log("Params Query Middleware:", {
    count: req.count,
    skip: req.skip,
    take: req.take,
    where: req.where,
    expand: req.$expand,
  });
  next();
};

module.exports = paramsquery;
