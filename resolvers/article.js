module.exports = {
  Mutation: {
    async createArticle(parent, { article }, { dataSources, user }, info) {
      article.author = user._id;
      const ret = await dataSources.articles.createArticle(article);
      //
      return {
        article: ret,
      };
    },
  },
  Article: {
    async author(parent, arg, { dataSources }) {
      const user = await dataSources.users.findById(parent.author);
      return user;
    },
  },
};
