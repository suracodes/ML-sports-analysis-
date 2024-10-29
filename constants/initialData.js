export const initialPlayers = [
  { id: 1, x: 50, y: 50, role: 'fielder', label: 'F1', color: '#3B82F6' },
  { id: 2, x: 30, y: 30, role: 'fielder', label: 'F2', color: '#3B82F6' },
  { id: 3, x: 70, y: 30, role: 'fielder', label: 'F3', color: '#3B82F6' },
  { id: 4, x: 20, y: 60, role: 'fielder', label: 'F4', color: '#3B82F6' },
  { id: 5, x: 80, y: 60, role: 'fielder', label: 'F5', color: '#3B82F6' },
  { id: 6, x: 45, y: 80, role: 'bowler', label: 'B', color: '#EF4444' },
  { id: 7, x: 55, y: 20, role: 'batsman', label: 'BAT', color: '#10B981' },
];

export const formations = {
  types: ['attacking', 'defensive', 'balanced'],
  specific: ['ring', 'slip', 'split'],
};

export const playerRoles = ['fielder', 'bowler', 'batsman'];
