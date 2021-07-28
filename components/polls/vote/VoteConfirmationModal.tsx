import { forwardRef, useImperativeHandle, useState } from 'react';
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
import { ActionButton } from '../../styled/homepage';

export interface ModalHandle {
  toggleModal: () => void;
}

interface VoteConfirmationModal {
  vote: (votingPower: number) => Promise<void>;
  symbol: string;
  balance: string;
  selectedChoice?: string;
}

// eslint-disable-next-line react/display-name
const VoteConfirmationModal = forwardRef<ModalHandle, VoteConfirmationModal>(
  ({ vote, symbol, balance, selectedChoice }, ref) => {
    const { isOpen: isVotingPowerModalOpen, toggleModal, afterOpen, beforeClose, opacity } = useStyledModal();
    const [votingPower, setVotingPower] = useState(1);

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
                    {balance} {symbol}
                  </ElementValue>
                </SingleDescriptor>
                <SingleDescriptor>
                  <ElementDescription>Voting power</ElementDescription>
                  <ElementValue>
                    <QuorumInput
                      value={votingPower}
                      onChange={(e) => {
                        if (isNaN(+e.target.value)) {
                          return;
                        }
                        setVotingPower(+e.target.value);
                      }}
                    />
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
