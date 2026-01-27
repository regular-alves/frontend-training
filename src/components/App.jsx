import { trainingData } from '../data/parseTraining';
import { useLocalStorage } from '../hooks/useLocalStorage';
import Markdown from './Markdown';
import Pillar from './Pillar';
import ProgressBar from './ProgressBar';

function App() {
  const { progress, getStageProgress, startStage, completeStage, resetStage } = useLocalStorage();

  const totalStages = trainingData.pillars.reduce(
    (acc, pillar) => acc + pillar.stages.length,
    0
  );

  const completedStages = trainingData.pillars.reduce((acc, pillar) => {
    return acc + pillar.stages.filter(
      stage => getStageProgress(stage.id).status === 'completed'
    ).length;
  }, 0);

  const overallPercent = totalStages > 0 ? Math.round((completedStages / totalStages) * 100) : 0;

  return (
    <div className="app">
      <header className="header">
        <h1>{trainingData.title}</h1>
        <Markdown content={trainingData.description} />
      </header>

      <section className="overall-progress">
        <h2>Overall Progress</h2>
        <ProgressBar percent={overallPercent} />
        <div className="progress-text">
          <span>{completedStages} of {totalStages} stages completed</span>
          <span>{overallPercent}%</span>
        </div>
      </section>

      <main>
        {trainingData.pillars.map(pillar => (
          <Pillar
            key={pillar.id}
            pillar={pillar}
            getStageProgress={getStageProgress}
            startStage={startStage}
            completeStage={completeStage}
            resetStage={resetStage}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
