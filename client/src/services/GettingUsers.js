import { useState, useEffect } from 'react';
import { useHttpClient } from '../hooks/useHttpClient';

export const GettingUsers = () => {
  const {
    sendRequest,
    isPending: isGettingUsersPending,
    isSuccess: isGettingUsersSuccess,
    error: gettingUsersError,
  } = useHttpClient();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const gettingUsers = async () => {
      try {
        const result = await sendRequest('http://localhost:8080/api/users');

        setUsers(result);
      } catch (err) {
        console.log({ err, gettingUsersError });
      }
    };

    gettingUsers();
  }, []);

  return {
    users,
    isGettingUsersPending,
    isGettingUsersSuccess,
    gettingUsersError,
  };
};
