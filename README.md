# F2F (Farm-to-Fork) Frozen Food Supply Chain Traceability DApp

A decentralized, blockchain-based frozen food supply chain traceability and safety system built on the Ethereum Sepolia Testnet using Solidity, MetaMask, and ethers.js.

This project ensures end-to-end transparency, authentic provenance, and automated recall management across every stage of the food supply chain—from producers to retailers—by recording immutable transactions on-chain.

---

## Key Features

* **Role-Based Access Control (RBAC):** Restricts critical actions to verified stakeholders (Admin, Farm, Manufacturer, Distributor, Retailer).
* **Batch Provenance & Minting:** Farms register food batches with an 8-digit unique lot code.
* **Custody Transfers:** Immutable logging of custody changes as batches move through the logistics network.
* **Instant Emergency Recall:** Admins can flag and quarantine compromised lot codes in seconds, mathematically locking them against further sales or transfers.
* **Public Traceability Explorer:** Anyone can audit a product's full lifecycle timeline, timestamps, and current custodian without special permissions or gas fees.

---

## Deployment Details

| Parameter | Value |
| :--- | :--- |
| **Blockchain Network** | Ethereum Sepolia Testnet (Chain ID: 11155111) |
| **Contract Address** | [0x9E5242Bfc5f3f831e44D4D9A08cafE32802Dd604](https://eth-sepolia.blockscout.com/address/0x9E5242Bfc5f3f831e44D4D9A08cafE32802Dd604) |
| **Contract Deployer (Admin)** | `0x7d80F592AC087A71A13362a948bc07efFa9c81BA` |
| **Solidity Version** | 0.8.30 |
| **Explorer** | [Sepolia Blockscout](https://eth-sepolia.blockscout.com/address/0x9E5242Bfc5f3f831e44D4D9A08cafE32802Dd604) / [Sepolia Etherscan](https://sepolia.etherscan.io/address/0x9E5242Bfc5f3f831e44D4D9A08cafE32802Dd604) |

---

## System Architecture & Tech Stack

```
[ User in Browser ]
        │
        ▼
[ Web UI (index.html + style.css) ]
        │
        ▼ (ethers.js v5.7.2)
[ MetaMask Wallet ] ──(Cryptographic Signatures)──▶ [ Ethereum Sepolia Blockchain ]
                                                      (SupplyChain.sol @ 0x9E52...d604)
```

* **Smart Contract:** `SupplyChain.sol` (Solidity ^0.8.30)
* **Blockchain Ledger:** Ethereum Sepolia Test Network
* **Wallet & Signer:** MetaMask Web3 Extension
* **Frontend:** Vanilla HTML5, CSS3, JavaScript (ES6+)
* **Web3 Library:** ethers.js (v5.7.2 UMD)

---

## Smart Contract Workflow

| Step | Function | Authorized Role | Description |
| :---: | :--- | :---: | :--- |
| 1 | `registerParticipant()` | Admin | Registers and assigns roles to verified supply chain participants. |
| 2 | `createBatch()` | Farm | Mints a product batch identified by a unique 8-digit lot code. |
| 3 | `transferBatch()` | Custodian | Transfers custody/ownership to another registered participant. |
| 4 | `triggerRecall()` | Admin | Flags a lot code as recalled, quarantining all linked batches. |
| 5 | `getProductStatus()` | Public / Any | Returns current safety status (Good, Hold, Recalled, Destroyed). |
| 6 | `getProductHistory()` | Public / Any | Retrieves complete lifecycle audit trail and timestamps. |

---

## Running the Project Locally

Because the frontend uses standard modern web technologies with CDN-loaded ethers.js, no compilation build step is required for the client interface.

### 1. Open Repository Folder
```bash
cd RichProducts-SupplyChain
```

### 2. Start a Local Web Server
Using Python (PowerShell / Command Prompt):
```powershell
python -m http.server 3000
```
*(Or right-click `index.html` and use "Open with Live Server" in VS Code)*.

### 3. Open in Browser
Navigate to:
```
http://localhost:3000
```

### 4. Connect MetaMask
* Set MetaMask network to **Sepolia**.
* Click **Connect Wallet** in the top right corner.

---

## Repository File Structure

```
RichProducts-SupplyChain/
├── SupplyChain.sol     # Core Solidity Smart Contract (v0.8.30)
├── index.html          # Web3 DApp Dashboard Interface
├── style.css           # Executive Dashboard Stylesheet
├── app.js              # Web3 client interaction logic (ethers.js)
└── README.md           # Project Documentation
```
