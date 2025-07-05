import React from 'react';
import { DrawerHeader } from './index';
import { LogoSection } from '../LogoSection';

// ตัวอย่างที่ 1: DrawerHeader แบบพื้นฐาน
export const BasicDrawerHeader = () => {
  const handleClose = () => console.log('Close drawer');
  
  return <DrawerHeader onClose={handleClose} />;
};

// ตัวอย่างที่ 2: DrawerHeader แบบไม่มี "ลงประกาศฟรี"
export const DrawerHeaderWithoutPostFree = () => {
  const handleClose = () => console.log('Close drawer');
  
  return (
    <DrawerHeader 
      onClose={handleClose} 
      showPostFree={false}
    />
  );
};

// ตัวอย่างที่ 3: DrawerHeader แบบ custom สี
export const CustomColorDrawerHeader = () => {
  const handleClose = () => console.log('Close drawer');
  
  return (
    <DrawerHeader 
      onClose={handleClose}
      backgroundColor="#FFFFFF"
      logoProps={{
        textColor: '#F4762A',
        fontWeight: 600
      }}
    />
  );
};

// ตัวอย่างที่ 4: DrawerHeader แบบ custom logo ขนาด
export const LargeLogoDrawerHeader = () => {
  const handleClose = () => console.log('Close drawer');
  
  return (
    <DrawerHeader 
      onClose={handleClose}
      logoProps={{
        logoWidth: 50,
        logoHeight: 60,
        fontSize: '28px',
        gap: '20px'
      }}
    />
  );
};

// ตัวอย่างที่ 5: LogoSection แยกเดี่ยวๆ
export const StandaloneLogoSection = () => {
  return (
    <LogoSection 
      logoWidth={60}
      logoHeight={70}
      fontSize="32px"
      fontWeight={700}
      textColor="#F4762A"
      gap="24px"
    />
  );
};

// ตัวอย่างที่ 6: LogoSection แบบ compact
export const CompactLogoSection = () => {
  return (
    <LogoSection 
      logoWidth={24}
      logoHeight={28}
      fontSize="16px"
      fontWeight={400}
      gap="8px"
    />
  );
}; 