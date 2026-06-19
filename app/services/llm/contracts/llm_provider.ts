export type GenerateDocumentationInput = {
  projectId: number
  sourceType: string
  sourceRef: string
  diff?: string
  structuralContext?: string
}

export type GenerateDocumentationResult = {
  content: string
  provider: string
  model?: string | null
}

export interface LlmProvider {
  generateDocumentation(input: GenerateDocumentationInput): Promise<GenerateDocumentationResult>
}
