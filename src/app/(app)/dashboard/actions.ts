'use server';

import { generateTaunt, TauntInput } from '@/ai/flows/personalized-rival-taunts';

export async function getTaunt(input: TauntInput) {
    try {
        const output = await generateTaunt(input);
        return output;
    } catch(e) {
        console.error(e);
        return { taunt: "I'm speechless... for now." };
    }
}
