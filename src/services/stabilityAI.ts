
const STABILITY_API_KEY = "sk-QgVSBwpSSAeVRhRvJOq7Y2VcTDARAntMbWWJePejpUuqwYHR";
const STABILITY_API_URL = "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image";

export interface StabilityImageParams {
  prompt: string;
  negativePrompt?: string;
  width?: number;
  height?: number;
  samples?: number;
  steps?: number;
  cfgScale?: number;
  seed?: number;
  style?: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: string;
}

interface StabilityRequestBody {
  text_prompts: Array<{
    text: string;
    weight: number;
  }>;
  cfg_scale: number;
  height: number;
  width: number;
  samples: number;
  steps: number;
  seed?: number;
}

export const generateStabilityImage = async (params: StabilityImageParams): Promise<GeneratedImage[]> => {
  const {
    prompt,
    negativePrompt = "",
    width = 1024,
    height = 1024,
    samples = 1,
    steps = 30,
    cfgScale = 7,
    seed
  } = params;

  const requestBody: StabilityRequestBody = {
    text_prompts: [
      {
        text: prompt,
        weight: 1
      }
    ],
    cfg_scale: cfgScale,
    height,
    width,
    samples,
    steps,
  };

  // Add negative prompt if provided
  if (negativePrompt.trim()) {
    requestBody.text_prompts.push({
      text: negativePrompt,
      weight: -1
    });
  }

  // Add seed if provided
  if (seed) {
    requestBody.seed = seed;
  }

  console.log('Sending request to Stability AI:', requestBody);

  const response = await fetch(STABILITY_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${STABILITY_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error('Stability AI error:', errorData);
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log('Stability AI response:', data);

  const generatedImages: GeneratedImage[] = data.artifacts.map((artifact: any, index: number) => ({
    id: `stability-${Date.now()}-${index}`,
    url: `data:image/png;base64,${artifact.base64}`,
    prompt: prompt,
    timestamp: new Date().toLocaleString()
  }));

  return generatedImages;
};
