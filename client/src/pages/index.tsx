import { useState, useEffect } from 'react';
import { Box, Container, Tab, Tabs } from '@mui/material';
import { deleteCookie } from 'cookies-next';
import { LoginForm, SignUpForm } from './auth';

export default function Login() {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (event: any, newTab: number) => {
    setActiveTab(newTab);
  };

  useEffect(() => {
    deleteCookie('token');
  }, []);

  return (
    <main
      className="w-screen h-screen bg-cover"
      // style={{ backgroundImage: "url('/assets/bg1.jpg')" }}
    >
      <Box className="w-1/2 h-screen absolute top-0 left-0 bg-[#35654D] rounded-br-[50vw]" />
      <div className="max-w-screen-2xl m-auto">
        <Container maxWidth="md" className="pt-64">
          <Box
            className="mb-2 flex justify-end"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tabs
              value={activeTab}
              style={{ justifyContent: 'flex-end' }}
              onChange={handleTabChange}
            >
              <Tab label="Log In" />
              <Tab label="Sign Up" />
            </Tabs>
          </Box>
          <div className="flex justify-end">
            <div>
              {activeTab === 0 && <LoginForm />}
              {activeTab === 1 && (
                <SignUpForm finishSignup={(e: any) => handleTabChange(e, 0)} />
              )}
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
