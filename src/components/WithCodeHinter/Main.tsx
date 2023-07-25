import CodeIcon from '@mui/icons-material/Code';
import { FC, PropsWithChildren, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import styles from './styles.module.css'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  borderRadius: 3,
  boxShadow: 24,
  width: '80vw',
  maxHeight: '80vh',
  overflowY: 'auto',
  background: 'black',
  color: 'white',
  p: 4,
};

type T_Props = {
    code: string
}

export const WithCodeHinter: FC<PropsWithChildren<T_Props>> = ({ children, code }) => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box>
            <Button  sx={{ my: 2 }} onClick={handleOpen} variant="outlined" startIcon={<CodeIcon />}>
                Show code
            </Button>
            <Box>{children}</Box>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box 
                    sx={style} 
                    className={styles.modal}
                >
                    <Typography id="modal-modal-title" variant="h5" component="h5">
                        Source of the currrent component 
                        <hr />
                    </Typography>
                    <pre>
                        <Typography id="modal-modal-description" sx={{ mt: 2, fontFamily: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace` }}>
                            {code}
                        </Typography>
                    </pre>
                </Box>
            </Modal>
        </Box>
    )
}