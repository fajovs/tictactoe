"use client";

import { useState } from "react";
import { getGameResult, getWinningLine, type Board, type Player } from "@/lib/game";

type Scores = Record<Player | "draws", number>;
type IconId = "javascript" | "typescript" | "python" | "rust" | "go" | "html";
type DevIcon = { id: IconId; language: string; glyph: string; className: string };

const EMPTY_BOARD: Board = Array(9).fill(null);
const INITIAL_SCORES: Scores = { X: 0, O: 0, draws: 0 };
const DEV_ICONS: DevIcon[] = [
  { id: "javascript", language: "JavaScript", glyph: "JS", className: "icon-js" },
  { id: "typescript", language: "TypeScript", glyph: "TS", className: "icon-ts" },
  { id: "python", language: "Python", glyph: "Py", className: "icon-python" },
  { id: "rust", language: "Rust", glyph: "Rs", className: "icon-rust" },
  { id: "go", language: "Go", glyph: "Go", className: "icon-go" },
  { id: "html", language: "HTML", glyph: "</>", className: "icon-html" },
];
const CONFETTI = Array.from({ length: 24 }, (_, index) => index);

function getDevIcon(id: IconId) {
  return DEV_ICONS.find((icon) => icon.id === id) ?? DEV_ICONS[0];
}

export function GameBoard() {
  const [board, setBoard] = useState<Board>([...EMPTY_BOARD]);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [history, setHistory] = useState<Board[]>([]);
  const [scores, setScores] = useState<Scores>({ ...INITIAL_SCORES });
  const [iconX, setIconX] = useState<IconId>("javascript");
  const [iconO, setIconO] = useState<IconId>("python");
  const result = getGameResult(board);
  const winningLine = getWinningLine(board);
  const movesPlayed = history.length;
  const activeIcon = getDevIcon(currentPlayer === "X" ? iconX : iconO);
  const winnerIcon = result === "X" || result === "O" ? getDevIcon(result === "X" ? iconX : iconO) : null;

  function playCell(index: number) {
    if (board[index] !== null || result !== null) return;

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    const nextResult = getGameResult(nextBoard);

    setHistory((previous) => [...previous, [...board]]);
    setBoard(nextBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");

    if (nextResult) {
      const scoreKey = nextResult === "draw" ? "draws" : nextResult;
      setScores((previous) => ({ ...previous, [scoreKey]: previous[scoreKey] + 1 }));
    }
  }

  function undoMove() {
    if (history.length === 0) return;

    if (result) {
      const scoreKey = result === "draw" ? "draws" : result;
      setScores((previous) => ({ ...previous, [scoreKey]: Math.max(0, previous[scoreKey] - 1) }));
    }

    setBoard(history[history.length - 1]);
    setHistory((previous) => previous.slice(0, -1));
    setCurrentPlayer(history.length % 2 === 0 ? "O" : "X");
  }

  function restartRound() {
    setBoard([...EMPTY_BOARD]);
    setCurrentPlayer("X");
    setHistory([]);
  }

  function newMatch() {
    restartRound();
    setScores({ ...INITIAL_SCORES });
  }

  const status = result === "draw"
    ? { title: "A perfect tie", detail: "No squares left. Run it back?" }
    : result
      ? { title: `Player ${result === "X" ? "1" : "2"}'s round`, detail: `${winnerIcon?.language} takes the win!` }
      : { title: `Player ${currentPlayer === "X" ? "1" : "2"}'s turn`, detail: `${9 - movesPlayed} ${9 - movesPlayed === 1 ? "move" : "moves"} left on the board` };

  function changeIcon(player: Player, iconId: IconId) {
    if (iconId === (player === "X" ? iconO : iconX)) return;
    if (player === "X") setIconX(iconId);
    else setIconO(iconId);
  }

  return (
    <div className="game-content">
      <div className="game-sidebar">
      <div className="scoreboard" aria-label="Match score">
        <div className={`score-card score-x ${!result && currentPlayer === "X" ? "is-active" : ""}`}>
          <span className="score-player"><span className={`dev-icon ${getDevIcon(iconX).className}`} aria-label={getDevIcon(iconX).language}>{getDevIcon(iconX).glyph}</span> PLAYER ONE</span>
          <strong className="score-number" aria-label={`${scores.X} wins`}>{scores.X}</strong>
          <span className="score-caption">WINS</span>
        </div>
        <div className="score-center"><span className="score-center-top">ROUND</span><strong>{scores.X + scores.O + scores.draws + (result ? 0 : 1)}</strong><span className="score-center-bottom">OF MATCH</span></div>
        <div className={`score-card score-o ${!result && currentPlayer === "O" ? "is-active" : ""}`}>
          <span className="score-player">PLAYER TWO <span className={`dev-icon ${getDevIcon(iconO).className}`} aria-label={getDevIcon(iconO).language}>{getDevIcon(iconO).glyph}</span></span>
          <strong className="score-number" aria-label={`${scores.O} wins`}>{scores.O}</strong>
          <span className="score-caption">WINS</span>
        </div>
      </div>

      <details className="icon-customizer">
        <summary>Choose your language icons <span className="customizer-hint">MAKE THEM YOURS</span></summary>
        <div className="icon-selectors">
          <label className="icon-select-label">PLAYER ONE
            <select value={iconX} onChange={(event) => changeIcon("X", event.target.value as IconId)}>
              {DEV_ICONS.map((icon) => <option key={icon.id} value={icon.id} disabled={icon.id === iconO}>{icon.language}{icon.id === iconO ? " (in use)" : ""}</option>)}
            </select>
          </label>
          <label className="icon-select-label">PLAYER TWO
            <select value={iconO} onChange={(event) => changeIcon("O", event.target.value as IconId)}>
              {DEV_ICONS.map((icon) => <option key={icon.id} value={icon.id} disabled={icon.id === iconX}>{icon.language}{icon.id === iconX ? " (in use)" : ""}</option>)}
            </select>
          </label>
        </div>
      </details>



      </div>

      <div className="game-main">
      <div className={`turn-banner ${result ? "round-over" : `turn-${currentPlayer.toLowerCase()}`}`} aria-live="polite" aria-atomic="true">
        <span className={`dev-icon turn-indicator ${result === "X" ? getDevIcon(iconX).className : result === "O" ? getDevIcon(iconO).className : !result ? activeIcon.className : "icon-draw"}`} aria-hidden="true">
          {result === "draw" ? "=" : result === "X" ? getDevIcon(iconX).glyph : result === "O" ? getDevIcon(iconO).glyph : activeIcon.glyph}
        </span>
        <span className="turn-copy"><strong>{status.title}</strong><small>{status.detail}</small></span>
        {result && <span className="win-spark" aria-hidden="true">+</span>}
      </div>

      {winnerIcon && (
        <div className="celebration" role="status" aria-live="polite">
          <div className="confetti" aria-hidden="true">{CONFETTI.map((piece) => <span key={piece} className={`confetti-piece confetti-piece-${piece % 8}`} />)}</div>
          <span className="celebration-kicker">BUILD SUCCESSFUL</span>
          <strong>Nice work, Player {result === "X" ? "One" : "Two"}!</strong>
          <span className="celebration-detail">Your {winnerIcon.language} skills are showing.</span>
        </div>
      )}

      {result === "draw" && <div className="draw-celebration" role="status">A close match! Great teamwork.</div>}

      <div className="board-frame">
        <div className="board" role="group" aria-label="Tic-Tac-Toe board">
          {board.map((cell, index) => {
            const isWinningCell = winningLine?.includes(index) ?? false;
            const isPlayable = cell === null && result === null;
            const cellIcon = cell === "X" ? getDevIcon(iconX) : cell === "O" ? getDevIcon(iconO) : null;
            return (
              <button
                key={index}
                type="button"
                className={`square${cellIcon ? ` filled ${cell === "X" ? "mark-x" : "mark-o"}` : ""}${isWinningCell ? " winning" : ""}`}
                onClick={() => playCell(index)}
                disabled={!isPlayable}
                aria-label={`Row ${Math.floor(index / 3) + 1}, column ${(index % 3) + 1}${cellIcon ? `: Player ${cell === "X" ? "one" : "two"}, ${cellIcon.language}` : ": empty"}${isWinningCell ? ", part of winning line" : ""}`}
              >
                {cellIcon ? <span className={`square-mark dev-icon ${cellIcon.className}`} aria-hidden="true">{cellIcon.glyph}</span> : <span className={`square-hint dev-icon ${activeIcon.className}`} aria-hidden="true">{activeIcon.glyph}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="action-row">
        <button type="button" className="secondary-button" onClick={undoMove} disabled={history.length === 0} aria-label="Undo last move">
          <span aria-hidden="true">&#8617;</span> Undo
        </button>
        <span className="move-count">{movesPlayed} / 9 MOVES</span>
        {result ? (
          <button type="button" className="primary-button" onClick={restartRound}>Play again <span aria-hidden="true">&#8594;</span></button>
        ) : (
          <button type="button" className="secondary-button" onClick={restartRound} disabled={movesPlayed === 0}>Restart</button>
        )}
      </div>


      </div>

      <div className="match-footer">
        <span className="draw-count">DRAWS <strong>{scores.draws}</strong></span>
        <button type="button" className="reset-score-button" onClick={newMatch}>Reset match</button>
      </div>

    </div>
  );
}