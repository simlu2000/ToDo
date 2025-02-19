import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteButton({onDelete}) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="delete" size="large" sx={{color:'error.main'}}>
        <DeleteIcon onClick={onDelete} fontSize="inherit"/>
      </IconButton>
    </Stack>
  );
}
