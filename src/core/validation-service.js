const ValidationService = {
    email: function(value) {
        const emailRegex = "/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i";
        if(!emailRegex.test(value)) {
            return "Email is invalid"
        } else {
            return null;
        }
    },

    textField: function(value) {
        return false; //Add Validation here
    }
};

export default ValidationService;