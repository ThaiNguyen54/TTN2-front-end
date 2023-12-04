import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, Typography, Modal, Space, Select, DatePicker } from 'antd';
import axios from 'axios';
import HocVienKhuSinhHoat from 'data/HV_KhuSinhHoat.json';
import host from '../../axios/host';


const DangKyKhuSinhHoat = () => {
  const { Title } = Typography;

  const [khuSinhHoatData, SetKhuSinhHoatData] = useState([]);
  const [HV_KSH, SetHVKSH] = useState(HocVienKhuSinhHoat);

  const dateFormat = 'YYYY-MM-DD';

  const GetAllKhuSinhHoat = async () => {
    try {
      const res = await axios.get('http://localhost:3001/ttn2/v1/khusinhhoat').then((res) => {
        SetKhuSinhHoatData(res.data.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onKhuSinhHoatChange = (value) => {
    console.log('selected: ', value);
    SetHVKSH({ ...HV_KSH, id_khu_sh: value });
  };

  const onNgayOChange = (date, dateString) => {
    console.log(date, dateString);
    SetHVKSH({ ...HV_KSH, NgayBatDauO: dateString });
  };

  const onChuyenKhuChange = (date, dateString) => {
    console.log(date, dateString);
    SetHVKSH({ ...HV_KSH, NgayChuyenKhu: dateString });
  };

  useEffect(() => {
    GetAllKhuSinhHoat();
  }, []);

  const success = () => {
    Modal.success({
      content: 'Đăng ký khu sinh hoạt cho học viên thành công'
    });
  };

  const errorModal = () => {
    Modal.error({
      title: 'Thêm khu sinh hoạt thất bại',
      content: 'Đã có lỗi xảy ra. Xin vui lòng thử lại'
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(HV_KSH);
      const res = await axios.post(`${host.local}/ttn2/v1/hocvien_khusinhhoat`, HV_KSH).then((result) => {
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
      <Title style={{ color: '#00A9FF' }}> Đăng ký khu sinh hoạt cho học viên </Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>
      <Form.Item
        name="khusinhhoat"
        rules={[
          {
            required: true,
            message: 'Xin hãy chọn 1 khu sinh hoạt'
          }
        ]}
        label="Chọn khu sinh hoạt"
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Select
            showSearch
            defaultValue="-- Chọn khu sinh hoạt --"
            style={{
              width: '100%'
            }}
            onChange={onKhuSinhHoatChange}
            optionFilterProp="children"
            filterOption={(input, option) => (option?.label ?? '').includes(input)}
            options={khuSinhHoatData.map((khusinhhoat) => ({
              label: khusinhhoat.TenKhu,
              value: khusinhhoat.id
            }))}
          />
        </Space>
      </Form.Item>

      <Form.Item
        name="cccd"
        rules={[
          {
            required: true,
            message: 'Xin hãy nhập số căn cước của học viên'
          }
        ]}
        label="Căn cước công dân học viên"
      >
        <Input
          onChange={(e) => {
            SetHVKSH({ ...HV_KSH, cccd: e.target.value });
          }}
        />
      </Form.Item>

      <Form.Item
        name="ngayo"
        rules={[
          {
            required: true,
            message: 'Xin hãy nhập ngày bắt đầu ở của học viên'
          }
        ]}
        label="Ngày ở"
      >
        <DatePicker onChange={onNgayOChange} format={dateFormat} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="ngaychuyen"
        rules={[
          {
            required: true,
            message: 'Xin hãy nhập ngày chuyển khu của học viên'
          }
        ]}
        label="Ngày chuyển khu"
      >
        <DatePicker onChange={onChuyenKhuChange} format={dateFormat} style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item label=" ">
        <Button onClick={handleSubmit} type="primary" htmlType="submit" style={{ marginTop: '20px' }}>
          Đăng ký khu sinh hoạt cho học viên
        </Button>
      </Form.Item>
    </Form>
  );
};
export default DangKyKhuSinhHoat;
