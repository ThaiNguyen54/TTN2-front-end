import React, { useState } from 'react';
import { Button, Divider, Form, Input, Typography, Modal, DatePicker } from 'antd';
import axios from 'axios';
import ThamGapData from '../../data/ThamGap.json';
import host from '../../axios/host';
import Global from '../../constant/Global';

const AddThamGap = () => {
  const { Title } = Typography;

  const [ThamGap, SetThamGap] = useState(ThamGapData);
  const [form] = Form.useForm();

  const dateFormat = 'YYYY-MM-DD';

  const onNgayThamGapChange = (date, dateString) => {
    SetThamGap({ ...ThamGap, NgayThamGap: dateString });
  };

  const success = () => {
    Modal.success({
      content: 'Đăng ký thăm gặp thành công'
    });
  };

  const errorModal = () => {
    Modal.error({
      title: 'Đã có lỗi xảy ra',
      content: 'Đã có lỗi xảy ra. Xin vui lòng thử lại'
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const row = await form.validateFields();
    try {
      const res = await axios
        .post(`${host.BASE_URL}/${host.API.BASE_END_POINT}/thamgap`, ThamGap, {
          headers: {
            access_token: localStorage.getItem(Global.key.token)
          }
        })
        .then((result) => {
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
        span: 8
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
      <Title style={{ color: '#00A9FF' }}>Đăng ký thăm gặp</Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>
      <Form.Item
        name="cccd"
        rules={[
          {
            required: true,
            message: 'Nhập căn cước công dân học viên'
          }
        ]}
        label="cccd"
      >
        <Input
          onChange={(e) => {
            SetThamGap({ ...ThamGap, cccdHocVien: e.target.value });
          }}
        />
      </Form.Item>

      <Form.Item
        name="idnguoithan"
        rules={[
          {
            required: true,
            message: 'Nhập id người thân'
          }
        ]}
        label="Id người thân"
      >
        <Input
          onChange={(e) => {
            SetThamGap({ ...ThamGap, idNguoiThan: e.target.value });
          }}
        />
      </Form.Item>

      <Form.Item
        name="ngaythamgap"
        rules={[
          {
            required: true,
            message: 'Chọn ngày thăm gặp'
          }
        ]}
        label="Ngày thăm gặp"
      >
        <DatePicker onChange={onNgayThamGapChange} format={dateFormat} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label=" ">
        <Button onClick={handleSubmit} type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
          Thêm hàng hóa
        </Button>
      </Form.Item>
    </Form>
  );
};
export default AddThamGap;
