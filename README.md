# Confidential Payroll – Private Salary Distribution with FHEVM

## Overview
Confidential Payroll demonstrates how companies can pay employee salaries onchain while keeping amounts private.  
Using Zama’s FHEVM, salaries are stored and transferred as encrypted values (euint64), ensuring only the employee can view their own salary.

## Features
- Encrypted salary payments (end-to-end confidentiality)
- Employees can only see their own salary
- Employer cannot reveal employee salaries to others
- Fail-closed logic ensures no data leakage

## Tech Stack
- Solidity + FHEVM
- Hardhat + TypeScript
- Zama SepoliaConfig integration

## Tests
- Employer pays salary confidentially
- Employees decrypt only their own salary
- Non-employers cannot pay salary

## License
MIT
