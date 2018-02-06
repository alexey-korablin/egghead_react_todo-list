export const AddTodo = ((list, item) => [...list, item]);

export const GenerateId = (() => Math.ceil(Math.random() * 1000));

export const findById = ((id, list) => list.find(item => item.id === id) );

// Test for toggleTodo function. Solution
// export const toggleTodo = (item => {
//     let instanceItem = {};
//     Object.keys(item).forEach(keyItem => instanceItem[keyItem] = item[keyItem]);
//     instanceItem.isComplete = !instanceItem.isComplete;
//     return instanceItem;
// });

// Test for toggleTodo function. Better solution
export const toggleTodo = (item => ({...item, isComplete: !item.isComplete}));

export const updateTodo = ((todoList, updatedTodo) => {
    const updatedIndex = todoList.findIndex(item => item.id === updatedTodo.id);
    return [
        ...todoList.slice(0, updatedIndex),
        updatedTodo,
        ...todoList.slice(updatedIndex + 1)
    ];
})

export const removeTodo = (list, id) => {
    const removeIndex = list.findIndex(item => item.id === id);
    return [
        ...list.slice(0, removeIndex), 
        ...list.slice(removeIndex + 1)
    ]
}

export const filterTodos = (todos, route) => {
    switch (route) {
        case '/active':
            return todos.filter( todo => !todo.isComplete);
        case '/complete':
            return todos.filter( todo => todo.isComplete);
        default:
            return todos;
    }
}