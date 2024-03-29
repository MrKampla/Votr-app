import { forwardRef, useImperativeHandle, useState } from 'react';
import { PollType } from '../../../constants/pollTypes';
import useStyledModal from '../../../utils/hooks/useStyledModal';
import { QuorumInput } from '../../styled/create/Create';
import { StyledModal } from '../../styled/create/VotrModalStyled';
import {
  CloseModalIcon,
  TitleContentWrapper,
  FooterWrapper,
  MainContentWrapper,
  ElementCard,
  ElementDescription,
  SingleDescriptor,
  ElementValue,
  ElementsList as ElementWrapper,
  TokenDetailsContainer as ElementDetailsContainer,
} from '../../styled/create/VotrModalStyled';
import { Flex, UtilityButton } from '../../styled/forge/Forge';
import { ActionButton } from '../../styled/homepage';

export interface ModalHandle {
  toggleModal: () => void;
}

interface VoteConfirmationModal {
  vote: (votingPower: string) => Promise<void>;
  symbol: string;
  balance: string;
  pollType: PollType;
  selectedChoice?: string;
}

// eslint-disable-next-line react/display-name
const VoteConfirmationModal = forwardRef<ModalHandle, VoteConfirmationModal>(
  ({ vote, symbol, balance, selectedChoice, pollType }, ref) => {
    const { isOpen: isVotingPowerModalOpen, toggleModal, afterOpen, beforeClose, opacity } = useStyledModal();
    const [votingPower, setVotingPower] = useState('1');

    const maxBalance = pollType?.name?.toLowerCase().includes('quadratic')
      ? Math.floor(Math.sqrt(+balance)).toString()
      : balance;

    useImperativeHandle(ref, () => ({ toggleModal }));
    return (
      <StyledModal
        isOpen={isVotingPowerModalOpen}
        onBackgroundClick={toggleModal}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        backgroundProps={{ opacity }}
        fitContent
      >
        <TitleContentWrapper>
          <div>Confirm a vote</div>
          <CloseModalIcon onClick={toggleModal} />
        </TitleContentWrapper>
        <MainContentWrapper>
          <ElementWrapper>
            This operation cannot be undone!
            <ElementCard nonClickable>
              <ElementDetailsContainer>
                <SingleDescriptor>
                  <ElementDescription>Option</ElementDescription>
                  <ElementValue>{selectedChoice}</ElementValue>
                </SingleDescriptor>
                <SingleDescriptor>
                  <ElementDescription>Avalible amount of votes</ElementDescription>
                  <ElementValue>
                    {maxBalance} {symbol}
                  </ElementValue>
                </SingleDescriptor>
                <SingleDescriptor>
                  <ElementDescription>Voting power</ElementDescription>
                  <ElementValue>
                    <Flex>
                      <UtilityButton margin="0" onClick={() => setVotingPower(maxBalance)}>
                        MAX
                      </UtilityButton>
                      <QuorumInput
                        value={votingPower}
                        onChange={(e) => {
                          if (isNaN(+e.target.value)) {
                            return;
                          }
                          setVotingPower(e.target.value);
                        }}
                      />
                    </Flex>
                  </ElementValue>
                </SingleDescriptor>
              </ElementDetailsContainer>
            </ElementCard>
          </ElementWrapper>
        </MainContentWrapper>
        <FooterWrapper>
          <ActionButton
            fullWidth
            margin="16px"
            onClick={async () => {
              await vote(votingPower);
              toggleModal();
            }}
          >
            Vote
          </ActionButton>
        </FooterWrapper>
      </StyledModal>
    );
  }
);

export default VoteConfirmationModal;
