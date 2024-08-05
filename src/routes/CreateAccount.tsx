import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { useForm } from "react-hook-form";
// CSS
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../styles/auth-components";
// Components
import GithubBtn from "../components/GithubBtn";
import FindPw from "../components/FindPw";
import GoogleBtn from "../components/GoogleBtn";

interface IForm {
  name: string;
  email: string;
  password: string;
  password1: string;
  firebase?: string;
}

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  const onSubmit = async ({ name, email, password, password1 }: IForm) => {
    if (isLoading) return alert("Fail: It's currently loading..");
    if (password !== password1)
      return setError(
        "password",
        { message: "Fail: Password is different." },
        { shouldFocus: true }
      );
    try {
      setIsLoading(true);
      // Create an account
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await sendEmailVerification(credentials.user);
      // Set the name of the user
      await updateProfile(credentials.user, { displayName: name });
      // Log out & Redirect to the home page
      auth.signOut();
      navigate("/");
      alert(`Please check certification e-mail in ${email}.`);
    } catch (e) {
      if (e instanceof FirebaseError)
        setError("firebase", { message: e.message });
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name", {
            required: "Fail: Input 'Name*'.",
            minLength: {
              value: 2,
              message: "Fail: input 'Name*' more than 2 characters.",
            },
            maxLength: {
              value: 10,
              message: "Fail: input 'Name*' less than 10 characters.",
            },
            validate: {
              noAdmin: (value) =>
                !value.toLowerCase().includes("admin") ||
                "Fail: No 'admin' in 'Name*'.",
            },
          })}
          placeholder="Name*"
          type="text"
          required
        />
        <Input
          {...register("email", {
            required: "Fail: Input 'E-Mail*'.",
            minLength: {
              value: 11,
              message: "Fail: input 'E-Mail*' more than 11 characters.",
            },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: "Fail: Only 'naver.com' emails allowed.",
            },
          })}
          placeholder="E-Mail*"
          type="email"
          autoComplete="username"
          required
        />
        <Input
          {...register("password", {
            required: "Fail: Input 'Password*'.",
            minLength: {
              value: 6,
              message: "Fail: input 'Password*' more than 6 characters.",
            },
          })}
          placeholder="Password*"
          type="password"
          autoComplete="new-password"
          required
        />
        <Input
          {...register("password1", {
            required: "Fail: Input 'Confirm Password*'.",
            minLength: {
              value: 6,
              message:
                "Fail: input 'Confirm Password*' more than 6 characters.",
            },
          })}
          placeholder="Confirm Password*"
          type="password"
          required
        />
        <Input
          type="submit"
          value={isLoading ? "Loading.." : "Create Account"}
          disabled={isLoading ? true : false}
        />
      </Form>
      <Error>{errors.name?.message}</Error>
      <Error>{errors.email?.message}</Error>
      <Error>{errors.password?.message}</Error>
      <Error>{errors.password1?.message}</Error>
      <Error>{errors.firebase?.message}</Error>

      <Switcher>
        Already have an account?&nbsp;
        <Link to="/login">Log In &rarr;</Link>
      </Switcher>
      <FindPw />
      <GithubBtn />
      <GoogleBtn />
    </Wrapper>
  );
}
