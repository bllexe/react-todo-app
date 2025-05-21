import React, { Component, useState } from 'react'


const TodoForm = ({ onAdd }) =>{
    const [title,setTitle] = useState("");

    const handeSubmit =(e) =>{
        e.preventDefault();
        if(!title) return;
        onAdd(title);
        setTitle("");
    };

    return (
        <form onSubmit={handeSubmit}>
            <input type="text" placeholder="Add todo" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button type="submit">Add</button>
        </form>
    )
}


export default TodoForm