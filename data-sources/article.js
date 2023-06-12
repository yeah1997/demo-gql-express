const { MongoDataSource } = require("apollo-datasource-mongodb");

class Articles extends MongoDataSource {
  getArticles(option) {
    const { offset, limit } = option;
    return this.model.find().skip(offset).limit(limit);
  }

  createArticle(data) {
    const article = new this.model(data);
    // article.populate("author").execPopulate();
    return article.save();
  }

  getCount() {
    return this.model.countDocuments();
  }
}

module.exports = Articles;
