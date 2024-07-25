import UserList from "./UserList";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

export default function AddUser() {
  const [cacheId, setCacheId] = useState(1);
  const submitHandler = async (previousState, formData) => {
    console.log("prev:", previousState, "formData", formData);
    const body = {
      name: formData.get("name"),
      age: formData.get("age"),
    };
    console.log("body", body);
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setCacheId(cacheId + 1);
    return response.json();
  };

  const [error, submitAction, isPending] = useActionState(submitHandler);
  const refreshCache = () => {
    setCacheId(cacheId + 1);
  };

  return (
    <div>
      <UserList cacheId={cacheId} refreshCache={refreshCache} />
      <hr />
      Add new User
      <form action={submitAction}>
        <div>
          Name: <input name="name" type="text" placeholder="Name" />
        </div>
        <div>
          Age: <input name="age" type="text" placeholder="Age" />
        </div>
        <NestedSubmitButton />
        <div>
          <button disabled={isPending}>
            {isPending ? "Adding" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
}

function NestedSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending}>
      {pending ? "Adding" : "Add User"}
    </button>
  );
}
