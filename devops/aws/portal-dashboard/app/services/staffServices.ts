
import { ROUTER_API_URL } from '@/app/constants';
import { getUserToken, userPool } from "@/app/services/cognito";

export const getStaffs = async () => {
  console.log('GET STAFFS');
  const idToken = getUserToken();
  console.log('idToken', idToken)
  const res = await fetch(`${ROUTER_API_URL}/staffs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': idToken
    },
  });

  console.log('res-----------------', res)
  if (!res.ok) throw new Error(`${res.status}, ${res.statusText}`);

  return res.json();
}