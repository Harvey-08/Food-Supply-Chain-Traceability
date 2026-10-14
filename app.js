// Rich Products Supply Chain DApp Client
const CONTRACT_ADDRESS = "0x9E5242Bfc5f3f831e44D4D9A08cafE32802Dd604";
const SEPOLIA_CHAIN_ID = 11155111; // 0xaa36a7

const CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "productId", "type": "uint256" },
            { "indexed": false, "internalType": "string", "name": "lotCode", "type": "string" },
            { "indexed": true, "internalType": "address", "name": "creator", "type": "address" }
        ],
        "name": "BatchCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": false, "internalType": "string", "name": "lotCode", "type": "string" },
            { "indexed": true, "internalType": "address", "name": "triggeredBy", "type": "address" }
        ],
        "name": "BatchRecalled",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "productId", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "from", "type": "address" },
            { "indexed": true, "internalType": "address", "name": "to", "type": "address" }
        ],
        "name": "BatchTransferred",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "address", "name": "participantAddress", "type": "address" },
            { "indexed": false, "internalType": "string", "name": "name", "type": "string" },
            { "indexed": false, "internalType": "uint8", "name": "role", "type": "uint8" }
        ],
        "name": "ParticipantRegistered",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "string", "name": "_lotCode", "type": "string" }],
        "name": "createBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_productId", "type": "uint256" }],
        "name": "getProductHistory",
        "outputs": [
            {
                "components": [
                    { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
                    { "internalType": "address", "name": "participantAddress", "type": "address" },
                    { "internalType": "string", "name": "participantName", "type": "string" },
                    { "internalType": "uint8", "name": "status", "type": "uint8" },
                    { "internalType": "string", "name": "action", "type": "string" }
                ],
                "internalType": "struct RichProductsSupplyChain.HistoryEntry[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_productId", "type": "uint256" }],
        "name": "getProductStatus",
        "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "string", "name": "", "type": "string" }, { "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "lotCodeToProductIds",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "nextProductId",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "address", "name": "", "type": "address" }],
        "name": "participants",
        "outputs": [
            { "internalType": "string", "name": "name", "type": "string" },
            { "internalType": "uint8", "name": "role", "type": "uint8" },
            { "internalType": "bool", "name": "isRegistered", "type": "bool" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "name": "productBatches",
        "outputs": [
            { "internalType": "uint256", "name": "productId", "type": "uint256" },
            { "internalType": "string", "name": "lotCode", "type": "string" },
            { "internalType": "uint8", "name": "status", "type": "uint8" },
            { "internalType": "address", "name": "currentOwner", "type": "address" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "address", "name": "_participantAddress", "type": "address" },
            { "internalType": "string", "name": "_name", "type": "string" },
            { "internalType": "uint8", "name": "_role", "type": "uint8" }
        ],
        "name": "registerParticipant",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_productId", "type": "uint256" },
            { "internalType": "address", "name": "_newOwner", "type": "address" }
        ],
        "name": "transferBatch",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "string", "name": "_lotCode", "type": "string" }],
        "name": "triggerRecall",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

// Role & Status Enums Mapping
const ROLE_NAMES = ["Unassigned", "🌱 Farm", "🏭 Manufacturer", "🚚 Distributor", "🏪 Retailer"];
const ROLE_CLASSES = ["role-unassigned", "role-farm", "role-manufacturer", "role-distributor", "role-retailer"];
const STATUS_NAMES = ["Good", "Hold", "Recalled", "Destroyed"];
const STATUS_CLASSES = ["good", "hold", "recalled", "destroyed"];

let provider = null;
let signer = null;
let contract = null;
let currentAccount = null;
let contractAdmin = null;

// DOM Elements
const connectWalletBtn = document.getElementById('connectWalletBtn');
const userAddressEl = document.getElementById('userAddress');
const userRoleBadgeEl = document.getElementById('userRoleBadge');
const userNameEl = document.getElementById('userName');
const totalBatchesCountEl = document.getElementById('totalBatchesCount');
const contractAddressDisplay = document.getElementById('contractAddressDisplay');
const copyContractBtn = document.getElementById('copyContractBtn');
const activityLogs = document.getElementById('activityLogs');
const toastContainer = document.getElementById('toastContainer');

// Search Elements
const searchProductId = document.getElementById('searchProductId');
const btnSearchProduct = document.getElementById('btnSearchProduct');
const productResult = document.getElementById('productResult');
const resProductId = document.getElementById('resProductId');
const resLotCode = document.getElementById('resLotCode');
const resStatus = document.getElementById('resStatus');
const resCurrentOwner = document.getElementById('resCurrentOwner');
const timelineList = document.getElementById('timelineList');

// Form Buttons
const btnRegisterParticipant = document.getElementById('btnRegisterParticipant');
const btnCreateBatch = document.getElementById('btnCreateBatch');
const btnTransferBatch = document.getElementById('btnTransferBatch');
const btnTriggerRecall = document.getElementById('btnTriggerRecall');
const btnClearLogs = document.getElementById('btnClearLogs');

// Logging & Notification Helpers
function log(msg, type = "info") {
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const time = new Date().toLocaleTimeString();
    entry.innerHTML = `<span class="log-time">[${time}]</span> <span class="log-msg">${msg}</span>`;
    activityLogs.appendChild(entry);
    activityLogs.scrollTop = activityLogs.scrollHeight;
}

function showToast(message, type = "info") {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 4000);
}

// Copy contract address helper
copyContractBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    showToast("Contract address copied to clipboard!", "success");
});

btnClearLogs.addEventListener('click', () => {
    activityLogs.innerHTML = "";
    log("Log cleared.", "system");
});

// Tab Navigation
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const targetTab = document.getElementById(`tab-${tab.dataset.tab}`);
        if (targetTab) targetTab.classList.add('active');
    });
});

// Initialize Wallet & DApp
async function init() {
    contractAddressDisplay.innerText = `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`;

    if (typeof window.ethereum === 'undefined') {
        log("MetaMask extension not detected. Please install MetaMask to interact with this DApp.", "error");
        return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);
    
    // Check if already connected
    const accounts = await provider.listAccounts();
    if (accounts.length > 0) {
        await handleAccountConnected(accounts[0]);
    }

    // MetaMask Event Listeners
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            handleAccountConnected(accounts[0]);
        } else {
            handleDisconnect();
        }
    });

    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
}

// Connect Wallet handler
connectWalletBtn.addEventListener('click', async () => {
    if (typeof window.ethereum === 'undefined') {
        alert("MetaMask is required to connect to this Web3 application!");
        return;
    }

    try {
        log("Requesting account connection from MetaMask...", "info");
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        await handleAccountConnected(accounts[0]);
        showToast("Wallet connected successfully!", "success");
    } catch (err) {
        log(`Connection failed: ${err.message}`, "error");
        showToast("Connection rejected", "error");
    }
});

async function handleAccountConnected(account) {
    currentAccount = account;
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Verify network
    const network = await provider.getNetwork();
    if (network.chainId !== SEPOLIA_CHAIN_ID) {
        log(`Warning: Connected to Chain ID ${network.chainId}, but contract is on Sepolia (${SEPOLIA_CHAIN_ID}).`, "error");
        showToast("Please switch your MetaMask to Sepolia network!", "error");
    }

    // Update UI elements
    userAddressEl.innerText = `${account.slice(0, 8)}...${account.slice(-6)}`;
    connectWalletBtn.innerHTML = `
        <span class="status-dot"></span>
        <span>${account.slice(0, 6)}...${account.slice(-4)}</span>
    `;

    // Fetch Admin & Participant role
    await refreshAccountData();
    log(`Connected as ${account}`, "success");
}

function handleDisconnect() {
    currentAccount = null;
    signer = null;
    contract = null;
    userAddressEl.innerText = "Not Connected";
    userRoleBadgeEl.className = "role-badge role-unassigned";
    userRoleBadgeEl.innerText = "Unassigned";
    userNameEl.innerText = "-";
    totalBatchesCountEl.innerText = "-";
    connectWalletBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2">
            <path d="M20 7h-9M14 17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2z"></path>
        </svg>
        <span>Connect Wallet</span>
    `;
    log("Wallet disconnected.", "info");
}

async function refreshAccountData() {
    if (!contract || !currentAccount) return;

    try {
        // Fetch Admin
        contractAdmin = await contract.admin();
        const isAdmin = contractAdmin.toLowerCase() === currentAccount.toLowerCase();

        // Fetch Participant Info
        const pInfo = await contract.participants(currentAccount);
        const isRegistered = pInfo.isRegistered;
        const roleIndex = pInfo.role;
        const participantName = pInfo.name || "-";

        userNameEl.innerText = participantName.replace("Rich Products", "F2F");

        if (isAdmin) {
            userRoleBadgeEl.className = "role-badge role-admin";
            userRoleBadgeEl.innerText = "👑 Admin";
        } else if (isRegistered) {
            userRoleBadgeEl.className = `role-badge ${ROLE_CLASSES[roleIndex] || 'role-unassigned'}`;
            userRoleBadgeEl.innerText = ROLE_NAMES[roleIndex] || "Participant";
        } else {
            userRoleBadgeEl.className = "role-badge role-unassigned";
            userRoleBadgeEl.innerText = "Unregistered";
        }

        // Fetch Next Product ID
        const nextId = await contract.nextProductId();
        totalBatchesCountEl.innerText = (nextId.toNumber() - 1).toString();
    } catch (err) {
        console.error("Error refreshing account data:", err);
    }
}

// ============================================
// CONTRACT ACTIONS
// ============================================

// 1. Admin: Register Participant
btnRegisterParticipant.addEventListener('click', async () => {
    if (!contract) return showToast("Please connect your wallet first", "error");

    const pAddress = document.getElementById('pAddress').value.trim();
    const pName = document.getElementById('pName').value.trim();
    const pRole = parseInt(document.getElementById('pRole').value);

    if (!ethers.utils.isAddress(pAddress)) {
        return showToast("Please enter a valid Ethereum address (0x...)", "error");
    }
    if (!pName) {
        return showToast("Please enter a participant name", "error");
    }

    try {
        log(`Registering participant: ${pName} (${pAddress}) as role ${ROLE_NAMES[pRole]}...`, "info");
        btnRegisterParticipant.disabled = true;
        btnRegisterParticipant.innerText = "Confirming in MetaMask...";

        const tx = await contract.registerParticipant(pAddress, pName, pRole);
        log(`Transaction submitted! Hash: ${tx.hash}`, "info");
        showToast("Transaction sent, awaiting confirmation...", "info");

        await tx.wait();
        log(`Participant "${pName}" successfully registered on-chain!`, "success");
        showToast(`Registered ${pName}!`, "success");

        document.getElementById('pAddress').value = "";
        document.getElementById('pName').value = "";
        await refreshAccountData();
    } catch (err) {
        const errorMsg = err.reason || err.data?.message || err.message;
        log(`Registration failed: ${errorMsg}`, "error");
        showToast(`Registration failed: ${errorMsg}`, "error");
    } finally {
        btnRegisterParticipant.disabled = false;
        btnRegisterParticipant.innerText = "Register Participant";
    }
});

// 2. Farm: Create Batch
btnCreateBatch.addEventListener('click', async () => {
    if (!contract) return showToast("Please connect your wallet first", "error");

    const lotCode = document.getElementById('lotCodeInput').value.trim();
    if (!lotCode) {
        return showToast("Please enter a lot code", "error");
    }

    try {
        log(`Creating food batch with Lot Code: ${lotCode}...`, "info");
        btnCreateBatch.disabled = true;
        btnCreateBatch.innerText = "Confirming in MetaMask...";

        const tx = await contract.createBatch(lotCode);
        log(`Batch creation submitted! Tx: ${tx.hash}`, "info");
        showToast("Creating batch on blockchain...", "info");

        const receipt = await tx.wait();
        log(`Batch with lot code "${lotCode}" created successfully!`, "success");
        showToast(`Batch #${lotCode} successfully minted!`, "success");

        document.getElementById('lotCodeInput').value = "";
        await refreshAccountData();
    } catch (err) {
        const errorMsg = err.reason || err.data?.message || err.message;
        log(`Batch creation failed: ${errorMsg}`, "error");
        showToast(`Failed: ${errorMsg}`, "error");
    } finally {
        btnCreateBatch.disabled = false;
        btnCreateBatch.innerText = "Mint & Register Batch";
    }
});

// 3. Logistics: Transfer Batch
btnTransferBatch.addEventListener('click', async () => {
    if (!contract) return showToast("Please connect your wallet first", "error");

    const pId = parseInt(document.getElementById('transferId').value);
    const newOwner = document.getElementById('newOwner').value.trim();

    if (!pId || pId < 1) return showToast("Invalid Product ID", "error");
    if (!ethers.utils.isAddress(newOwner)) return showToast("Invalid recipient address", "error");

    try {
        log(`Initiating custody transfer for Product #${pId} to ${newOwner}...`, "info");
        btnTransferBatch.disabled = true;
        btnTransferBatch.innerText = "Confirming in MetaMask...";

        const tx = await contract.transferBatch(pId, newOwner);
        log(`Transfer submitted! Tx: ${tx.hash}`, "info");
        showToast("Transferring batch custody...", "info");

        await tx.wait();
        log(`Product #${pId} custody transferred to ${newOwner}!`, "success");
        showToast(`Product #${pId} transferred successfully!`, "success");

        document.getElementById('transferId').value = "";
        document.getElementById('newOwner').value = "";
    } catch (err) {
        const errorMsg = err.reason || err.data?.message || err.message;
        log(`Transfer failed: ${errorMsg}`, "error");
        showToast(`Transfer failed: ${errorMsg}`, "error");
    } finally {
        btnTransferBatch.disabled = false;
        btnTransferBatch.innerText = "Execute Ownership Transfer";
    }
});

// 4. Emergency Recall
btnTriggerRecall.addEventListener('click', async () => {
    if (!contract) return showToast("Please connect your wallet first", "error");

    const recallLot = document.getElementById('recallLotCodeInput').value.trim();
    if (!recallLot) return showToast("Please enter a lot code to recall", "error");

    const confirmRecall = confirm(`⚠️ DANGER: Are you sure you want to trigger an emergency recall for Lot Code "${recallLot}"?`);
    if (!confirmRecall) return;

    try {
        log(`Triggering emergency recall for Lot: ${recallLot}...`, "info");
        btnTriggerRecall.disabled = true;
        btnTriggerRecall.innerText = "Confirming Recall...";

        const tx = await contract.triggerRecall(recallLot);
        log(`Recall order broadcast! Tx: ${tx.hash}`, "info");
        showToast("Broadcasting recall notice...", "info");

        await tx.wait();
        log(`EMERGENCY RECALL confirmed on-chain for Lot Code ${recallLot}!`, "error");
        showToast(`Recall triggered for lot ${recallLot}!`, "success");

        document.getElementById('recallLotCodeInput').value = "";
    } catch (err) {
        const errorMsg = err.reason || err.data?.message || err.message;
        log(`Recall execution failed: ${errorMsg}`, "error");
        showToast(`Recall failed: ${errorMsg}`, "error");
    } finally {
        btnTriggerRecall.disabled = false;
        btnTriggerRecall.innerText = "🚨 Trigger Product Recall";
    }
});

// 5. Traceability Explorer: Search Batch
btnSearchProduct.addEventListener('click', async () => {
    const idVal = parseInt(searchProductId.value);
    if (!idVal || idVal < 1) {
        return showToast("Please enter a valid Product ID", "error");
    }

    try {
        log(`Querying blockchain ledger for Product #${idVal}...`, "info");
        btnSearchProduct.disabled = true;

        // Use read-only provider if wallet not connected
        const queryContract = contract || new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider || new ethers.providers.getDefaultProvider('sepolia'));

        // Query product details & history
        const batch = await queryContract.productBatches(idVal);
        if (batch.productId.toNumber() === 0) {
            productResult.style.display = "none";
            log(`Product ID #${idVal} not found on blockchain.`, "error");
            return showToast(`Product #${idVal} does not exist`, "error");
        }

        const history = await queryContract.getProductHistory(idVal);

        // Update Details Header
        resProductId.innerText = `#${batch.productId}`;
        resLotCode.innerText = batch.lotCode;
        
        const statusIdx = batch.status;
        resStatus.innerText = STATUS_NAMES[statusIdx] || "Unknown";
        resStatus.className = `status-tag ${STATUS_CLASSES[statusIdx] || ''}`;
        resCurrentOwner.innerText = batch.currentOwner;

        // Render Timeline
        timelineList.innerHTML = "";
        history.forEach((entry, idx) => {
            const stepEl = document.createElement('div');
            const isRecalled = entry.status === 2; // Status.Recalled
            stepEl.className = `timeline-step ${isRecalled ? 'recalled' : ''}`;
            
            const dateStr = new Date(entry.timestamp.toNumber() * 1000).toLocaleString();
            
            // Format actor label according to action type
            let actorPrefix = "By:";
            let actionText = entry.action;
            if (entry.action === "Transferred") {
                actionText = "Custody Transferred";
                actorPrefix = "Transferred To:";
            } else if (entry.action === "Batch Created") {
                actorPrefix = "Created By:";
            } else if (entry.action === "Product Recalled") {
                actorPrefix = "Recalled By:";
            }

            // Display F2F for Rich Products
            const displayName = entry.participantName.replace("Rich Products", "F2F");

            stepEl.innerHTML = `
                <div class="step-dot"></div>
                <div class="step-card">
                    <div class="step-header">
                        <span class="step-action">${actionText}</span>
                        <span class="step-time">${dateStr}</span>
                    </div>
                    <div class="step-actor">
                        ${actorPrefix} <strong>${displayName}</strong> 
                        <span class="mono" style="font-size:0.75rem; color:var(--text-muted);">(${entry.participantAddress.slice(0, 8)}...)</span>
                    </div>
                </div>
            `;
            timelineList.appendChild(stepEl);
        });

        productResult.style.display = "block";
        log(`Retrieved ${history.length} audit steps for Product #${idVal}.`, "success");
    } catch (err) {
        console.error(err);
        log(`Failed to fetch history: ${err.message}`, "error");
        showToast("Error retrieving batch data", "error");
    } finally {
        btnSearchProduct.disabled = false;
    }
});

// Auto-run on load
window.addEventListener('DOMContentLoaded', init);