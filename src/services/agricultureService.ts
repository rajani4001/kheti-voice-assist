
// This is a mock service that would be replaced with actual API calls
// to a backend service for processing farmer queries

interface QueryResponse {
  text: string;
  source?: string;
}

// Sample agricultural knowledge base for demonstration purposes
const knowledgeBase: Record<string, QueryResponse> = {
  'wheat fertilizer': {
    text: 'For wheat cultivation, apply NPK fertilizer in the ratio of 120:60:40 kg per hectare. Apply half of nitrogen and full phosphorus and potassium at the time of sowing. The remaining half of nitrogen should be applied after the first irrigation.',
    source: 'ICAR Guidelines'
  },
  'rice disease': {
    text: 'Common rice diseases include Blast, Bacterial Leaf Blight, and Brown Spot. For Blast, use fungicides containing Tricyclazole. For Bacterial Leaf Blight, drain the field and apply copper-based bactericides. For Brown Spot, use fungicides containing Propiconazole.',
    source: 'Rice Research Institute'
  },
  'tomato pests': {
    text: 'Common tomato pests include aphids, whiteflies, and fruit borers. For aphids and whiteflies, spray neem oil solution. For fruit borers, use traps with pheromone lures and apply Bacillus thuringiensis (Bt) based biopesticides.',
    source: 'Agricultural Extension Services'
  },
  'organic farming': {
    text: 'Organic farming practices include crop rotation, use of organic manure like compost and vermicompost, biological pest control using neem-based solutions, and maintaining soil health through green manuring. This improves soil fertility and reduces dependency on chemical inputs.',
    source: 'Organic Farming Association'
  },
  'water management': {
    text: 'Efficient water management practices include drip irrigation, mulching, raised bed cultivation, and rainwater harvesting. These practices can reduce water usage by 30-50% while maintaining or improving crop yields.',
    source: 'Water Conservation Department'
  },
  'weather forecast': {
    text: 'Based on the latest meteorological data, moderate rainfall is expected in the coming week. Farmers are advised to postpone irrigation and any chemical spray operations. Ensure proper drainage in the fields to prevent waterlogging.',
    source: 'Meteorological Department'
  },
};

// Function to handle farmer's queries
export async function processQuery(query: string): Promise<QueryResponse> {
  // Convert query to lowercase for case-insensitive matching
  const lowercaseQuery = query.toLowerCase();
  
  // Check if query directly matches any key phrases
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (lowercaseQuery.includes(key)) {
      return response;
    }
  }
  
  // Default response if no match is found
  return {
    text: "I don't have specific information on that query. Please ask about wheat fertilizer, rice disease, tomato pests, organic farming, water management, or weather forecast.",
    source: 'General Response'
  };
}
