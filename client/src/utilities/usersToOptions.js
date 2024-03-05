export const usersToOptions = (users) => {
  const options = users
    .map((user) => {
      return {
        value: user._id,
        label: `${user.firstName} ${user.lastName}`,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  return options;
};
