import { useState, useEffect } from 'react';

const STORAGE_KEY = 'frontend-training-progress';

const defaultProgress = {
  stages: {}
};

export function useLocalStorage() {
  const [progress, setProgress] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultProgress;
    } catch {
      return defaultProgress;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }, [progress]);

  const getStageProgress = (stageId) => {
    return progress.stages[stageId] || {
      status: 'not_started',
      beforeState: '',
      afterState: ''
    };
  };

  const startStage = (stageId, beforeState) => {
    setProgress(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [stageId]: {
          ...prev.stages[stageId],
          status: 'in_progress',
          beforeState
        }
      }
    }));
  };

  const completeStage = (stageId, afterState) => {
    setProgress(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [stageId]: {
          ...prev.stages[stageId],
          status: 'completed',
          afterState
        }
      }
    }));
  };

  const resetStage = (stageId) => {
    setProgress(prev => ({
      ...prev,
      stages: {
        ...prev.stages,
        [stageId]: {
          status: 'not_started',
          beforeState: '',
          afterState: ''
        }
      }
    }));
  };

  return {
    progress,
    getStageProgress,
    startStage,
    completeStage,
    resetStage
  };
}
