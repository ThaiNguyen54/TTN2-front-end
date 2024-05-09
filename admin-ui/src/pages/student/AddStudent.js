import { Typography, Divider, Row, Col, DatePicker, Modal, Spin } from 'antd';
import React, { useState, useEffect } from 'react';
import { Form, Input, Radio, Button } from 'antd';
import { Select, Space } from 'antd';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import dvhc from 'data/dvhcvn.json';
import VietnameseRaces from 'data/VietnameseRaces.json';
import HocVienData from 'data/HocVien.json';
import HV_CNTN from 'data/HV_CNTuNguyen.json';
import HV_CNBB from 'data/HV_CNBatBuoc.json';
import KyLuat from 'data/KyLuat.json';
import KhenThuong from 'data/KhenThuong.json';
import BanGiao from 'data/BanGiao.json';
import TronVienPhep from 'data/TronVienPhep.json';
import NguoiThan from 'data/NguoiThan.json';
import host from '../../axios/host';
import Global from '../../constant/Global';

const VewAllStudent = () => {
  const idCaiNghienTNPrefix = 'TN';
  const idCaiNghienBBPrefix = 'BB';

  const { Title } = Typography;
  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState('horizontal');
  const [gender, SetGender] = useState(0);
  const [file, SetFile] = useState(null);
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
  const [hocVienCNBBData, SetHocVienCNBBData] = useState(HV_CNBB);
  const [KyLuatData, SetKyLuatData] = useState(KyLuat);
  const [KhenThuongData, SetKhenThuongData] = useState(KhenThuong);
  const [BanGiaoData, SetBanGiaoData] = useState(BanGiao);
  const [TronVienPhepData, SetTronVienPhepData] = useState(TronVienPhep);
  const [ChaData, SetChaData] = useState(NguoiThan.NguoiThan.cha);
  const [MeData, SetMeData] = useState(NguoiThan.NguoiThan.me);
  const [VoChongData, SetVoChongData] = useState(NguoiThan.NguoiThan.vochong);
  const [isLoading, SetIsLoading] = useState(false);

  function parseDate(date) {
    const [day, month, year] = date.split('-');
    let formatedDate = year + '-' + month + '-' + day;
    return formatedDate;
  }

  const handleSelectFile = (e) => {
    SetFile(e.target.files[0]);
    const imageFile = e.target.files[0];
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        SetHocVienInputData({ ...hocVienInputData, HinhAnh: reader.result });
      };
      reader.readAsDataURL(imageFile);
    }
  };

  const CheckEmptyInput = (input) => {
    console.log(input);
    return input === null || input === '';
  };

  const successModal = () => {
    Modal.success({
      content: 'Đăng ký học viên thành công',
      onOk: () => {
        window.location.reload();
      }
    });
  };

  const errorModal = () => {
    Modal.error({
      title: 'Lỗi',
      content: 'Có lỗi xảy ra, vui lòng thử lại',
      onOk: () => {
        window.location.reload();
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const UniqueUniversalid = uuidv4();

    try {
      SetIsLoading(true);
      const values = await form.validateFields().then();
      if (inputNameValidationStatus.validateStatus !== 'error') {
        const res = await axios
          .post(`${host.BASE_URL}/${host.API.BASE_END_POINT}/hocvien`, hocVienInputData, {
            headers: {
              access_token: localStorage.getItem(Global.key.token)
            }
          })
          .then((result) => {
            console.log(result);
          });

        if (treatmentForm === 'tunguyen') {
          const id = `${idCaiNghienTNPrefix}-${UniqueUniversalid}`;
          hocVienCNTNData.id = id;
          const result_HocVienCNTN = await axios
            .post(`${host.BASE_URL}/${host.API.BASE_END_POINT}/cntn`, hocVienCNTNData, {
              headers: {
                access_token: localStorage.getItem(Global.key.token)
              }
            })
            .then((result) => {
              console.log(result);
            });

          // Set id for other entities
          KhenThuongData.id_dot_cntn = id;
          KyLuatData.id_dot_cntn = id;
          BanGiaoData.id_dot_cntn = id;
          TronVienPhepData.id_dot_cntn = id;
        } else if (treatmentForm === 'batbuoc') {
          const id = `${idCaiNghienBBPrefix}-${UniqueUniversalid}`;
          hocVienCNBBData.id = id;
          const result_HocVienCNBB = await axios
            .post(`${host.BASE_URL}/${host.API.BASE_END_POINT}/cnbb`, hocVienCNBBData, {
              headers: {
                access_token: localStorage.getItem(Global.key.token)
              }
            })
            .then((result) => {
              console.log(result);
            });

          // Set id for other entities
          KhenThuongData.id_dot_cnbb = id;
          KyLuatData.id_dot_cnbb = id;
          BanGiaoData.id_dot_cnbb = id;
          TronVienPhepData.id_dot_cnbb = id;
        }

        if (
          CheckEmptyInput(KyLuatData.SoQuyetDinhKyLuat) === false &&
          CheckEmptyInput(KyLuatData.NgayHetHanKyLuat) === false &&
          CheckEmptyInput(KyLuatData.ThoiHanKyLuat) === false &&
          CheckEmptyInput(KyLuatData.NgayViPham) === false &&
          CheckEmptyInput(KyLuatData.NgayHetHanKyLuat) === false &&
          CheckEmptyInput(KyLuatData.HinhThucKyLuat) === false &&
          CheckEmptyInput(KyLuatData.HanhViViPham) === false
        ) {
          const result_KyLuat = await axios
            .post(`${host.BASE_URL}/${host.API.BASE_END_POINT}/kyluat`, KyLuatData, {
              headers: {
                access_token: localStorage.getItem(Global.key.token)
              }
            })
            .then((result) => {
              console.log(result);
            });
        }

        if (
          CheckEmptyInput(KhenThuongData.SoQuyetDinhKhenThuong) === false &&
          CheckEmptyInput(KhenThuongData.NgayRaQuyetDinh) === false &&
          CheckEmptyInput(KhenThuongData.HinhThucKhenThuong) === false
        ) {
          const result_KhenThuong = await axios
            .post(`${host.BASE_URL}/${host.API.BASE_END_POINT}/khenthuong`, KhenThuongData, {
              headers: {
                access_token: localStorage.getItem(Global.key.token)
              }
            })
            .then((result) => {
              console.log(result);
            });
        }

        if (
          CheckEmptyInput(BanGiaoData.SoVanBanBanGiao) === false &&
          CheckEmptyInput(BanGiaoData.NgayRaVanBan) === false &&
          CheckEmptyInput(BanGiaoData.NgayBanGiao) === false &&
          CheckEmptyInput(BanGiaoData.LyDoBanGiao) === false &&
          CheckEmptyInput(BanGiaoData.CanBoBenNhan) === false &&
          CheckEmptyInput(BanGiaoData.CoQuanNhan) === false &&
          CheckEmptyInput(BanGiaoData.ThongTinLienLacBenNhan) === false &&
          CheckEmptyInput(BanGiaoData.CanBoGiaiQuyet) === false &&
          CheckEmptyInput(BanGiaoData.LanhDaoChucVu) === false
        ) {
          const result_BanGiao = await axios
            .post(`${host.BASE_URL}/${host.API.BASE_END_POINT}/bangiao`, BanGiaoData, {
              headers: {
                access_token: localStorage.getItem(Global.key.token)
              }
            })
            .then((result) => {
              console.log(result);
            });
        }

        if (
          CheckEmptyInput(TronVienPhepData.NgayTron) === false &&
          CheckEmptyInput(TronVienPhepData.SoThongBao) === false &&
          CheckEmptyInput(TronVienPhepData.NgayRaThongBao) === false &&
          CheckEmptyInput(TronVienPhepData.NgayCatGiam) === false
        ) {
          const result_TronVienPhep = await axios
            .post(`${host.BASE_URL}/${host.API.BASE_END_POINT}/tronvienphep`, TronVienPhepData, {
              headers: {
                access_token: localStorage.getItem(Global.key.token)
              }
            })
            .then((result) => {
              console.log(result);
            });
        }

        if (
          CheckEmptyInput(ChaData.HoTenNguoiThan) === false &&
          CheckEmptyInput(ChaData.NgaySinh) === false &&
          CheckEmptyInput(ChaData.NoiO) === false
        ) {
          const result_Cha = await axios
            .post(`${host.BASE_URL}/${host.API.BASE_END_POINT}/nguoithan`, ChaData, {
              headers: {
                access_token: localStorage.getItem(Global.key.token)
              }
            })
            .then((result) => {
              console.log(result);
            });
        }

        if (
          CheckEmptyInput(MeData.HoTenNguoiThan) === false &&
          CheckEmptyInput(MeData.NgaySinh) === false &&
          CheckEmptyInput(MeData.NoiO) === false
        ) {
          const result_Me = await axios
            .post(`${host.BASE_URL}/${host.API.BASE_END_POINT}/nguoithan`, MeData, {
              headers: {
                access_token: localStorage.getItem(Global.key.token)
              }
            })
            .then((result) => {
              console.log(result);
            });
        }

        if (CheckEmptyInput(VoChongData.HoTenNguoiThan) === false && CheckEmptyInput(VoChongData.NgaySinh) === false) {
          const result_VoChong = await axios
            .post(`${host.BASE_URL}/${host.API.BASE_END_POINT}/nguoithan`, VoChongData, {
              headers: {
                access_token: localStorage.getItem(Global.key.token)
              }
            })
            .then((result) => {
              console.log(result);
            });
        }
        SetIsLoading(false);
        // form.resetFields()
        successModal();
      } else {
        console.log('ten phai la tieng viet co dau');
      }
    } catch (error) {
      console.log(error);
      SetIsLoading(false);
      errorModal();
    }
  };

  // const dateFormat = 'YYYY-MM-DD';
  const dateFormat = 'DD-MM-YYYY';

  const onNameChange = (e) => {
    // console.log('name: ', e.target.value);
    const vietnameseRegex =
      /[^a-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]/u;
    if (vietnameseRegex.test(e.target.value) === true) {
      SetHocVienInputData({ ...hocVienInputData, Ho: e.target.value.split(' ').slice(0, -1).join(' '), Ten: e.target.value.split(' ').slice(-1)[0] });
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

  const onTreatmentFormChange = (e) => {
    console.log('radio checked', e.target.value);
    SetTreatmentForm(e.target.value);
  };

  const handleChangeRace = (value) => {
    console.log(`selected ${value}`);
    SetHocVienInputData({ ...hocVienInputData, DanToc: value });
  };

  // const handleChangeProvinceCity = (value) => {
  //   console.log(`selected ${value}`);
  //   const filteredProvinceCityResult = division.filter((division) => division.codename === value);
  //   SetDistrict(filteredProvinceCityResult[0].districts);
  //   SetDisableDistrict(false);
  //   SetDefaultDistrictValue(filteredProvinceCityResult[0].districts[0].name);
  //   SetHocVienInputData({
  //     ...hocVienInputData,
  //     Tinh: filteredProvinceCityResult[0].name,
  //     Huyen: filteredProvinceCityResult[0].districts[0].name,
  //     DonVi: filteredProvinceCityResult[0].districts[0].wards[0].name
  //   });
  //   if (filteredProvinceCityResult[0].districts[0].wards.length > 0) {
  //     SetDisableWard(false);
  //     SetWard(filteredProvinceCityResult[0].districts[0].wards);
  //     SetDefaultWardValue(filteredProvinceCityResult[0].districts[0].wards[0].name);
  //   }
  // };

  const handleChangeProvinceCity = (value) => {
    console.log(`selected ${value}`);
    const filteredProvinceCityResult = dvhc.data.filter((dvhc) => dvhc.name === value);
    SetDistrict(filteredProvinceCityResult[0].level2s);

    SetDisableDistrict(false);
    SetDefaultDistrictValue(filteredProvinceCityResult[0].level2s[0].name);
    SetHocVienInputData({
      ...hocVienInputData,
      Tinh: filteredProvinceCityResult[0].name,
      Huyen: filteredProvinceCityResult[0].level2s[0].name,
      DonVi: filteredProvinceCityResult[0].level2s[0].level3s[0].name
    });
    if (filteredProvinceCityResult[0].level2s[0].level3s.length > 0) {
      SetDisableWard(false);
      SetWard(filteredProvinceCityResult[0].level2s[0].level3s);
      SetDefaultWardValue(filteredProvinceCityResult[0].level2s[0].level3s[0].name);
    }
  };

  const onChangeDistrict = (value) => {
    const filteredDistrictResult = district.filter((district) => district.name === value);
    SetDefaultDistrictValue(value);
    SetWard(filteredDistrictResult[0].level3s);
    if (filteredDistrictResult[0].level3s.length > 0) {
      SetDefaultWardValue(filteredDistrictResult[0].level3s[0].name);
      SetHocVienInputData({ ...hocVienInputData, DonVi: filteredDistrictResult[0].level3s[0].name });
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
    SetHocVienInputData({ ...hocVienInputData, NgaySinh: parseDate(dateString) });
    console.log(hocVienInputData);
    console.log('this is ngay sinh: ', parseDate(dateString));
  };

  const onNgayCapCCCDChange = (date, dateString) => {
    SetHocVienInputData({ ...hocVienInputData, NgayCapCCCD: parseDate(dateString) });
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
    SetHocVienCNTNData({ ...hocVienCNTNData, NgayThanhLyHopDong: parseDate(dateString) });
  };

  const onNgayCapGiayHoanThanhChange = (date, dateString) => {
    SetHocVienCNTNData({ ...hocVienCNTNData, NgayCapGiayHoanThanh: parseDate(dateString) });
  };

  const onNgayKyQuyetDinhTamGiuChange = (date, dateString) => {
    SetHocVienCNBBData({ ...hocVienCNBBData, NgayKyQuyetDinhTamGiu: parseDate(dateString) });
  };

  const onNgayCoKetQuaNghienChange = (date, dateString) => {
    SetHocVienCNBBData({ ...hocVienCNBBData, NgayCoKetQuaNghien: parseDate(dateString) });
  };

  const onNgayKyQuyetDinhChange = (date, dateString) => {
    SetHocVienCNBBData({ ...hocVienCNBBData, NgayKyQuyetDinh: parseDate(dateString) });
  };

  const onNgayGiaoTaiSanChange = (date, dateString) => {
    SetHocVienCNBBData({ ...hocVienCNBBData, NgayGiaoTaiSan: parseDate(dateString) });
  };

  const onNgayDiLyChange = (date, dateString) => {
    SetHocVienCNBBData({ ...hocVienCNBBData, NgayDiLy: parseDate(dateString) });
  };

  const onNgayHoanThanhXacDinhNghienChange = (date, dateString) => {
    SetHocVienCNBBData({ ...hocVienCNBBData, NgayHoanThanhXacDinhTinhTrangNghien: parseDate(dateString) });
  };

  const onNgayHopChange = (date, dateString) => {
    SetHocVienCNBBData({ ...hocVienCNBBData, NgayHop: parseDate(dateString) });
  };

  const onNgayNhapLaiCatGiamChange = (date, dateString) => {
    SetHocVienCNBBData({ ...hocVienCNBBData, NgayNhapLaiCatGiam: parseDate(dateString) });
  };

  const onNgayRaQDKLChange = (date, dateString) => {
    SetKyLuatData({ ...KyLuatData, NgayRaQuyetDinh: parseDate(dateString) });
  };

  const onNgayViPhamChange = (date, dateString) => {
    SetKyLuatData({ ...KyLuatData, NgayViPham: parseDate(dateString) });
  };

  const onNgayHetHanKLChange = (date, dateString) => {
    SetKyLuatData({ ...KyLuatData, NgayHetHanKyLuat: parseDate(dateString) });
  };

  const onNgayQDKhenThongChange = (date, dateString) => {
    SetKhenThuongData({ ...KhenThuongData, NgayRaQuyetDinh: parseDate(dateString) });
  };

  const onNgayRaVanBanChange = (date, dateString) => {
    SetBanGiaoData({ ...BanGiaoData, NgayRaVanBan: parseDate(dateString) });
  };

  const onNgayGiaoChange = (date, dateString) => {
    SetBanGiaoData({ ...BanGiaoData, NgayBanGiao: parseDate(dateString) });
  };

  const onNgayTronVienPhepChange = (date, dateString) => {
    SetTronVienPhepData({ ...TronVienPhepData, NgayTron: parseDate(dateString) });
  };

  const onNgayRaThongBaoChange = (date, dateString) => {
    SetTronVienPhepData({ ...TronVienPhepData, NgayRaThongBao: parseDate(dateString) });
  };

  const onNgayCatGiamChange = (date, dateString) => {
    SetTronVienPhepData({ ...TronVienPhepData, NgayCatGiam: parseDate(dateString) });
  };

  const onNgayChuyenCoSoChange = (date, dateString) => {
    SetTronVienPhepData({ ...TronVienPhepData, NgayChuyenCoSo: parseDate(dateString) });
  };

  const onNgayChuyenVienChange = (date, dateString) => {
    SetTronVienPhepData({ ...TronVienPhepData, NgayChuyenVien: parseDate(dateString) });
  };

  const onNgayNhapLaiChange = (date, dateString) => {
    SetTronVienPhepData({ ...TronVienPhepData, NgayNhapLai: parseDate(dateString) });
  };

  const onNgaySinhChaChange = (date, dateString) => {
    SetChaData({ ...ChaData, NgaySinh: parseDate(dateString) });
  };

  const onNgaySinhMeChange = (date, dateString) => {
    SetMeData({ ...MeData, NgaySinh: parseDate(dateString) });
  };

  const onNgaySinhVoChongChange = (date, dateString) => {
    SetVoChongData({ ...VoChongData, NgaySinh: parseDate(dateString) });
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

            <Form.Item
              label="Ngày sinh"
              name="Ngày sinh"
              rules={[
                {
                  required: true,
                  message: 'Nhập ngày sinh'
                }
              ]}
            >
              <DatePicker onChange={onDateChange} format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Nơi đăng kí thường trú">
              <Input onChange={(e) => SetHocVienInputData({ ...hocVienInputData, DCThuongTru: e.target.value })} />
            </Form.Item>

            {/*<Form.Item*/}
            {/*  label="Ngày cấp CMND"*/}
            {/*  name="Ngày cấp CMND"*/}
            {/*  rules={[*/}
            {/*    {*/}
            {/*      required: true,*/}
            {/*      message: 'Nhập ngày cấp CMND'*/}
            {/*    }*/}
            {/*  ]}*/}
            {/*>*/}
            {/*  <DatePicker format={dateFormat} style={{ width: '100%' }} onChange={onNgayCapCCCDChange} />*/}
            {/*</Form.Item>*/}

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
                  options={VietnameseRaces.races.map((race) => ({
                    label: race.name,
                    value: race.name
                  }))}
                  // options={[
                  //   {
                  //     value: 'Kinh',
                  //     label: 'Kinh'
                  //   },
                  //   {
                  //     value: 'Tày',
                  //     label: 'Tày'
                  //   },
                  //   {
                  //     value: 'Thái',
                  //     label: 'Thái'
                  //   },
                  //   {
                  //     value: 'Hoa',
                  //     label: 'Hoa'
                  //   },
                  //   {
                  //     value: 'Khác',
                  //     label: 'Khác'
                  //   }
                  // ]}
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
                  options={dvhc.data.map((dvhc) => ({
                    label: dvhc.name,
                    value: dvhc.name
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
                    value: ward.name
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

            {/*<Form.Item label="Khu sinh hoạt">*/}
            {/*  <Space direction="vertical" style={{ width: '100%' }}>*/}
            {/*    <Select*/}
            {/*      labelInValue={true}*/}
            {/*      showSearch*/}
            {/*      defaultValue="-- Chọn khu sinh hoạt --"*/}
            {/*      style={{*/}
            {/*        width: '100%'*/}
            {/*      }}*/}
            {/*      onChange={handleChangeActivityArea}*/}
            {/*      optionFilterProp="children"*/}
            {/*      filterOption={(input, option) => (option?.label ?? '').includes(input)}*/}
            {/*      options={[*/}
            {/*        {*/}
            {/*          value: 'nam1',*/}
            {/*          label: 'Khu quản lý học viên nam 1'*/}
            {/*        },*/}
            {/*        {*/}
            {/*          value: 'nam2',*/}
            {/*          label: 'Khu quản lý học viên nam 2'*/}
            {/*        },*/}
            {/*        {*/}
            {/*          value: 'nam3',*/}
            {/*          label: 'Khu quản lý học viên nam 3'*/}
            {/*        },*/}
            {/*        {*/}
            {/*          value: 'catcon',*/}
            {/*          label: 'Khu quản lý học viên cắt cơn'*/}
            {/*        },*/}
            {/*        {*/}
            {/*          value: 'nu',*/}
            {/*          label: 'Khu quản lý học viên nữ'*/}
            {/*        },*/}
            {/*        {*/}
            {/*          value: 'nam-baove',*/}
            {/*          label: 'Phòng bảo vệ - Khu quản lý học viên nam'*/}
            {/*        },*/}
            {/*        {*/}
            {/*          value: 'tunguyen',*/}
            {/*          label: 'Khu quản lý học viên cai nghiện tự nguyện'*/}
            {/*        }*/}
            {/*      ]}*/}
            {/*    />*/}
            {/*  </Space>*/}
            {/*</Form.Item>*/}

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
                      value: 'mc',
                      label: 'Mù chữ'
                    },
                    {
                      value: 'dh',
                      label: 'Đại học'
                    },
                    {
                      value: 'cd',
                      label: 'Cao đẳng'
                    },
                    {
                      value: '12',
                      label: '12/12'
                    },
                    {
                      value: '11',
                      label: '11/12'
                    },
                    {
                      value: '10',
                      label: '10/12'
                    },
                    {
                      value: '9',
                      label: '9/12'
                    },
                    {
                      value: '8',
                      label: '8/12'
                    },
                    {
                      value: '7',
                      label: '7/12'
                    },
                    {
                      value: '6',
                      label: '6/12'
                    },
                    {
                      value: '5',
                      label: '5/12'
                    },
                    {
                      value: '4',
                      label: '4/12'
                    },
                    {
                      value: '3',
                      label: '3/12'
                    },
                    {
                      value: '2',
                      label: '2/12'
                    },
                    {
                      value: '1',
                      label: '1/12'
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

            <Form.Item
              label="Mã học viên"
              name="MaHocVien"
              rules={[
                {
                  required: true,
                  message: 'Nhập mã học viên'
                }
              ]}
            >
              <Input
                onChange={(e) => {
                  SetHocVienInputData({ ...hocVienInputData, MaHocVien: e.target.value });
                  SetHocVienCNTNData({ ...hocVienCNTNData, MaHocVien: e.target.value });
                  SetHocVienCNBBData({ ...hocVienCNBBData, MaHocVien: e.target.value });
                  SetKyLuatData({ ...KyLuat, MaHocVien: e.target.value });
                  SetKhenThuongData({ ...KhenThuongData, MaHocVien: e.target.value });
                  SetBanGiaoData({ ...BanGiaoData, MaHocVien: e.target.value });
                  SetTronVienPhepData({ ...TronVienPhepData, MaHocVien: e.target.value });
                  SetChaData({ ...ChaData, MaHocVien: e.target.value });
                  SetMeData({ ...MeData, MaHocVien: e.target.value });
                  SetVoChongData({ ...VoChongData, MaHocVien: e.target.value });
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
                    value: district.name
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
        <Radio.Group defaultValue="tunguyen" buttonStyle="solid" onChange={onTreatmentFormChange}>
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
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, SoQuyetDinhTamGiu: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày ký quyết định tạm giữ">
                <DatePicker onChange={onNgayKyQuyetDinhTamGiuChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Ngày có kết quả nghiện">
                <DatePicker onChange={onNgayCoKetQuaNghienChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Kết quả">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, KetQua: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày hoàn thành xác định tình trạng nghiện">
                <DatePicker onChange={onNgayHoanThanhXacDinhNghienChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Theo quyết định quản lý
              </Title>

              <Form.Item label="Số quyết định quản lý">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, SoQuyetDinhQuanLy: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày ký quyết định">
                <DatePicker onChange={onNgayKyQuyetDinhChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Tiền án
              </Title>

              <Form.Item label="Tiền án ma túy hoặc tiền án khác">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, TienAn: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Tội danh">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, ToiDanh: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Thời hạn tù">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, ThoiHanTu: e.target.value });
                  }}
                />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Tiền sự
              </Title>

              <Form.Item label="Số lần cai">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, SoLanCai: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Nơi cai nghiện">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, NoiCaiNghien: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Khác">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Tài sản
              </Title>

              <Form.Item label="Loại tài sản">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, LoaiTaiSan: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Tình trạng tài sản">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, TinhTrangTaiSan: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Bàn giao (nơi nhận hoặc người thân)">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, BanGiao: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày giao">
                <DatePicker onChange={onNgayGiaoTaiSanChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Kỷ luật
              </Title>

              <Form.Item label="Số quyết định kỷ luật">
                <Input
                  onChange={(e) => {
                    SetKyLuatData({ ...KyLuatData, SoQuyetDinhKyLuat: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày ra quyết định">
                <DatePicker onChange={onNgayRaQDKLChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Thời hạn kỷ luật">
                <Input
                  onChange={(e) => {
                    SetKyLuatData({ ...KyLuatData, ThoiHanKyLuat: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày vi phạm">
                <DatePicker onChange={onNgayViPhamChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Ngày hết hạn kỷ luật">
                <DatePicker onChange={onNgayHetHanKLChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Hình thức kỷ luật">
                <Input
                  onChange={(e) => {
                    SetKyLuatData({ ...KyLuatData, HinhThucKyLuat: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Hành vi vi phạm khác">
                <Input
                  onChange={(e) => {
                    SetKyLuatData({ ...KyLuatData, HanhViViPham: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Khác">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Khen thưởng
              </Title>

              <Form.Item label="Số quyết định khen thưởng">
                <Input
                  onChange={(e) => {
                    SetKhenThuongData({ ...KhenThuongData, SoQuyetDinhKhenThuong: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày ra quyết định">
                <DatePicker onChange={onNgayQDKhenThongChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Hình thức khen thưởng">
                <Input
                  onChange={(e) => {
                    SetKhenThuongData({ ...KhenThuongData, HinhThucKhenThuong: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Khác">
                <Input />
              </Form.Item>

              {/*<Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>*/}
              {/*  Thăm gặp*/}
              {/*</Title>*/}

              {/*<Form.Item label="Họ tên người thăm">*/}
              {/*  <Input />*/}
              {/*</Form.Item>*/}

              {/*<Form.Item label="Mối quan hệ">*/}
              {/*  <Input />*/}
              {/*</Form.Item>*/}

              {/*<Form.Item label="Số người thăm">*/}
              {/*  <Input />*/}
              {/*</Form.Item>*/}

              {/*<Form.Item label="Ngày thăm">*/}
              {/*  <Input />*/}
              {/*</Form.Item>*/}

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Chuyển viện
              </Title>

              <Form.Item label="Nơi chuyển viện">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, NoiChuyeVien: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày chuyển viện">
                <DatePicker onChange={onNgayChuyenVienChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Ngày nhập lại">
                <DatePicker onChange={onNgayNhapLaiChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Thông tin liên hệ gia đình">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, ThongTinLienHeGiaDinh: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ghi chú">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, GhiChu: e.target.value });
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
              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px' }}>
                Tòa án
              </Title>

              <Form.Item label="Ngày họp - Ngày quyết định">
                <DatePicker onChange={onNgayHopChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Giờ họp">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, GioHop: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Hình thức họp">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, HinhThucHop: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Thẩm phán phiên họp">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, ThamPhanPhienHop: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Thư ký phiên họp">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, ThuKyPhienHop: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Hoãn phiên họp">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, Hoan: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Khiếu nại">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, KhieuNai: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Tình trạng xử lý đơn vắng mặt">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, TinhTrangXuLyDonVangMat: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Số quyết định tòa án">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, SoQuyetDinhToaAn: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Thời hạn quyết định">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, ThoiHanQuyetDinh: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Nơi chấp hành quyết định">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, NoiChapHanhQuyetDinh: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ghi chú">
                <Input />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Di lý
              </Title>

              <Form.Item label="Công văn di lý">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, CongVanDiLy: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày di lý">
                <DatePicker onChange={onNgayDiLyChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Cơ quan nhận">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, CoQuanNhan: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Thời gian di lý">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, ThoiGianDiLy: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Thời gian gia hạn di lý">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, ThoiGianGiaHanDiLy: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Số quyết định đưa ra khỏi cơ sở">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, SoQuyetDinhDuaRaKhoiCoSo: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày nhập lại hoặc cắt giảm">
                <DatePicker onChange={onNgayNhapLaiCatGiamChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Trốn viện - Trốn phép
              </Title>

              <Form.Item label="Ngày trốn viện/trốn phép">
                <DatePicker onChange={onNgayTronVienPhepChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Số thông báo">
                <Input
                  onChange={(e) => {
                    SetTronVienPhepData({ ...TronVienPhepData, SoThongBao: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày ra thông báo">
                <DatePicker onChange={onNgayRaThongBaoChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Ngày cắt giảm">
                <DatePicker onChange={onNgayCatGiamChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Chuyển cơ sở
              </Title>

              <Form.Item label="Ngày chuyển cơ sở">
                <DatePicker onChange={onNgayChuyenCoSoChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Cán bộ bàn giao">
                <Input
                  onChange={(e) => {
                    SetHocVienCNBBData({ ...hocVienCNBBData, CanBoBanGiao: e.targt.value });
                  }}
                />
              </Form.Item>

              <Title level={5} style={{ color: '#00A9FF', marginBottom: '25px', marginTop: '40px' }}>
                Bàn giao cho cơ quan khác
              </Title>

              <Form.Item label="Số văn bản bàn giao">
                <Input
                  onChange={(e) => {
                    SetBanGiaoData({ ...BanGiaoData, SoVanBanBanGiao: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Ngày ra văn bản">
                <DatePicker onChange={onNgayRaVanBanChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Ngày giao">
                <DatePicker onChange={onNgayGiaoChange} format={dateFormat} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item label="Lý do bàn giao">
                <Input
                  onChange={(e) => {
                    SetBanGiaoData({ ...BanGiaoData, LyDoBanGiao: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Cán bộ bên nhận">
                <Input
                  onChange={(e) => {
                    SetBanGiaoData({ ...BanGiaoData, CanBoBenNhan: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Cơ quan nhận">
                <Input
                  onChange={(e) => {
                    SetBanGiaoData({ ...BanGiaoData, CoQuanNhan: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Thông tin liên lạc bên nhận (Số điện thoại)">
                <Input
                  onChange={(e) => {
                    SetBanGiaoData({ ...BanGiaoData, ThongTinLienLacBenNhan: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Cán bộ giải quyết">
                <Input
                  onChange={(e) => {
                    SetBanGiaoData({ ...BanGiaoData, CanBoGiaiQuyet: e.target.value });
                  }}
                />
              </Form.Item>

              <Form.Item label="Lãnh đạo giao - chức vụ">
                <Input
                  onChange={(e) => {
                    SetBanGiaoData({ ...BanGiaoData, LanhDaoChucVu: e.target.value });
                  }}
                />
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
              <Input
                onChange={(e) => {
                  SetChaData({ ...ChaData, HoTenNguoiThan: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Họ tên mẹ">
              <Input
                onChange={(e) => {
                  SetMeData({ ...MeData, HoTenNguoiThan: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Nơi ở cha">
              <Input onChange={(e) => SetChaData({ ...ChaData, NoiO: e.target.value })} />
            </Form.Item>

            <Form.Item label="Họ tên vợ/chồng">
              <Input
                onChange={(e) => {
                  SetVoChongData({ ...VoChongData, HoTenNguoiThan: e.target.value });
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
            <Form.Item label="Ngày sinh cha">
              <DatePicker onChange={onNgaySinhChaChange} format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Ngày sinh mẹ">
              <DatePicker onChange={onNgaySinhMeChange} format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item label="Nơi ở mẹ">
              <Input
                onChange={(e) => {
                  SetMeData({ ...MeData, NoiO: e.target.value });
                }}
              />
            </Form.Item>

            <Form.Item label="Ngày sinh vợ/chồng">
              <DatePicker onChange={onNgaySinhVoChongChange} format={dateFormat} style={{ width: '100%' }} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Form.Item label="" style={{ marginTop: '10px' }}>
        <Button block type="primary" htmlType="submit" style={{ width: '20%' }} onClick={handleSubmit}>
          Đăng ký học viên
        </Button>
      </Form.Item>
      <Modal
        style={{ textAlign: 'center' }}
        title="Đang trong quá trình đăng ký học viên, vui lòng đợi trong giây lát"
        open={isLoading}
        footer={null}
        closable={false}
        keyboard={false}
      >
        <Spin size="large" />
      </Modal>
    </div>
  );
};
export default VewAllStudent;
