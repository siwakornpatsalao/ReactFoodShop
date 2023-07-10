import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { TextField, MenuItem } from '@mui/material';

const menus = [
  {
    value: 'เครื่องดื่ม',
    label: 'เครื่องดื่ม',
  },
  {
    value: 'ของทานเล่น',
    label: 'ของทานเล่น',
  },
  {
    value: 'ขนมปัง',
    label: 'ขนมปัง',
  },
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/menus', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          thumbnail: file,
          description: description,
          price: price,
          category: category,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to add new menu');
      }
      const resJson = await response.json();
      console.log(resJson);
      // Reset form fields
      setFile(null);
      setName('');
      setDescription('');
      setPrice(0);
      setCategory('');
      // Reset file input
      document.getElementById('file-input').value = '';
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  function handleChangeFile(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="เมนูหลัก" {...a11yProps(0)} />
          <Tab label="ส่วนเสริม" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <form onSubmit={handleSubmit}>
          <input
            id="file-input"
            type="file"
            onChange={handleChangeFile}
            accept="image/*"
          />
          <br />
          <br />
          {file && (
            <img
              src={file}
              style={{ maxWidth: '100%', height: '500px' }}
              alt="Preview"
            />
          )}

          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="ชื่อเมนู"
              value={name}
              color="secondary"
              focused
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="คำอธิบาย"
              value={description}
              color="secondary"
              focused
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              label="ราคา"
              value={price}
              color="secondary"
              focused
              onChange={(e) => setPrice(e.target.value)}
            />
          </Box>

          <TextField
            value={category}
            select
            label="หมวดหมู่"
            defaultValue="เครื่องดื่ม"
            helperText="Please select your category"
            onChange={(e) => setCategory(e.target.value)}
          >
            {menus.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <button type="submit">Add New Menu</button>
        </form>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
    </Box>
  );
}
