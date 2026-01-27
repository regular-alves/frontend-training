import { useState } from 'react';
import Stage from './Stage';
import Markdown from './Markdown';

function Pillar({ pillar, getStageProgress, startStage, completeStage, resetStage }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const completedCount = pillar.stages.filter(
    stage => getStageProgress(stage.id).status === 'completed'
  ).length;

  const percent = Math.round((completedCount / pillar.stages.length) * 100);

  return (
    <article className="pillar">
      <header
        className="pillar-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h2 className="pillar-title">{pillar.title}</h2>
        </div>
        <div className="pillar-progress">
          <div className="pillar-progress-percent">{percent}%</div>
          <div className="pillar-progress-text">
            {completedCount}/{pillar.stages.length}
          </div>
        </div>
        <span className={`pillar-toggle ${isExpanded ? 'open' : ''}`}>
          &#9660;
        </span>
      </header>

      {isExpanded && (
        <div className="pillar-content">
          <div className="pillar-description">
            <Markdown content={pillar.description} />
          </div>
          {pillar.stages.map(stage => (
            <Stage
              key={stage.id}
              stage={stage}
              stageProgress={getStageProgress(stage.id)}
              onStart={startStage}
              onComplete={completeStage}
              onReset={resetStage}
            />
          ))}
        </div>
      )}
    </article>
  );
}

export default Pillar;
