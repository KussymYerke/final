import { Routes, Route } from 'react-router-dom';

import './globals.css'
import SigninForm from "./_auth/forms/SigninForm.tsx";
import SignUpForm from "./_auth/forms/SignUpForm.tsx";
import {Home} from "./_root/pages";
import AuthLayout from "./_auth/AuthLayout.tsx";
import RootLayout from "./_root/RootLayout.tsx";


const App = () => {
    return (
        <main className="flex h-screen">
            <Routes>
            {/*  public  */}
                <Route element={<AuthLayout />}>
                    <Route path="/sign-in" element={<SigninForm />} />
                    <Route path="/sign-up" element={<SignUpForm />} />
                </Route>
            {/*  private  */}
                <Route element={<RootLayout />}>
                    <Route index element={<Home />}/>
                </Route>
            </Routes>
        </main>
    );
};

export default App;