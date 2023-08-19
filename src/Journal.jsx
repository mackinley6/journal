import React, { useRef, useState, useEffect } from 'react';
import background from "./thinkGreen.jpg";
import "./journal.css";

const Journal = () => {
    const dateRef = useRef(null);
    const dateRef2 = useRef(null);
    const thoughtRef = useRef(null);
    const taskRef = useRef(null);

    const [myThought, setMyThought] = useState([]);
    const [myTask, setMyTask] = useState([]);
    
    const handleThoughtSubmit = (e) => {
        e.preventDefault();
        const thoughtObject = {
            id: Date.now(),
            date: dateRef2.current.value,
            thought: thoughtRef.current.value,
        };
        console.log("Thought submitted:", thoughtObject); // Add this line
        setMyThought([...myThought, thoughtObject]);
        dateRef2.current.value = '';
        thoughtRef.current.value = '';
    };
   
    useEffect(() => {
        localStorage.setItem('MyThoughts', JSON.stringify(myThought));
    }, [myThought]);

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        const taskObject = {
            id: Date.now(),
            date: dateRef.current.value,
            task: taskRef.current.value,
        };
        setMyTask([...myTask, taskObject]);
        dateRef.current.value = '';
        taskRef.current.value = '';
    };

    useEffect(() => {
        localStorage.setItem('MyTasks', JSON.stringify(myTask));
    }, [myTask]);

    const handleDelete = (id, isThought) => {
        if (isThought) {
            setMyThought(myThought.filter(item => item.id !== id));
        } else {
            setMyTask(myTask.filter(item => item.id !== id));
        }
    };
    

    const renderEntries = (entries, isThought) => (
        <div className='messageContainer2'>
            {entries.map(entry => (
                <div key={entry.id}>
                    <h4>{entry.date}: {isThought ? entry.thought : entry.task}</h4>
                    <button onClick={() => handleDelete(entry.id, isThought)}>delete</button>
                </div>
            ))}
        </div>
    );

    return (
        <div className='main'>
            <div className='container'>
                <h1 className='title'>My Thoughts Journal</h1>
                <form onSubmit={handleThoughtSubmit}>
                    <label className='firstLabel'>Thoughts for the Day</label>
                    <input className='date' type="date" ref={dateRef2} />
                    <textarea className='message' rows="2" ref={thoughtRef} placeholder="What's on your mind?" />
                    <div className='button'>
                        <input type="submit" value='Save' />
                        <input type="reset" value='Clear' />
                    </div>
                </form>
                <div className='messageContainer'>
                    <h4>Thoughts for the Day</h4>
                    {renderEntries(myThought, true)}
                </div>
            </div>

            <div className='container'>
                <h1 className='title'>My Tasks Journal</h1>
                <form onSubmit={handleTaskSubmit}>
                    <label className='firstLabel'>Tasks</label>
                    <input className='date' type="date" ref={dateRef} />
                    <textarea className='message' rows="2" ref={taskRef} placeholder="What do you need to do?" />
                    <div className='button'>
                        <input type="submit" value='Save' />
                        <input type="reset" value='Clear' />
                    </div>
                </form>
                <div className='messageContainer'>
                    <h4>Tasks</h4>
                    {renderEntries(myTask, false)}
                </div>
            </div>
        </div>
    );
}

export default Journal;