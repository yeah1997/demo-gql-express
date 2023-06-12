module.exports = {
  Query: {
    async articles(parent, { offset, limit }, { dataSources }) {
      const [articles, articlesCount] = await Promise.all([
        dataSources.articles.getArticles({
          offset,
          limit,
        }),
        dataSources.articles.getCount(),
      ]);

      return {
        articles: articles,
        articlesCount,
      };
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
};
