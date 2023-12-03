import { FC } from 'react';
import './ActionBar.css';
import { moveCell, deleteCell } from '../../state/cells-slice/cells-slice';
import { useDispatch } from 'react-redux';
import { FaArrowUp, FaArrowDown, FaXmark } from 'react-icons/fa6';

interface Props {
  id: string;
}

const ActionBar: FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <div className='action-bar'>
      <button
        className='button is-primary is-small'
        onClick={() => dispatch(moveCell({ id, direction: 'up' }))}
      >
        <span className='icon'>
          <FaArrowUp />
        </span>
      </button>
      <button
        className='button is-primary is-small'
        onClick={() => dispatch(moveCell({ id, direction: 'down' }))}
      >
        <span className='icon'>
          <FaArrowDown />
        </span>
      </button>
      <button
        className='button is-primary is-small'
        onClick={() => dispatch(deleteCell({ id }))}
      >
        <span className='icon'>
          <FaXmark />
        </span>
      </button>
    </div>
  );
};

export default ActionBar;
