export class Common {
  constructor() {}
  CardPerPage = 4;

  textreducing(text: string, maxlength: number) {
    if (text.length > maxlength) {
      return text.substring(0, maxlength) + "...";
    }
    return text;
  }

  validatePassword = (password: string): string | undefined => {
    if (!password.trim()) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password))
      return "Password must include letters and numbers";
    return undefined;
  };

  validateEmail = (email: string): string | undefined => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "Email is required";
    if (!regex.test(email)) return "Invalid email format";
    return undefined;
  };

  
}
