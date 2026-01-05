'use client';
import { CreateQuestForm } from "./components";
import { useRouter } from "next/navigation";

export default function CreateQuestPage() {
    const router = useRouter();

    const handleQuestCreated = () => {
        router.push('/dashboard');
    }

    return (
        <div className="max-w-2xl mx-auto">
            <CreateQuestForm onQuestCreated={handleQuestCreated} />
        </div>
    )
}
