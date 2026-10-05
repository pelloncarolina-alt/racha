function ActivityGrid({ days }) {
  return (
    <div className="activity-grid">
      {days.map((day) => (
        <div
          key={day.key}
          title={day.key}
          className={`activity-cell activity-cell-${day.done ? 'done' : 'empty'} ${
            day.isToday ? 'activity-cell-today' : ''
          }`}
        />
      ))}
    </div>
  )
}

export default ActivityGrid
