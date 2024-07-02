import axios from 'axios';

export const collectUserFeedback = async () => {
  try {
    // Fetch feedback from the custom feedback form API
    const response = await axios.get('/api/feedback');
    const feedbackData = response.data;

    // Process the feedback data (e.g., store it in a database, analyze it)
    await processFeedback(feedbackData);

    console.log('User feedback collected and processed successfully');
  } catch (error) {
    console.error('Error collecting user feedback:', error);
  }
};

const processFeedback = async (feedbackData: any) => {
  // Example processing logic: store feedback in a database
  try {
    await axios.post('/api/storeFeedback', feedbackData);
    console.log('Feedback stored successfully');
  } catch (error) {
    console.error('Error storing feedback:', error);
  }
};
