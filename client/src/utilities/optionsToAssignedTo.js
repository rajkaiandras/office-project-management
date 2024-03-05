export const optionsToAssignedTo = (options) => {
  let assignedTo = options.map((assigned) => {
    let sep = assigned.label.split(' ');

    return {
      _id: assigned.value,
      firstName: sep[0],
      lastName: sep[1],
    };
  });

  return assignedTo;
};
