import styled from 'styled-components';

const Connector = styled.div`
  color: ${(props) => props.theme.font};
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  margin-right: 32px;
  transition: 0.25s;
  font-weight: bold;
  &:hover {
    color: ${(props) => props.theme.cta};
  }
`;
const WalletConnector: React.FC = ({}) => {
  return <Connector>CONNECT</Connector>;
};

export default WalletConnector;
