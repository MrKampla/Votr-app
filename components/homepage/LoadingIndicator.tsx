import { lighten, darken } from 'polished';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const LoadingIndicator = () => {
  const { primary, mode } = useContext(ThemeContext);
  const modifierFunction = mode === 'dark' ? lighten : darken;
  return (
    <SkeletonTheme color={modifierFunction(0.1, primary)} highlightColor={modifierFunction(0.2, primary)}>
      <Skeleton height="48px" />
    </SkeletonTheme>
  );
};

export const LoadingFallback: React.FC<{ isLoading?: boolean; children: React.ReactNode; margin?: string }> = ({
  children,
  isLoading,
  margin,
}) => {
  return isLoading ? (
    <div style={{ margin }}>
      <LoadingIndicator />
    </div>
  ) : (
    <>{children}</>
  );
};
