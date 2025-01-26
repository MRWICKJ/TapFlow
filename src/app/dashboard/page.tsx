import { initialProfile } from "@/lib/initial-profile";
import DashboardModel from "@/components/dashboard-model";
import Setup from "@/components/Setup";

// Updated interface to match the full Profile type
interface AccountType {
    id: string;
    balance: number;
    active: boolean;
}
interface Transaction {
    id: string;
    amount: number;
    createdAt: string;
    description: string;
}

interface ProfileData {
    user_id: string;
    first_name: string;
    last_name: string;
    email_id: string;
    username: string;
    account: AccountType[]; // Replace 'AccountType' with the actual account type if known
    payerTransactions: Transaction[]; // Replace 'any' with the actual transaction type
    receiverTransactions: Transaction[]; // Replace 'any' with the actual transaction type
}

interface InitialProfileResult {
    data: ProfileData;
    isFound: boolean;
    message?: string;
}

export default async function Page() {
    try {
        const { data, isFound } = await initialProfile() as InitialProfileResult;

        if (isFound) {
            return <DashboardModel profile={data} />;
        } else {
            return (
                <Setup
                    user_id={data.user_id}
                    first_name={data.first_name}
                    last_name={data.last_name}
                    username={data.username}
                    email_id={data.email_id}
                />
            );
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
        return <div>Error loading profile. Please try again later.</div>;
    }
}