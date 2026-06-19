import type {
  GenerateDocumentationInput,
  GenerateDocumentationResult,
  LlmProvider,
} from '../contracts/llm_provider.js'

export default class GoogleProvider implements LlmProvider {
  async generateDocumentation(
    _input: GenerateDocumentationInput
  ): Promise<GenerateDocumentationResult> {
    throw new Error('Google provider ainda nao implementado.')
  }
}
