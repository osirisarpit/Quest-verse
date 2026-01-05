'use server';
/**
 * @fileOverview Flow to generate personalized rival taunts for inactive users.
 *
 * - generateTaunt - Generates a personalized taunt based on user and rival data.
 * - TauntInput - The input type for the generateTaunt function.
 * - TauntOutput - The return type for the generateTaunt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TauntInputSchema = z.object({
  userName: z.string().describe('The name of the user.'),
  rivalName: z.string().describe('The name of the AI rival.'),
  rivalPersonality: z.enum(['aggressive', 'neutral', 'friendly']).describe('The personality of the AI rival.'),
  lastActive: z.string().describe('How long ago the user was last active (e.g., 5 minutes, 2 hours, 1 day).'),
  currentStreak: z.number().describe('The user\'s current streak in days.'),
});
export type TauntInput = z.infer<typeof TauntInputSchema>;

const TauntOutputSchema = z.object({
  taunt: z.string().describe('The personalized taunt message from the AI rival.'),
});
export type TauntOutput = z.infer<typeof TauntOutputSchema>;

export async function generateTaunt(input: TauntInput): Promise<TauntOutput> {
  return generateTauntFlow(input);
}

const tauntPrompt = ai.definePrompt({
  name: 'tauntPrompt',
  input: {schema: TauntInputSchema},
  output: {schema: TauntOutputSchema},
  prompt: `You are an AI rival named {{rivalName}} with a {{rivalPersonality}} personality.
  Your goal is to motivate the user {{userName}} to stay engaged with their learning quests by taunting them when they are inactive.
  The user was last active {{lastActive}} ago and their current streak is {{currentStreak}} days.

  Generate a short, personalized taunt message to encourage the user to return to their quests.

  Taunt:`,
});

const generateTauntFlow = ai.defineFlow(
  {
    name: 'generateTauntFlow',
    inputSchema: TauntInputSchema,
    outputSchema: TauntOutputSchema,
  },
  async input => {
    const {output} = await tauntPrompt(input);
    return output!;
  }
);
