import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "../utils/cn";

const typographyVariants = cva("w-auto h-auto", {
  variants: {
    display: {
      lg: "text-6xl tracking-[ -0.02em ] ", //60px
      md: "text-5xl tracking-[ -0.02em ] ", //48
      sm: "text-4xl tracking-[ -0.02em ] ", //36px
      h1: "text-3xl tracking-[ -0.02em ] ", //30px
      h2: "text-2xl tracking-[ -0.02em ] ", //24px
      h3: "text-xl tracking-[ -0.02em ] ", //20px
      h4: "text-lg tracking-[ -0.02em ] ", //18px
      h5: "text-base tracking-[ -0.02em ] ", //16px
      prLg: "text-muted-foreground text-lg ", //18px
      prMd: "text-muted-foreground text-base", //16px
      prSmall: "text-muted-foreground text-sm", //14px
      prXsmall: "text-muted-foreground text-xs", // 12px
    },
    overline: {
      true: "line-through",
    },
    italic: {
      true: "italic ",
    },
    weight: {
      regular: "font-normal",
      medium: "font-medium",
      semiBold: "font-semibold",
      bold: "font-bold",
    },
    fullWidth: {
      true: "w-full",
    },
    underline: {
      true: "underline",
    },
    center: {
      true: "text-center",
    },
    currentText: {
      true: "text-current",
    },
  },
  defaultVariants: {
    display: "prLg",
    weight: "regular",
  },
});

const verificaSlot = (value: string) => {
  let comp = "h1";
  switch (value) {
    //@ts-ignore
    case "lg" || "md" || "sm" || "h1":
      comp = "h1";
      break;
    case "h2":
      comp = "h2";
      break;
    case "h3":
      comp = "h3";
      break;
    case "h4":
      comp = "h4";
      break;
    case "h5":
      comp = "h5";
      break;
    //@ts-ignore
    case "prLg" || "prMd" || "prSmall" || "prXsmall":
      comp = "p";
      break;
    // Adicione mais casos conforme necessário
    default:
      comp = "span";
      break;
  }
  return comp;
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  children?: React.ReactNode;
  isSpan?: boolean;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      className,
      display,
      overline,
      weight,
      underline,
      center,
      children,
      isSpan,
      currentText,
      ...props
    },
    ref
  ) => {
    const Comp = isSpan ? "span" : verificaSlot(display ?? "h1");
    return React.createElement(
      Comp,
      {
        ref,
        className: cn(
          typographyVariants({
            display,
            overline,
            weight,
            underline,
            className,
            center,
            currentText,
          })
        ),
        ...props,
      },
      children
    );
  }
);
Typography.displayName = "Typography";

// eslint-disable-next-line react-refresh/only-export-components
export { Typography, typographyVariants };
