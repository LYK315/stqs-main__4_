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
- Shipyard: Show Shipyard Locations, Buy Ship
- Market: Show Market Locations
- Contract: Show All Contracts

# How to run
> First, navigate to Server directory, run `npm run dev`

> Then, navigate to Client directory, run `npm run dev`

# Folder Structure
Folder structure leans towards feature-based (business logic based).

```
stqs-main
├───Client
│   └───.env             # Client environment data 
│   └───src 
│       ├───assets       # images, svg...
│       ├───components   # Reusable components
│       ├───interfaces   # Ensure type integrity between components
│       ├───screens      # Screen folders (pages)
│       │   ├───Game     # Game Screen (Game.tsx is main component)
│       │   ├───NewAgent # New Agent Screen (NewAgent.tsx is main component)
│       ├───services     # API Services 
│       ├───tests        # Test files
│       ├───utils        # Reusable functions / logics
├───Server
│   └───.env             # Server environment data
│   └───src                
│       └───routes       # Route API Endpoints
│       └───server.ts    # Main router
└───Shared               # Files accessible by both front back end
    └───interfaces       # Ensure data integrity across front back end
```

---

# Check out my portfolio !
- [Github](https://github.com/LYK315)

- [Portfolio](https://portfolio-lyk.netlify.app/)