"use client";

import { Button } from "@/components/ui/button";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import { SignInButton, useOrganization, useSession } from "@clerk/nextjs";
import { useMutation, useQueries, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function Home() {
  const { organization } = useOrganization();
  console.log(organization?.id);
  const files = useQuery(
    api.files.getFiles,
    organization?.id ? { orgId: organization.id } : "skip"
  );
  const createFile = useMutation(api.files.createFile);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign In</Button>
        </SignInButton>
      </SignedOut>

      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}

      <Button
        onClick={() => {
          if (!organization) return;
          createFile({
            name: "hello world",
            orgId: organization?.id,
          });
        }}
      >
        Click Me
      </Button>
    </main>
  );
}
