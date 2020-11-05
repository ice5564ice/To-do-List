import React, {useState} from 'react'
import Moment from 'moment'
import { Card } from 'antd'
import { AiFillCheckCircle } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import 'antd/dist/antd.css'
import 'moment-timezone'
import Form from './FormData'

function List({ datas, isCompelte, removeData, updateData }) {
    const [edit, setEdit] = useState({
        id : null,
        name : '',
        content : '',
        date : null
    })

    const update = (value) => {
        updateData (edit.id, value.name, value.content, value.date )
        setEdit({
            id : null,
            name : '',
            content : '',
            date : null
        })
    }

    if(edit.id) {
        return <Form edit={edit} onFinish={update} />
    }


    return  datas.map((data, index) => (
        <div key={index}>
            <Card className={ data.isComplete ? "Card-Complete" : "Card"} key={data.id} title={data.name} style={{ width: 300, margin: 10 }}
                actions={[
                    <MdEdit onClick={() => setEdit({ id: data.id, name: data.name, content: data.content, date: data.date })} className='edit-icon' />,
                    <MdDelete onClick={() => removeData(data.id)} className='delete-icon' />,
                    <AiFillCheckCircle onClick={() => isCompelte(data.id)} />
                ]}
            >
                <p>{data.content}</p>
                <p>{Moment(data.date).format("MMMM Do YYYY")}{""}</p> 
            </Card>
        </div>
    ))
}

export default List
