# STQS

## Goal
Your goal is to visit [SpaceTraders.io](https://docs.spacetraders.io/quickstart/new-game) and implement as many features from the quickstart as you feel able to.

> SpaceTraders is a fun, free game driven entirely through API interactions. It is not affiliated with us in any way, so please ensure you abide by their [rate limits](https://docs.spacetraders.io/api-guide/rate-limits).
## Delivery
We have scaffolded a small project (this repo) to get you started. It contains everything you need to run and work on your quickstart. We will be running it when we receive your submission, so please ensure it works and contains any additional information we need to run it.

On completion, return the repository to us, either zipped as an attachment or uploaded to a Git hosting service.

## Tips
We suggest focusing on a quality **vertical slice**, rather than lots of functionality. Consider this an opportunity to show us how you might approach building an application, which you will then have the chance to walk us through later. You do not need to build a large application - focus on demonstrating experience over feature completion.

Areas we will be looking to discuss include:
- How you structure your code
- Idiomatic use of React and ECMAScript
- How you use the type system to build confidence in your code
- Performance considerations when dealing with side effects and state
- How styling is organized and applied (we don't expect you to be a designer, so don't worry about aesthetic choices)
- How you use source code management (Git) to segment your changes

## Running

`npm ci`
`npm run dev`
See `package.json` for more details on available scripts.

---

# Notes - Kai
- Folders are structured into few parts. (SERVER, CLIENT, SHARED)
- Using function-based folder structure.

```
stqs-main
├───Client
│   └───src 
│       ├───assets           (images, svg...)
│       ├───components       (public reusable components)
│       ├───NewAgent         (create new agent page)
│       ├───Game             (main game page)
│       │   ├───Game.tsx     (main feature)
│       │   └───Commands.tsx (main feature)
│       │   └───Agent        (sub feature)
│       │   └───Contract     (sub feature)
│       │   └───Market       (sub feature)
│       │   └───Ship         (sub feature)
│       │   └───Shipyard     (sub feature)
├───Server
│   └───.env
│   └───src
│       └───routes
│       │   ├───agent.ts
│       │   ├───contrac.ts
│       │   ├───market.ts
│       │   ├───ships.ts
│       │   ├───shipyard.ts
│       │   ├───systems.ts
│       └───server.ts
└───Shared
    └───Types (define data types to ensure data integrity across frontend & backend)
```