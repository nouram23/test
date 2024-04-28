// Import the getPosts function if it's not already imported.

import React, { useEffect, useState } from "react";
import HomeLayout from "../components/Layout";

import { NextPage } from "next";
import axios from "axios";
import { Button, DatePicker, Modal, Row, Space, Table, Tag , Input} from 'antd';
import type { TableProps } from 'antd';
import dayjs from "dayjs";



const Reg: NextPage = () => {

    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [barcode, setBarcode] = useState(null);
    const [man, setMan] = useState(null);
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
];

const OnUpdate = () =>{
        setOpen(true)
}

  const save =()=>{
    const data= {
        barcode,
        manufacturerName: man
    }
        console.log(data)
    axios.post('http://172.20.10.2:3003/registerProduct',data).then(res=>{
        console.log(res.data)
        getItems();
        setOpen(false);
    }).catch(e=>console.log(e))
  }
  return (
    <HomeLayout>
             <Button onClick={() => OnUpdate()} type="default">
          Add
        </Button>
    <Table columns={columns} dataSource={data} pagination={{ size: "small", position: ["bottomCenter"] }}/>
    <Modal
        open={open}
        title="Create"
        closable
        width={400}
        onCancel={() => setOpen(false)}
        footer={null}
      >
   <Row className="flex"> <Input value={barcode} onChange={e=>setBarcode(e.target.value)} />
    </Row>
          <Row className="flex"> <Input value={man} onChange={e=>setMan(e.target.value)} />
    </Row>
        <Row className="mt-3"><Button onClick={()=>{save()}}>Save</Button></Row>
      </Modal>

    </HomeLayout>
  );
};

export default Reg;
