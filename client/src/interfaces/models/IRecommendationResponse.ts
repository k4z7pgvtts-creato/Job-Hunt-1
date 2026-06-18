// Response shape for POST /api/recommend/text
export interface ITextRecommendationResponse {
  recommendations: string[];
}

// Response shape for POST /api/recommend/cv
export interface ICvRecommendationResponse {
  recommended_jobs: string[];
}