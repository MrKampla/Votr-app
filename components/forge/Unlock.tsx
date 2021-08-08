import React, { useState } from 'react';
import { LockerContainer } from '../styled/forge/Forge';
import { CarouselItem } from '../styled/homepage/Carousel';

function Unlock({
  initialPollAddress,
  initialTokenAddress,
}: {
  initialPollAddress: string;
  initialTokenAddress: string;
}) {
  const [pollAddress, setPollAddress] = useState(initialPollAddress);
  const [tokenAddress, setTokenAddress] = useState(initialTokenAddress);
  return (
    <CarouselItem>
      <LockerContainer>Unlock placeholder</LockerContainer>
    </CarouselItem>
  );
}

export default Unlock;
