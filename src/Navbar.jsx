import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { AcmeLogo } from "./AcmeLogo.jsx";
import { useAuth0 } from "@auth0/auth0-react"

export default function Navbarr() {
    const { loginWithRedirect, isAuthenticated, logout } = useAuth0()
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);


    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];
    return (

        <div>


            <Navbar onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
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
                <NavbarMenu>
                    {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                                color={
                                    index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                }
                                className="w-full"
                                href="#"
                                size="lg"
                            >
                                {item}
                            </Link>
                        </NavbarMenuItem>
                    ))}
                </NavbarMenu>
            </Navbar>
        </div>
    );
}
