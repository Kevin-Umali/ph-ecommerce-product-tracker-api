const ErrorMessage = (parameter = null) => {
  return {
    MissingParameter: {
      status: "Bad Request",
      statusCode: 400,
      message: "Missing parameter",
    },
    SpecificMissingParameter: {
      status: "Bad Request",
      statusCode: 400,
      message: `Missing parameter - ${parameter}`,
    },
    SomethingHappened: {
      status: "Internal Server",
      statusCode: 500,
      message: parameter,
    },
  };
};

module.exports = { ErrorMessage };
