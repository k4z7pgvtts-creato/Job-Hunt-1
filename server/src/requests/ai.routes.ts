import { Router, Request, Response } from "express";

const router = Router();

router.post("/recommendations", async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ error: "Prompt is required" });
      return;
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY || "",
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    console.log("Anthropic response:", JSON.stringify(data));
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;