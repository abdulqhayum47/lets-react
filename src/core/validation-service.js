const ValidationService = {
    pattern: (value, regex, fieldName) => {
        if (!(regex).test(value)) {
            return `${fieldName} is invalid `;
        } else {
            return null;
        }
    }
};

export default ValidationService;