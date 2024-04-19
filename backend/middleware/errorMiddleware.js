const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500

  res.status(statusCode)

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  })
}

//Allow Cross-origin resource sharing
const crossOriginResource = async (req, res, next) => {
	// Website you wish to allow to connect
	if (req.headers.origin) {
		res.setHeader('Access-Control-Allow-Origin', '*');
	}

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Allow Methods
	res.setHeader("Access-Control-Allow-Methods", ['GET','HEAD','OPTIONS','POST','PUT']);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With, content-type, authorization, accept',
	);

	// Pass to next layer of middleware
	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
};

module.exports = {
  errorHandler, crossOriginResource
}
