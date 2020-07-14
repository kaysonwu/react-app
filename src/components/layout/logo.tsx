import React, { FC, ReactNode, CSSProperties, MouseEventHandler } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

interface LogoProps {
  icon?: ReactNode;
  src?: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler;
}

const Logo: FC<LogoProps> = props => {
  const {
    icon,
    src,
    alt = 'logo',
    children,
    className: customizeClassName,
    onClick,
    ...reset
  } = props;
  const childrenNode = children || (src && <img src={src} alt={alt} />) || icon;
  const className = classNames('logo', customizeClassName);

  if (onClick) {
    return (
      <span
        {...reset}
        role="button"
        tabIndex={-1}
        className={className}
        onClick={onClick}
      >
        {childrenNode}
      </span>
    );
  }

  return (
    <Link
      {...reset}
      to="/"
      className={className}
    >
      {childrenNode}
    </Link>
  );
};

export default Logo;
