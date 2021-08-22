import { lighten, darken } from 'polished';
import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export const LoadingIndicator = ({ height }: { height?: string }) => {
  const { primary, mode } = useContext(ThemeContext);
  const modifierFunction = mode === 'dark' ? lighten : darken;
  return (
    <SkeletonTheme color={modifierFunction(0.1, primary)} highlightColor={modifierFunction(0.2, primary)}>
      <Skeleton height={height} />
    </SkeletonTheme>
  );
};

export const LoadingFallback: React.FC<{
  isLoading?: boolean;
  height?: string;
  margin?: string;
  children: React.ReactNode;
}> = ({ children, isLoading, margin, height = '48px' }) => {
  return isLoading ? (
    <div style={{ margin }}>
      <LoadingIndicator height={height} />
    </div>
  ) : (
    <>{children}</>
  );
};
