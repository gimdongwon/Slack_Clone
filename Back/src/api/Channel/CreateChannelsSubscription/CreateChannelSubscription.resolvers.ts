const resolvers = {
  Subscription: {
    CreateChannelSubscription: {
      subscribe: (_, ___, { pubSub }) => {
        return pubSub.asyncIterator("newChannel");
      }
    }
  }
};

export default resolvers;
