import Link from "next/link";
// importing dependancys
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

// creating function to sign in
export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    "use server";
    // storing sign in data in varibales
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect(
        "/userMessage/User cannot be authenticated. Please ensure username and password are correct."
      );
    }

    return redirect("/");
  };
  // storing sign up data in varibales
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      console.log(error);

      return redirect(
        "/userMessage/User cannot be authenticated. Please Try again."
      );
    }

    return redirect("/userMessage/Please check your email to continue sign up");
  };
  // rendering user data inputs and sign in button
  return (
    <div className="box">
      {/* <Link href="/"> Back</Link> */}
      <img src="/favicon.ico" alt="harvestHub Logo" className="logo"></img>
      <form className="form" action={signIn}>
        {/* <label className="text-md" htmlFor="email">
          Email
        </label> */}

        <input name="email" placeholder="Email" required />
        {/* <label className="text-md" htmlFor="password">
          Password
        </label> */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Sign In
        </button>
        <button formAction={signUp}>Sign Up</button>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
      <a className="reset-password" href="#">
        Forgot your password?
      </a>
      <Link href="https://harvest-hub-tau.vercel.app/">
        <button>Continue as Guest</button>
      </Link>
    </div>
  );
}
