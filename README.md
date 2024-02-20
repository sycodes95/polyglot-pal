## PolyglotPal

Website: https://polyglotpal.up.railway.app/

It's completely free at the moment, just login with a google account and try it out!

Or check my demo video of the application here : https://www.youtube.com/watch?v=7dYVyEES1fU

## Tech Stack

- **Front End:** React | TypeScript | TailwindCSS
- **Back End:** Convex
- **Other Libraries:** Shadcn UI


## Goal

My goal was to create an application where the user can practice speaking in a specific language with an AI. Why? Well I think it can be quite difficult to practice when you're not around a lot of native speakers. Travel can be expensive, and for introverts like me it might not be ideal at times.

## Key Features 

- Ability to record voice and receive voice responses from AI.

- Uses Google Speech-to-text and Text-to-speech APIs to make user to AI communication possible.

- Real time text translation to your native language with a click of a button.

- Ability to replay AI voice responses.

- Conversations are automatically saved when a new message is sent or received, or if the user   changes the settings of the conversation.

- User authentication using Auth0.

- UI synced with database thanks to Convex.

## What I learned

It was my first time using Convex which is a SaaS Backend. It was a requirement to use it due to them being a sponsor of the hackathon which I created this project for, which I continued to work on after it the hackathon concluded. Thankfully the documentation was amazing so it really wasn't difficult to get started creating schemas and syncing the DB to the front end.

I also learned how to work with audio, especially the different formats they can be in like base64 for example. I wanted to create a way to use the audio immediately from state so that I did not have to use up a lot of storage in the backend. So as soon as I got a voice response from Google text-to-speech I would attach the audio file to a HTMLAudioElement and play the audio. The downside is that if the user presses the replay button, it would have to go through Google TTS API again which could take a second or 2. However the pro is that I use absolutely no storage in the backend, which is ultimately what I wanted.

## Project Images

Landing Page
![Landing Page](./src/assets/images/readMe/landing.png "Landing Page")

Dashboard
![Dashboard](./src/assets/images/readMe/dashboard.png "Dashboard")

Applications Page
![Applications Page](./src/assets/images/readMe/applications.png "Applications Page")

Insights (Data Vis & Metrics)
![Insights (Data Vis & Metrics)](./src/assets/images/readMe/insights.png "Insights (Data Vis & Metrics)")

## Setup

Running Dev Server:

```bash
npm run dev
```

Running Prod Server:

```bash
npm run build
npm start
```

Running Tests:

```bash
npm run test
```

Running Convex Backend Dev Server:

```bash
npx convex dev
```