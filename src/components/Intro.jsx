export default function Intro() {
  return (
    <div className="intro">
      <div className="eyebrow">Elige un tema en el panel de la izquierda</div>
      <h2>Bienvenido a tu tablero de práctica</h2>
      <p style={{ color: "var(--ink-soft)", maxWidth: "52ch" }}>
        Cada tema trae una explicación corta para refrescar la memoria, su truco y unas preguntas cortas para
        practicar. Tu avance se guarda automáticamente en este navegador.
      </p>
    </div>
  );
}
