export async function getLanguagePreference(userId: string): Promise<string | null> {
    // Simulate fetching user preferences from a data source (e.g., database)
    const userPreferences: Record<string, string> = {
      'user1': 'es',
      'user2': 'fr',
      'user3': 'es',
      'user4': 'pt',
      // Add more user preferences as needed
    };
  
    // Simulate an asynchronous operation
    return new Promise<string | null>((resolve) => {
      setTimeout(() => {
        // Resolve with the user's language preference or null if not found
        resolve(userPreferences[userId] || null);
      }, 200);
    });
  }
  
  export async function setLanguagePreference(userId: string, language: string): Promise<boolean> {
    // Simulate updating user language preference in a database or external service
    // Return true if the update is successful, false otherwise
    return new Promise<boolean>((resolve) => {
      // Simulate an asynchronous operation
      setTimeout(() => {
        // Resolve with the success or failure of the language preference update
        resolve(true); // Simulating a successful update
      }, 200);
    });
  }
  
  
 
  