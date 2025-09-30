'use client';

import { lusitana } from '@/app/ui/fonts';
import { userPool } from '@/app/services/cognito';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import {
  AtSymbolIcon, ExclamationCircleIcon
} from '@heroicons/react/24/outline';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import { z } from 'zod';
import { Button } from './button';
import { setCookie } from 'cookie-next';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({
    email: [],
  });
  const router = useRouter();

  useEffect(() => {
    if (email) {
      const parsedCredentials = z
        .object({ email: z.string().email() })
        .safeParse({ email });
      
      if (!parsedCredentials.success) {
        const newErrors = parsedCredentials.error.flatten().fieldErrors
        setErrors(newErrors);
        setIsFormValid(false);
      } else {
        setErrors({ email: [] });
        setIsFormValid(true);
      }
    }
  }, [email]);
  
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    console.log('call handle submit')
    event.preventDefault();

    try {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });
    
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: 'abcABC@123',
      });
      cognitoUser.setAuthenticationFlowType('CUSTOM_AUTH');
      cognitoUser.initiateAuth(authDetails, {
        onSuccess: async (result: any) => {
          console.log('login successful', result);
          router.push('/dashboard')  
        },
        onFailure: (err: any) => {
          console.log('login failed', err);
          throw new Error('Failed to login with error: ', err)
        },
        customChallenge(challengeParameters: any) {
          // User authentication depends on challenge response
          const challengeResponses = prompt('Enter code:');
          cognitoUser.sendCustomChallengeAnswer(challengeResponses, this);
          const user: CognitoUser | null = userPool.getCurrentUser();
          console.log('user', user)
        },
      });
    } catch (error) {
      return { message: 'Invalid credentials' }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Please log in to continue.
        </h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <LoginButton isFormValid={isFormValid}/>
        <div 
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
            {errors?.email &&
            errors.email.map((errorMessage: string) => (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage}</p>
              </>
            ))
          }
        </div>
      </div>
    </form>
  );
}

function LoginButton({ isFormValid }: { isFormValid: boolean }) {
  return (
    <Button className="mt-4 w-full" aria-disabled={!isFormValid}>
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  );
}
