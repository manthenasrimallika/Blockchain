# DecentraSocial 🔗

> A full-stack decentralized social media platform with blockchain-backed content ownership, AI-powered fake news detection, end-to-end encrypted messaging, and privacy-first access control.

![CI](https://github.com/manthenasrimallika/Blockchain/actions/workflows/ci.yml/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![Solidity](https://img.shields.io/badge/Solidity-0.8.20-363636?style=flat&logo=solidity)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat&logo=python&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-47A248?style=flat&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat)

---

## What is DecentraSocial?

DecentraSocial is a social media platform where **you own your data**. Unlike traditional platforms:

- 🔐 Your identity is verified by a **blockchain wallet** (MetaMask)
- 📝 Every post is **hashed on-chain** — tamper-proof ownership proof
- 🤖 An **AI model** scans content for fake news and credibility
- 💬 Messages are **AES-256 encrypted** — only you and the recipient can read them
- 🌐 Media is stored on **IPFS** — decentralized, not on any company's server
- 🗳️ Community **votes on reported content** via smart contracts

---

## Architecture

```
User → React Frontend → Express Backend →
  ├── MongoDB          (off-chain user data, posts, messages)
  ├── IPFS via Pinata  (decentralized media storage)
  ├── Ganache          (blockchain: ownership, access control, reputation)
  └── FastAPI ML       (fake news detection, URL + image analysis)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, ShadCN UI, Ethers.js, Socket.io-client |
| Backend | Node.js, Express, TypeScript, Socket.io, JWT, bcrypt, Mongoose |
| Blockchain | Solidity 0.8.20, Hardhat, Ganache, Ethers.js |
| Database | MongoDB |
| File Storage | IPFS (Pinata) |
| ML Service | Python, FastAPI, Scikit-learn, Pillow, imagehash |

---

## Smart Contracts

| Contract | Purpose |
|----------|---------|
| `UserRegistry` | Wallet registration, username mapping, reputation scores |
| `PostRegistry` | Post hash storage, ownership proof, visibility permissions |
| `ModerationContract` | Content reporting, community voting, reputation updates |

---

## Prerequisites

- Node.js >= 18
- Python >= 3.10
- MongoDB (local or Atlas)
- Ganache CLI (`npm install -g ganache`)
- MetaMask browser extension

---

## Setup Instructions

### 1. Clone & Environment Variables

```bash
git clone https://github.com/manthenasrimallika/Blockchain.git
cd Blockchain
cp .env.example .env
# Fill in your values in .env
```

### 2. Blockchain Setup

```bash
# Terminal 1 — Start Ganache
npx ganache --port 8545

# Terminal 2 — Deploy contracts
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.ts --network ganache
```

Copy the output contract addresses into your `.env`:
```
USER_REGISTRY_ADDRESS=0x...
POST_REGISTRY_ADDRESS=0x...
MODERATION_CONTRACT_ADDRESS=0x...
DEPLOYER_PRIVATE_KEY=0x...   # from Ganache output
```

### 3. Backend

```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

### 4. Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

### 5. ML Service

```bash
cd ml-service
python -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate         # Windows
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
# Runs on http://localhost:8000
```

### 6. Run Smart Contract Tests

```bash
cd blockchain
npx hardhat test
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register with wallet |
| POST | `/api/auth/login` | Login with email/password |
| GET | `/api/auth/me` | Get current user |

### Posts
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/posts` | Create post (with optional media) |
| GET | `/api/posts/feed` | Get paginated feed |
| POST | `/api/posts/:id/like` | Like/unlike a post |
| POST | `/api/posts/:id/comment` | Add comment |
| DELETE | `/api/posts/:id` | Delete own post |

### Messages
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/messages` | Send encrypted message |
| GET | `/api/messages/conversations` | List conversations |
| GET | `/api/messages/:partnerId` | Get conversation |

### ML Service
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/analyze` | Analyze text credibility |
| POST | `/analyze-url` | Check URL credibility |
| POST | `/analyze-image` | Check image authenticity |
| POST | `/batch-analyze` | Analyze multiple texts |

---

## Socket.io Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `new-post` | Server → Client | Real-time post broadcast |
| `send-message` | Client → Server | Send encrypted chat message |
| `new-message` | Server → Client | Receive chat message |
| `typing` / `stop-typing` | Bidirectional | Typing indicators |
| `user-status` | Server → Client | Online/offline status |
| `notification` | Server → Client | Real-time notifications |
| `live:start-stream` | Client → Server | Start live video stream |
| `live:offer/answer` | Bidirectional | WebRTC signaling |

---

## Security Features

- 🔑 Password hashing with **bcrypt** (12 rounds)
- 🎟️ **JWT**-based stateless authentication
- 🔒 **AES-256** encrypted private messages with random IV
- 🚦 Rate limiting (200 req / 15 min)
- 🛡️ **Helmet** security headers
- ✅ Input validation via express-validator
- 🌐 CORS configuration
- ⛓️ Smart contract access control with Solidity modifiers

---

## Project Structure

```
Blockchain/
├── blockchain/
│   ├── contracts/        # Solidity smart contracts
│   ├── scripts/          # Deployment scripts
│   ├── test/             # Contract tests (Hardhat)
│   └── hardhat.config.ts
├── backend/
│   └── src/
│       ├── controllers/  # Request handlers
│       ├── routes/       # API route definitions
│       ├── models/       # Mongoose schemas
│       ├── middleware/   # Auth, validation, error handling
│       ├── services/     # IPFS, blockchain, ML, encryption
│       ├── sockets/      # Socket.io + WebRTC signaling
│       └── config/       # DB, logger, blockchain config
├── frontend/
│   └── src/
│       ├── components/   # UI components (ShadCN + custom)
│       ├── pages/        # Route pages
│       ├── hooks/        # Custom React hooks
│       ├── services/     # API client
│       └── context/      # Auth, Socket, Theme providers
└── ml-service/
    ├── main.py           # FastAPI application
    └── model/            # Classifier, URL checker, image analyzer
```

---

## License

MIT © Srimallika Manthena
