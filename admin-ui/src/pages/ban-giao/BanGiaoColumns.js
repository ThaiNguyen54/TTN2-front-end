const BanGiaoColumn = [
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
    key: 'SoVanBanBanGiao',
    title: 'Số văn bản bàn giao',
    dataIndex: 'SoVanBanBanGiao',
    editable: true
  },
  {
    key: 'NgayRaVanBan',
    title: 'Ngày ra văn bản',
    dataIndex: 'NgayRaVanBan',
    editable: true
  },
  {
    key: 'NgayBanGiao',
    title: 'Ngày bàn giao',
    dataIndex: 'NgayBanGiao',
    editable: true
  },
  {
    key: 'LyDoBanGiao',
    title: 'Lý do bàn giao',
    dataIndex: 'LyDoBanGiao',
    editable: true
  },
  {
    key: 'CanBoBenNhan',
    title: 'Cán bộ bên nhận',
    dataIndex: 'CanBoBenNhan',
    editable: true
  },

  {
    key: 'CoQuanNhan',
    title: 'Cơ quan nhận',
    dataIndex: 'CoQuanNhan',
    editable: true
  },
  {
    key: 'ThongTinLienLacBenNhan',
    title: 'Thông tin lên lạc bên nhận',
    dataIndex: 'ThongTinLienLacBenNhan',
    editable: true
  },
  {
    key: 'CanBoGiaiQuyet',
    title: 'Cán bộ giải quyết',
    dataIndex: 'CanBoGiaiQuyet',
    editable: true
  },
  {
    key: 'LanhDaoChucVu',
    title: 'Lãnh đạo - chức vụ',
    dataIndex: 'LanhDaoChucVu',
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

export default BanGiaoColumn;
