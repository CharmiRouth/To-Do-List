import { useState, useEffect } from 'react';
import './style.css'

//Get the local storage data and not only set it but get it too
 const getLocalData=()=>{
     const lists=localStorage.getItem("mytodolist")//passing the key(value)

     if(lists){
         return JSON.parse(lists); //again get it in array format as "items" we get are in array format
     }
     else{
         return [];
     }
 }

const TodoList=()=>{
    const [inputData, setInputData]=useState('');
    //this is made to store the input data so as soon as someone 
    //types something diffrent it shoud not change
    const [items, setItems]= useState(getLocalData()); 
    //to make changes ehen we click on edit item
    const [isEditItem, setIsEditItem]=useState('');
    //to change the plus icon
    const [toggleButton, setToggleButton]=useState(false);

    //Add the Items

    const addItem=()=>{
        if(!inputData){
            alert('Please fill the data');
        }
        //when we edit the edited value should be save not another element should be created
        else if(inputData && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id===isEditItem){
                        return {...curElem, name: inputData}
                    }
                    return curElem;
                })
            )
        

        setInputData([])
        setIsEditItem(null)
        setToggleButton(false)
            }
        else{
            const myUniqueId={
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, myUniqueId]);
            setInputData('');
        }
    }

    //Editing the items

    const editItem=(index)=>{
        const item_todo_edited=items.find((curElem)=>{
            return curElem.id===index
        })
        setInputData(item_todo_edited.name)
        setIsEditItem(index);
        setToggleButton(true);
    }

    //Delete particular Elements

    const deleteItem=(index)=>{
        const updatedItems=items.filter((curElem)=>{
                return (curElem.id !== index);
        });
        setItems(updatedItems);
    }

    //Remove all the items

    const removeAll=()=>{
        return setItems([]);
    }

    //adding Local Storage
    //localstorage is a key value pair that is why we have used two arguments under localstorage
    //JSON.stringify converts anything into string
    useEffect(()=>{
        localStorage.setItem("mytodolist", JSON.stringify(items))
    },[items])



    return(
    <>
        <div className='main-div'>
            
            <div className='child-div'>
                <figure>
                    <img src="./Images/todo.svg" alt="todologo" />
                    <figcaption>Add List Here</figcaption>
                </figure>
                <div className='addItems'>
                    <input type="text"
                    placeholder="✍ Add Item"
                    className='form-control'
                    value={inputData}
                    onChange={(event)=>{
                        setInputData(event.target.value)
                    }}>

                    </input>
                    {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItem}></i>
                    ):(
                        <i className="fa fa-plus add-btn" onClick={addItem}></i>
                    )
                    }
                    
                    
                </div>
                {/* {show our items} */}
                    
                    <div className='showItems'>
                        {items.map((curElem)=>{
                            return(
                                <div className='eachItem' key={curElem.id}>
                                <h3>{curElem.name}</h3>
                                <div className='todo-btn'>
                                <i className="far fa-edit add-btn" onClick={()=>editItem(curElem.id)}></i>
                                <i className="far fa-trash-alt add-btn" onClick={()=>deleteItem(curElem.id)}></i>
                                </div>
                            </div>
                            );
                        })}
                        
                    </div>

    
                {/* {remove all buttons} */}
                <div className='showItems'>
                    <button className='btn effect04' 
                    data-sm-link-text="Remove All" onClick={removeAll}>
                    <span>Check List</span>    
                        </button>
                </div>
            </div>
            
        </div>
    </>)

}

export default TodoList;