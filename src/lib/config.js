export const configurationFile = {
  development: {
    //FOR MONGODB THINGS
    mongoUrl: "mongodb://localhost:27017/onCliquesDB",
    API_DOMAIN_NAME: "http://localhost:5000/",
    JWT_SECRET: "thisisasecretformyapp"
  },

  test: {
    mongoUrl: "mongodb://localhost:27017/onCliquesDB_Test",
    API_DOMAIN_NAME: "http://localhost:5000/",
    JWT_SECRET: "thisisasecretformyapp"
  }
};
