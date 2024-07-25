import UserList from "./UserList";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

export default function AddUser() {
  const [cacheId, setCacheId] = useState(1);
  const submitHandler = async (previousState, formData) => {
    try {
      const body = {
        name: formData.get("name"),
        age: formData.get("age"),
      };
      console.log("body", body);
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setCacheId(cacheId + 1);
      return response.json();
    } catch (error) {
      return { error: error.message };
    }
  };

  const [state, submitAction, isPending] = useActionState(submitHandler);
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
        {/* <NestedSubmitButton /> */}
        <div>
          <button disabled={isPending}>
            {isPending ? "Adding" : "Add User"}
          </button>
        </div>
        {state?.error && <p>{state.error}</p>}
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
