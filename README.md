# STQS

## Goal
Your goal is to visit [SpaceTraders.io]#https://docs.spacetraders.io/quickstart/new-game and implement as many features from the quickstart as you feel able to.

> SpaceTraders is a fun, free game driven entirely through API interactions. It is not affiliated with us in any way, so please ensure you abide by their [rate limits]#https://docs.spacetraders.io/api-guide/rate-limits.
## Delivery
We have scaffolded a small project #this repo to get you started. It contains everything you need to run and work on your quickstart. We will be running it when we receive your submission, so please ensure it works and contains any additional information we need to run it.

On completion, return the repository to us, either zipped as an attachment or uploaded to a Git hosting service.

---
# Features implemented
- Agent: Dashboard, Register
- Ship: Dashboard, Dock, Orbit, Refuel, Extract, Navigate
- Shipyard: Show Shipyard Waypoints
- Market: Show  Market Waypoints
- Contract: Show All Contracts
# How to run
> Navigate to client directory, run `npm run dev`
> Navigate to server directory, run `npm run dev`

# Folder Structure
> Folder structure leans towards feature-based (business logic based).

```
stqs-main
├───Client
│   └───src 
│       ├───assets         # images, svg...
│       ├───components     # Reusable components
│       ├───screens        # Screen folders (pages)
│       │   ├───Game       # Game Screen (Game.tsx is main component)
│       │   ├───NewAgent   # New Agent Screen (NewAgent.tsx is main component)
│       ├───services       # API Services 
│       ├───tests          # Test files
│       ├───utils          # Reusable functions / logics
├───Server
│   └───.env               # Server environment data
│   └───src                
│       └───routes         # Route API Endpoints
│       └───server.ts      # Main router
└───Shared                 # Files accessible by both front back end
    └───Interfaces         # Define interfaces to ensure data integrity across both ends
```