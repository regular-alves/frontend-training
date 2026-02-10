import trainingContent from '../../training.md?raw';

function parseMarkdown(content) {
  const lines = content.split('\n');

  const result = {
    title: '',
    description: '',
    pillars: [],
    practicalTasks: []
  };

  let currentPillar = null;
  let currentStage = null;
  let currentSection = null;
  let contentBuffer = [];
  let pillarDescriptionBuffer = [];
  let pillarCount = 0;
  let stageCount = 0;
  let collectingResources = false;
  let collectingExercises = false;

  const flushContent = () => {
    if (currentStage && contentBuffer.length > 0) {
      currentStage.content = contentBuffer.join('\n').trim();
    }
    contentBuffer = [];
    collectingResources = false;
    collectingExercises = false;
  };

  const flushPillarDescription = () => {
    if (currentPillar && pillarDescriptionBuffer.length > 0) {
      currentPillar.description = pillarDescriptionBuffer.join('\n').trim();
    }
    pillarDescriptionBuffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Main title
    if (line.startsWith('# ')) {
      result.title = line.replace(/^#\s*/, '').replace(/[^\w\s:-]/g, '').trim();
      continue;
    }

    // Target Audience / Description
    if (line.startsWith('**Target Audience:**') || line.startsWith('**Focus:**')) {
      result.description += line + '\n';
      continue;
    }

    // Pillar header (## with emoji)
    if (line.match(/^##\s*.*Pillar\s*\d+/i)) {
      flushContent();
      flushPillarDescription();
      pillarCount++;
      stageCount = 0;
      const title = line.replace(/^##\s*/, '').replace(/[^\w\s&():-]/g, '').trim();
      currentPillar = {
        id: `pillar-${pillarCount}`,
        title: title.replace(/Pillar \d+:\s*/i, ''),
        description: '',
        stages: []
      };
      result.pillars.push(currentPillar);
      currentStage = null;
      currentSection = 'pillar-description';
      continue;
    }

    // Collect pillar description (everything before first ### stage)
    if (currentSection === 'pillar-description') {
      // Stage header starts - end pillar description
      if (line.match(/^###\s*\d+\.\d+\./)) {
        flushPillarDescription();
        // Continue to process this line as a stage header below
      } else {
        // Skip empty lines at the start
        if (pillarDescriptionBuffer.length === 0 && line.trim() === '') continue;
        pillarDescriptionBuffer.push(line);
        continue;
      }
    }

    // Stage header (### numbered like 1.1, 2.1, etc)
    if (line.match(/^###\s*\d+\.\d+\./)) {
      flushContent();
      if (currentPillar) {
        stageCount++;
        const title = line.replace(/^###\s*/, '').replace(/[^\w\s&():<>.,`/-]/g, '').trim();
        currentStage = {
          id: `stage-${pillarCount}-${stageCount}`,
          title,
          content: '',
          resources: [],
          exercises: []
        };
        currentPillar.stages.push(currentStage);
        currentSection = 'stage-content';
      }
      continue;
    }

    // Practical Lab Tasks section
    if (line.match(/^##.*Practical Lab Tasks/i)) {
      flushContent();
      flushPillarDescription();
      currentPillar = null;
      currentStage = null;
      currentSection = 'tasks';
      continue;
    }

    // Individual task
    if (currentSection === 'tasks' && line.match(/^\*\s*\*\*Task\s*P\d+/i)) {
      const taskMatch = line.match(/\*\*Task\s*(P\d+):\*\*\s*(.+)/i);
      if (taskMatch) {
        result.practicalTasks.push({
          id: `task-${taskMatch[1].toLowerCase()}`,
          title: `Task ${taskMatch[1]}`,
          description: taskMatch[2].trim()
        });
      }
      continue;
    }

    // Skip the monthly roadmap section
    if (line.match(/^##.*Monthly Execution Roadmap/i)) {
      flushContent();
      flushPillarDescription();
      currentSection = 'roadmap';
      continue;
    }

    // Collect stage content
    if (currentSection === 'stage-content' && currentStage) {
      // Stop at next section
      if (line.startsWith('###') || line.startsWith('##')) continue;

      // Check for Study Resources marker
      if (line.match(/^\*\*Study Resources:\*\*/i)) {
        collectingResources = true;
        collectingExercises = false;
        continue;
      }

      // Check for Exercises marker
      if (line.match(/^\*\*Exercises:\*\*/i)) {
        collectingExercises = true;
        collectingResources = false;
        continue;
      }

      // Collect resource links
      if (collectingResources && line.includes('](')) {
        const match = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          currentStage.resources.push({
            title: match[1],
            url: match[2]
          });
        }
        continue;
      }

      // Collect exercise links
      if (collectingExercises && line.includes('](')) {
        const match = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          currentStage.exercises.push({
            title: match[1],
            url: match[2]
          });
        }
        continue;
      }

      // If we hit a non-link line after resources, stop collecting resources
      if (collectingResources && line.trim() !== '' && !line.includes('](')) {
        collectingResources = false;
      }

      // If we hit a non-link line after exercises, stop collecting exercises
      if (collectingExercises && line.trim() !== '' && !line.includes('](')) {
        collectingExercises = false;
      }

      // Skip empty lines at the start of content
      if (contentBuffer.length === 0 && line.trim() === '') continue;

      // Don't add resource lines to content
      if (!collectingResources) {
        contentBuffer.push(line);
      }
    }
  }

  flushContent();
  flushPillarDescription();
  result.description = result.description.trim();

  return result;
}

export const trainingData = parseMarkdown(trainingContent);
