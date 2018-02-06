import {AddTodo, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './todoHelpers'

test('AddTodo should add the passed todo to the list',  () => {
    const startTodos = [
        {id: 0, name: 'one', isComplete: true},
        {id: 1, name: 'two', isComplete: true}
    ];

    const newTodo = {id: 3, name: 'three', isComplete: true};
    const expected = [
        {id: 0, name: 'one', isComplete: true},
        {id: 1, name: 'two', isComplete: true},
        {id: 3, name: 'three', isComplete: true}
    ]

    const result = AddTodo(startTodos, newTodo);

    expect(result).toEqual(expected);
})

test('AddTodo should not mutating existing todo array',  () => {
    const startTodos = [
        {id: 0, name: 'one', isComplete: true},
        {id: 1, name: 'two', isComplete: true}
    ];

    const newTodo = {id: 3, name: 'three', isComplete: true};
    const expected = [
        {id: 0, name: 'one', isComplete: true},
        {id: 1, name: 'two', isComplete: true},
        {id: 3, name: 'three', isComplete: true}
    ]

    const result = AddTodo(startTodos, newTodo);

    expect(result).not.toBe(startTodos);
})

test('findById should return the expected item from the array', () => {
    const startTodos = [
        {id: 0, name: 'one', isComplete: true},
        {id: 1, name: 'two', isComplete: true},
        {id: 2, name: 'three', isComplete: true}
    ];

    const expected = {id: 1, name: 'two', isComplete: true};

    const result = findById(1, startTodos);
    expect(result).toEqual(expected);
})

test('toggleTodo should toggle the isComplete prop of a todo', () => {
    const startTodo = {id: 0, name: 'one', isComplete: true};
    const expected = {id: 0, name: 'one', isComplete: false};
    const result = toggleTodo(startTodo);

    expect(result).toEqual(expected);
})

test('toggleTodo should not mutate the original todo', () => {
    const startTodo = {id: 0, name: 'one', isComplete: true};
    const result = toggleTodo(startTodo);

    expect(result).not.toBe(startTodo);
})

test('updateTodo should update the item by id', () => {
    const startTodos = [
        {id: 0, name: 'one', isComplete: true},
        {id: 1, name: 'two', isComplete: true},
        {id: 2, name: 'three', isComplete: true}
    ];
    const updatedTodo = {id: 1, name: 'two', isComplete: false};
    const expectedTodos = [
        {id: 0, name: 'one', isComplete: true},
        {id: 1, name: 'two', isComplete: false},
        {id: 2, name: 'three', isComplete: true}
    ];

    const result = updateTodo(startTodos, updatedTodo);

    expect(result).toEqual(expectedTodos);
})

test('removeTodo should not remove the original array', () => {
    const startTodos = [
        {id: 0, name: 'one', isComplete: true},
        {id: 1, name: 'two', isComplete: true},
        {id: 2, name: 'three', isComplete: true}
    ];
    const targetId = 2;
    const result = removeTodo(startTodos, targetId);

    expect(result).not.toBe(startTodos);
})

test('filterTodos should returns all items for root route', () => {
    const startTodos = [
        {id: 0, name: 'one', isComplete: false},
        {id: 1, name: 'two', isComplete: true},
        {id: 2, name: 'three', isComplete: true}
    ];
    const result = filterTodos(startTodos, '/');
    expect(result).toEqual(startTodos);
})

test('filterTodos should returns only completed todos', () => {
    const startTodos = [
        {id: 0, name: 'one', isComplete: false},
        {id: 1, name: 'two', isComplete: false},
        {id: 2, name: 'three', isComplete: true}
    ];
    const expected = [{id: 2, name: 'three', isComplete: true}];
    const result = filterTodos(startTodos, '/complete');
    expect(result).toEqual(expected);
})

test('filterTodos should returns all incomplete items for the active route', () => {
    const startTodos = [
        {id: 0, name: 'one', isComplete: false},
        {id: 1, name: 'two', isComplete: false},
        {id: 2, name: 'three', isComplete: true}
    ];
    const expected = [
        {id: 0, name: 'one', isComplete: false},
        {id: 1, name: 'two', isComplete: false}
    ];
    const result = filterTodos(startTodos, '/active');
    expect(result).toEqual(expected);
})