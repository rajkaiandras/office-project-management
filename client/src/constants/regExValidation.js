export const regExValidation = {
  firstNameRegex: /^\b([A-ZÁÉÍÓÖŐÚÜŰ][-,a-záéíóöőúüű. ']+[ ]*)+$/,
  lastNameRegex: /^\b([A-ZÁÉÍÓÖŐÚÜŰ][-,a-záéíóöőúüű. ']+[ ]*)+$/,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  passwordRegex: /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
  projectNameRegex: /^\b([A-ZÁÉÍÓÖŐÚÜŰ][-,a-záéíóöőúüű. ']+[ ]*)+$/,
  projectDetailsRegex: /^.{32,256}$/,
};
