'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react'; // Import useState
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
 // Assuming you're using an icon package


const formSchema = z
  .object({
    email: z.string().email({ message: 'Enter a valid email address' }),
    phoneNo: z.string().min(11, { message: 'Enter a valid phone number' }),
    fullname: z.string({ required_error: 'Full name is required' }),
    cnic: z.string().min(13, { message: 'Enter a valid CNIC number' }),
    password: z.string({ required_error: 'Password is required' }),
    address: z.string({ required_error: 'Address is required' }),
    confirmPassword: z.string({ required_error: 'Confirm your password' })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'] // Set the path for error message display
  });;



export default function UserAuthForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [loading, startTransition] = useTransition();
const [passwordVisible, setPasswordVisible] = useState<Boolean>(false);
  const form = useForm<VendorFormValue>({
    resolver: zodResolver(formSchema),

  });

  const onSubmit = async (data) => {

    startTransition(() => {
      signIn('credentials', {
        email: data.email,
        callbackUrl: callbackUrl ?? '/dashboard'
      });
      toast.success('Signed In Successfully!');
    });
  };

  return (
    <>
      <Form {...form}>
        <div>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            {/* First Row: Full Name and Email */}
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your full name... eg.(John Wick)"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Second Row: Phone Number and CNIC */}
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="phoneNo"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cnic"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>CNIC</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your CNIC..."
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Third Row: Password and Address */}
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Password</FormLabel>
                    <div className="relative">
                      <FormControl>
                        <Input
                          type={passwordVisible ? 'text' : 'password'}
                          placeholder="Enter your password..."
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      {/* Toggle Button to show/hide password */}
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() => setPasswordVisible((prev) => !prev)}
                      >
                        {passwordVisible ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Confirm Password</FormLabel>

                    <div className="relative">
                      <FormControl>
                        <Input
                          type={passwordVisible ? 'text' : 'password'}
                          placeholder="Confirm your password..."
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      {/* Toggle Button to show/hide confirm password, outside FormControl */}
                      <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center"
                        onClick={() => setPasswordVisible((prev) => !prev)}
                      >
                        {passwordVisible ? (
                          <EyeOff size={20} />
                        ) : (
                          <Eye size={20} />
                        )}
                      </button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your address..."
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div></div>
            <Button disabled={loading} className="ml-auto w-full" type="submit">
              Signup
            </Button>
            <div className="mt-4 text-center">
              <span className="text-gray-400">Already have an account? </span>
              <Link href="/" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </Form>
    </>
  );
}
