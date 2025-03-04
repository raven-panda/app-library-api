// eslint-disable
db.createUser(
  {
    user: "apiUser",
    pwd: "ApiUserSecret87!",
    roles: [
      {
        role: "readWrite",
        db: "ebrarydb"
      }
    ]
  }
);
