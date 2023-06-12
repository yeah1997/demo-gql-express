const { MongoDataSource } = require("apollo-datasource-mongodb");

class Users extends MongoDataSource {
  findByEmail(email) {
    return this.model.findOne({ email });
  }

  findByUsername(username) {
    return this.model.findOne({ username });
  }

  saveUser(args) {
    const user = new this.model(args);
    return user.save();
  }

  findById(id) {
    return this.findOneById(id);
  }

  updateUser(userId, data) {
    return this.model.findOneAndUpdate({ _id: userId }, data, {
      new: true,
    });
  }
}

module.exports = Users;
