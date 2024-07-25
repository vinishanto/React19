import { useState, useTransition } from "react";
import { useEffect } from "react";

export function UserItem({ user, refreshCache }) {
  const [isDeleting, startDeleteTransition] = useTransition();

  const deleteHandler = (userId) => {
    startDeleteTransition(async () => {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "DELETE",
      });
      refreshCache();
    });
  };
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.age}</td>
      <td>
        {isDeleting ? (
          <div>deleting...</div>
        ) : (
          <button onClick={() => deleteHandler(user.id)}>Delete</button>
        )}
      </td>
    </tr>
  );
}

export default function UserList({ cacheId, refreshCache }) {
  const [users, setUsers] = useState([]);

  const [isfetching, startFetchTransition] = useTransition();

  useEffect(() => {
    getUserData();
  }, [cacheId]);

  const getUserData = async() => {
    // startFetchTransition(async () => {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    // });
  };

  return false ? (
    <div className="">loading...</div>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserItem user={user} key={user.id} refreshCache={refreshCache} />
        ))}
      </tbody>
    </table>
  );
}
