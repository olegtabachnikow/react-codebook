import { FC } from 'react';
import './AddCell.css';
import { insertCell } from '../../state/cells-slice/cells-slice';
import { useDispatch } from 'react-redux';
import { FaPlus } from 'react-icons/fa6';

interface Props {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: FC<Props> = ({ previousCellId, forceVisible }) => {
  const dispatch = useDispatch();
  return (
    <div className={`add-cell ${forceVisible ? 'force-visible' : ''}`}>
      <div className='add-buttons'>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() =>
            dispatch(insertCell({ id: previousCellId, type: 'code' }))
          }
        >
          <span className='icon is-small'>
            <FaPlus />
          </span>
          <span>Code</span>
        </button>
        <button
          className='button is-rounded is-primary is-small'
          onClick={() =>
            dispatch(insertCell({ id: previousCellId, type: 'markdown' }))
          }
        >
          <span className='icon is-small'>
            <FaPlus />
          </span>
          <span>Text</span>
        </button>
      </div>
      <div className='divider' />
    </div>
  );
};

export default AddCell;
