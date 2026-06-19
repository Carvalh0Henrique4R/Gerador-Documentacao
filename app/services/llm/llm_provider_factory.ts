import type { LlmProviderName } from '#models/llm_provider_config'
import type { LlmProvider } from './contracts/llm_provider.js'
import AnthropicProvider from './providers/anthropic_provider.js'
import GoogleProvider from './providers/google_provider.js'
import NoneProvider from './providers/none_provider.js'
import OllamaProvider from './providers/ollama_provider.js'
import OpenAiProvider from './providers/openai_provider.js'

export default class LlmProviderFactory {
  static make(provider: LlmProviderName): LlmProvider {
    switch (provider) {
      case 'anthropic':
        return new AnthropicProvider()
      case 'openai':
        return new OpenAiProvider()
      case 'google':
        return new GoogleProvider()
      case 'ollama':
        return new OllamaProvider()
      case 'none':
        return new NoneProvider()
    }
  }
}
