# **App Name**: QuestVerse

## Core Features:

- User Authentication: Implement secure user authentication using Firebase Auth, supporting email/password and Google sign-in. Each user should have a unique profile stored in Firestore.
- AI Rival Customization: Allow users to customize their AI rival's name, avatar, and personality (aggressive, neutral, friendly). Store rival profiles in Firestore with fields for currentXP and xpRatePerMinute.
- Quest Creation and Tracking: Enable users to create daily learning quests (study, fitness, coding, habit) with specified duration and XP reward. Store quest data in Firestore with fields for status (pending, completed, failed) and timestamps.
- Real-time XP and Level Updates: Implement real-time XP updates using Firebase Functions when quests are completed. Update user levels based on XP thresholds. Use Firestore triggers to manage XP changes.
- Inactivity-Based Rival XP Gain: Create a Firebase Function that runs every 5 minutes to check for inactive users and increment their rival's XP automatically. This function should adjust the rival's XP in real-time within the Firestore database, encouraging users to stay active.
- Community Guilds: Allow users to join guilds. Guild XP is the sum of members’ XP, fostering community learning.
- Personalized Taunts: Periodically generate personalized rival messages / 'taunts' using a generative AI tool when the user is inactive, increasing motivation to maintain progress.

## Style Guidelines:

- Primary color: Medium-toned brownish-orange (#B38B66) to invoke a sense of rustic pixel art adventures and progress milestones.
- Background color: Desaturated, light sky-blue (#D6E6F2) to maintain the pixel art style, keeping a relaxing but active background tone, akin to the bright outdoors. This is less intense than pure sky blue, so it's easy on the eyes.
- Accent color: Light grayish-green (#A6BCA3) for minor user interface accents to represent trees. Provides gentle visual contrast to improve readability and provide a calming neutral, avoiding excessive saturation which would break the pixel-art atmosphere.
- Body and headline font: 'PT Sans' for a balanced, friendly look.
- Use pixel-art-style icons for quests, categories, and XP elements to match the retro gaming theme.
- Employ a grid-based layout with pixel-perfect alignment to ensure a consistent retro aesthetic.
- Add animated XP bars and pixelated transitions to create engaging feedback loops and visual rewards.