export function mapToBoard(data) {
  const cards = {};
  const columns = {};

  for (const column of data.columns) {
    column.cards.forEach((card) => (cards[card._id] = card));
    columns[column.id] = column;
  }

  return {
    id: data._id,
    title: data.title,
    cards: cards,
    columns: columns,
    columnOrder: data.columnOrder,
  };
}
