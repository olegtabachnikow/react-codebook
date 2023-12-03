import { FC, useEffect, useState, useRef } from 'react';
import './TextEditor.css';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../../types/types';
import { useDispatch } from 'react-redux';
import { updateCell } from '../../state/cells-slice/cells-slice';

interface Props {
  cell: Cell;
}

const TextEditor: FC<Props> = ({ cell }) => {
  const [editing, setEditing] = useState<boolean>(false);
  const { id, content } = cell;
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });
    return () =>
      document.removeEventListener('click', listener, { capture: true });
  }, []);

  if (editing) {
    return (
      <div className='text-editor' ref={ref}>
        <MDEditor
          value={cell.content}
          onChange={(value: string | undefined) =>
            dispatch(updateCell({ id: id, content: value || '' }))
          }
        />
      </div>
    );
  }

  return (
    <div className='text-editor card' onClick={() => setEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={content} />
      </div>
    </div>
  );
};

export default TextEditor;
