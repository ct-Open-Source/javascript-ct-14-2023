var http = require('http');

const fib = (n) => {
  let result = [];
  let a = 0n;
  let b = 1n;
  for (let i = 0; i < n; ++i) {
    result.push(a);
    [a, b] = [b, a + b];
  }
  return result;
};

BigInt.prototype.toJSON = function () { return this.toString(); };

const server = http.createServer(
  function (req, res) {
    const params = req.url.match(
      new RegExp("/fibonacci/(\\d+)"));
    if (params) {
      const n = parseInt(params[1]);
      const result = fib(n);
      res.writeHead(200,
        {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        });
      res.write(JSON.stringify({
        'n': n,
        'seq': result,
      }));
      res.end();
    }
    else {
      res.end('Invalid request');
    }
  });

const PORT = 31337;
server.listen(PORT);
console.log(`Web server listening on port ${PORT} ...`)