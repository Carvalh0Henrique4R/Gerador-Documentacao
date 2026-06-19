import type {
  GenerateDocumentationInput,
  GenerateDocumentationResult,
  LlmProvider,
} from '../contracts/llm_provider.js'

export default class OpenAiProvider implements LlmProvider {
  async generateDocumentation(
    _input: GenerateDocumentationInput
  ): Promise<GenerateDocumentationResult> {
    throw new Error('OpenAI provider ainda nao implementado.')
  }
}
