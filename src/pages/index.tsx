// import Image from "next/image";
// import { Inter } from "next/font/google";
// import HomeContainer from "./home";
// import { useRouter } from "next/router";
// import { useStorage } from "next"

// const inter = Inter({ subsets: ["latin"] });

// const token = window.sessionStorage.getItem('token')
// console.log(token)
// const isLoggedIn = !!token
// export default function Home() {
//   const router = useRouter();


//   return isLoggedIn ? router.push("home") : router.push("login");
// }

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PublicLayout from '@/layout/PublicLayout';
import RegisterContainer from './register';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const token = window.sessionStorage.getItem('token');
    console.log(token);

    const isLoggedIn = !!token;

    if (isLoggedIn) {
      router.push('/home');
    // } else {
    //   router.push('/register');
    }
  }, [router]);

  return (
    <PublicLayout>
      <RegisterContainer>
        
      </RegisterContainer>
    </PublicLayout>
  )
};

export default Home;