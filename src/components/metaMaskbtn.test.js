import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MetaMaskBtn from './MetaMaskBtn';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import '@testing-library/jest-dom';

jest.mock('@web3-react/core', () => ({
  useWeb3React: jest.fn(),
}));

jest.mock('web3', () => ({
  utils: {
    toHex: jest.fn(),
  },
}));

describe('MetaMaskBtn', () => {
  it('renders "Connect MetaMask" button when not connected', () => {
    useWeb3React.mockReturnValue({ isActive: false });

    render(<MetaMaskBtn />);

    const button = screen.getByRole('button', { name: 'Connect MetaMask' });
    expect(button).toBeInTheDocument();
  });

  it('renders "Connected with account" when connected', () => {
    useWeb3React.mockReturnValue({ isActive: true, account: '0x12345' });

    render(<MetaMaskBtn />);

    const connectedText = screen.getByText('Connected with account: 0x12345');
    expect(connectedText).toBeInTheDocument();
  });
});
