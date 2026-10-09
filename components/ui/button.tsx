import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "ghost";

type ButtonProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & ({ href: string } & Omit<ComponentProps<"a">, "href" | "className"> | { href?: undefined } & ComponentProps<"button">);

export function Button(props: ButtonProps): JSX.Element {
  const { variant = "ghost", children, className = "" } = props;
  const cls = `ds-btn ds-btn-${variant} ${className}`.trim();

  if (props.href !== undefined) {
    const { href, variant: _v, className: _c, children: _ch, ...rest } = props as ComponentProps<"a"> & { variant?: Variant };
    const external = /^https?:\/\//.test(href ?? "");
    return external || rest.download !== undefined ? (
      <a className={cls} href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} {...rest}>
        {children}
      </a>
    ) : (
      <Link className={cls} href={href ?? "/"}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } = props as ComponentProps<"button"> & { variant?: Variant };
  return (
    <button className={cls} type="button" {...rest}>
      {children}
    </button>
  );
}
