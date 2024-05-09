const TronVienPhepColumn = [
  {
    key: 'id',
    title: 'id',
    dataIndex: 'id',
    fixed: 'left',
    editable: false
  },
  {
    key: 'MaHocVien',
    title: 'Mã học viên',
    dataIndex: 'MaHocVien',
    fixed: 'left',
    editable: false
  },
  {
    key: 'NgayTron',
    title: 'Ngày trốn',
    dataIndex: 'NgayTron',
    editable: true
  },
  {
    key: 'SoThongBao',
    title: 'Số thông báo',
    dataIndex: 'SoThongBao',
    editable: true
  },
  {
    key: 'NgayRaThongBao',
    title: 'Ngày ra thông báo',
    dataIndex: 'NgayRaThongBao',
    editable: true
  },
  {
    key: 'NgayCatGiam',
    title: 'Ngày cắt giảm',
    dataIndex: 'NgayCatGiam',
    editable: true
  },
  {
    key: 'id_dot_cntn',
    title: 'id đợt cai nghiện tự nguyện',
    dataIndex: 'id_dot_cntn',
    editable: false
  },
  {
    key: 'id_dot_cnbb',
    title: 'id đợt cai nguyện bắt buộc',
    dataIndex: 'id_dot_cnbb',
    editable: false
  }
];

export default TronVienPhepColumn;
