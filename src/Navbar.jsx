import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useAuth0 } from "@auth0/auth0-react"

export default function Navbarr() {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);


    
    return (

        <div>


            <Navbar onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarBrand>
                        <AcmeLogo />
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem className="lg:flex">
                        {isAuthenticated ? <Link href="#" onClick={e => logout()}>Log out</Link> : <Link href="#" onClick={e => loginWithRedirect()}>Log in</Link>}
                    </NavbarItem>

                    <NavbarItem>
                        <a href="https://github.com/Shahzaibxo" target="_blank">

                        <Button as={Link} color="secondary"  variant="flat">
                            Github
                        </Button>
                        </a>
                    </NavbarItem>

                </NavbarContent>
            
            </Navbar>
        </div>
    );
}
