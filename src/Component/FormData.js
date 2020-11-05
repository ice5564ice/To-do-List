import React, { useState } from 'react'
import { DatePicker, message } from 'antd'
import { Form, Input, Button } from 'antd'
import { Modal } from 'antd'
import 'antd/dist/antd.css'
import TextArea from 'antd/lib/input/TextArea'

function FormData(props) {
    const handleFromSubmit = value => {
        props.onFinish({
            id : Math.floor(Math.random() * 10000),
            name : value.Act,
            content : "" + value.Detail,
            date : value.Date
        })
        setModal(false)
        window.location.reload(false);
        console.log(props)
        message.info(`Add your activity success`)
    }

    const [modal, setModal] = useState(true)


    return (
        <div style={{ width: 400 }} >
            <Modal title={<h3>To-do list</h3>} style={{ top: 20 }} visible={modal} footer={null} 
            onCancel={() => {
                setModal(false)
                window.location.reload(false)
                }}>
                <Form onFinish={(value) => handleFromSubmit(value)}>
                    <Form.Item name='Act' label='Activity' rules={[{ required: true, message: 'Plase fill your activity' }]}>
                        <Input type='text' placeholder='Your activity'  />
                    </Form.Item>
                    <Form.Item name='Detail' label='Detail'>
                        <TextArea type='text' placeholder='Detail of activity' style={{ height: 100 }} />
                    </Form.Item>
                    <Form.Item name='Date' label="Date" rules={[{ required: true, message: "Please select activity's date" }]}>
                        <DatePicker />
                    </Form.Item>
                    <hr style={{ margin:"50px 0px 0px 0px", border:"1px solid #f2f2f2" }} />
                    <Form.Item>
                        <div className="SubmitBtn">
                            <Button type="defualt" style={{ margin:"0px 5px 0px 0px" }} onClick={() => { window.location.reload(false); setModal(false)}} >Cancel</Button>
                            <Button type="primary" htmlType="submit">Submit</Button>    
                        </div>
                    </Form.Item>                   
                </Form>
            </Modal>
        </div>
    )
}

export default FormData
