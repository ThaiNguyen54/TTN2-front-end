import { Typography, Divider, Row, Col, DatePicker } from 'antd';
import React, { useState } from 'react';
import { Form, Input, Radio } from 'antd';
import { Select, Space, Button } from 'antd';
import {UploadOutlined} from "@ant-design/icons";

const VewAllStudent = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [gender, SetGender] = useState(0);
  const [file, setFile] = useState('');

  const handleSelectFile = (e) => setFile(e.target.files[0]);

  const onGenderChange = (e) => {
    console.log('radio checked', e.target.value);
    SetGender(e.target.value);
  };

  const handleChangeRace = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeProvinceCity = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeMarriageStatus = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeAcademicLevel = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeReligion = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChangeDistrict = (value) => {
    console.log(`selected ${value}`);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
          labelCol: {
            span: 4
          },
          wrapperCol: {
            span: 14
          }
        }
      : null;

  return (
    <div>
      <Title style={{ color: '#00A9FF' }}> Đăng Kí Đối Tượng </Title>
      <Divider style={{ marginBottom: '50px' }}></Divider>
      <Title level={4} style={{ color: '#00A9FF' }}>
        {' '}
        Thông tin cá nhân đối tượng{' '}
      </Title>
      <Row
        style={{
          border: '1px solid #d9d9d9',
          borderRadius: '4px', // optional: add border-radius for rounded corners
          padding: '16px'
        }}
      >
        {/*  First column */}
        <Col span={12}>
          <Form
            {...formItemLayout}
            layout={formLayout}
            form={form}
            labelCol={{ flex: '200px' }}
            colon={false}
            labelAlign="left"
            initialValues={{
              layout: formLayout
            }}
          >
            <Form.Item label="Họ tên">
              <Input />
            </Form.Item>

            <Form.Item label="Giới tính">
              <Radio.Group onChange={onGenderChange} value={gender}>
                <Radio value={0}>Nam</Radio>
                <Radio value={1}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Ngày sinh">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Nơi đăng kí thường trú">
              <Input />
            </Form.Item>

            <Form.Item label="Ngày cấp CMND">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Dân tộc">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  showSearch
                  defaultValue="Chọn dân tộc"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeRace}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  options={[
                    {
                      value: 'kinh',
                      label: 'Kinh'
                    },
                    {
                      value: 'tay',
                      label: 'Tày'
                    },
                    {
                      value: 'thai',
                      label: 'Thái'
                    },
                    {
                      value: 'hoa',
                      label: 'Hoa'
                    },
                    {
                      value: 'khac',
                      label: 'Khác'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Tỉnh">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  showSearch
                  defaultValue="Chọn Tỉnh/TP"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeProvinceCity}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={[
                    {
                      value: 'angiang',
                      label: 'An Giang'
                    },
                    {
                      value: 'brvt',
                      label: 'Bà Rịa - Vũng Tàu'
                    },
                    {
                      value: 'tpdn',
                      label: 'TP. Đà Nẵng'
                    },
                    {
                      value: 'daklak',
                      label: 'Đắk Lắk'
                    },
                    {
                      value: 'tphcm',
                      label: 'TP. Hồ Chí Minh'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Đơn vị">
              <Input />
            </Form.Item>

            <Form.Item label="Tình trạng hôn nhân">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  defaultValue="Chưa đăng kí kết hôn"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeMarriageStatus}
                  options={[
                    {
                      value: 'notmarried',
                      label: 'Chưa đăng kí kết hôn'
                    },
                    {
                      value: 'married',
                      label: 'Đã đăng kí kết hôn'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Năm sử dụng">
              <Input />
            </Form.Item>

            <Form.Item label="Tiền sự">
              <Input />
            </Form.Item>
          </Form>
        </Col>

        {/*  Second column */}
        <Col span={12}>
          <Form
            {...formItemLayout}
            layout={formLayout}
            form={form}
            labelCol={{ flex: '200px' }}
            colon={false}
            labelAlign="left"
            initialValues={{
              layout: formLayout
            }}
          >
            <Form.Item label="Tên khác">
              <Input />
            </Form.Item>

            <Form.Item label="Trình độ">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  defaultValue="Trình độ học vấn"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeAcademicLevel}
                  options={[
                    {
                      value: 'dh',
                      label: 'Đại học'
                    },
                    {
                      value: '12',
                      label: '12/12'
                    },
                    {
                      value: '9',
                      label: '9/12'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Việc làm">
              <Input />
            </Form.Item>

            <Form.Item label="Số CMND">
              <Input />
            </Form.Item>

            <Form.Item label="Nơi cấp CMND">
              <Input />
            </Form.Item>

            <Form.Item label="Tôn giáo">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  defaultValue="Không"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeReligion}
                  options={[
                    {
                      value: 'noreligion',
                      label: 'Không'
                    },
                    {
                      value: 'buddhism',
                      label: 'Đạo Phật'
                    },
                    {
                      value: 'Christianity',
                      label: 'Đạo Chúa'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Huyện">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  showSearch
                  defaultValue="Quận/Huyện"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeDistrict}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={[
                    {
                      value: 'dis1',
                      label: 'Quận 1'
                    },
                    {
                      value: 'chaudoc',
                      label: 'Châu Đốc'
                    },
                    {
                      value: 'dis2',
                      label: 'Quận 2'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Hình ảnh">
              <input type="file" name="file" id="file" onChange={handleSelectFile} multiple={false} />
            </Form.Item>

            <Form.Item label="Hình thức sử dụng">
              <Input />
            </Form.Item>

            <Form.Item label="Tiền án">
              <Input />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};
export default VewAllStudent;
