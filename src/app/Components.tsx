import { AppBar, Box, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import React from "react";
import AdbIcon from '@mui/icons-material/Adb';
import { AccountCircle, CheckBox } from "@mui/icons-material";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface ITextField {
    name: String;
    type?: String;
    placeholder?: String;
    isFieldNameHorizontal?: boolean;
    title?: String;
    value: any;
    onChange: (v: any) => void; 
    onBlur?: (v: any) => void;
}

export const TextField = ({name, type, placeholder, title, isFieldNameHorizontal, value, onChange, onBlur}: ITextField) => {
    return(
        <div className={isFieldNameHorizontal ? 'flex py-1' : 'py-1'}>
            <div className="font-medium text-gray-500 text-sm pb-1">{title}</div>
            <input 
                className="p-1 border rounded border-gray-300 w-full" 
                type={type ? `${type}` : 'text'}
                name={`${name}`}
                placeholder={placeholder ? `${placeholder}` : ''} 
                value={value}
                onChange={(e) => {if(onChange) onChange(e?.target?.value)}}
                onBlur={(e) => {if(onBlur) onBlur(e?.target?.value)}}
                required 
            />
        </div>
    )
}

interface IConfirmationModel {
    message: string,
    onDismiss: (val?: any) => void
}

export const ConfirmationModel = ({message, onDismiss}: IConfirmationModel) => {
    const [loading, setLoading] = React.useState(false);

    return(
        <div className="flex w-full h-screen bg-black bg-opacity-50 items-center justify-center absolute inset-0">
            <div className="flex flex-col items-center justify-between w-25 p-10 border rounded-lg shadow-lg bg-white">
                <div className="text-sm pb-10">{message}</div>
                <div className="border-t w-full pt-2">
                    <div className="float-right">
                        <button className="border bg-gray-100 py-1 px-5 rounded mr-2" disabled={loading} onClick={(e) => onDismiss()}>Cancel</button>
                        <button className="border bg-darkestGreen text-white py-1 px-5 rounded" disabled={loading} onClick={(e) => onDismiss(true)}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Header = () => {
    return(
        <>
            <AppBar position="static" sx={{background: 'green'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters className="flex items-center justify-between">
                        <Box className='flex items-center'>
                            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="#app-bar-with-responsive-menu"
                                sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                }}
                            >LOGO</Typography>
                        </Box>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={() => {}}
                            color="inherit"
                        ><AccountCircle /></IconButton>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    )
}

// tables   
  const rows = [
    { id: 1, task: 'Send bulk emails and join link on add workspac', owner: 'taruna', status: 'In Progress', priority: 'High', TaskDueDate: '12/05/2025', githubLink: 'www.google.com' },
    { id: 1, task: 'Send bulk emails and join link on add workspac', owner: 'taruna', status: 'In Progress', priority: 'High', TaskDueDate: '12/05/2025', githubLink: 'www.google.com' },
    { id: 1, task: 'Send bulk emails and join link on add workspac', owner: 'taruna', status: 'In Progress', priority: 'High', TaskDueDate: '12/05/2025', githubLink: 'www.google.com' },
    { id: 1, task: 'Send bulk emails and join link on add workspac', owner: 'taruna', status: 'In Progress', priority: 'High', TaskDueDate: '12/05/2025', githubLink: 'www.google.com' },
    { id: 1, task: 'Send bulk emails and join link on add workspac', owner: 'taruna', status: 'In Progress', priority: 'High', TaskDueDate: '12/05/2025', githubLink: 'www.google.com' },
    { id: 1, task: 'Send bulk emails and join link on add workspac', owner: 'taruna', status: 'In Progress', priority: 'High', TaskDueDate: '12/05/2025', githubLink: 'www.google.com' },
    { id: 1, task: 'Send bulk emails and join link on add workspac', owner: 'taruna', status: 'In Progress', priority: 'High', TaskDueDate: '12/05/2025', githubLink: 'www.google.com' },
  ];

export const DashboardHome = () => {
    return (
        <>
            <div style={{ height: 'auto', width: '100%' }}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}}>
                        <TableHead>
                            <TableRow>
                                <TableCell width={'5%'}><CheckBox /></TableCell>
                                <TableCell width={'45%'}>Task</TableCell>
                                <TableCell width={'10%'}>Owner</TableCell>
                                <TableCell width={'10%'}>Status</TableCell>
                                <TableCell width={'10%'}>Priority</TableCell>
                                <TableCell width={'10%'}>Task due date</TableCell>
                                <TableCell width={'10%'}>GitHub link</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row"><CheckBox /></TableCell>
                                    <TableCell>{row?.task}</TableCell>
                                    <TableCell>{row?.owner}</TableCell>
                                    <TableCell>{row?.status}</TableCell>
                                    <TableCell>{row?.priority}</TableCell>
                                    <TableCell>{row?.TaskDueDate}</TableCell>
                                    <TableCell>{row?.githubLink}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

