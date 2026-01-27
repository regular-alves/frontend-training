function ProgressBar({ percent }) {
  return (
    <div className="progress-bar">
      <div
        className={`progress-bar-fill ${percent === 100 ? 'completed' : ''}`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}

export default ProgressBar;
