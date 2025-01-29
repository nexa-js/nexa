nexa('SchemaA', {

    query: {
        name: 'String',
        age: 'Number',
        email: 'String'
    },

    body: {
        name: 'String',
        age: 'Number',
        email: 'String'
    },

    response: {
        name: 'String',
        age: 'Number',
        email: 'String'
    }

})


route.get(['Schema1', 'Schema2'], (params) => {
    return 'abc abc'
}, {
    tests: [{
        query: {
            name: 'John',
            age: 20,
            email: ''
        }
    }]
});