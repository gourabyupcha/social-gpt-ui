// This is a simple mock API for generating AI responses
// In a real application, this would connect to an actual API

const responses = [
  "That's an interesting question! Based on my knowledge, I can tell you that...",
  "Thanks for asking! Here's what I know about this topic:",
  "Great question! Let me explain this in detail:",
  "I'd be happy to help with that. Here's what you should know:",
  "That's something I can definitely help with. Let me share some insights:",
];

const facts = [
  "The average cloud weighs about 1.1 million pounds due to the weight of water droplets.",
  "Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.",
  "The world's oldest known living tree is a Great Basin Bristlecone Pine that is over 5,000 years old.",
  "Octopuses have three hearts, nine brains, and blue blood.",
  "A day on Venus is longer than a year on Venus. It takes 243 Earth days to rotate once on its axis (a day) and 225 Earth days to orbit the sun (a year).",
  "The fingerprints of koalas are so indistinguishable from humans that they have on occasion been confused at crime scenes.",
  "Bananas are berries, but strawberries are not.",
  "The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
  "The Eiffel Tower can be 15 cm taller during the summer due to thermal expansion.",
  "A group of flamingos is called a 'flamboyance'.",
];

const generateAIResponse = async (prompt) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Get a random intro and fact
  const intro = responses[Math.floor(Math.random() * responses.length)];
  const fact = facts[Math.floor(Math.random() * facts.length)];
  
  // For demonstration, generate a response based on the prompt
  let response;
  
  if (prompt.toLowerCase().includes("hello") || prompt.toLowerCase().includes("hi")) {
    response = "Hello! How can I assist you today?";
  } else if (prompt.toLowerCase().includes("help")) {
    response = "I'm here to help! You can ask me questions, and I'll do my best to provide useful information.";
  } else if (prompt.toLowerCase().includes("thank")) {
    response = "You're welcome! If you have any other questions, feel free to ask.";
  } else {
    // Generate a more detailed response for other prompts
    response = `${intro}\n\n${prompt.charAt(0).toUpperCase() + prompt.slice(1)} is a fascinating topic. ${fact}\n\nIs there anything specific about this that you'd like to know more about?`;
  }
  
  return response;
};

export { generateAIResponse };