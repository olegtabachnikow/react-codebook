import { FC, ReactElement } from 'react';
import './CellListItem.css';
import { Cell } from '../../types/types';
import CodeCell from '../CodeCell/CodeCell';
import TextEditor from '../TextEditor/TextEditor';
import ActionBar from '../ActionBar/ActionBar';

interface Props {
  item: Cell;
}

const CellListItem: FC<Props> = ({ item }) => {
  let child: ReactElement;
  if (item.type === 'code') {
    child = (
      <>
        <div className='action-bar-wrapper'>
          <ActionBar id={item.id} />
        </div>
        <CodeCell cell={item} />
      </>
    );
  } else {
    child = (
      <>
        <TextEditor cell={item} />
        <ActionBar id={item.id} />
      </>
    );
  }
  return <div className='cell-list-item'>{child}</div>;
};

export default CellListItem;
