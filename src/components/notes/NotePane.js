import React from 'react';
import Note from './Note';
import Button from '../../components/ui/Button';
import NoteFiltersForm from '../../components/filters/NoteFiltersForm';

const NotePane = ({notes, noteCounts, selectedNoteId, handlers}) => (
  <div>
    <div>{noteCounts.total} notes total</div>
    <Button className="btn-outline" onClick={handlers.onAddNote}>Add note</Button><br/>
    <NoteFiltersForm />
    {
      notes.map((note) => (
        <Note
          data = {note}
          isSelected = { note.id === selectedNoteId }
          onSelect = { () => handlers.onSelectNote(note.id) }
          onArchive = { () => handlers.onArchiveNote(note.id) }
          onUnarchive = { () => handlers.onUnarchiveNote(note.id) }
          onContentChange= { (newContent) => handlers.onContentChange(note.id, newContent) }
          key={note.id}/>
      ))
    }
  </div>
);

export default NotePane;
