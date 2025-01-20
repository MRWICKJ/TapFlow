export function generateBalance(input: string): number {
    // Hash the input string to get a numeric seed
    const hash = stringToHash(input);

    // Use the hash value to generate a random seed
    const seed = hash * 1000;

    // Generate a random balance between 500 and 10000 using the seed
    const randomBalance = (Math.sin(seed) * 5000) + 5500; // Balance fluctuates between 500 to 10000

    // Ensure the balance is within the specified range
    const finalBalance = Math.max(500, Math.min(10000, randomBalance));

    return finalBalance;
}

// Helper function to convert a string to a hash value
function stringToHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

