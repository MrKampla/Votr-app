import {
  ElementCard,
  TokenCardContainer,
  TokenDetailsContainer,
  ElementDescription,
} from '../styled/create/VotrModalStyled';
import { Deposit } from '../../utils/hooks/useDeposits';
import { useContext } from 'react';
import { DefaultTheme, ThemeContext } from 'styled-components';
import format from 'date-fns/format';
import {
  AmountWrapper,
  DetailsDescriptorWrapper,
  Flex,
  FullWidthContainer,
  ToRight,
  WrappableDescriptor,
} from '../styled/forge/Forge';

const getExpireDateElement = (deposit: Deposit, theme: DefaultTheme): JSX.Element => {
  if (deposit.isCurrent) {
    return deposit.endDate === 0 ? (
      <div style={{ color: theme.cta }}>Ready to unlock</div>
    ) : (
      <>{format(deposit.endDate, 'MM/dd/yyyy')}</>
    );
  }
  return <div style={{ color: theme.success }}>Already unlocked</div>;
};

const DepositCard = ({ deposit, symbol }: { deposit: Deposit; symbol: string }) => {
  const theme = useContext(ThemeContext);

  const lockExpireDateElement = getExpireDateElement(deposit, theme);

  return (
    <ElementCard key={deposit.startDate} nonClickable isSelected={false} onClick={async () => {}}>
      <TokenCardContainer>
        <FullWidthContainer>
          <TokenDetailsContainer>
            <ElementDescription>
              <WrappableDescriptor>
                Amount deposited:
                <AmountWrapper>
                  {deposit.amountDeposited} {symbol}
                </AmountWrapper>
              </WrappableDescriptor>
            </ElementDescription>

            <ElementDescription color={theme.link}>
              <DetailsDescriptorWrapper>
                <Flex>
                  Deposit date:
                  <ToRight>{format(deposit.startDate, 'MM/dd/yyyy')}</ToRight>
                </Flex>
                <Flex>
                  Lock expire date:
                  <ToRight>{lockExpireDateElement}</ToRight>
                </Flex>
              </DetailsDescriptorWrapper>
            </ElementDescription>
          </TokenDetailsContainer>
        </FullWidthContainer>
      </TokenCardContainer>
    </ElementCard>
  );
};

export default DepositCard;
