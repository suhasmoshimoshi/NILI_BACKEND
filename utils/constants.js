/* Validation related  constants starts */
module.exports.PASSWORD_NOT_FOUND = "password can't be empty.";


/* HTTP status code constants */
module.exports.statusCode = Object.freeze({
    Success: 200,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404,
    InternalError: 500,
    Failure: 300,
    Exists: 409,
    InvalidData: 422,
    SessionTimeout: 599,
    Timeout: 408,
    Created: 201,
    No_Content: 204,
  });


  module.exports.userTypes = Object.freeze({
    STUDENT: "student",
    PARENT: "parent",
    SUPERADMIN: "superadmin",
  });
  