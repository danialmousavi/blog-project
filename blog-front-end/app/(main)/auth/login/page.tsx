import LoginPage from '@/components/Auth/Login'
import { AuthUserProfile } from '@/services/AuthService';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';

export default async function page() {
  const cookieStore=await cookies();
  const token=cookieStore.get("Token")?.value;
  const validateToken=await AuthUserProfile();
  if(token && validateToken){
    redirect("/")//redirect to home page
  }
  return (
    <>
    <LoginPage/>
    </>
  )
}
