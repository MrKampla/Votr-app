# Votr protocol interface

This is a web application to interact with Votr protocol smart contracts.

## Development

To start the development environment, use:

```bash
yarn && yarn dev
```

## Accessing Votr

The latest version of Votr Interface is available [here](https://votr-app.vercel.app/).

## Overview & how to use Votr platform

### Creating a new poll

Go to [create](https://votr-app.vercel.app/create) section and fill the required information such as options to choose, poll type and people that can vote.

<!-- ![](http://i.imgur.com/60bts.gi) -->

### Voting in an existing poll

When You obtain a poll address that You're authorized to vote in, go to https://votr-app.vercel.app/polls/CONTRACT-ADDRESS. Users can vote there and check the current results of a poll.

<!-- ![](http://i.imgur.com/60bts.gi) -->

### Forging voting tokens from underlying ERC-20 tokens

If the desired poll uses an underlying ERC-20 token for voting, You need to lock the actual tokens [here](https://votr-app.vercel.app/forge) and mint vToken equivalent, which later can be used to vote in the poll. You can choose to lock up Your tokens for a certain period to increase Your voting power, or You can just mint tokens without lockup period, and they'll be immediately available to be withdrawn after You vote in a poll.

### Callbacks

At poll creation, the chairman can specify a callback contract from which the code will be executed after the poll is finished. This allows to execute conditional logic depending on the result of the poll. The callback contract has to implement ICallback interface and has to be deployed before the actual poll is created.

```solidity
interface ICallback {
  function callback(
    uint256 winningChoiceIndex,
    address pollAddress,
    address pollTypeAddress
  ) external;
}
```

Due to blockchain nature, callback cannot be executed automatically. The poll contract has a callback method which can be called by anyone just after the poll finishes, it can be safely assumed that there will always be at least one entity who would want to execute callback.

### Custom poll type implementations

At poll creation, the chairman can specify a poll type. Programmers can easly create their own implementations of poll types by implementing IPollType interface and deploying it to the network. Later, this implementation can be used by all polls in Votr ecosystem.

```solidity
interface IPollType {
  event Voted(address indexed who, uint256 indexed chosen, int256 votesAmount);

  function getPollTypeName() external pure returns (string memory);

  function onInit(address poll, address owner) external;

  function vote(
    address voter,
    uint256[] memory choices,
    int256[] memory amountOfVotes
  ) external returns (bool);

  function checkWinner(uint256 _amountOfChoices) external view returns (uint256 winnerIndex);

  function getAmountOfVotesForChoice(uint256 choiceId) external view returns (int256 voteCount);

  function isFinished(uint256 _quorum, uint256 _endDate) external view returns (bool finished, bool quorumReached);

  function delegateVote(
    address from,
    address to,
    uint256 amount
  ) external returns (bool);
}
```

All methods are required, but onInit can be empty. This ability to create own implementations gives a lot of freedom and flexibilty to the community.

The possibilites are endless. For example:

- when voting among a particular community is at low rate, perhaps some incentive for voters should be introduced. In this case, you can create an IncentivisedPollType contract that will modify the voting functionality, rewarding each voter with additional tokens.
- when voters do not want to vote first and they are waiting for other users to move. In this case, the longer You wait with choosing Your option, the more information you have about the options selected by other users and the currently winning option. This problem can be solved by creating a DescendingVotingPowerPollType contract, which will change the logic of calculating the number of votes a given user is entitled to, reducing the votes over time. This implementation reduces the profitability of waiting for the rest of the users to vote, as the number of votes to be cast is the highest at the beginning of the voting period and inevitably approaches zero.

## A few words from the author

This is one of my first decentralized apps, if You can spot some bugs, imperfections or propose any improvements, feel free to do so. As the whole project is open-source, I strongly advise every developer creating extensions for Votr protocol (like poll types and callbacks) to also open-source their work.
