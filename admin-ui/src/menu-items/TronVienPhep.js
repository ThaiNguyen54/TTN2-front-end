// assets
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
// icons
const icons = {
    DirectionsRunIcon
};

// ==============================|| Ban Giao ||============================== //

const TronVienPhep = {
  id: 'tronvienphep',
  title: 'Trốn viện/phép',
  type: 'group',
  children: [
    {
      id: 'tronvienphep',
      title: 'Trốn viện/phép',
      type: 'item',
      url: '/tronvienphep',
      icon: icons.DirectionsRunIcon,
      breadcrumbs: false
    }
  ]
};

export default TronVienPhep;
