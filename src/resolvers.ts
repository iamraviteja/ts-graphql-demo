export const resolvers = {
    Query : {
        currentUser: () => {
            return {
                id:123,
                name: 'ravi teja'
            };
        },
        suggestions: () => {
            return [];
        }
    }
}