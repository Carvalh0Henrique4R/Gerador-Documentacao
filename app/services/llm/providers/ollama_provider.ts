import type {
  GenerateDocumentationInput,
  GenerateDocumentationResult,
  LlmProvider,
} from '../contracts/llm_provider.js'

export default class OllamaProvider implements LlmProvider {
  async generateDocumentation(
    _input: GenerateDocumentationInput
  ): Promise<GenerateDocumentationResult> {
    throw new Error('Ollama provider ainda nao implementado.')
  }
}
