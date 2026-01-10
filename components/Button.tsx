import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-lg font-bold tracking-tight transition-all duration-300 focus:outline-none overflow-hidden group cursor-pointer font-sans uppercase text-xs md:text-sm border";
  
  const variants = {
    primary: "bg-white text-black border-white hover:bg-black hover:text-white",
    secondary: "bg-black text-white border-white hover:bg-white hover:text-black",
    outline: "bg-transparent border-white/40 text-white hover:border-white hover:bg-white hover:text-black",
    ghost: "bg-transparent text-gray-400 border-transparent hover:text-white"
  };

  const sizes = {
    sm: "px-6 py-2.5",
    md: "px-8 py-3.5",
    lg: "px-10 py-5"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && (
          <motion.span 
            initial={{ x: 0 }}
            whileHover={{ x: 3 }}
          >
            {icon}
          </motion.span>
        )}
      </span>
    </motion.button>
  );
};