import type {
  GenerateDocumentationInput,
  GenerateDocumentationResult,
  LlmProvider,
} from '../contracts/llm_provider.js'

export default class NoneProvider implements LlmProvider {
  async generateDocumentation(
    input: GenerateDocumentationInput
  ): Promise<GenerateDocumentationResult> {
    return {
      provider: 'none',
      model: null,
      content: [
        `Documentacao estrutural para ${input.sourceType}:${input.sourceRef}.`,
        input.structuralContext || 'Nenhum contexto estrutural local foi informado.',
      ].join('\n\n'),
    }
  }
}
