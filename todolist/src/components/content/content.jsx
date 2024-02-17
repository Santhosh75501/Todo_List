import { useState, useEffect } from 'react';
import './content.css';
import './content.js';

function Content() {
    let [items, setItems] = useState([{}]);
    const [check, setCheck] = useState(1);
    const [check1, setCheck1] = useState(1);
    let myArray = items;

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            addItem();
        }
    };

    const deleteItem = (itemData) => {
        setItems((prevItems) => prevItems.filter((items) => items[1] !== itemData));
        console.log(items)
    }

    const updateItem = (myItems) => {
        if (check === 0) {

            let listItem = document.getElementById("itemList");
            listItem.innerHTML = null;
            myItems.forEach((data) => {
                let listAdd = document.createElement("li");
                let listbutton = document.createElement("button");
                let spanbutton = document.createElement("span");
                spanbutton.className = "material-symbols-outlined";
                spanbutton.textContent = "delete";
                listAdd.textContent = data[0];
                listItem.appendChild(listAdd)
                listAdd.appendChild(listbutton);
                listbutton.appendChild(spanbutton);
                listbutton.setAttribute('name', data[1])
                let itemName = listbutton.getAttribute("name");
                listbutton.addEventListener('click', () => deleteItem(itemName));
            })
        }
        else {
            setCheck(0)
        }
    }

    const addItem = () => {
        const getText = document.querySelector(".textbox-box").value;
        const listItem = document.getElementById("itemList");
        if (getText !== "") {
            const setText = document.querySelector(".textbox-box")

            if (myArray.length === 1 && check1 === 1) {
                myArray.pop();
                setCheck1(0);
            }

            myArray.push([getText, Math.random().toString()]);
            setItems(myArray)

            while (listItem.firstChild) {
                listItem.removeChild(listItem.firstChild);
            }

            updateItem(items);

            setText.value = "";

        }

    }

    useEffect(() => {
        updateItem(items); // eslint-disable-next-line
    }, [items]); 

    return (
        <div className='content'>
            <div className='textbox'>
                <input type='text' className='textbox-box' required="required" onKeyDown={handleKeyDown} />
                <span className='placeholder'>Enter Item To Add</span>
                <input type='button' value='Add' className='add-btn' onClick={addItem} />
            </div>
            <div className="list">
                <label>ITEMS</label>
                <ul id='itemList'>

                </ul>
            </div>
        </div>
    )
}

export default Content;