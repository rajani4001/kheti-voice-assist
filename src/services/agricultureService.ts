
interface QueryResponse {
  text: string;
  source?: string;
  weatherDependent?: boolean;
}

// Enhanced knowledge base with more farming-specific content
const knowledgeBase: Record<string, QueryResponse> = {
  'weather today': {
    text: 'Based on current conditions, it\'s a sunny day with moderate humidity. Good day for field inspection.',
    source: 'Weather Service',
    weatherDependent: true
  },
  'wheat fertilizer': {
    text: 'For wheat cultivation, apply NPK fertilizer in the ratio of 120:60:40 kg per hectare. First dose: Apply half of nitrogen and full phosphorus and potassium at sowing. Second dose: Remaining nitrogen after first irrigation.',
    source: 'ICAR Guidelines'
  },
  'rice disease': {
    text: 'Common rice diseases include Blast, Bacterial Leaf Blight, and Brown Spot. For Blast: Use Tricyclazole-based fungicides. For Bacterial Blight: Drain field and apply copper-based bactericides. For Brown Spot: Use Propiconazole fungicides.',
    source: 'Rice Research Institute'
  },
  'pesticide spray': {
    text: 'Avoid spraying pesticides during windy or rainy conditions. Best time is early morning or late evening. Wear protective gear. Follow dosage instructions carefully.',
    source: 'Agricultural Extension Services',
    weatherDependent: true
  },
  'organic farming': {
    text: 'Use crop rotation, organic manure (compost/vermicompost), neem-based pest control, and maintain soil health through green manuring. This improves fertility and reduces chemical dependency.',
    source: 'Organic Farming Association'
  },
  'water management': {
    text: 'Implement drip irrigation, mulching, raised bed cultivation, and rainwater harvesting. These methods can reduce water usage by 30-50% while maintaining crop yields.',
    source: 'Water Conservation Department'
  },
  'weather forecast': {
    text: 'Moderate rainfall expected this week. Postpone irrigation and chemical spraying. Ensure proper field drainage to prevent waterlogging.',
    source: 'Meteorological Department',
    weatherDependent: true
  },
  'कीटनाशक स्प्रे': {
    text: 'तेज हवा या बारिश के दौरान कीटनाशकों का छिड़काव न करें। सुबह या शाम का समय सबसे अच्छा है। सुरक्षात्मक उपकरण पहनें।',
    source: 'कृषि विस्तार सेवाएं',
    weatherDependent: true
  },
  'गेहूं की खाद': {
    text: 'गेहूं की खेती के लिए NPK उर्वरक 120:60:40 किलोग्राम प्रति हेक्टेयर की दर से डालें। बुवाई के समय आधा नाइट्रोजन और पूरा फॉस्फोरस और पोटाश दें।',
    source: 'ICAR दिशानिर्देश'
  }
};

// Enhanced query processing with language support
export async function processQuery(query: string): Promise<QueryResponse> {
  const lowercaseQuery = query.toLowerCase();
  
  // Check direct matches in knowledge base
  for (const [key, response] of Object.entries(knowledgeBase)) {
    if (lowercaseQuery.includes(key)) {
      return response;
    }
  }
  
  // Keywords based matching for more flexible responses
  if (lowercaseQuery.includes('fertilizer') || lowercaseQuery.includes('खाद')) {
    return knowledgeBase['wheat fertilizer'];
  }
  
  if (lowercaseQuery.includes('disease') || lowercaseQuery.includes('बीमारी')) {
    return knowledgeBase['rice disease'];
  }
  
  if (lowercaseQuery.includes('water') || lowercaseQuery.includes('पानी')) {
    return knowledgeBase['water management'];
  }
  
  // Default response with guidance
  return {
    text: "मैं आपकी सहायता कर सकता हूं: खाद, बीमारी, कीड़े, पानी प्रबंधन, या मौसम के बारे में पूछें। I can help with: fertilizers, diseases, pests, water management, or weather.",
    source: 'General Response'
  };
}

