import { UserForm } from "~/components/UsersForm";

import { type ActionArgs, redirect } from "@remix-run/node"
import { db } from "~/db.server";
import { type User } from "@prisma/client";

/**
 * Server execution, receive form request
 * @param param0 
 * @returns 
 */
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as unknown as User

  await db.user.create({data})

  return redirect('/users')
};

/**
 * View
 * @returns 
 */
export default function () {
  return <UserForm />;
}

/**
 * Catch error on this route
 * @returns 
 */
export function ErrorBoundary() {
  return (
    <div className="bg-red-100 border border-red-500 p-12 text-red-500 font-bold text-2xl">
      Something went wrong
    </div>
  );
}