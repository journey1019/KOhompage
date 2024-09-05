// import { createContext, useState, useEffect, ReactNode } from 'react';
//
// interface ThemeContextProps {
//     theme: string;
//     toggleTheme: () => void;
// }
//
// export const ThemeContext = createContext<ThemeContextProps>({
//     theme: 'light',
//     toggleTheme: () => {},
// });
//
// export const ThemeProvider = ({ children }: { children: ReactNode }) => {
//     const [theme, setTheme] = useState<string>('light');
//
//     useEffect(() => {
//         const root = window.document.documentElement;
//         const storedTheme = localStorage.getItem('theme');
//
//         if (storedTheme) {
//             setTheme(storedTheme);
//             root.classList.add(storedTheme);
//         } else {
//             root.classList.add('light');
//         }
//     }, []);
//
//     const toggleTheme = () => {
//         const root = window.document.documentElement;
//         const newTheme = theme === 'light' ? 'dark' : 'light';
//
//         root.classList.remove(theme);
//         root.classList.add(newTheme);
//         setTheme(newTheme);
//         localStorage.setItem('theme', newTheme);
//     };
//
//     return (
//         <ThemeContext.Provider value={{ theme, toggleTheme }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// };
