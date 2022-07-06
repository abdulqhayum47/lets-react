const URL = {
    login: () => {
        return `login`;
    },

    signup: () => {
    return `signup`;
    },

    users: () => {
        return `users`;
    },

    user: (id) => {
        return `users/` + id;
    }

};

export default URL;