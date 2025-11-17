import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {}

function Badge({ className, children, ...props }: BadgeProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export { Badge };
