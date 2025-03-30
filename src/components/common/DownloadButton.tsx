import { Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { FaDownload, FaFilePdf } from 'react-icons/fa';
import { memo, useState } from 'react';
import type { CvFile } from '@/utils/getCvFiles';

const STYLE = {
  BUTTON: {
    border: '1px solid',
    borderColor: 'primary.main',
    '& > svg': {
    fontSize: '1.5rem',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'all 0.2s ease-in-out',
  },
  },
  MENU_ITEM: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
  },
} as const;

interface DownloadButtonProps {
  cvFiles: CvFile[];
  locale: 'tr' | 'en';
}

function DownloadButton({ cvFiles, locale }: DownloadButtonProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownload = (fileName: string) => {
    const link = document.createElement('a');
    link.href = `/cv/${fileName}`;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClick}
        startIcon={<FaDownload />}
        sx={STYLE.BUTTON}
      >
        {locale === 'tr' ? 'CV İndir' : 'Download CV'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {cvFiles.map((cv) => (
          <MenuItem
            key={cv.file}
            onClick={() => handleDownload(cv.file)}
            sx={STYLE.MENU_ITEM}
          >
            <ListItemIcon>
              <FaFilePdf />
            </ListItemIcon>
            <ListItemText primary={cv.name} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default memo(DownloadButton); 