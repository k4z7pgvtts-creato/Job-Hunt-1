// RecommendationService.ts

// This service is responsible for handling AI-powered job recommendation requests.

import HttpService from "@/core/http.service";
import { IModels } from "@/interfaces";

export default class RecommendationService {
  private http: HttpService;

  constructor() {
    this.http = new HttpService();
  }

  // Get job recommendations based on a free-text query (e.g. "frontend developer")
  public async recommendByText(query: string) {
    const payload: IModels.IRecommendationTextPayload = { query };
    return this.http
      .service()
      .post<
        IModels.ITextRecommendationResponse,
        IModels.IRecommendationTextPayload
      >("recommend/text", payload);
  }

  // Get job recommendations based on an uploaded CV file (PDF or TXT)
  public async recommendByCV(file: File) {
    const formData = new FormData();
    formData.append("cv", file);

    return this.http
      .service()
      .post<IModels.ICvRecommendationResponse, FormData>(
        "recommend/cv",
        formData,
        undefined,
        true // hasAttachment -> sends multipart/form-data
      );
  }
}