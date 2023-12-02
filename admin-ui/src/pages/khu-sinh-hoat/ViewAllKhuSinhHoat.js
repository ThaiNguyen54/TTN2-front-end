import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Table, Typography, Popconfirm, Input, InputNumber, Form } from 'antd';
import axios from 'axios';

const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`
            }
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const ViewAllKhuSinhHoat = () => {
  const [form] = Form.useForm();
  const [KhuSinhHoat, SetKhuSinhHoat] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      id: '',
      TenKhu: '',
      ...record
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      console.log(key);
      const row = await form.validateFields();
      const newData = [...KhuSinhHoat];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row
        });
        SetKhuSinhHoat(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        SetKhuSinhHoat(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      key: 'id',
      title: 'id',
      dataIndex: 'id',
      editable: false
    },
    {
      key: 'TenKhu',
      title: 'Tên Khu',
      dataIndex: 'TenKhu',
      editable: true
    },
    {
      key: 'operation',
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.id)}
              style={{
                marginRight: 8
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      }
    }
  ];

  const GetAllKhuSinhHoat = async () => {
    try {
      const res = await axios.get('http://localhost:3001/ttn2/v1/khusinhhoat').then((res) => {
        SetKhuSinhHoat(res.data.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllKhuSinhHoat();
  }, []);
  const { Title } = Typography;
  const navigate = useNavigate();

  const handleOnClick = async (event) => {
    event.preventDefault();
    navigate('/addkhusinhhoat');
  };
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record)
      })
    };
  });
  return (
    <div>
      <Title style={{ color: '#00A9FF' }}>Khu Sinh Hoạt </Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>

      <Button onClick={handleOnClick}>Thêm Khu Sinh Hoạt</Button>

      <Divider />

      <Form form={form} component={false}>
        <Table
          rowKey="id"
          components={{
            body: {
              cell: EditableCell
            }
          }}
          columns={mergedColumns}
          dataSource={KhuSinhHoat}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel
          }}
        />
      </Form>
    </div>
  );
};
export default ViewAllKhuSinhHoat;

// import React, { useState } from 'react';
// import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
// const originData = [];
// for (let i = 0; i < 100; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`
//   });
// }
// const EditableCell = ({ editing, dataIndex, title, inputType, record, index, children, ...restProps }) => {
//   const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
//   return (
//     <td {...restProps}>
//       {editing ? (
//         <Form.Item
//           name={dataIndex}
//           style={{
//             margin: 0
//           }}
//           rules={[
//             {
//               required: true,
//               message: `Please Input ${title}!`
//             }
//           ]}
//         >
//           {inputNode}
//         </Form.Item>
//       ) : (
//         children
//       )}
//     </td>
//   );
// };
// const ViewAllKhuSinhHoat = () => {
//   const [form] = Form.useForm();
//   const [data, setData] = useState(originData);
//   const [editingKey, setEditingKey] = useState('');
//   const isEditing = (record) => record.key === editingKey;
//   const edit = (record) => {
//     form.setFieldsValue({
//       name: '',
//       age: '',
//       address: '',
//       ...record
//     });
//     setEditingKey(record.key);
//   };
//   const cancel = () => {
//     setEditingKey('');
//   };
//   const save = async (key) => {
//     console.log(key)
//     try {
//       const row = await form.validateFields();
//       const newData = [...data];
//       const index = newData.findIndex((item) => key === item.key);
//       if (index > -1) {
//         const item = newData[index];
//         newData.splice(index, 1, {
//           ...item,
//           ...row
//         });
//         setData(newData);
//         setEditingKey('');
//       } else {
//         newData.push(row);
//         setData(newData);
//         setEditingKey('');
//       }
//     } catch (errInfo) {
//       console.log('Validate Failed:', errInfo);
//     }
//   };
//   const columns = [
//     {
//       title: 'name',
//       dataIndex: 'name',
//       width: '25%',
//       editable: true
//     },
//     {
//       title: 'age',
//       dataIndex: 'age',
//       width: '15%',
//       editable: true
//     },
//     {
//       title: 'address',
//       dataIndex: 'address',
//       width: '40%',
//       editable: true
//     },
//     {
//       title: 'operation',
//       dataIndex: 'operation',
//       render: (_, record) => {
//         const editable = isEditing(record);
//         return editable ? (
//           <span>
//             <Typography.Link
//               onClick={() => save(record.key)}
//               style={{
//                 marginRight: 8
//               }}
//             >
//               Save
//             </Typography.Link>
//             <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//               <a>Cancel</a>
//             </Popconfirm>
//           </span>
//         ) : (
//           <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
//             Edit
//           </Typography.Link>
//         );
//       }
//     }
//   ];
//   const mergedColumns = columns.map((col) => {
//     if (!col.editable) {
//       return col;
//     }
//     return {
//       ...col,
//       onCell: (record) => ({
//         record,
//         inputType: col.dataIndex === 'age' ? 'number' : 'text',
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record)
//       })
//     };
//   });
//   return (
//     <Form form={form} component={false}>
//       <Table
//         components={{
//           body: {
//             cell: EditableCell
//           }
//         }}
//         bordered
//         dataSource={data}
//         columns={mergedColumns}
//         rowClassName="editable-row"
//         pagination={{
//           onChange: cancel
//         }}
//       />
//     </Form>
//   );
// };
// export default ViewAllKhuSinhHoat;
