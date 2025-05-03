import { useDroppable } from '@dnd-kit/core';
import React from 'react';

interface DroppableColumnProps {
  id: string;
  children: React.ReactNode;
}

export const DroppableColumn: React.FC<DroppableColumnProps> = ({ id, children }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className="rounded">
      {children}
    </div>
  );
};
