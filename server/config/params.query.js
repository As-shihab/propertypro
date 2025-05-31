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
          contains: value,
          mode: "insensitive",
        };
      }
    });
  }

  console.log("Parsed Query:", {
    count: req.count,
    skip: req.skip,
    take: req.take,
    where: req.where,
  });

  next();
};

module.exports = paramsquery;
