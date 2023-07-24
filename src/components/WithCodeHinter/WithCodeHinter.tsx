import CodeIcon from '@mui/icons-material/Code';
import { FC, PropsWithChildren, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

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
        <div>
            <div>{children}</div>
            <Button onClick={handleOpen} sx={{ mt: 2 }} variant="outlined" startIcon={<CodeIcon />}>
                Show code
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h5" component="h5">
                        Code of the Currrent Component 
                        <hr />
                    </Typography>
                    <pre>
                        <Typography id="modal-modal-description" sx={{ mt: 2, fontFamily: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace` }}>
                            {code}
                        </Typography>
                    </pre>
                </Box>
            </Modal>
        </div>
    )
}