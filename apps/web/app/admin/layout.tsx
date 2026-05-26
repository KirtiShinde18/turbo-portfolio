import React from 'react'
import AdminNavbar from '../../_components/AdminNavbar';

const layout = ({ children, }: Readonly<{ children: React.ReactNode; }>) => {
    return <>
        <AdminNavbar />
        {children}
    </>
}

export default layout