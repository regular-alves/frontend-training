import { useState } from 'react';
import StageModal from './StageModal';
import Markdown from './Markdown';

const STATUS_LABELS = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  completed: 'Completed'
};

function Stage({ stage, stageProgress, onStart, onComplete, onReset }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalType, setModalType] = useState(null);

  const { status, beforeState, afterState } = stageProgress;

  const handleStartSubmit = (text) => {
    onStart(stage.id, text);
    setModalType(null);
  };

  const handleCompleteSubmit = (text) => {
    onComplete(stage.id, text);
    setModalType(null);
  };

  return (
    <div className="stage">
      <div
        className="stage-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span className={`stage-status-indicator ${status}`} />
        <span className="stage-title">{stage.title}</span>
        <span className={`stage-status-badge ${status}`}>
          {STATUS_LABELS[status]}
        </span>
      </div>

      {isExpanded && (
        <div className="stage-content">
          <Markdown content={stage.content} />

          {stage.resources && stage.resources.length > 0 && (
            <div className="stage-resources">
              <h4>Study Resources</h4>
              {stage.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.title}
                </a>
              ))}
            </div>
          )}

          {stage.exercises && stage.exercises.length > 0 && (
            <div className="stage-exercises">
              <h4>Exercises</h4>
              {stage.exercises.map((exercise, idx) => (
                <a
                  key={idx}
                  href={exercise.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {exercise.title}
                </a>
              ))}
            </div>
          )}

          {(status === 'in_progress' || status === 'completed') && (beforeState || afterState) && (
            <div className="evolution-comparison">
              <h4>Evolution</h4>
              <div className="evolution-grid">
                <div className="evolution-item before">
                  <h5>Before</h5>
                  <p>{beforeState || '-'}</p>
                </div>
                <div className="evolution-item after">
                  <h5>After</h5>
                  <p>{afterState || '(in progress)'}</p>
                </div>
              </div>
            </div>
          )}

          <div className="stage-actions">
            {status === 'not_started' && (
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalType('start');
                }}
              >
                Start Stage
              </button>
            )}

            {status === 'in_progress' && (
              <button
                className="btn btn-success"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalType('complete');
                }}
              >
                Complete Stage
              </button>
            )}

            {status !== 'not_started' && (
              <button
                className="btn btn-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onReset(stage.id);
                }}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}

      {modalType === 'start' && (
        <StageModal
          title="Start Stage"
          label="Describe your current knowledge level on this topic:"
          placeholder="E.g., I know little about Core Web Vitals, just heard about it..."
          buttonText="Start"
          onSubmit={handleStartSubmit}
          onClose={() => setModalType(null)}
        />
      )}

      {modalType === 'complete' && (
        <StageModal
          title="Complete Stage"
          label="Describe your new knowledge level after studying:"
          placeholder="E.g., Now I understand LCP, INP and CLS metrics and know how to optimize them..."
          buttonText="Complete"
          onSubmit={handleCompleteSubmit}
          onClose={() => setModalType(null)}
        />
      )}
    </div>
  );
}

export default Stage;
