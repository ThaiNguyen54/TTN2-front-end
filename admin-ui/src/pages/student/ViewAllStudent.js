import { Typography, Divider, Row, Col, DatePicker } from 'antd';
import React, { useState, useEffect } from 'react';
import { Form, Input, Radio, Button } from 'antd';
import { Select, Space } from 'antd';
import axios from 'axios';
import HocVienData from 'data/HocVien.json';
import HV_CNTN from 'data/HV_CNTuNguyen.json';

const VewAllStudent = () => {
  const { Title } = Typography;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [gender, SetGender] = useState(0);
  const [file, SetFile] = useState('');
  const [treatmentForm, SetTreatmentForm] = useState('tunguyen');
  const [division, SetDivision] = useState([]);
  const [district, SetDistrict] = useState([]);
  const [ward, SetWard] = useState([]);
  const [disableDistrict, SetDisableDistrict] = useState(true);
  const [defaultDistrictValue, SetDefaultDistrictValue] = useState('-- Chọn Quận/Huyện --');
  const [disableWard, SetDisableWard] = useState(true);
  const [defaultWardValue, SetDefaultWardValue] = useState('-- Chọn Phường/Xã --');

  const [inputNameValidationStatus, SetInputNameValidationStatus] = useState({});

  const [hocVienInputData, SetHocVienInputData] = useState(HocVienData);
  const [hocVienCNTNData, SetHocVienCNTNData] = useState(HV_CNTN);
  const handleSelectFile = (e) => SetFile(e.target.files[0]);

  const handleSubmit = async (event) => {
    console.log('calling api');
    event.preventDefault();

    try {
      const values = await form.validateFields().then();
      if (inputNameValidationStatus.validateStatus !== 'error') {
        const res = await axios.post('http://localhost:3001/ttn2/v1/hocvien', hocVienInputData).then((result) => {
          console.log(result);
        });

        const result_HocVienCNTN = await axios.post('http://localhost:3001/ttn2/v1/cntn', hocVienCNTNData).then((resulte) => {
          console.log(resulte);
        });
      } else {
        console.log('ten phai la tieng viet co dau');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const dateFormat = 'YYYY-MM-DD';

  const getVietnameseAdministrativeDivision = async () => {
    await axios.get('https://provinces.open-api.vn/api/?depth=3').then((response) => {
      SetDivision(response.data);
    });
  };

  useEffect(() => {
    getVietnameseAdministrativeDivision();
  }, []);

  const onNameChange = (e) => {
    // console.log('name: ', e.target.value);
    const vietnameseRegex =
      /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u;
    if (vietnameseRegex.test(e.target.value) === true) {
      SetHocVienInputData({ ...hocVienInputData, Ho: e.target.value.split(' ')[0], Ten: e.target.value.split(' ').slice(1).join(' ') });
      SetInputNameValidationStatus({
        validateStatus: 'success',
        help: ''
      });
    } else if (vietnameseRegex.test(e.target.value) === false) {
      SetHocVienInputData({ ...hocVienInputData, Ho: '', Ten: '' });
      SetInputNameValidationStatus({
        validateStatus: 'error',
        help: <span style={{ color: 'red' }}>Họ tên phải là tiếng Việt có dấu</span>
      });
    } else {
      SetInputNameValidationStatus({});
    }
  };

  const onGenderChange = (e) => {
    console.log('radio checked', e.target.value);
    SetGender(e.target.value);
    SetHocVienInputData({ ...hocVienInputData, GioiTinh: e.target.value });
    console.log(hocVienInputData);
  };

  const onDetoxFormChange = (e) => {
    console.log('radio checked', e.target.value);
    SetTreatmentForm(e.target.value);
  };

  const handleChangeRace = (value) => {
    console.log(`selected ${value}`);
    SetHocVienInputData({ ...hocVienInputData, DanToc: value });
  };

  const handleChangeProvinceCity = (value) => {
    console.log(`selected ${value}`);
    const filteredProvinceCityResult = division.filter((division) => division.codename === value);
    SetDistrict(filteredProvinceCityResult[0].districts);
    SetDisableDistrict(false);
    SetDefaultDistrictValue(filteredProvinceCityResult[0].districts[0].name);
    SetHocVienInputData({
      ...hocVienInputData,
      Tinh: filteredProvinceCityResult[0].name,
      Huyen: filteredProvinceCityResult[0].districts[0].name,
      DonVi: filteredProvinceCityResult[0].districts[0].wards[0].name
    });
    if (filteredProvinceCityResult[0].districts[0].wards.length > 0) {
      SetDisableWard(false);
      SetWard(filteredProvinceCityResult[0].districts[0].wards);
      SetDefaultWardValue(filteredProvinceCityResult[0].districts[0].wards[0].name);
    }
  };
  const onChangeDistrict = (value) => {
    const filteredDistrictResult = district.filter((district) => district.codename === value);
    SetDefaultDistrictValue(value);
    SetWard(filteredDistrictResult[0].wards);
    if (filteredDistrictResult[0].wards.length > 0) {
      SetDefaultWardValue(filteredDistrictResult[0].wards[0].name);
      SetHocVienInputData({ ...hocVienInputData, DonVi: filteredDistrictResult[0].wards[0].name });
      SetDisableWard(false);
    } else {
      SetDefaultWardValue('');
      SetDisableWard(true);
    }
    SetHocVienInputData({ ...hocVienInputData, Huyen: filteredDistrictResult[0].name });
  };

  const handleChangeWard = (value) => {
    console.log(`Selected: ${value}`);
    SetDefaultWardValue(value);
    SetHocVienInputData({ ...hocVienInputData, DonVi: value.label });
  };

  const handleChangeMarriageStatus = (value) => {
    console.log(`selected ${value.label}`);
    SetHocVienInputData({ ...hocVienInputData, TinhTrangHN: value.label });
  };

  const handleChangeAcademicLevel = (value) => {
    console.log(`selected ${value.label}`);
    SetHocVienInputData({ ...hocVienInputData, TrinhDo: value.label });
  };

  const handleChangeReligion = (value) => {
    console.log(`selected ${value.label}`);
    SetHocVienInputData({ ...hocVienInputData, TonGiao: value.label });
  };

  const handleChangeActivityArea = (value) => {
    console.log(`selected ${value}`);
  };

  const onDateChange = (date, dateString) => {
    console.log(date, dateString);
    SetHocVienInputData({ ...hocVienInputData, NgaySinh: dateString });
    console.log(hocVienInputData);
  };

  const onNgayCapCCCDChange = (date, dateString) => {
    SetHocVienInputData({ ...hocVienInputData, NgayCapCCCD: dateString });
  };

  const onChangeCoQuanBanGiao = (value) => {
    SetHocVienInputData({ ...hocVienInputData, CoQuanBanGiao: value.label });
  };

  const onThanhPhanGiaDinhChange = (value) => {
    SetHocVienInputData({ ...hocVienInputData, ThanhPhanGiaDinh: value.label });
  };

  const onMaTuyChange = (value) => {
    SetHocVienInputData({ ...hocVienInputData, LoaiMaTuySD: value.label });
  };

  const onThanhPhanBanThanChange = (value) => {
    SetHocVienInputData({ ...hocVienInputData, ThanhPhanBanThan: value.label });
  };

  const onNgayThanhLyHopDongChange = (date, dateString) => {
    SetHocVienCNTNData({ ...hocVienCNTNData, NgayThanhLyHopDong: dateString });
  };

  const onNgayCapGiayHoanThanhChange = (date, dateString) => {
    SetHocVienCNTNData({ ...hocVienCNTNData, NgayCapGiayHoanThanh: dateString });
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

      {/* Form for "Thông tin đối tượng" */}
      <Title level={4} style={{ color: '#00A9FF' }}>
        I. Thông tin cá nhân đối tượng{' '}
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
            labelWrap
            labelCol={{ flex: '200px' }}
            colon={false}
            labelAlign="left"
            initialValues={{
              layout: formLayout
            }}
          >
            <Form.Item
              label="Họ tên"
              name="hoten"
              validateStatus={inputNameValidationStatus.validateStatus}
              help={inputNameValidationStatus.help}
              rules={[
                {
                  required: true,
                  message: 'Nhập họ tên'
                }
              ]}
            >
              <Input onChange={onNameChange} />
            </Form.Item>

            <Form.Item label="Giới tính">
              <Radio.Group onChange={onGenderChange} value={gender}>
                <Radio value={'Nam'}>Nam</Radio>
                <Radio value={'Nữ'}>Nữ</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Ngày sinh">
              <DatePicker onChange={onDateChange} format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Nơi đăng kí thường trú">
              <Input onChange={(e) => SetHocVienInputData({ ...hocVienInputData, DCThuongTru: e.target.value })} />
            </Form.Item>

            <Form.Item label="Ngày cấp CMND">
              <DatePicker format={dateFormat} style={{ width: '100%' }} onChange={onNgayCapCCCDChange} />
            </Form.Item>

            <Form.Item label="Dân tộc">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  showSearch
                  defaultValue="-- Chọn dân tộc -- "
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeRace}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  options={[
                    {
                      value: 'Kinh',
                      label: 'Kinh'
                    },
                    {
                      value: 'Tày',
                      label: 'Tày'
                    },
                    {
                      value: 'Thái',
                      label: 'Thái'
                    },
                    {
                      value: 'Hoa',
                      label: 'Hoa'
                    },
                    {
                      value: 'Khác',
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
                  defaultValue="-- Chọn Tỉnh/Thành Phố --"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeProvinceCity}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  options={division.map((division) => ({
                    label: division.name,
                    value: division.codename
                  }))}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Đơn vị">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  labelInValue={true}
                  showSearch
                  onChange={handleChangeWard}
                  value={defaultWardValue}
                  disabled={disableWard}
                  style={{
                    width: '100%'
                  }}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  options={ward.map((ward) => ({
                    label: ward.name,
                    value: ward.codename
                  }))}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Tình trạng hôn nhân">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  labelInValue={true}
                  defaultValue="-- Chọn tình trạng hôn nhân --"
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
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, NamSudung: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Tiền sự">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, TienSu: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Khu sinh hoạt">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  labelInValue={true}
                  showSearch
                  defaultValue="-- Chọn khu sinh hoạt --"
                  style={{
                    width: '100%'
                  }}
                  onChange={handleChangeActivityArea}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label ?? '').includes(input)}
                  options={[
                    {
                      value: 'nam1',
                      label: 'Khu quản lý học viên nam 1'
                    },
                    {
                      value: 'nam2',
                      label: 'Khu quản lý học viên nam 2'
                    },
                    {
                      value: 'nam3',
                      label: 'Khu quản lý học viên nam 3'
                    },
                    {
                      value: 'catcon',
                      label: 'Khu quản lý học viên cắt cơn'
                    },
                    {
                      value: 'nu',
                      label: 'Khu quản lý học viên nữ'
                    },
                    {
                      value: 'nam-baove',
                      label: 'Phòng bảo vệ - Khu quản lý học viên nam'
                    },
                    {
                      value: 'tunguyen',
                      label: 'Khu quản lý học viên cai nghiện tự nguyện'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Cơ quan bàn giao">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  labelInValue={true}
                  defaultValue="-- Chọn cấp cơ quan bàn giao --"
                  style={{
                    width: '100%'
                  }}
                  onChange={onChangeCoQuanBanGiao}
                  options={[
                    {
                      value: 'xa',
                      label: 'Cấp xã'
                    },
                    {
                      value: 'huyen',
                      label: 'Cấp huyện'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Thành phần gia đình">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  labelInValue={true}
                  defaultValue="-- Chọn thành phần gia đình -- "
                  style={{
                    width: '100%'
                  }}
                  onChange={onThanhPhanGiaDinhChange}
                  options={[
                    {
                      value: 'congnhan',
                      label: 'Công nhân'
                    },
                    {
                      value: 'nongdan',
                      label: 'Nông dân'
                    },
                    {
                      value: 'laodong',
                      label: 'Lao động'
                    },
                    {
                      value: 'congchuc',
                      label: 'Công chức'
                    },
                    {
                      value: 'doanhnhan',
                      label: 'Doanh nhân'
                    },
                    {
                      value: 'khac',
                      label: 'Khác'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Loại ma túy sử dụng">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  labelInValue={true}
                  defaultValue="-- Loại ma túy đã sử dụng --"
                  style={{
                    width: '100%'
                  }}
                  onChange={onMaTuyChange}
                  options={[
                    {
                      value: 'thuocphien',
                      label: 'Thuốc phiện'
                    },
                    {
                      value: 'heroin',
                      label: 'Heroin'
                    },
                    {
                      value: 'cansa',
                      label: 'Cần sa'
                    },
                    {
                      value: 'boda',
                      label: 'Bồ đà'
                    },
                    {
                      value: 'matuyda',
                      label: 'Ma túy đá'
                    },
                    {
                      value: 'ketamin',
                      label: 'Ketamin'
                    },
                    {
                      value: 'thuoclac',
                      label: 'Thuốc lắc'
                    },
                    {
                      value: 'tanduoc',
                      label: 'Tân dược gây nghiện'
                    },
                    {
                      value: 'nhieumatuy',
                      label: 'Sử dụng nhiều loại ma túy'
                    }
                  ]}
                />
              </Space>
            </Form.Item>
            <Form.Item label="Cơ quan xác định tình trạng nghiện">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, CoQuanXacDinhTinhTrangNghien: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Tuổi lần đầu sử dụng">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, TuoiLanDauSuDung: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Tuổi lần đầu tiêm chích">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, TuoiLanDauTiemChich: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Tổng thời gian sử dụng">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, TongThoiGianSuDung: e.target.value });
                }}
              />
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
            labelWrap
            colon={false}
            labelAlign="left"
            initialValues={{
              layout: formLayout
            }}
          >
            <Form.Item label="Tên khác">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, TenKhac: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Trình độ">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  labelInValue={true}
                  defaultValue="-- Trình độ học vấn --"
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
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, ViecLam: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Số CMND">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, cccd: e.target.value });
                  SetHocVienCNTNData({ ...hocVienCNTNData, cccd: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Nơi cấp CMND">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, NoiCapCCCD: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Tôn giáo">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  labelInValue={true}
                  defaultValue="-- Chọn tôn giáo --"
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
                  value={defaultDistrictValue}
                  style={{
                    width: '100%'
                  }}
                  disabled={disableDistrict}
                  onChange={onChangeDistrict}
                  optionFilterProp="children"
                  filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={district.map((district) => ({
                    label: district.name,
                    value: district.codename
                  }))}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Hình ảnh">
              <input type="file" name="file" id="file" onChange={handleSelectFile} multiple={false} />
            </Form.Item>

            <Form.Item label="Hình thức sử dụng">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, HinhThucSuDung: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Tiền án">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, TienAn: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Trong tháng trở lại đây">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, SoNgayLanSuDung: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Nguyên nhân tái nghiện">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, NguyenNhanTaiNghien: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Lý do giam">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, LyDoGiam: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Thành phần bản thân">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  labelInValue={true}
                  defaultValue="-- Chọn thành phần bản thân --"
                  style={{
                    width: '100%'
                  }}
                  onChange={onThanhPhanBanThanChange}
                  options={[
                    {
                      value: 'hocsinh',
                      label: 'Học sinh'
                    },
                    {
                      value: 'sinhvien',
                      label: 'Sinh viên'
                    },
                    {
                      value: 'canbo-congchuc-viecchuc',
                      label: 'Cán bộ - Công chức - Viên chức'
                    },
                    {
                      value: 'congnhan',
                      label: 'Công nhân'
                    },
                    {
                      value: 'nongdan',
                      label: 'Nông dân'
                    },
                    {
                      value: 'kinhdoanh-muaban',
                      label: 'Kinh doanh - mua bán'
                    },
                    {
                      value: 'tudo',
                      label: 'Lao động tự do'
                    },
                    {
                      value: 'khac',
                      label: 'Khác'
                    }
                  ]}
                />
              </Space>
            </Form.Item>

            <Form.Item label="Tình trạng việc làm">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, TinhTrangViecLam: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Nhập mới">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, NhapMoi: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Trốn nhập lại">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, TronNhapLai: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Điện Thoại">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, DienThoai: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Ghi chú">
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, GhiChu: e.target.value });
                }}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>

      {/* Form for "Thôn tin hình thức cai nghiện "*/}
      <Title level={4} style={{ color: '#00A9FF' }}>
        II. Thông tin hình thức cai nghiện
      </Title>
      <Form.Item label="Hình thức cai nghiện" style={{ marginTop: '20px' }}>
        <Radio.Group defaultValue="tunguyen" buttonStyle="solid" onChange={onDetoxFormChange}>
          <Radio.Button value="tunguyen">Tự nguyện</Radio.Button>
          <Radio.Button value="batbuoc">Bắt buộc</Radio.Button>
        </Radio.Group>
      </Form.Item>

      {/* Form for "cai nghiện tự nguyện" */}
      {treatmentForm === 'tunguyen' && (
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
              labelWrap
              labelCol={{ flex: '200px' }}
              colon={false}
              labelAlign="left"
              initialValues={{
                layout: formLayout
              }}
            >
              <Form.Item label="Tự nguyện đóng phí">
                <Input
                  onChange={(e) => {
                    SetHocVienCNTNData({ ...hocVienCNTNData, TuNguyenDongPhi: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Tự nguyện tại cộng đồng">
                <Input
                  onChange={(e) => {
                    SetHocVienCNTNData({ ...hocVienCNTNData, TuNguyenTaiCongDong: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Số hợp đồng">
                <Input
                  onChange={(e) => {
                    SetHocVienCNTNData({ ...hocVienCNTNData, SoHopDong: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Người giám hộ (đối với người cai nghiện từ đủ 12 tuổi đến dưới 18 tuổi)">
                <Input
                  onChange={(e) => {
                    SetHocVienCNTNData({ ...hocVienCNTNData, NguoiGiamHo: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Thời hạn hợp đồng">
                <Input
                  onChange={(e) => {
                    SetHocVienCNTNData({ ...hocVienCNTNData, ThoiHanHopDong: e.target.value });
                  }}
                />
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
              labelWrap
              colon={false}
              labelAlign="left"
              initialValues={{
                layout: formLayout
              }}
            >
              <Form.Item label="Ngày thanh lý hợp đồng">
                <DatePicker onChange={onNgayThanhLyHopDongChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Ngày cấp giấy hoàn thành">
                <DatePicker onChange={onNgayCapGiayHoanThanhChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Số giấy hoàn thành">
                <Input
                  onChange={(e) => {
                    SetHocVienCNTNData({ ...hocVienCNTNData, SoGiayHoanThanh: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Các giai đoạn cai nghiện">
                <Input
                  onChange={(e) => {
                    SetHocVienCNTNData({ ...hocVienCNTNData, CacGiaiDoanCaiNghien: e.target.value });
                  }}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )}

      {/* Form for "cai nghiện bắt buộc"*/}
      {treatmentForm === 'batbuoc' && (
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
              labelWrap
              labelCol={{ flex: '200px' }}
              colon={false}
              labelAlign="left"
              initialValues={{
                layout: formLayout
              }}
            >
              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px' }}>
                Tạm giữ xác định tình trạng nghiện
              </Title>

              <Form.Item label="Số quyết định tạm giữ">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày ký quyết định tạm giữ">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày có kết quả nghiện">
                <Input />
              </Form.Item>

              <Form.Item label="Kết quả">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày hoàn thành xác định tình trạng nghiện">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Theo quyết định quản lý
              </Title>

              <Form.Item label="Số quyết định quản lý">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày ký quyết định">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Tiền án
              </Title>

              <Form.Item label="Tiền án ma túy hoặc tiền án khác">
                <Input />
              </Form.Item>

              <Form.Item label="Tội danh">
                <Input />
              </Form.Item>

              <Form.Item label="Thời hạn tù">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Tiền sự
              </Title>

              <Form.Item label="Số lần cai">
                <Input />
              </Form.Item>

              <Form.Item label="Nơi cai nghiện">
                <Input />
              </Form.Item>

              <Form.Item label="Khác">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Tài sản
              </Title>

              <Form.Item label="Loại tài sản">
                <Input />
              </Form.Item>

              <Form.Item label="Tình trạng tài sản">
                <Input />
              </Form.Item>

              <Form.Item label="Bàn giao (nơi nhận hoặc người thân)">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày giao">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Kỷ luật
              </Title>

              <Form.Item label="Số quyết định kỷ luật">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày ra quyết định">
                <Input />
              </Form.Item>

              <Form.Item label="Thời hạn kỷ luật">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày vi phạm">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày hết hạn kỷ luật">
                <Input />
              </Form.Item>

              <Form.Item label="Hình thức kỷ luật">
                <Input />
              </Form.Item>

              <Form.Item label="Hành vi vi phạm khác">
                <Input />
              </Form.Item>

              <Form.Item label="Khác">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Khen thưởng
              </Title>

              <Form.Item label="Số quyết định khen thưởng">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày ra quyết định">
                <Input />
              </Form.Item>

              <Form.Item label="Hình thức khen thưởng">
                <Input />
              </Form.Item>

              <Form.Item label="Khác">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Thăm gặp
              </Title>

              <Form.Item label="Họ tên người thăm">
                <Input />
              </Form.Item>

              <Form.Item label="Mối quan hệ">
                <Input />
              </Form.Item>

              <Form.Item label="Số người thăm">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày thăm">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Chuyển viện
              </Title>

              <Form.Item label="Nơi chuyển viện">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày chuyển viện">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày nhập lại">
                <Input />
              </Form.Item>

              <Form.Item label="Thông tin liên hệ gia đình">
                <Input />
              </Form.Item>

              <Form.Item label="Ghi chú">
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
              labelWrap
              colon={false}
              labelAlign="left"
              initialValues={{
                layout: formLayout
              }}
            >
              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px' }}>
                Tòa án
              </Title>

              <Form.Item label="Ngày họp - Ngày quyết định">
                <Input />
              </Form.Item>

              <Form.Item label="Giờ họp">
                <Input />
              </Form.Item>

              <Form.Item label="Hình thức họp">
                <Input />
              </Form.Item>

              <Form.Item label="Thẩm phán phiên họp">
                <Input />
              </Form.Item>

              <Form.Item label="Thư ký phiên họp">
                <Input />
              </Form.Item>

              <Form.Item label="Hoãn phiên họp">
                <Input />
              </Form.Item>

              <Form.Item label="Khiếu nại">
                <Input />
              </Form.Item>

              <Form.Item label="Tình trạng xử lý đơn vắng mặt">
                <Input />
              </Form.Item>

              <Form.Item label="Số quyết định tòa án">
                <Input />
              </Form.Item>

              <Form.Item label="Thời hạn quyết định">
                <Input />
              </Form.Item>

              <Form.Item label="Nơi chấp hành quyết định">
                <Input />
              </Form.Item>

              <Form.Item label="Ghi chú">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Di lý
              </Title>

              <Form.Item label="Công văn di lý">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày di lý">
                <Input />
              </Form.Item>

              <Form.Item label="Cơ quan nhận">
                <Input />
              </Form.Item>

              <Form.Item label="Thời gian di lý">
                <Input />
              </Form.Item>

              <Form.Item label="Thời gian gia hạn di lý">
                <Input />
              </Form.Item>

              <Form.Item label="Số quyết định đưa ra khỏi cơ sở">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày nhập lại hoặc cắt giảm">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Trốn viện - Trốn phép
              </Title>

              <Form.Item label="Ngày trốn viện/trốn phép">
                <Input />
              </Form.Item>

              <Form.Item label="Số thông báo">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày ra thông báo">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày cắt giảm">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Chuyển cơ sở
              </Title>

              <Form.Item label="Ngày chuyển cơ sở">
                <Input />
              </Form.Item>

              <Form.Item label="Cán bộ bàn giao">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Bàn giao cho cơ quan khác
              </Title>

              <Form.Item label="Số văn bản bàn giao">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày ra văn bản">
                <Input />
              </Form.Item>

              <Form.Item label="Ngày giao">
                <Input />
              </Form.Item>

              <Form.Item label="Lý do bàn giao">
                <Input />
              </Form.Item>

              <Form.Item label="Cán bộ bên nhận">
                <Input />
              </Form.Item>

              <Form.Item label="Cơ quan nhận">
                <Input />
              </Form.Item>

              <Form.Item label="Thông tin liên lạc bên nhận (Số điện thoại)">
                <Input />
              </Form.Item>

              <Form.Item label="Cán bộ giải quyết">
                <Input />
              </Form.Item>

              <Form.Item label="Lãnh đạo giao - chức vụ">
                <Input />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      )}

      {/* Form for "Thông tin gia đình" */}
      <Title level={4} style={{ color: '#00A9FF' }}>
        III. Thông tin gia đình
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
            labelWrap
            labelCol={{ flex: '200px' }}
            colon={false}
            labelAlign="left"
            initialValues={{
              layout: formLayout
            }}
          >
            <Form.Item label="Họ tên cha">
              <Input />
            </Form.Item>

            <Form.Item label="Họ tên mẹ">
              <Input />
            </Form.Item>

            <Form.Item label="Nơi ở cha">
              <Input />
            </Form.Item>

            <Form.Item label="Họ tên vợ/chồng">
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
            labelWrap
            colon={false}
            labelAlign="left"
            initialValues={{
              layout: formLayout
            }}
          >
            <Form.Item label="Ngày sinh cha">
              <DatePicker format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Ngày sinh mẹ">
              <DatePicker format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Nơi ở mẹ">
              <Input />
            </Form.Item>

            <Form.Item label="Ngày sinh vợ/chồng">
              <DatePicker format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Form.Item label="" style={{ marginTop: '10px' }}>
        <Button block type="primary" htmlType="submit" style={{ width: '20%' }} onClick={handleSubmit}>
          Đăng ký học viên
        </Button>
      </Form.Item>
    </div>
  );
};
export default VewAllStudent;
