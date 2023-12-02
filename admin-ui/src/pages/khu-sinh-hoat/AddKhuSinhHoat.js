import React, { useState } from 'react';
import { Button, Divider, Form, Input, Typography, Modal } from 'antd';
import axios from 'axios';
const AddKhuSinhHoat = () => {
  const { Title } = Typography;

  const [khuSinhHoatData, SetKhuSinhHoatData] = useState({ TenKhu: '' });

  const success = () => {
    Modal.success({
      content: 'Thêm khu sinh hoạt thành công'
    });
  };

  const errorModal = () => {
    Modal.error({
      title: 'Thêm khu sinh hoạt thất bại',
      content: 'Đã có lỗi xảy ra trong quá trình thêm khu sinh hoạt. Xin vui lòng thử lại'
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/ttn2/v1/khusinhhoat', khuSinhHoatData).then((result) => {
        console.log(result);
        success();
      });
    } catch (error) {
      errorModal();
      console.log(error);
    }
  };

  return (
    <Form
      labelCol={{
        span: 4
      }}
      wrapperCol={{
        span: 14
      }}
      layout="horizontal"
      initialValues={{
        size: 'default'
      }}
      size="default"
      style={{
        maxWidth: 600
      }}
      colon={false}
    >
      <Title style={{ color: '#00A9FF' }}> Thêm Khu Sinh Hoạt </Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>
      <Form.Item
        name="khusinhhoat"
        rules={[
          {
            required: true,
            message: 'Nhập tên khu sinh hoạt'
          }
        ]}
        label="Tên Khu"
      >
        <Input
          onChange={(e) => {
            SetKhuSinhHoatData({ ...khuSinhHoatData, TenKhu: e.target.value });
          }}
        />
      </Form.Item>

      <Form.Item label=" ">
        <Button onClick={handleSubmit} type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
          Thêm khu sinh hoạt
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddKhuSinhHoat;
