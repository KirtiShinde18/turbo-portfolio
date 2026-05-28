
import React from "react"
import PublicNavbar from "../../_components/PublicNavbar"

const Layout = ({ children }: { children: React.ReactNode }) => {


  return (
    <>
    <PublicNavbar/>
    {children}
    </>

  )
}

export default Layout