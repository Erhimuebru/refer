import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {  apiPost } from "../../utils/api";
import { useUser } from '../../utils/useContext'
const WithdrawFund = () => {
    const { user, handleLogout } = useUser();
    const userId = user ? user.id : localStorage.getItem('id');
    const [accountNumber, setAccountNumber] = useState('');
    const [accountName, setAccountName] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [amount, setAmount] = useState('');

    const banksInNigeria = [
        'Access Bank',
        'First Bank of Nigeria',
        'Zenith Bank',
        'Guaranty Trust Bank (GTB)',
        'United Bank for Africa (UBA)',
        'Ecobank Nigeria',
        'Fidelity Bank',
        'Union Bank of Nigeria',
        'Sterling Bank',
        'Wema Bank',
        'Heritage Bank',
        'Stanbic IBTC Bank',
        'Keystone Bank',
        'Unity Bank',
        'Citibank Nigeria',
        'Polaris Bank',
        'Standard Chartered Bank',
        'Providus Bank',
        'SunTrust Bank',
        'Jaiz Bank',
        'Titan Trust Bank',
        'Rand Merchant Bank',
        'Coronation Merchant Bank',
        'Nova Merchant Bank',
        'SunTrust Bank',
        'FBNQuest Merchant Bank',
        'Palmpay',
        'Opay'
        // Add more banks as needed
    ];

    const handleAccountNumberChange = (e) => {
        setAccountNumber(e.target.value);
        // Add logic to determine the bank based on the account number prefix
    };

    const handleSubmitWithdrawal = async (e) => {
        e.preventDefault();
        try {
            // Ensure that the accountName, accountNumber, selectedBank, and amount are properly set
            if (!accountName || !accountNumber || !selectedBank || !amount) {
                throw new Error('Please fill in all account details and amount.');
            }
            const userId = localStorage.getItem('id');
            const orderData = {
                userId: userId,
                accountName: accountName,
                accountNumber: accountNumber,
                selectedBank: selectedBank,
                amount: amount,
            };
    
            await apiPost(`/wallet/${userId}/withdraw`, orderData);
    
            // Clear the input fields after successful withdrawal
            setAccountName('');
            setAccountNumber('');
            setSelectedBank('');
            setAmount('');
    
            // Show success message with SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Withdrawal Successful!',
                text:   'Your Bank Account Will Be Creadited In The Next 2Hours.',

                confirmButtonText: 'OK',
            });
        } catch (error) {
            // Handle error
            console.error('Error processing withdrawal:', error);
    
            Swal.fire({
                icon: 'error',
                title: 'Withdrawal Failed',
                text: error.response ? error.response.data.message || 'An error occurred during withdrawal.' : 'Please check your internet connection and try again.',
                confirmButtonText: 'OK',
            });
        }
    };
    

    return (
        <div className="flex mt-16 mb-44 items-center justify-center">
            <div className="bg-gray-100 w-80 p-6 ite rounded-lg">
                <h2 className="text-md font-semibold mb-4 text-center">Withdraw Funds</h2>
                <form onSubmit={handleSubmitWithdrawal}>
                    <div className="mb-4">
                        <label htmlFor="accountNumber" className="block mb-1">Account Number:</label>
                        <input
                            type="text"
                            id="accountNumber"
                            className="w-full p-2 border rounded-md"
                            value={accountNumber}
                            onChange={handleAccountNumberChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="accountName" className="block mb-1">Account Name:</label>
                        <input
                            type="text"
                            id="accountName"
                            className="w-full p-2 border rounded-md"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="bank" className="block mb-1">Select Bank:</label>
                        <select
                            id="bank"
                            className="w-full p-2 border rounded-md"
                            value={selectedBank}
                            onChange={(e) => setSelectedBank(e.target.value)}
                            required
                        >
                            <option value="">Select Bank</option>
                            {banksInNigeria.map((bank) => (
                                <option key={bank} value={bank}>{bank}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block mb-1">Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            className="w-full p-2 border rounded-md"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Withdraw</button>
                </form>
            </div>
        </div>
    );
};

export default WithdrawFund;
