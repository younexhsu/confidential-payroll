// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint64, externalEuint64 } from "@fhevm/solidity/lib/FHE.sol";
import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";

/// @title Confidential Payroll – Private Salary Distribution with FHEVM
contract ConfidentialPayroll is SepoliaConfig {
    address public employer;
    mapping(address => euint64) private _salaries;

    event SalaryPaid(address indexed employee);
    error NotEmployer();
    error InvalidEmployee();

    constructor() {
        employer = msg.sender;
    }

    modifier onlyEmployer() {
        if (msg.sender != employer) revert NotEmployer();
        _;
    }

    /// @notice Pay salary to an employee in encrypted form
    function paySalary(
        address employee,
        externalEuint64 encryptedAmount,
        bytes calldata inputProof
    ) external onlyEmployer {
        if (employee == address(0)) revert InvalidEmployee();

        euint64 amt = FHE.fromExternal(encryptedAmount, inputProof);
        _salaries[employee] = FHE.add(_salaries[employee], amt);

        FHE.allowThis(_salaries[employee]);
        FHE.allow(_salaries[employee], employee);

        emit SalaryPaid(employee);
    }

    /// @notice Each employee can view only their own encrypted salary
    function getMySalary() external view returns (euint64) {
        return _salaries[msg.sender];
    }
}
