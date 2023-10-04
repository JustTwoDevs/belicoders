export function calculateAge(dateOfBirth) {
  const currentDate = new Date();
  const dateOfBirthDate = new Date(dateOfBirth);
  let age = currentDate.getFullYear() - dateOfBirthDate.getFullYear();

  if (
    dateOfBirthDate.getMonth() > currentDate.getMonth() ||
    (dateOfBirthDate.getMonth() === currentDate.getMonth() &&
      dateOfBirthDate.getDate() > currentDate.getDate())
  ) {
    age--;
  }

  return age;
}
