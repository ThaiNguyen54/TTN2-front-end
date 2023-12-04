const KhenThuongColumn = [
  {
    key: 'id',
    title: 'id',
    dataIndex: 'id',
    fixed: 'left',
    editable: false
  },
  {
    key: 'cccd',
    title: 'Căn cước công dân',
    dataIndex: 'cccd',
    fixed: 'left',
    editable: false
  },
  {
    key: 'SoQuyetDinhKhenThuong',
    title: 'Số quyết định khen thưởng',
    dataIndex: 'SoQuyetDinhKhenThuong',
    editable: true
  },
  {
    key: 'NgayRaQuyetDinh',
    title: 'Ngày ra quyết định',
    dataIndex: 'NgayRaQuyetDinh',
    editable: true
  },
  {
    key: 'HinhThucKhenThuong',
    title: 'Hình thức khen thưởng',
    dataIndex: 'HinhThucKhenThuong',
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

export default KhenThuongColumn;
