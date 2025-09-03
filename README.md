# Confidential Payroll – Private Salary Distribution with FHEVM

## ❓ Problem
Payroll on public blockchains exposes sensitive financial data such as employee salaries, payment schedules, and treasury outflows.  
This lack of confidentiality prevents organizations from adopting blockchain-based payroll at scale.  

## 💡 Solution
Confidential Payroll leverages Zama’s Fully Homomorphic Encryption Virtual Machine (FHEVM) to enable **end-to-end encrypted salary distribution**.  
Employers can pay contributors on-chain while ensuring that individual salary data remains private.  

## ✨ Features
- 🔒 Encrypted salary amounts stored and transferred securely.  
- ✅ Supports compliance logic directly in smart contracts.  
- 🔗 Works with confidential stablecoins for seamless payroll.  
- ⚡ Fully EVM-compatible for Ethereum and L2 deployments.  
- 🧪 Comprehensive unit tests covering salary distribution and privacy guarantees.  

## 📂 Project Structure
confidential-payroll/  
├── contracts/  
│   └── ConfidentialPayroll.sol  
├── test/  
│   └── ConfidentialPayroll.spec.ts  
├── hardhat.config.ts  
├── package.json  
├── .gitignore  
├── LICENSE  
└── README.md  

## 🚀 Getting Started
1. Install dependencies  
   npm install  

2. Compile the contracts  
   npx hardhat compile  

3. Run the tests  
   npx hardhat test  

## 🔮 Use Cases
- Enterprises distributing salaries confidentially on-chain.  
- DAOs compensating contributors without exposing income levels.  
- Nonprofits and NGOs conducting payroll transparently but privately.  

## 📝 License
This project is licensed under the MIT License.  
MIT © 2025 younexhsu
