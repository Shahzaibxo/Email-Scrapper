import './App.css'
import { Input } from "@nextui-org/react";
import React from 'react'
import { useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react"



export default function Landingg() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isloading, setIsloading] = useState(false)
  const [emails, setEmails] = useState("")
  const [weblink, setWeblink] = useState("")
  const { loginWithRedirect, isAuthenticated } = useAuth0()

  async function fetchdata() {
    setIsloading(true)

    try {
      if (weblink === "") {
        alert("Enter a Valid Web Address to Continue")
      }
      const response = await fetch(`https://projectapi.cyberguards.info`,
        {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: weblink })
        });

      if (response.ok) {

        const data = await response.json();
        // const dataemails = data.emails.join(", ")
        setEmails(data);
      }
      else {
        alert("there was an error scanning the website, make sure you enter a complete web address")
      } 
    } finally {
      setIsloading(false)
    }
  }
  const downloads = () => {
    const blob = new Blob([emails], { type: 'text/plain' });
    const fileUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'email-list.txt';
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(fileUrl);
  };
  return (
    <>
      <div className="const">

        <div className='flex items-center justify-center h-screen w-scr container'>
          <div className='container'>
            <div className="left-container">
              <div className="title">Email scrapper</div>
              <div className="description" style={{ color: "white", paddingBottom: "10px" }}>Built on React & Flask as backend, Next UI for aesthetic styling. <br />Backend manually deployed on EC2 using Nginx server & Gunicorn as a WSGI.<br />Frontend deployed on AWS amplify (serverless).<br/>Enter any valid Web address (i.e: <u>https://www.tourradar.com</u>) to scrap emails </div>
            </div>

            <form>
              <div className="right-container flex-col flex">
                <div className="input-container flex flex-col">
                  <div className=" flex w-full flex-wrap md:flex-nowrap gap-5 border-none">

                    <Input type="text" style={{ marginTop: "5px" }} value={weblink} onChange={(e) => setWeblink(e.target.value)} className="input-field" label="Enter Website Link Here" startContent={<i class="fa-solid fa-magnifying-glass"></i>} />
                  </div>
                  <div className='wtf'>

                    {isloading ? <Button color="primary" className='mr-2' isLoading>
                      Loading
                    </Button> :
                      <Button onClick={isAuthenticated ? fetchdata : onOpen} color="primary" className="button mr-2" startContent={<i style={{ paddingTop: "5px" }} className="fa-solid fa-envelope"></i>}>
                        Start Fetching
                      </Button>
                    }
                    {emails === "" ? <Button color="default" isDisabled onClick={isAuthenticated ? () => downloads() : onOpen} className="button" startContent={<i style={{ paddingTop: "5px" }} className="fa-solid fa-download"></i>}>
                      Download Data
                    </Button> : <Button color="primary" onClick={isAuthenticated ? () => downloads() : onOpen} className="button" startContent={<i style={{ paddingTop: "5px" }} className="fa-solid fa-download"></i>}>
                      Download Data
                    </Button>}
                  </div>

                </div>
              </div>
            </form>
            <div className='love' style={{ textAlign: "center", color: "white" }}>
              Made with 💪 & <span className="heart">♥</span>
            </div>

          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} backdrop='blur' onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cannot Proceed until Signed in</ModalHeader>
              <ModalBody>
                <p>
                  To ensure a safe and enjoyable experience for all users, we require <b>signing in</b> before accessing <i>webscrapper</i>.
                </p>
                <p>
                  This helps prevent <i>unauthorized spamming and misuse</i>, safeguarding the integrity and functionality of our platform.
                </p>
                <p>
                  Thank you for your understanding and cooperation in maintaining a secure environment for everyone. 🙏
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={loginWithRedirect}>
                  Sign In
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}