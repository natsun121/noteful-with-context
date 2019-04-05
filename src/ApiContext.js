import React from 'react';

const ApiContext = React.createContext({
    folders: [],
    notes: [],
    addFolder: () => {},
    addNote: () => {},
    deleteNote: ()  => {}
})

export default ApiContext