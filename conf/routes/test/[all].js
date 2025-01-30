nexa.get(['Schema1', 'Schema2'], (req, res) => {
    return req.params
}, {
    tests: [{
        query: {
            name: 'John',
            age: 20,
            email: ''
        }
    }]
});