import { Button, message } from 'antd'
import { Select } from 'antd'
import Moment from 'moment'
import React, { useState, useEffect } from 'react'
import FormData from './FormData'
import List from './List'


function Todo() {
    const [dataToday, setData] = useState([])
    const [show, setshow] = useState(false)
    const [datas, setTodos] = useState(() => {
        const value = localStorage.getItem("storage") ? JSON.parse(localStorage.getItem("storage")) : []
        return value
    })

    useEffect(() => {
        localStorage.setItem("storage", JSON.stringify(datas))
        sortDate()
        dataToday.length === 0 ? filterData("all") : window.location.reload(0.1)
        // eslint-disable-next-line 
    }, [datas])

    const addData = data => {

        if(/^\s*$/.test(data.name.text) || /^\s*$/.test(data.content.text)) {
            return;
        }
        
        data.content = newLine(data.content)
        const newTodo = [data, ...datas]
        setTodos(newTodo)
        console.log(data, ...datas);
    }

    const removeData = id => {
        const removeArr = [...datas].filter(data => data.id !== id)
        setTodos(removeArr)
        message.success(`Delete Complete`)
    }

    const updateData = (id, name, content, date) => {
        if(/^\s*$/.test(name.text) || /^\s*$/.test(content.text)) {
            return;
        }

        const newValue = {id: id, name: name, content: content, date: date}
        setTodos(prev => prev.map(item => (item.id === id ? newValue : item)))
    }

    const Complete = id => {
        let updateddatas = datas.map(data => {
            if(data.id === id) {
                data.isComplete = !data.isComplete;
            }
            return data
        })
        setTodos(updateddatas);
    }

    const sortDate = () => {
        const sorted = datas.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        setTodos(sorted)
    }

    const newLine = (text) => {
        let Str = []
        console.log(text)
        if(text !== "undefined") {
            for(let i=1; i<text.length; i++) {
                let indees = i-1
                if((i%32) === 0){
                    Str.push(text[indees])
                    Str.push(" ")
                }
                else {
                    Str.push(text[indees])
                }
            }
        }
        else{
            Str.push(" ")
        }
        const string = [...Str]
        return  string
    }

    const { Option } = Select;

    const loopItem = () => {
        let checkItem = []
        for(let i=0; i<datas.length; i++) {
            if(checkItem.length === 0 ){
                checkItem.push(Moment(datas[i].date).format("MMMM Do YYYY"))
            }
            else {
                let insert = true
                for(let j=0; j<checkItem.length; j++){
                    if(Moment(datas[i].date).format("MMMM Do YYYY") === checkItem[j]){
                        insert = false
                    }
                }
                if(insert){
                    checkItem.push(Moment(datas[i].date).format("MMMM Do YYYY"))
                }
            }
        }
        return checkItem.map(item => (<Option value={item}>{item}</Option>))
    } 

    const filterData = element => {
        if(element === "all") {
            setData(datas)
        }
        else {
            const today = datas.filter(datas => Moment(datas.date).format("MMMM Do YYYY") === element)
            setData(today)
        }
    }

    const showModal = () => setshow(true)
    return (
        <div>
            <div>
                {show ? <FormData className="Modals" onFinish={addData}/> : null}
            </div>
            <div className="navBar">
                TO-DO LIST
            </div>
            <div className="ToolBar">
                <Button id="add" type="primary" onClick={showModal} >Add To-do list</Button>
                <Select className="Box" defaultValue="all" style={{ width: 200, }} onChange={filterData}>
                    <Option value={"all"}>All-List</Option>
                    {loopItem()}
                </Select>
            </div>
            <div>
                <div className={ localStorage.getItem("storage") === '[]'  ? "defualt" : "dashBord" }>
                    <List datas={dataToday} isCompelte={Complete} updateData={updateData} removeData={removeData}  />
                </div>
            </div>
            <div style={{ height: "30px", margin: "40px" }}></div>
        </div>
    )
}

export default Todo
