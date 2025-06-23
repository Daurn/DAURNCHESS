export type BaseProps = {
  className?: string;
  children?: React.ReactNode;
};

export type ButtonProps = BaseProps & {
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
};

export type InputProps = BaseProps & {
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
};

export type FormProps = BaseProps & {
  onSubmit: (e: React.FormEvent) => void;
};
