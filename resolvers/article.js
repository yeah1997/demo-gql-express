module.exports = {
  Query: {
    async articles(parent, { offset, limit }, { dataSources }) {
      return {};
    },
  },

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

  // schema
  Article: {
    async author(parent, arg, { dataSources }) {
      const user = await dataSources.users.findById(parent.author);
      return user;
    },
  },

  ArticlesPayload: {
    async articles(parent, { offset, limit }, { dataSources }) {
      console.log(offset, "offset");
      console.log(limit, "limit");
      return await dataSources.articles.getArticles({
        offset,
        limit,
      });
    },
    async articlesCount(parent, arg, { dataSources }) {
      console.log(arg);
      return await dataSources.articles.getCount();
    },
  },
};
