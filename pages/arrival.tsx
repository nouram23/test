// Import the getPosts function if it's not already imported.

import React, { useEffect, useState } from "react";
import HomeLayout from "../components/Layout";

import { NextPage } from "next";
import axios from "axios";
import { Button, DatePicker, Modal, Row, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import dayjs from "dayjs";



const Arrival: NextPage = () => {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [date, setDate] = useState(null);
    const [row, setRow] = useState(null);
useEffect(()=>{
    getItems()
},[])
const getItems = ()=>{
    axios.get('http://172.20.10.2:3003/products').then(res=>{
        console.log(res.data)
        setData(res.data.data)
    })
}
  
const columns  = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Barcode',
    dataIndex: 'barcode',
    key: 'age',
  },
  {
    title: 'Manufacturer name',
    dataIndex: 'manufacturerName',
    key: 'address',
  },
  {
    title: 'Created Date',
    dataIndex: 'createdDate',
    key: 'address',
    render: (createdDate) => (
        <div>{createdDate != 0 && dayjs.unix(createdDate).format('YYYY-MM-DD HH:mm:ss')}</div>
      ),
  },
  {
    title: 'Delivery Date',
    dataIndex: 'deliveryDate',
    key: 'address',
    render: (createdDate) => (
        <div>{createdDate != 0 && dayjs.unix(createdDate).format('YYYY-MM-DD HH:mm:ss')}</div>
      ),
  },
  {
    title: 'Arrival Date',
    dataIndex: 'arrivalDate',
    key: 'address',
    render: (createdDate) => (
        <div>{createdDate != 0 && dayjs.unix(createdDate).format('YYYY-MM-DD HH:mm:ss')}</div>
      ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (totalBooked, record) => (
        <Button onClick={() => OnUpdate(record)} type="default">
          Update
        </Button>
      ),

  },
];
function isValidTimestamp(timestamp) {
    // Check if the timestamp is within a reasonable range
    const minTimestamp = 0; // Minimum Unix timestamp (Unix epoch)
    const maxTimestamp = Date.now() / 1000; // Current Unix timestamp (in seconds)
    
    if (timestamp < minTimestamp || timestamp > maxTimestamp) {
      return false; // Timestamp is out of range
    }
    
    // Convert timestamp to date
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    
    // Check if the resulting date is valid
    return !isNaN(date.getTime()); // Check if date.getTime() returns a valid timestamp
  }
  
const OnUpdate = (record) =>{
        setOpen(true)
        setRow(record)
        console.log(record)
}

const onChange = (date, dateString) => {
    console.log(date, dateString);
    setDate(date)
  };
  const save =()=>{
    const data= {
        id:row["id"],
        deliveryDate: dayjs(date).unix() }
        console.log(data)
    axios.post('http://172.20.10.2:3003/addArrivalDate',data).then(res=>{
        console.log(res.data)
        setOpen(false)
    }).catch(e=>console.log(e))
  }
  return (
    <HomeLayout>
    <Table columns={columns} dataSource={data} pagination={{ size: "small", position: ["bottomCenter"] }}/>
    <Modal
        open={open}
        title="Update"
        closable
        width={400}
        onCancel={() => setOpen(false)}
        footer={null}
      >
   <Row className="flex"> <DatePicker onChange={onChange} />
    </Row>
    <Row className="mt-3"><Button onClick={()=>{save()}}>Save</Button></Row>
      </Modal>

    </HomeLayout>
  );
};

export default Arrival;
