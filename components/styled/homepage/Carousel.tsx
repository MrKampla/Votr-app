import { darken } from 'polished';
import styled from 'styled-components';

export const StepIcons = styled.div`
  display: flex;
  padding: 0 32px;
`;

export const StepIcon = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  margin: 6px;
  cursor: pointer;

  border-radius: 100%;
  background: ${({ theme, active }) => (active ? theme.font : 'transparent')};
  border: 1px ${({ theme }) => theme.font} solid;
  transition: background-color 0.3s ease;
`;

export const Slider = styled.div<{ activeIdx: number }>`
  transition: transform 0.4s ease;
  transform: translateX(${({ activeIdx }) => -1 * (activeIdx * 100)}%);
  display: flex;
`;

export const CarouselItem = styled.section`
  padding-bottom: 32px;
`;

export const SliderContainer = styled.div`
  ${CarouselItem} {
    width: 100%;
    flex: 0 0 auto;
    flex-wrap: nowrap;
  }

  overflow: hidden;
`;

export const Carousel = styled.div`
  color: ${({ theme }) => theme.primary};

  a {
    color: ${({ theme }) => theme.primary};
  }

  width: 100%;
  margin: 0 auto;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 24px;
`;

export const SliderButton = styled.button`
  appearance: none;
  outline: none;
  border: none;
  background: transparent;
  user-select: none;
  cursor: pointer;
  color: ${(props) => props.theme.font};
  font-weight: bold;
  transition: 0.25s;
  &:hover {
    color: ${(props) => darken(0.15, props.theme.font)};
  }
`;
