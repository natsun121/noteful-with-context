import React, { Component } from 'react';

class NoteListMainError extends Component {
    state = {
        hasError: false
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>Could not display this list.</h2>
            );
        }
        return this.props.children;
    }  
}

export default NoteListMainError;