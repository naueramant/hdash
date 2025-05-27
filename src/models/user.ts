export type User = {
  name: string;
  height: number; // in cm
  birthday: string; // ISO date string
  gender: Gender;
};

export type Gender = "male" | "female";

export function getUserAge(birthday: string): number {
  const birthDate = new Date(birthday);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
