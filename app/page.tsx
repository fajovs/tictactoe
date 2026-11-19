import { GameBoard } from "@/components/game-board";

export default function Home() {
  return (
    <main className="page-shell">
      <div className="backdrop-grid" aria-hidden="true" />
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />
      <section className="game-card" aria-labelledby="page-title">
        <header className="game-header">
          <div className="brand-row"><span className="brand-mark">TTT</span><span className="brand-name">SIDEQUEST <i>NO. 001</i></span></div>
          <p className="eyebrow">THE ORIGINAL TWO-PLAYER SHOWDOWN</p>
          <h1 id="page-title">Make your<br /><span>next move.</span></h1>
          <p className="subtitle">A little strategy goes a long way.</p>
          <div className="intro-rule"><span /> A QUICK GAME OF WITS <span /></div>
        </header>
        <GameBoard />
        <footer className="page-footer"><span>PASS THE DEVICE</span><span className="footer-divider" /><span>PLAY NICE. WIN BIG.</span></footer>
      </section>
      <p className="outside-note"><span className="online-dot" /> READY WHEN YOU ARE</p>
    </main>
  );
}