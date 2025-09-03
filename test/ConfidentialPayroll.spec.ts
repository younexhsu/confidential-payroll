import { ConfidentialPayroll, ConfidentialPayroll__factory } from "../types";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { ethers, fhevm } from "hardhat";
import { expect } from "chai";
import { FhevmType } from "@fhevm/hardhat-plugin";

describe("ConfidentialPayroll", function () {
  let payroll: ConfidentialPayroll;
  let employer: HardhatEthersSigner;
  let alice: HardhatEthersSigner;
  let bob: HardhatEthersSigner;
  let contractAddress: string;

  beforeEach(async () => {
    [employer, alice, bob] = await ethers.getSigners();
    const factory = (await ethers.getContractFactory("ConfidentialPayroll")) as ConfidentialPayroll__factory;
    payroll = (await factory.deploy()) as ConfidentialPayroll;
    contractAddress = await payroll.getAddress();
  });

  it("employer can pay salary confidentially", async function () {
    const encSalary = await fhevm.createEncryptedInput(contractAddress, alice.address).add64(2000).encrypt();
    await (await payroll.connect(employer).paySalary(alice.address, encSalary.handles[0], encSalary.inputProof)).wait();

    const encrypted = await payroll.connect(alice).getMySalary();
    const decrypted = await fhevm.userDecryptEuint(FhevmType.euint64, encrypted, contractAddress, alice);

    expect(decrypted).to.eq(2000);
  });

  it("non-employer cannot pay salary", async function () {
    const encSalary = await fhevm.createEncryptedInput(contractAddress, bob.address).add64(1500).encrypt();
    await expect(
      payroll.connect(alice).paySalary(bob.address, encSalary.handles[0], encSalary.inputProof)
    ).to.be.revertedWithCustomError(payroll, "NotEmployer");
  });
});
