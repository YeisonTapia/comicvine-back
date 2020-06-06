const mcache = require("memory-cache");

module.exports = function(duration) {
  return (req, res, next) => {
    const key = req.originUrl || req.url;
    const cachedBody = mcache.get(key);

    if (cachedBody) {
      return res.send(JSON.parse(cachedBody));
    } else {
      res.sendResponse = res.send;
      res.send = body => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};