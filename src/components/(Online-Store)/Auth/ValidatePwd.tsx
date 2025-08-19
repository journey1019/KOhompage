export default function validatePassword(password: string): boolean {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);

    const types = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;

    if (types >= 2 && password.length >= 10) return true;
    if (types >= 3 && password.length >= 8) return true;

    return false;
}
