export const assignedToDefaultOptions = (assignedTo) => {
  let defaultOptions = assignedTo.map((assigned) => {
    let option = {
      value: assigned._id,
      label: `${assigned.firstName} ${assigned.lastName}`,
    };

    return option;
  });

  return defaultOptions;
};
