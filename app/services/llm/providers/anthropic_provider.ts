import type {
  GenerateDocumentationInput,
  GenerateDocumentationResult,
  LlmProvider,
} from '../contracts/llm_provider.js'

export default class AnthropicProvider implements LlmProvider {
  async generateDocumentation(
    _input: GenerateDocumentationInput
  ): Promise<GenerateDocumentationResult> {
    throw new Error('Anthropic provider ainda nao implementado.')
  }
}
