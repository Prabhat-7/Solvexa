"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react"; // used to  call the convex mutations
import { useEffect } from "react";

export default function Home() {
  const { user } = useUser(); // collect the logged-in user
  const createUser = useMutation(api.user.createUser); //call the createUser mutation

  useEffect(() => {
    user && CheckUser();
  }, [user]);

  const CheckUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress ?? "",
      imageUrl: user?.imageUrl ?? "",
      userName: user?.fullName ?? "",
    });
    console.log(result);
  };
  return (
    <div>
      <h1>Prabhat Sitaula.</h1>
      <Button>button</Button>
      <UserButton />
    </div>
  );
}
