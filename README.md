# DecentraSocial - Blockchain-Based Decentralized Social Media Platform

A full-stack decentralized social media platform with blockchain-backed content ownership, AI-powered fake news detection, end-to-end encrypted messaging, and privacy-first access control.

## Architecture

```
User -> React Frontend -> Express Backend ->
  1. MongoDB (off-chain data)
  2. IPFS via Pinata (media storage)
  3. Ganache Blockchain (hash, ownership, access control, reputation)
  4. FastAPI ML Service (fake news detection)
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React, TypeScript, Vite, Tailwind CSS, ShadCN UI, Ethers.js, Socket.io-client |
| Backend | Node.js, Express, TypeScript, Socket.io, JWT, bcrypt, Mongoose |
| Blockchain | Solidity, Hardhat, Ganache, Ethers.js |
| Database | MongoDB |
| File Storage | IPFS (Pinata) |
| ML Service | Python, FastAPI, Scikit-learn |

## Prerequisites

- Node.js >= 18
- Python >= 3.10
- MongoDB (local or Atlas)
- Ganache CLI or Ganache GUI
- MetaMask browser extension (for wallet features)

## Setup Instructions

### 1. Environment Variables

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

### 2. Blockchain Setup

```bash
# Start Ganache (in a separate terminal)
npx ganache --port 8545

# Install dependencies and deploy contracts
cd blockchain
npm install
npx hardhat compile
npx hardhat run scripts/deploy.ts --network ganache
```

After deployment, copy the contract addresses from `blockchain/deployed-addresses.json` into your `.env` file:
- `USER_REGISTRY_ADDRESS`
- `POST_REGISTRY_ADDRESS`
- `MODERATION_CONTRACT_ADDRESS`

Also copy a private key from Ganache into `DEPLOYER_PRIVATE_KEY`.

### 3. Backend Setup

```bash
cd backend
npm install
npm run dev
```

The server starts on `http://localhost:5000`.

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend starts on `http://localhost:5173`.

### 5. ML Service Setup

```bash
cd ml-service
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

The ML service starts on `http://localhost:8000`.

### 6. Run Smart Contract Tests

```bash
cd blockchain
npx hardhat test
```

## Project Structure

```
blockchain/
  contracts/         # Solidity smart contracts
  scripts/           # Deployment scripts
  test/              # Contract tests
  abi/               # Exported ABIs (generated)

backend/
  src/
    controllers/     # Request handlers
    routes/          # API route definitions
    models/          # Mongoose schemas
    middleware/      # Auth, validation, error handling
    services/        # IPFS, blockchain, ML, encryption
    sockets/         # Socket.io event handlers
    config/          # Database, logger, blockchain config

frontend/
  src/
    components/      # UI components (ShadCN + custom)
    pages/           # Route pages
    hooks/           # Custom React hooks
    services/        # API client
    context/         # Auth and Socket providers
    lib/             # Utility functions

ml-service/
  main.py            # FastAPI application
  model/             # Classifier and training data
```

## Smart Contracts

| Contract | Purpose |
|----------|---------|
| UserRegistry | Wallet registration, username mapping, reputation scores |
| PostRegistry | Post hash storage, ownership proof, visibility permissions |
| ModerationContract | Content reporting, community voting, reputation updates |

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register with wallet
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/me` - Get current user

### Posts
- `POST /api/posts` - Create post (with optional media)
- `GET /api/posts/feed` - Get feed (paginated)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts/:id/like` - Like/unlike
- `POST /api/posts/:id/comment` - Add comment
- `DELETE /api/posts/:id` - Delete own post

### Users
- `GET /api/users/search?q=` - Search users
- `GET /api/users/suggested` - Get suggested users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update own profile
- `POST /api/users/:id/follow` - Follow/unfollow

### Messages
- `POST /api/messages` - Send encrypted message
- `GET /api/messages/conversations` - List conversations
- `GET /api/messages/:partnerId` - Get conversation

### Moderation
- `POST /api/moderation/report` - Report a post
- `POST /api/moderation/:reportId/vote` - Vote on report
- `GET /api/moderation/reports` - List reports

### ML Service
- `POST /analyze` - Analyze text credibility
- `POST /train` - Retrain model with new data
- `POST /batch-analyze` - Analyze multiple texts

## Socket.io Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `new-post` | Server -> Client | Real-time post broadcast |
| `send-message` | Client -> Server | Send a chat message |
| `new-message` | Server -> Client | Receive a chat message |
| `typing` / `stop-typing` | Bidirectional | Typing indicators |
| `user-status` | Server -> Client | Online/offline status |
| `notification` | Server -> Client | Real-time notifications |

## Security Features

- Password hashing with bcrypt (12 rounds)
- JWT-based authentication
- AES-256 encrypted private messages
- Rate limiting (200 req / 15 min)
- Helmet security headers
- Input validation via express-validator
- CORS configuration
- Smart contract access control
- Blockchain transaction verification
