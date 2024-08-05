import styled from "styled-components";
import { useState } from "react";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useForm } from "react-hook-form";

// CSS
import { Error } from "../styles/auth-components";
import { FirebaseError } from "firebase/app";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TextArea = styled.textarea`
  padding: 20px;
  border: 2px solid white;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  &::placeholder {
    font-size: 16px;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const AttachFileBtn = styled.label`
  padding: 10px 0;
  background-color: black;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover,
  &:active {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

const AttachFileInput = styled.input`
  display: none;
`;

const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

interface IForm {
  tweet: string;
  firebase?: string;
  reCaptcha?: string;
}

export default function PostTweetForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // <form>
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<IForm>();

  // Add photo file
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    // 1 file & less then 1MB
    if (files && files.length === 1 && files[0].size <= 1048576)
      return setFile(files[0]);
    else return alert("Fail: Please attach an image file of less then 1MB.");
  };

  /* Submit tweet */
  const onSubmit = async ({ tweet }: IForm) => {
    // Check logged-in
    const user = auth.currentUser;
    if (!user || isLoading) return alert("Fail: Please refresh web site.");
    try {
      setIsLoading(true);
      // Add tweet to DB
      const docRef = await addDoc(collection(db, "tweets"), {
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
      if (file) {
        const locationRef = ref(storage, `tweets/${user.uid}/${docRef.id}`);
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        await updateDoc(docRef, { photo: url });
      }
      // Success
      alert("Tweet posted successfully!");
      reset();
      setFile(null);
    } catch (error) {
      console.log(error);
      if (error instanceof FirebaseError)
        setError("firebase", { message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextArea
          {...register("tweet", {
            required: "Tweet must be required.",
            maxLength: {
              value: 180,
              message: "Tweets can be up to 180 characters long.",
            },
          })}
          rows={5}
          maxLength={180}
          placeholder="What is happening?"
          required
        />
        <AttachFileBtn htmlFor="file">
          {file ? "Photo Added ✅" : "Add Photo"}
        </AttachFileBtn>
        <AttachFileInput
          onChange={onFileChange}
          type="file"
          accept="image/*"
          id="file"
        />
        <SubmitBtn
          type="submit"
          value={isLoading ? "Posting.." : "Post Tweet"}
        />
        <Error>{errors.tweet?.message}</Error>
        <Error>{errors.firebase?.message}</Error>
        <Error>{errors.reCaptcha?.message}</Error>
      </Form>
    </>
  );
}
