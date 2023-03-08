import clsx from 'clsx';
import { MenuToggle, ToggleMenuButtonProps } from '../Menu';
import { ComponentType, forwardRef, PropsWithChildren } from 'react';
import { IconButton } from './IconButton';

export type IconButtonWithMenuProps = PropsWithChildren<{
  active?: boolean;
  Menu?: ComponentType;
  caption?: string;
}>;

export const CompositeButton = ({
  caption,
  children,
  active,
  Menu,
}: IconButtonWithMenuProps) => {
  return (
    <div className="str-video__composite-button">
      <div
        className={clsx('str-video__composite-button__button-group', {
          'str-video__composite-button__button-group--active': active,
        })}
      >
        {children}
        {Menu && <MenuToggle ToggleButton={ToggleMenuButton} Menu={Menu} />}
      </div>
      {caption && (
        <div className="str-video__composite-button__caption">{caption}</div>
      )}
    </div>
  );
};

const ToggleMenuButton = forwardRef<HTMLButtonElement, ToggleMenuButtonProps>(
  ({ menuShown }, ref) => (
    <IconButton
      className={'str-video__menu-toggle-button'}
      icon={menuShown ? 'menu-shown' : 'menu-hidden'}
      title="Toggle device menu"
      ref={ref}
    />
  ),
);
