import { Link } from '@adonisjs/inertia/react'

export default function Home() {
  return (
    <section className="page home-page">
      <div className="hero">
        <p className="eyebrow">BYOK + fallback sem LLM</p>
        <h1>Gerador automatico de documentacao tecnica</h1>
        <p>
          Cadastre projetos, configure o provider de LLM por repositorio e acompanhe as
          documentacoes geradas por eventos de Git.
        </p>
        <Link className="ui-button ui-button-primary" href="/projects">
          Ver projetos
        </Link>
      </div>
    </section>
  )
}
