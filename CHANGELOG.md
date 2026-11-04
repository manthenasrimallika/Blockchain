# Changelog

All notable changes to DecentraSocial are documented here.
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Planned
- NFT-based post ownership minting
- Decentralized identity (DID) integration
- Mobile app (React Native)

---

## [1.1.0] - 2024-11-04

### Security
- Added `onlyAuthorized` access control modifier to `UserRegistry.updateReputation()`
- Only whitelisted contracts (ModerationContract) can now update reputation scores
- Restricted ML service CORS to known client origin only
- Deploy script now automatically authorizes ModerationContract post-deployment

### Fixed
- Resolved TypeScript `expiresIn` type error in JWT auth controller
- Updated UserRegistry tests to match new access control behaviour

### Added
- GitHub Actions CI pipeline covering all 4 services (backend, frontend, blockchain, ML)
- `CONTRIBUTING.md` with branch naming, commit conventions and PR checklist
- `SECURITY.md` with vulnerability reporting policy
- GitHub Issue Templates for bug reports and feature requests
- `.env.example` for easy project setup
- `authorizeCaller` and `revokeCaller` functions in UserRegistry contract

### Changed
- Improved README with badges, architecture diagram and full API reference tables

---

## [1.0.0] - 2024-11-04

### Added
- Initial full-stack implementation of DecentraSocial
- React 18 + TypeScript + Vite + Tailwind CSS frontend
- Node.js + Express + TypeScript backend with 8 route modules
- Three Solidity smart contracts: UserRegistry, PostRegistry, ModerationContract
- Hardhat development environment with Ganache network config
- Smart contract deployment script with ABI export
- AES-256 encrypted private messaging with random IV
- Socket.io real-time messaging, notifications and typing indicators
- WebRTC live video streaming with Socket.io signaling
- IPFS media storage via Pinata with local fallback
- FastAPI ML microservice for fake news detection
- TF-IDF + Logistic Regression text credibility classifier
- URL credibility analysis with trusted/untrusted domain scoring
- Image authenticity analysis using perceptual hashing and EXIF inspection
- JWT authentication with bcrypt password hashing (12 rounds)
- Rate limiting, Helmet security headers, input validation
- MongoDB schemas for User, Post, Message, Notification, Story, Report
- Stories feature with reactions and replies
- Community moderation with on-chain voting and reputation updates
- Smart contract tests for UserRegistry and PostRegistry (18 tests)
