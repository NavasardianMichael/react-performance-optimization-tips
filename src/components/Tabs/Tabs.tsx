import * as React from 'react';
import TabsList from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UseStateInitialValue from './StateInitialValue/Main';
import WebpackBundleAnalyzer from './WebpackBundleAnalyzer/WebpackBundleAnalyzer';
import UseMemo from './UseMemo/Main';
import Memo from './Memo/Main';
import UseCallback from './UseCallback/Main';
import UseDeferredValue from './UseDeferredValue/Main';
import UseTransition from './UseTransition/Main';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Tabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '80vh' }}
    >
      <TabsList
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', textAlign: 'right' }}
      >
        <Tab sx={{textTransform: 'unset'}} label="Intro" {...a11yProps(0)} />
        <Tab sx={{textTransform: 'unset'}} label="initial value of the useState" {...a11yProps(1)} />
        <Tab sx={{textTransform: 'unset'}} label="useMemo" {...a11yProps(2)} />
        <Tab sx={{textTransform: 'unset'}} label="useCallback" {...a11yProps(3)} />
        <Tab sx={{textTransform: 'unset'}} label="memo" {...a11yProps(4)} />
        <Tab sx={{textTransform: 'unset'}} label="useDeferredValue" {...a11yProps(5)} />
        <Tab sx={{textTransform: 'unset'}} label="useTransition" {...a11yProps(6)} />
        <Tab sx={{textTransform: 'unset'}} label="webpackBundleAnalyzer" {...a11yProps(7)} />
      </TabsList>
      <TabPanel value={value} index={0}>
        <Typography variant="h4" component="h4">React performance optimization (tips, best practices)</Typography>
        <Typography>React performance optimization (tips, best practices)</Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UseStateInitialValue />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <UseMemo />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <UseCallback />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Memo />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <UseDeferredValue />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <UseTransition />
      </TabPanel>
      <TabPanel value={value} index={7}>
        <WebpackBundleAnalyzer />
      </TabPanel>
    </Box>
  );
}